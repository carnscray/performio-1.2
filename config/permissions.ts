// config/permissions.ts
import { LayoutDashboard, ShieldAlert, Home } from "lucide-react";

export type Profile = {
    id: string;
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
    position: string | null;
    is_admin: boolean;
};

export const ADMIN_NAV_GROUPS = [
    {
        title: "Platform",
        items: [
            {
                label: "Home",
                href: "/protected",
                icon: Home,
            },
            {
                label: "Dashboard",
                href: "/protected/dashboard",
                icon: LayoutDashboard,
                // 🚨 Only show this link in the sidebar if they are an admin
                check: (p: Profile) => p.is_admin === true,
            },
        ],
    },
];

export function isPathAllowed(path: string, profile: Profile): boolean {
    const allItems = ADMIN_NAV_GROUPS.flatMap(group => group.items);
    // Find exact match or parent match
    const matchedItem = allItems.find((i) => path === i.href);

    if (!matchedItem) return true;
    return matchedItem.check ? matchedItem.check(profile) : true;
}