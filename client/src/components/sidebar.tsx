import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Link } from "@tanstack/react-router"
import { Tooltip, TooltipContent } from "./ui/tooltip"
import logo from "@/assets/images/logo.png"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="h-screen" {...props}>
      <SidebarHeader>
        <div className="flex justify-center">
          <img src={logo} alt="sheraton hotel logo" width="100px" />
        </div>
      </SidebarHeader>

      <SidebarContent className="m-auto">
        <SidebarGroup className="flex-col space-y-2">
          <TooltipProvider>
            <Tooltip  >
              <TooltipTrigger asChild className="w-10 h-10" >
                <Link to="/" className="[&.active]:bg-icon-selected rounded-full p-2 flex cursor-pointer justify-center bg-secondary">
                  <span className="material-symbols-outlined text-icon">
                    home
                  </span></Link>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-white">
                home
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider >
            <Tooltip  >
              <TooltipTrigger asChild className="w-10 h-10" >
                <Link to="/guests" className="[&.active]:bg-icon-selected [&.active]:text-icon-selected rounded-full p-2 flex cursor-pointer justify-center bg-secondary">
                  <span className="material-symbols-outlined text-icon">
                    person
                  </span></Link>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-white">
                Guests
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarGroup>


      </SidebarContent>


    </Sidebar>
  )
}
