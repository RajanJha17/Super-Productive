"use client";

import React, { useState } from 'react'
import { CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import ProviderSignInBtns from './ProviderSignInBtns';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoadingState } from '../ui/loadingState';
import { signUpSchema, SignUpSchema } from '@/schema/signUpSchema';


const SignUpCardContent = () => {
  const form=useForm<SignUpSchema>({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      email:'',
      password:'',
      username:''
    }
  })
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();


  const onSubmit=async(data:SignUpSchema)=>{
    setIsLoading(true);

    try {
      const res=await fetch("/api/auth/register",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }   
      )

      if(!res.ok){
        throw new Error("Something went wrong")
      }
      const signUpInfo=await res.json();

      if(res.status===200){
        toast.success("Account was created!")
        await signIn("credentials",{
          email:data.email,
          password:data.password,
          redirect:false
        })

        router.push("/")
      }else{
        throw new Error(signUpInfo)
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={"USERNAME"} {...field} />
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
            <p className="text-xs text-center text-muted-foreground">
            By signing up you agree to our
              <span className="font-bold">Terms of Service</span>
            </p>
          </div>

        </form>

      </Form>
    </CardContent>
  )
}

export default SignUpCardContent