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
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

const items = [
  {
    name: "Productos",
    href: "/",
    icon: FiShoppingBag,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-r border-gray-200 shadow-sm"
    >
      <SidebarHeader className="flex justify-center py-4">
        <Image src="/logo.svg" alt="Logo" width={60} height={60} />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase px-3 mb-2">
            Gestión de la tienda
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                    >
                      <item.icon /> {/* icono más grande */}
                      <span className="font-medium text-lx">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 text-sm text-gray-400 text-center">
        © 2025 Mi Tienda
      </SidebarFooter>
    </Sidebar>
  );
}
