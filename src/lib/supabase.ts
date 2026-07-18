import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserProfile = {
  id?: string
  grade: string
  major: string
  school_level: string
  preparing_postgrad: boolean
  preparing_civil: boolean
  family_support: boolean
  ideal_city: string
  created_at?: string
}

export type TestResult = {
  id?: string
  user_id: string
  scores: {
    risk_preference: number
    learning_ability: number
    long_term_investment: number
    stability_need: number
    entrepreneurship: number
    social_preference: number
    city_preference: number
    competition: number
  }
  path_scores: {
    postgrad: number
    civil_service: number
    employment: number
    entrepreneurship: number
    phd: number
  }
  personality_type: string
  personality_name: string
  created_at?: string
}

// Save user profile
export async function saveUserProfile(profile: Omit<UserProfile, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single()

  if (error) {
    console.error('Error saving user profile:', error)
    throw error
  }

  return data
}

// Save test result
export async function saveTestResult(result: Omit<TestResult, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('test_results')
    .insert(result)
    .select()
    .single()

  if (error) {
    console.error('Error saving test result:', error)
    throw error
  }

  return data
}

// Get user profile by ID
export async function getUserProfile(id: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error getting user profile:', error)
    throw error
  }

  return data
}

// Get test results for a user
export async function getUserTestResults(userId: string) {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting test results:', error)
    throw error
  }

  return data
}

// Get statistics
export async function getStatistics() {
  const { data, error } = await supabase
    .from('test_statistics')
    .select('*')
    .single()

  if (error) {
    console.error('Error getting statistics:', error)
    throw error
  }

  return data
}

// Get all test results with user profiles (for admin)
export async function getAllTestResults() {
  const { data, error } = await supabase
    .from('test_results')
    .select(`
      *,
      user_profiles:user_id (
        grade,
        major,
        school_level,
        ideal_city
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting all test results:', error)
    throw error
  }

  return data
}
