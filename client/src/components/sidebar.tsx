import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-amber-300">
        <h2 className="text-lg font-bold p-4">My App</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup >
          <Link to="/" className="[&.active]:font-bold block p-2">Home</Link>
          <Link to="/about" className="[&.active]:font-bold block p-2">About</Link>
        </SidebarGroup>

        <SidebarGroup title="Guests">
          <Link to="/guests" className="[&.active]:font-bold block p-2">Guests</Link>
        </SidebarGroup>
      </SidebarContent>

    
    </Sidebar>
  )
}
