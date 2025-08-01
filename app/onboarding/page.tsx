import AdditionalInfoSection from '@/components/onboarding/AdditionalInfoSection';
import { OnboardingFormProvider } from '@/context/OnboardingForm';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const page = async() => {
    const session=await checkIfUserCompletedOnboarding("/onboarding");
    
  return (
    <OnboardingFormProvider session={session}>
      <AdditionalInfoSection profileImage={session.user.image} />
      </OnboardingFormProvider>
  )
}

export default page