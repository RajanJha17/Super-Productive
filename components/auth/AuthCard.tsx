import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import SignInCardContent from "./SignInCardContent";
import SignUpCardContent from "./SignUpCardContent";

interface Props {
  signInCard?: boolean;
}

const AuthCard = ({ signInCard }: Props) => {
  return (
    <>
      <Card className="w-full sm:min-w-[28rem] sm:w-auto">
        <CardHeader>
          <Image
            className="rounded-full object-cover self-center"
            alt=""
            width={50}
            height={50}
            src={"https://github.com/shadcn.png"}
          />
                    <CardTitle className="pt-2">
            {signInCard ? "Sign in" : "Sign up"}
          </CardTitle>
          <CardDescription>
            {signInCard ? "Welcome back to ...." :"Create your account"}
          </CardDescription>
        </CardHeader>
        {signInCard ? <SignInCardContent /> : <SignUpCardContent />}
      </Card>
      <p className="text-sm">
        {signInCard
          ? "Don't have an account?"
          : "Already have an account?"}
        <Link
          className="text-primary"
          href={signInCard ? "/sign-up" : "/sign-in"}
        >
          {signInCard
            ? " Sign up"
            : " Sign in" }
        </Link>
      </p>
    </>
  );
};

export default AuthCard;
