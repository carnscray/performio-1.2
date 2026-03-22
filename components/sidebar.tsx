"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_GROUPS, Profile } from "@/config/permissions";

export function Sidebar({ profile }: { profile: Profile }) {
    const pathname = usePathname();

    return (
        <div className="px-4 space-y-6">
            {ADMIN_NAV_GROUPS.map((group, idx) => (
                <div key={idx} className="space-y-2">
                    <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {group.title}
                    </h4>
                    <nav className="grid gap-1">
                        {group.items.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
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
    );
}