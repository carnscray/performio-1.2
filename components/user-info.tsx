import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ShieldCheck, BadgeCheck } from "lucide-react";
import { Profile } from "@/config/permissions";

export function UserInfo({ profile }: { profile: Profile }) {
    return (
        <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Profile</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {profile.is_admin ? <ShieldCheck className="size-6" /> : <BadgeCheck className="size-6" />}
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">
                            {profile.first_name} {profile.last_name}
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            {profile.position || "Staff Member"} • {profile.is_admin ? "Administrator" : "User"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}