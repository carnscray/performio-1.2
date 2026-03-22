'use client'

import { Gauge } from "lucide-react";
import { Profile } from "@/config/permissions";
import { UserInfo } from "@/components/user-info";

interface DashboardClientProps {
    profile: Profile;
}

export default function DashboardClient({ profile }: DashboardClientProps) {
    return (
        <div className="mx-auto space-y-8 max-w-7xl">
            {/* Header */}
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-3">
                    <Gauge className="h-8 w-8 text-blue-600" />
                    <span>Dashboard</span>
                </h1>
                <p className="text-muted-foreground">
                    Welcome back, {profile.display_name}. Here is your clinic overview.
                </p>
            </header>

            {/* Widgets Container */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <UserInfo profile={profile} />

                {/* Placeholder for future Cliniko Stats */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-center items-center border-dashed border-slate-300 min-h-[150px]">
                    <span className="text-slate-400 text-sm font-medium italic">Cliniko Data Syncing...</span>
                </div>
            </div>

            {/* Main Dashboard Area */}
            <div className="grid gap-4 md:grid-cols-7">
                {/* Your future charts/tables will go here */}
            </div>
        </div>
    );
}