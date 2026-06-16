import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://obenvmdnnaimpqagsqjw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZW52bWRubmFpbXBxYWdzcWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjc5MjIsImV4cCI6MjA5NjYwMzkyMn0.6kS8yD4oCxnUXttlOBTUW7qEx0tlhW8eB2Fhk4pn_QI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);