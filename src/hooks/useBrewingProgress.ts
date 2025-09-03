import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { BrewingSession, TaskProgress } from '../lib/supabase';

export const useBrewingProgress = (beerStyleId: string) => {
  const [session, setSession] = useState<BrewingSession | null>(null);
  const [taskProgress, setTaskProgress] = useState<Map<string, boolean>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize or get existing session
  useEffect(() => {
    const initializeSession = async () => {
      try {
        setLoading(true);
        
        // First, try to find an existing session for this beer style
        const { data: existingSessions, error: fetchError } = await supabase
          .from('brewing_sessions')
          .select('*')
          .eq('beer_style_id', beerStyleId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (fetchError) throw fetchError;

        let currentSession: BrewingSession;

        if (existingSessions && existingSessions.length > 0) {
          // Use existing session
          currentSession = existingSessions[0];
        } else {
          // Create new session
          const { data: newSession, error: createError } = await supabase
            .from('brewing_sessions')
            .insert({
              beer_style_id: beerStyleId,
              session_name: `Brewing Session - ${new Date().toLocaleDateString()}`
            })
            .select()
            .single();

          if (createError) throw createError;
          currentSession = newSession;
        }

        setSession(currentSession);

        // Load task progress for this session
        const { data: tasks, error: tasksError } = await supabase
          .from('task_progress')
          .select('*')
          .eq('session_id', currentSession.id);

        if (tasksError) throw tasksError;

        // Convert to Map for easy lookup
        const progressMap = new Map<string, boolean>();
        tasks?.forEach(task => {
          progressMap.set(task.task_id, task.completed);
        });

        setTaskProgress(progressMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error initializing session:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, [beerStyleId]);

  // Toggle task completion
  const toggleTask = useCallback(async (taskId: string) => {
    if (!session) return;

    try {
      const currentCompleted = taskProgress.get(taskId) || false;
      const newCompleted = !currentCompleted;

      // Optimistically update UI
      setTaskProgress(prev => new Map(prev.set(taskId, newCompleted)));

      // Check if task progress record exists
      const { data: existingTask } = await supabase
        .from('task_progress')
        .select('id')
        .eq('session_id', session.id)
        .eq('task_id', taskId)
        .single();

      if (existingTask) {
        // Update existing record
        const { error } = await supabase
          .from('task_progress')
          .update({
            completed: newCompleted,
            completed_at: newCompleted ? new Date().toISOString() : null
          })
          .eq('id', existingTask.id);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('task_progress')
          .insert({
            session_id: session.id,
            task_id: taskId,
            completed: newCompleted,
            completed_at: newCompleted ? new Date().toISOString() : null
          });

        if (error) throw error;
      }
    } catch (err) {
      // Revert optimistic update on error
      setTaskProgress(prev => new Map(prev.set(taskId, !taskProgress.get(taskId))));
      setError(err instanceof Error ? err.message : 'Failed to update task');
      console.error('Error toggling task:', err);
    }
  }, [session, taskProgress]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`task_progress_${session.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'task_progress',
          filter: `session_id=eq.${session.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const task = payload.new as TaskProgress;
            setTaskProgress(prev => new Map(prev.set(task.task_id, task.completed)));
          } else if (payload.eventType === 'DELETE') {
            const task = payload.old as TaskProgress;
            setTaskProgress(prev => {
              const newMap = new Map(prev);
              newMap.delete(task.task_id);
              return newMap;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return {
    session,
    taskProgress,
    toggleTask,
    loading,
    error,
    isTaskCompleted: (taskId: string) => taskProgress.get(taskId) || false
  };
};