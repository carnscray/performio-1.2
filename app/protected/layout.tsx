// app/protected/layout.tsx
import AdminPanelLayout from "@/components/admin-panel-layout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isPathAllowed, Profile } from "@/config/permissions";
import { headers } from "next/headers";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const headerList = await headers();
  const fullPath = headerList.get("x-invoke-path") || "/protected";

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users")
    .select("id, display_name, first_name, last_name, position, is_admin")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/");

  // Check the current path against the profile
  if (!isPathAllowed(fullPath, profile as Profile)) {
    redirect("/protected");
  }

  return (
    <AdminPanelLayout profile={profile as Profile}>
      {children}
    </AdminPanelLayout>
  );
}