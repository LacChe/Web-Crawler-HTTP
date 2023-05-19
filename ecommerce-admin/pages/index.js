import Layout from "@/components/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {

  const user = useUser();

  return (
    <Layout>
        <div className='text-blue-900 flex justify-between'>
          <h2>
            Hello, <b>{user?.user?.nickname}</b>
          </h2>
          <div className='flex bg-gray-300 text-black gap-1 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className='px-2'>{user?.user?.nickname}</span>
          </div>
        </div>
    </Layout>
  )
}