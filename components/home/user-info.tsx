import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ShieldCheck, BadgeCheck } from "lucide-react";
import { Profile } from "@/config/permissions";
import { cn } from "@/lib/utils";

export function UserInfo({ profile, className }: { profile: Profile, className?: string }) {

    // 🚨 DEFENSIVE CHECK: Prevents the "undefined reading is_admin" crash
    if (!profile) return null;

    return (
        <Card className={cn(
            "rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg",
            className
        )}>
            <CardHeader className="flex flex-row items-center gap-2.5 space-y-0 pb-3 border-b border-slate-50">
                <div className="rounded-full bg-slate-100 p-1.5 shrink-0 border border-slate-200/50">
                    <User className="h-3.5 w-3.5 text-slate-600" />
                </div>
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Account Profile
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="flex items-center gap-5">
                    {/* Role Icon Container */}
                    <div className={cn(
                        "flex size-16 items-center justify-center rounded-2xl shadow-inner shrink-0 border transition-colors",
                        profile.is_admin
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-green-50 text-green-600 border-green-100"
                    )}>
                        {profile.is_admin ? <ShieldCheck className="size-8" /> : <BadgeCheck className="size-8" />}
                    </div>

                    <div className="flex flex-col space-y-1 min-w-0">
                        <div className="text-2xl font-bold tracking-tight text-slate-900 truncate">
                            {profile.first_name} {profile.last_name}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60">
                                {profile.position || "Staff Member"}
                            </span>
                            <span className="text-slate-300">/</span>
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                profile.is_admin ? "text-blue-600" : "text-green-600"
                            )}>
                                {profile.is_admin ? "Administrator" : "User"}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}