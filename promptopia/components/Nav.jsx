'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

import { useState, useEffect } from 'react';

import User from '@models/user';
import { mongooseConnect } from '@lib/mongoose';

const Nav = () => {

  const user = useUser();

  const [toggleDropdown, setToggleDropdown] = useState(false)

  async function saveUserToDB(){
    await mongooseConnect();
  }

  useEffect(() => {
    saveUserToDB()
  }, [])
  
  
  function login() {
    return (
      <div>
        <a className='black_btn' href="/api/auth/login">Login</a>
      </div>
    )
  }


  if(user.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          width={30}
          height={30}
          alt='logo'
          src='/assets/images/logo.svg' 
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      <div className='sm:flex hidden'>
        {user.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <a className='outline_btn' href="/api/auth/logout">Logout</a>
            <Link href='/profile'>
              <Image 
                width={37}
                height={37}
                alt='profile'
                src={user.user.picture}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          login()
        )}
      </div>

      <div className='sm:hidden flex relative'>
        {user.user ? (
          <div className='flex'>
            <Image 
              width={37}
              height={37}
              alt='profile'
              src='/assets/images/logo.svg' 
              className='rounded-full cursor-pointer'
              onClick={()=>{setToggleDropdown((prev) => !prev)}}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link 
                  href='/profile'
                  className='dropdown_link'
                  onClick={()=>{setToggleDropdown(false)}}
                >
                  My Profile
                </Link>
                <Link 
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={()=>{setToggleDropdown(false)}}
                >
                  Create Prompt
                </Link>
                <Link 
                  href="/api/auth/logout"
                  className='mt-5 w-full black_btn'
                  onClick={()=>{setToggleDropdown(false)}}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          login()
        )}
      </div>

    </nav>
  )
}

export default Nav