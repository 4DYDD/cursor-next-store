"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import RegisterView from "@/views/auth/register";
import { RegisterForm } from "@/interfaces/RegisterForm";
import authServices from "@/services/auth";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const { push } = useRouter();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    event.preventDefault();

    const form = event.currentTarget as RegisterForm;

    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    setIsLoading(true);
    setError("");

    const { response } = await authServices
      .registerAccount(data)
      .then((result) => {
        return { response: result };
      })
      .catch((error) => {
        return error;
      });

    console.log(response);

    // JIKA ERROR
    if (response.status !== 201) {
      setError(response.data.message);
      setIsLoading(false);
    } else {
      form.reset();
      push("/login");
    }
  };

  return (
    <>
      <RegisterView
        isLoading={isLoading}
        error={error}
        errorPhone={errorPhone}
        setErrorPhone={setErrorPhone}
        handleRegister={handleRegister}
      />
    </>
  );
};

export default RegisterPage;
