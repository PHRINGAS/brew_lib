/*
  # Create brewing progress tracking system

  1. New Tables
    - `brewing_sessions`
      - `id` (uuid, primary key)
      - `beer_style_id` (text) - references the beer style being brewed
      - `session_name` (text) - optional name for the brewing session
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `task_progress`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key to brewing_sessions)
      - `task_id` (text) - the task identifier from the frontend
      - `completed` (boolean) - whether the task is completed
      - `completed_at` (timestamp) - when the task was completed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read/write access (since this is a shared brewing tracker)
*/

-- Create brewing_sessions table
CREATE TABLE IF NOT EXISTS brewing_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beer_style_id text NOT NULL,
  session_name text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create task_progress table
CREATE TABLE IF NOT EXISTS task_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES brewing_sessions(id) ON DELETE CASCADE,
  task_id text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, task_id)
);

-- Enable RLS
ALTER TABLE brewing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (shared brewing tracker)
CREATE POLICY "Anyone can read brewing sessions"
  ON brewing_sessions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create brewing sessions"
  ON brewing_sessions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update brewing sessions"
  ON brewing_sessions
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can read task progress"
  ON task_progress
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create task progress"
  ON task_progress
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update task progress"
  ON task_progress
  FOR UPDATE
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brewing_sessions_beer_style ON brewing_sessions(beer_style_id);
CREATE INDEX IF NOT EXISTS idx_task_progress_session ON task_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_task_progress_task ON task_progress(task_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_brewing_sessions_updated_at
  BEFORE UPDATE ON brewing_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_task_progress_updated_at
  BEFORE UPDATE ON task_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();