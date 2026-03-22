import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Profile } from "@/config/permissions";
import DashboardClient from "./client";

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // 1. Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/sign-in");

    // 2. Fetch Profile to check Admin status
    const { data: profile } = await supabase
        .from("users")
        .select("id, display_name, first_name, last_name, position, is_admin")
        .eq("id", user.id)
        .single();

    // 3. Strict Admin Check
    // If no profile or not an admin, bump them back to the general protected area
    if (!profile || !profile.is_admin) {
        console.warn(`User ${user.id} attempted to access admin dashboard without permissions.`);
        redirect("/protected");
    }

    // 4. Authorized - Pass the profile to the client view
    return <DashboardClient profile={profile as Profile} />;
}