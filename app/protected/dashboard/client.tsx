'use client'

import { Gauge } from "lucide-react";
import { Profile } from "@/config/permissions";

interface DashboardClientProps {
    profile: Profile;
}

export default function DashboardClient({ profile }: DashboardClientProps) {
    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header Area */}
            <header className="flex items-center space-x-3">
                <Gauge className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            </header>

            {/* Admin content will be added here next */}
        </div>
    );
}