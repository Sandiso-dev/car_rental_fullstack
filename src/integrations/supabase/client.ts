// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uuvjdhbxdiydvtxrjisk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dmpkaGJ4ZGl5ZHZ0eHJqaXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3OTAzMTcsImV4cCI6MjA1NTM2NjMxN30.c3FAIuEmn7QDt07u6BZHTADKaxYLcUltQsfz3Yi9HQ0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);