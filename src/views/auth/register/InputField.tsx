import { InputFieldProps } from "@/interfaces/InputFieldProps";
import React from "react";

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  label,
  error,
  styles = {},
  className,
}) => {
  return (
    <div style={styles.formGroup}>
      <label htmlFor={id as string} style={styles.label}>
        {label}
      </label>
      <input
        id={id as string}
        name={id as string}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.input}
        className={className}
      />
      {error && (
        <span
          style={styles.errorText}
          className="text-red-500 text-sm animate-squish block"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
