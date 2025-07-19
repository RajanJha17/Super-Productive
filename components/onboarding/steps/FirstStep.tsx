import { useOnboardingForm } from '@/context/OnboardingForm';
import { additionalUserInfoFirstPart, AdditionalUserInfoFirstPart } from '@/schema/additionalUserInfoFirstPart';
import { ActionType } from '@/types/onBoardingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import AddUserImage from '../common/AddUserImage';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Props{
    profileImage?: string | null;
}

const FirstStep = ({profileImage}:Props) => {
    const {currentStep,name,surname,dispatch}=useOnboardingForm();
    const form=useForm<AdditionalUserInfoFirstPart>({
        resolver:zodResolver(additionalUserInfoFirstPart),
        defaultValues:{
            name:name ? name : "",
            surname: surname ? surname : ""
        }

    })

    useEffect(()=>{
        dispatch({
            type:ActionType.PROFILEIMAGE,
            payload:profileImage as string | null | undefined
        })
    },[profileImage,dispatch])

    const onSubmit=(data:AdditionalUserInfoFirstPart)=>{
        dispatch({
            type:ActionType.NAME,
            payload:data.name!
        })
        dispatch({
            type:ActionType.SURNAME,
            payload:data.surname!
        })
        dispatch({
            type:ActionType.CHANGE_SITE,
            payload:currentStep+1
        })
    }


  return (
    <>
    <h2 className='font-bold text-4xl md:text-5xl flex flex-col items-center my-10  '>
        <span>Let's prepare you</span>
        <span> ready</span>
   </h2>
    <div className='max-w-md w-full space-y-8'>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
            
            <p>Add photo</p>
            <AddUserImage profileImage={profileImage} />
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='space-y-6'>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-muted-foreground'>
                                First name
                            </FormLabel>
                            <FormControl>
                                <Input className='bg-muted' {...field} placeholder='eg. Open Studio'  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='surname'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-muted-foreground'>
                                Surname
                            </FormLabel>
                            <FormControl>
                                <Input className='bg-muted' {...field} placeholder='Reddy'  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />


                </div>
                <Button className='w-full max-w-md font-semibold'>
                Continue
                <ArrowRight width={18} height={18} />

                </Button>
            </form>

        </Form>
    </div>

    
    </>
  )
}

export default FirstStep