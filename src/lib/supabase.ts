import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface BrewingSession {
  id: string;
  beer_style_id: string;
  session_name: string;
  created_at: string;
  updated_at: string;
}

export interface TaskProgress {
  id: string;
  session_id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}