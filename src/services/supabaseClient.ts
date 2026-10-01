import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables if configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Supabase initialization error, falling back to local sync:', err);
  }
}

export const supabase = supabaseInstance;

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string;
  hasKey: boolean;
}

export const getSupabaseStatus = (): SupabaseConfigStatus => {
  return {
    isConfigured: isSupabaseConfigured,
    url: supabaseUrl ? supabaseUrl.replace(/https?:\/\//, '').split('.')[0] + '...' : 'Not Connected (Using Durable Local DB with Supabase Schema)',
    hasKey: Boolean(supabaseAnonKey),
  };
};
