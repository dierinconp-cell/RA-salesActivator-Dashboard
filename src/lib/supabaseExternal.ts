import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://crqttnblirvfckfshsfc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycXR0bmJsaXJ2ZmNrZnNoc2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTA0NTgsImV4cCI6MjA2MjE2NjQ1OH0.yNB5AUH2FJ9MVk_WlhIVr4NhwzINyqncO6NGFze_jxM";

// External Supabase client for the dashboard data
export const supabaseExternal = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
