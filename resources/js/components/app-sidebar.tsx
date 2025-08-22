import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'All Data',
    href: '/',
    icon: LayoutGrid,
  },
  {
    title: 'Teachers Data',
    href: '/teachers/all',
    icon: LayoutGrid,
  },
  {
    title: 'Students Data',
    href: '/students/all',
    icon: LayoutGrid,
  },
  {
    title: 'Manage Teachers',
    href: '/teachers',
    icon: LayoutGrid,
  },
  {
    title: 'Manage Grades',
    href: '/grades',
    icon: LayoutGrid,
  },
  {
    title: 'Manage Students',
    href: '/students',
    icon: LayoutGrid,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
