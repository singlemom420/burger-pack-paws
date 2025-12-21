import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lcaiamozmidnrqgtvldt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYWlhbW96bWlkbnJxZ3R2bGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzODM5ODYsImV4cCI6MjA3ODk1OTk4Nn0.ORVkxWCmNwgJUB89mUtgdUn89KVA6KwQ3WECWOsBvCU";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
