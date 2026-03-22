import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserInfo } from "@/components/user-info";
import { Profile } from "@/config/permissions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users")
    .select("id, display_name, first_name, last_name, position, is_admin")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
      <UserInfo profile={profile as Profile} />
    </div>
  );
}