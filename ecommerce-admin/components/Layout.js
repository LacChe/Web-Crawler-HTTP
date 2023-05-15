import Nav from '@/components/Nav';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Layout({ children }) {
  const user = useUser();

  if(user.isLoading) {
    return <div>Loading...</div>;
  }

  if(user.user) {
    return (
      <div className='bg-blue-900 min-h-screen flex'>
        <Nav />
        <div className='bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2'>
            {children}
        </div>
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