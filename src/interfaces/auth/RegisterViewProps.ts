import { FormEvent } from "react";

export interface RegisterViewProps {
  isLoading: boolean;
  error: string;
  errorPhone: string;
  setErrorPhone: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
}
