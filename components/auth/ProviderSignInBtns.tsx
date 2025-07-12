import React from "react";
import { ProviderSignInBtn } from "./ProviderSignInBtn";
import { GithubLogo } from "../svg/GithubLogo";
import { GoogleLogo } from "../svg/GoogleLogo";

const ProviderSignInBtns = ({
  signInCard,
  disabled,
  onLoading,
}: {
  signInCard?: boolean;
  disabled?: boolean;
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <ProviderSignInBtn
        disabled={disabled}
        onLoading={onLoading}
        providerName="google"
        className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
      >
        <GoogleLogo className="mr-2" width={20} height={20} />
        {signInCard ? "Sign in with Google" : "Sign up with Google"}
      </ProviderSignInBtn>
      <ProviderSignInBtn
        disabled={disabled}
        onLoading={onLoading}
        providerName="github"
        className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
      >
        <GithubLogo className="fill-foreground mr-2" width={20} height={20} />
        {signInCard ? "Sign in with Github" : "Sign up with Github"}
      </ProviderSignInBtn>
    </div>
  );
};

export default ProviderSignInBtns;
