"use client";

import React, { useState } from 'react'
import { CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { signInSchema, SignInSchema } from '@/schema/signInSchema'
import { zodResolver } from "@hookform/resolvers/zod";
import ProviderSignInBtns from './ProviderSignInBtns';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoadingState } from '../ui/loadingState';


const SignInCardContent = () => {
  const form=useForm<SignInSchema>({
    resolver:zodResolver(signInSchema),
    defaultValues:{
      email:'',
      password:''
    }
  })
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();


  const onSubmit=async(data:SignInSchema)=>{
    setIsLoading(true);

    try {
      const account=await signIn("credentials",{
        email:data.email,
        password:data.password,
        redirect:false
      })

      if(!account){
        throw new Error("Something went wrong");
      }

     if(account.error){
      toast.error(account.error)

     }else{
      toast.success("You have been logged in!")
      router.push("/onboarding");
      router.refresh();
     }

    } catch (err) {
      let errMsg="Oh no..Something went wrong. Please try again";
      if (typeof err === "string") {
        errMsg = err;
      } else if (err instanceof Error) {
        errMsg = err.message
      }

      toast.error(errMsg)
      
    }
    setIsLoading(false)


  }
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
        <ProviderSignInBtns signInCard onLoading={setIsLoading} />
           <div className='space-y-1.5'>
           <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"EMAIL"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"PASSWORD"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           </div>
           <div className="space-y-2">
            <Button
              disabled={isLoading}
              className="w-full font-bold"
              type="submit"
            >
              {isLoading ? (
                <LoadingState loadingText={"Please wait"} />
              ) : (
                "Sign in"
              )}
            </Button>
          </div>

        </form>

      </Form>
    </CardContent>
  )
}

export default SignInCardContent