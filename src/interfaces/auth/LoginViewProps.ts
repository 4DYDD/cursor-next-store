import { FormEvent, MouseEvent } from "react";

export interface LoginViewProps {
  isLoading: boolean;
  error: string;
  handleLogin: (event: FormEvent<HTMLFormElement>) => void;
  handleSignInWithGoogle: (event: MouseEvent<HTMLButtonElement>) => void;
}
