import React from "react";
import Head from "next/head";
import Link from "next/link";
import { handleNumericInput } from "@/utils/handleNumericInput";
import InputField from "@/components/Elements/InputField";
import { Inter } from "next/font/google";
import { CSSProperties } from "react";
import { RegisterViewProps } from "@/interfaces/register/RegisterViewProps";

const inter = Inter({ subsets: ["latin"] });

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f3f4f6",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #d1d5db", // Updated border to match border-gray-300 in Tailwind
  },
  title: {
    color: "black",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center" as CSSProperties["textAlign"],
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
  },
  input: {
    marginTop: "0.25rem",
    display: "block",
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
    outline: "none",
    color: "black",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  linkText: {
    marginTop: "1rem",
    textAlign: "center" as CSSProperties["textAlign"],
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "underline",
  },
};

const RegisterView: React.FC<RegisterViewProps> = ({
  isLoading,
  error,
  errorPhone,
  setErrorPhone,
  handleRegister,
}) => {
  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>

      <div className={inter.className} style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Register</h1>

          {error && (
            <>
              <h2 className="text-red-500 font-bold text-center mb-3">
                {error}
              </h2>
            </>
          )}

          {/*  */}
          {/*  */}
          {/*  */}
          {/* ===== REGISTER FORM ===== */}
          <form onSubmit={handleRegister} className={inter.className}>
            {/*  */}
            {/*  */}
            {/*  */}
            {/* ===== FULLNAME FIELD ===== */}
            <InputField
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              label="Full Name"
              styles={styles}
            />

            {/*  */}
            {/*  */}
            {/*  */}
            {/* ===== PHONE FIELD ===== */}
            <InputField
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              label="Phone Number"
              styles={styles}
              className={inter.className}
              onChange={(event) => {
                handleNumericInput(event, (error: string) => {
                  setErrorPhone(error);
                });
              }}
              error={errorPhone}
            />

            {/*  */}
            {/*  */}
            {/*  */}
            {/* ===== EMAIL FIELD ===== */}
            <InputField
              id="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              styles={styles}
              className={inter.className}
            />

            {/*  */}
            {/*  */}
            {/*  */}
            {/* ===== PASSWORD FIELD ===== */}
            <InputField
              id="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              styles={styles}
              className={inter.className}
            />

            {/*  */}
            {/*  */}
            {/*  */}
            {/* ===== SUBMIT BUTTON ===== */}
            <button
              type="submit"
              className={`${isLoading && "!cursor-wait"} ${inter.className}`}
              disabled={isLoading}
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
              }}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>

          {/*  */}
          {/*  */}
          {/*  */}
          {/* ===== REDIRECT TO LOGIN PAGE ===== */}
          <p style={styles.linkText}>
            Sudah punya akun?{" "}
            <Link href={"/login"} style={styles.link}>
              login disini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterView;
