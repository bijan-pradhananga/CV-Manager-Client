"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Shapes,
  ShoppingBag,
  TabletSmartphone,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

// This is sample data.
const data = {
  teams: [
    {
      name: "Cellapp",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Candidates",
      url: "#",
      icon: TabletSmartphone,
      isActive: true,
      items: [
        {
          title: "Add Candidate",
          url: "/admin/candidates/add-candidate",
        },
        {
          title: "View Candidate",
          url: "/admin/candidates/",
        },
      ],
    },
    {
      title: "Interviewers",
      url: "#",
      icon: TabletSmartphone,
      isActive: true,
      items: [
        {
          title: "Add Interviewer",
          url: "/admin/interviewers/add-interviewer",
        },
        {
          title: "View Interviewers",
          url: "/admin/interviewers/",
        },
      ],
    },

  ],

}

export function AppSidebar({
  ...props
}) {
  const { data: session } = useSession();
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
          <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
