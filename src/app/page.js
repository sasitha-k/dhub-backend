import { redirect } from 'next/navigation'

export default function Page() {

  redirect('/login');
  return (
    <div>
      Home Page
    </div>
  )
}
