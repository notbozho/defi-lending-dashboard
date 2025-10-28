import { ArrowLeftRight, LayoutDashboard, Settings, Store, User } from "lucide-react";
import { GitHub } from "../icons/GitHub";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const side_bar_data = {
  navPrimary: [
    { name: "Dashboard", link: "/", icon: LayoutDashboard },
    { name: "Markets", link: "/markets", icon: Store },
    { name: "Account", link: "/account", icon: User },
    { name: "Swap", link: "/swap", icon: ArrowLeftRight },
  ],
  navSecondary: [
    { name: "GitHub", link: "https://github.com/notbozho/defi-lending-dashboard", icon: GitHub },
    { name: "Settings", link: "/settings", icon: Settings },
  ],
};

function AppSidebar() {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      variant="sidebar"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {side_bar_data.navPrimary.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.link}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {side_bar_data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.link}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
