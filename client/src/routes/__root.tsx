import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider className='flex'>
      <AppSidebar className="h-screen w-20" />
      <SidebarInset className='w-[calc(100vw-200px)] absolute left-0 right-0 m-auto '>
        <div>
          <Outlet />
        </div>
      </SidebarInset>


      <TanStackRouterDevtools />
    </SidebarProvider>
  ),
})
