import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/guests/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/guests/new"!</div>
}
