"use client";

import React, { FormEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoginView from "@/views/auth/login";

const LoginPage = ({ searchParams }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const { callbackUrl }: any = React.use(searchParams);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;

    event.preventDefault();
    const form = event.currentTarget;

    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: callbackUrl || "/",
      });

      if (!res?.error) {
        push(callbackUrl || "/");
        form.reset();
      } else {
        setError("Email or Password is Incorrect");
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setError("Email or Password is Incorrect");
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    // if (isLoading) return;

    event.preventDefault();

    // setError("");
    // setIsLoading(true);

    // try {
    //   await signIn("google", {
    //     redirect: false,
    //     callbackUrl,
    //   });
    // } catch (error: any) {
    //   setError("Failed to sign in with Google");
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      <LoginView
        isLoading={isLoading}
        error={error}
        handleLogin={handleLogin}
        handleSignInWithGoogle={handleSignInWithGoogle}
      />
    </>
  );
};

export default LoginPage;
