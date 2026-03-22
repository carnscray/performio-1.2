// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  // Log all keys (not values!) to see what Next.js loaded
  const envKeys = Object.keys(process.env);
  const supabaseKeys = envKeys.filter(key => key.includes("SUPABASE"));

  console.log("--- ENV DIAGNOSTIC ---");
  console.log("Total Env Vars found:", envKeys.length);
  console.log("Supabase-related keys found:", supabaseKeys);
  console.log("-----------------------");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Missing Supabase Vars. Found keys: ${supabaseKeys.join(", ") || "NONE"}. 
       Check if .env.local is in ${process.cwd()}`
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch { }
      },
    },
  });
}