"use client"

import * as React from "react"
import { LayoutDashboard, Users, LogOut, Package2, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar({ profile }: { profile: any }) {
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/auth/login")
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-14 border-b flex items-center px-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <Package2 className="size-4" />
                    </div>
                    <span className="font-bold truncate group-data-[collapsible=icon]:hidden">
                        Performio
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive tooltip="Dashboard" asChild>
                                <a href="/protected">
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Practitioners">
                                <Users />
                                <span>Practitioners</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-2 border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 border text-xs font-bold uppercase">
                                        {profile?.display_name?.[0] || "U"}
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden truncate">
                                        <span className="font-medium text-sm">{profile?.display_name || "User"}</span>
                                        <span className="text-[10px] text-muted-foreground">{profile?.position || "Member"}</span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-56" align="start">
                                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                                    <LogOut className="mr-2 size-4" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}