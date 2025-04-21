"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import RegisterView from "@/views/auth/register";
import { RegisterForm } from "@/interfaces/RegisterForm";

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

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());

    // JIKA ERROR
    if (res.status === false) {
      setError(res.message);
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
