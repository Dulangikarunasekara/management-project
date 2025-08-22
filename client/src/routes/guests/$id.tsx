import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/guests/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/guests/$id"!</div>
}
