import { useOnboardingForm } from '@/context/OnboardingForm';
import { additionalUserInfoFirstPart, AdditionalUserInfoFirstPart } from '@/schema/additionalUserInfoFirstPart';
import { ActionType } from '@/types/onBoardingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import AddUserImage from '../common/AddUserImage';

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

    const oonSubmit=(data:AdditionalUserInfoFirstPart)=>{
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
    </div>

    
    </>
  )
}

export default FirstStep