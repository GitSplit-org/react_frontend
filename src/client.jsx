import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://zbkzyiplixszpbcqjlls.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpia3p5aXBsaXhzenBiY3FqbGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MzM1MDIsImV4cCI6MjAyNzQwOTUwMn0.bRhIGHiv0cPJj5G0abAQZU51AmvHQoVk2rS9GYIYIXM"
);
