'use client'

import { Gauge } from "lucide-react";
import { Profile } from "@/config/permissions";
import { UserInfo } from "@/components/home/user-info";

interface DashboardClientProps {
    profile: Profile;
}

export default function DashboardClient({ profile }: DashboardClientProps) {
    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <header className="flex items-center space-x-3 text-slate-900">
                <Gauge className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </header>

            {/* Grid: 2 columns on desktop (md+), 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Slot 1: User Info Card (Half width on desktop) */}
                <UserInfo profile={profile} />

                {/* Slot 2: Empty (keeps Slot 1 at 50%) */}
                <div className="hidden md:block" />
            </div>
        </div>
    );
}