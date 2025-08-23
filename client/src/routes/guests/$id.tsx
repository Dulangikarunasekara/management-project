import { createFileRoute } from '@tanstack/react-router'



const viewGuest = () =>{
}

export const Route = createFileRoute('/guests/$id')({
  component: viewGuest,
})

