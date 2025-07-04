// gunakan ESM versi Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://nuvfnnxuxtthbryesliu.supabase.co'  // ganti dengan punyamu
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmZubnh1eHR0aGJyeWVzbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzk1NTYsImV4cCI6MjA2NzExNTU1Nn0.Om73FRiKvdlWpZS-hIXCIKznjkQ3A3X3k1n2IzGzRes'    // anon public key kamu

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
