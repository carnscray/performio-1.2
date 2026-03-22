"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Profile } from "@/config/permissions";

export default function AdminPanelLayout({
    children,
    profile
}: {
    children: React.ReactNode;
    profile: Profile;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        // 1. Parent: h-screen prevents the whole page from bouncing/scrolling.
        <div className="flex h-screen w-full bg-muted/40 font-sans antialiased text-slate-900 overflow-hidden">

            {/* 2. Sidebar: Now using overflow-hidden to clip content when closed */}
            <aside
                className={cn(
                    "h-full flex-none border-r bg-background transition-all duration-300 ease-in-out flex flex-col overflow-hidden",
                    isSidebarOpen ? "w-64" : "w-0 border-none"
                )}
            >
                {/* Fixed-width wrapper (w-64) keeps the sidebar content from 
                    squishing or wrapping text while the bar slides shut. */}
                <div className="w-64 flex flex-col h-full">
                    <Sidebar
                        profile={profile}
                        onCollapse={() => setIsSidebarOpen(false)}
                    />
                </div>
            </aside>

            {/* 3. Workspace Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">

                {/* Floating "Show Sidebar" Button - Appears only when collapsed */}
                {!isSidebarOpen && (
                    <div className="absolute top-4 left-4 z-50 animate-in fade-in zoom-in duration-300">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 bg-white shadow-md border-slate-200 text-blue-600 hover:bg-slate-50"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <PanelLeft className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                {/* Independent Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-12">
                    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}