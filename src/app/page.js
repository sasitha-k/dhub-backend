import { redirect } from 'next/navigation'

export default function Page() {

  redirect('/booking');
  return (
    <div>
      Home Page
    </div>
  )
}
