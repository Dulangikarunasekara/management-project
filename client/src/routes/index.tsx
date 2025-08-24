import { createFileRoute } from '@tanstack/react-router'
import logo from '@/assets/images/logo.png'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2 flex-col m-auto justify-center">
      <img src={logo} alt="" className='w-[200px] m-auto' />
      <h1>Welcome To Sheraton!</h1>
    </div>
  )
}