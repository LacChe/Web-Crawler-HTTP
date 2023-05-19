'use client'

import '@styles/globals.css'
import Nav from '@components/Nav'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and Share AI Prompts'
}

const Root = ({children}) => {
  return (
    <UserProvider>
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    </UserProvider>
  )
}

export default Root