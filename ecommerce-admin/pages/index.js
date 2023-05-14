import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const user = useUser();

  return (
    <div className='bg-blue-900 w-screen h-screen flex items-center'>
      <div className='items-center w-full flex flex-col gap-2'>
        {user.isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {user.user ? (
              <div>
                <div>Signed in as {user.user.name}<br/></div>
                <a 
                  className='w-1/4 bg-white p-2 rounded-lg'
                  href="/api/auth/logout"
                >
                  Logout
                </a>
              </div>
            ) : (
              <div>
                <a 
                  className='w-1/4 bg-white p-2 rounded-lg'
                  href="/api/auth/login"
                >
                  Login
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}