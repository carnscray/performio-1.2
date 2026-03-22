"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_GROUPS, Profile } from "@/config/permissions";
import { LogOut, PanelLeftClose, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function Sidebar({
    profile,
    onCollapse
}: {
    profile: Profile;
    onCollapse: () => void
}) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        // 🚨 Double check if your path is /sign-in or /auth/login
        router.push("/sign-in");
    };

    return (
        <div className="flex flex-col h-full bg-background">
            {/* 1. Header with Logo & Collapse Button */}
            <div className="flex h-14 items-center border-b px-4 shrink-0">
                <div className="flex items-center gap-2 font-bold text-blue-600">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white">
                        <Package2 className="h-4 w-4" />
                    </div>
                    <span className="tracking-tight text-foreground">Performio</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={onCollapse}
                >
                    <PanelLeftClose className="h-4 w-4" />
                </Button>
            </div>

            {/* 2. Navigation Section */}
            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                {ADMIN_NAV_GROUPS.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                        <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-slate-400/80">
                            {group.title}
                        </h4>
                        <nav className="grid gap-1">
                            {group.items.map((item) => {
                                // 💡 Updated: 'Active' if it's the exact path OR a sub-path
                                const isActive = pathname === item.href || (item.href !== "/protected" && pathname.startsWith(item.href));

                                const Icon = item.icon;
                                if (item.check && !item.check(profile)) return null;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100/50"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                ))}
            </div>

            {/* 3. Footer (Avatar | Name | Sign Out) */}
            <div className="mt-auto border-t p-4 bg-slate-50/40">
                <div className="flex items-center gap-3 px-1">
                    {/* Avatar */}
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm ring-2 ring-background">
                        {profile?.display_name?.[0] || "U"}
                    </div>

                    {/* Name | Sign Out */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-sm font-semibold truncate text-slate-900">
                            {profile?.display_name || "User"}
                        </span>
                        <div className="h-3 w-[1px] bg-slate-300 shrink-0" />
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-red-600 transition-colors whitespace-nowrap"
                        >
                            <LogOut className="h-3 w-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}