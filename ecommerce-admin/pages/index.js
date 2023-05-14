import Nav from '@/components/nav';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const user = useUser();

  if(user.isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user)

  if(user.user) {
    return (
      <div className='bg-blue-900 min-h-screen'>
        <Nav />
        <div>Signed in as {user.user.name}<br/></div>
        <a 
          className='w-1/4 bg-white p-2 rounded-lg'
          href="/api/auth/logout"
        >
          Logout
        </a>
      </div>
    )
  }

  return (
    <div className='bg-blue-900 w-screen h-screen flex text-center justify-center items-center'>
      <a 
        className='w-1/4 bg-white p-2 rounded-lg'
        href="/api/auth/login"
      >
        Login
      </a>
    </div>
  )
}