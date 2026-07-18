-- Supabase Database Schema for Career Diagnosis

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade VARCHAR(20) NOT NULL,
  major VARCHAR(100) NOT NULL,
  school_level VARCHAR(50) NOT NULL,
  preparing_postgrad BOOLEAN DEFAULT FALSE,
  preparing_civil BOOLEAN DEFAULT FALSE,
  family_support BOOLEAN DEFAULT FALSE,
  ideal_city VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Results Table
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  scores JSONB NOT NULL,
  path_scores JSONB NOT NULL,
  personality_type VARCHAR(50) NOT NULL,
  personality_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_created_at ON test_results(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for MVP)
CREATE POLICY "Allow public insert on user_profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on user_profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on test_results" ON test_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on test_results" ON test_results
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for statistics
CREATE VIEW test_statistics AS
SELECT
  COUNT(DISTINCT up.id) as total_users,
  COUNT(tr.id) as total_tests,
  COUNT(CASE WHEN tr.personality_type = 'long-term' THEN 1 END) as long_term_count,
  COUNT(CASE WHEN tr.personality_type = 'stable' THEN 1 END) as stable_count,
  COUNT(CASE WHEN tr.personality_type = 'growth' THEN 1 END) as growth_count,
  COUNT(CASE WHEN tr.personality_type = 'business' THEN 1 END) as business_count,
  COUNT(CASE WHEN tr.personality_type = 'free' THEN 1 END) as free_count,
  COUNT(CASE WHEN tr.personality_type = 'global' THEN 1 END) as global_count,
  COUNT(CASE WHEN tr.personality_type = 'tech' THEN 1 END) as tech_count
FROM user_profiles up
LEFT JOIN test_results tr ON up.id = tr.user_id;
