'use client'

import { Gauge } from "lucide-react";
import { Profile } from "@/config/permissions";

interface DashboardClientProps {
    profile: Profile;
}

export default function DashboardClient({ profile }: DashboardClientProps) {
    return (
        <div className="space-y-6">
            <header className="flex items-center space-x-3">
                <Gauge className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </header>

            {/* The rest of the page remains empty as requested */}
            <div className="rounded-lg border border-dashed border-slate-200 p-20 flex items-center justify-center">
                <p className="text-slate-400 text-sm italic">Admin content will go here...</p>
            </div>
        </div>
    );
}