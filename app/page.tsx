"use client"

import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  const session=useSession();
  const logoutHandler=()=>{
    signOut({
      callbackUrl:`${window.location.origin}/sign-in`
    })
  }

  return (
    <>
    <Button onClick={logoutHandler}>Logout</Button>
    <ThemeSwitcher />
    </>
  )
}

export default page