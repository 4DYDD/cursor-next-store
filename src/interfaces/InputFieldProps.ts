export interface InputFieldProps {
  id?: "fullname" | "email" | "phone" | "password";
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "color";
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  styles?: {
    formGroup?: React.CSSProperties;
    label?: React.CSSProperties;
    input?: React.CSSProperties;
    errorText?: React.CSSProperties;
  };
  className?: string;
}
