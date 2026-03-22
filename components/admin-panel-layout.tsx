"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-1 h-screen overflow-hidden relative">
            <aside
                className={cn(
                    "hidden lg:flex flex-col shrink-0 h-full border-r bg-white transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "w-64" : "w-0 opacity-0"
                )}
            >
                <div className="flex items-center justify-between p-4 h-14 border-b">
                    <span className="font-bold text-blue-600 truncate">Performio</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                        <PanelLeftClose className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto pt-4">
                    <Sidebar profile={profile} />
                </div>
            </aside>

            <main className="flex flex-col flex-1 min-w-0 bg-slate-50 relative overflow-y-auto">
                <header className="flex h-14 items-center border-b bg-white px-4 lg:hidden sticky top-0 z-50">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <PanelLeft className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <div className="p-4 border-b font-bold text-blue-600">Performio</div>
                            <Sidebar profile={profile} />
                        </SheetContent>
                    </Sheet>
                </header>

                {!isSidebarOpen && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsSidebarOpen(true)}
                        className="hidden lg:flex fixed top-3 left-4 z-50 h-8 w-8 bg-white shadow-sm"
                    >
                        <PanelLeft className="h-4 w-4" />
                    </Button>
                )}

                <div className="flex-1 p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}