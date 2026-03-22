import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./client";

export default async function ProtectedPage() {
  const supabase = await createClient();

  // 1. Get the Auth User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  // 2. Fetch the Profile from your 'users' table
  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // 🚨 ERROR HANDLING: If the user exists in Auth but not in your 'users' table, 
  // we catch it here so the client doesn't crash.
  if (error || !profile) {
    console.error("Profile not found:", error);
    return (
      <div className="p-8 border-2 border-dashed border-red-200 rounded-xl bg-red-50 text-red-600">
        <h2 className="font-bold">Account Setup Required</h2>
        <p className="text-sm">We found your login, but your profile record is missing in the database.</p>
      </div>
    );
  }

  // 3. Pass the validated profile to the Client component
  return <DashboardClient profile={profile} />;
}