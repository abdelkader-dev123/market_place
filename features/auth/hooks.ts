import { LoginFormValues, loginSchema } from "@/validations/validation";
import { useState } from "react";
import { ZodError } from "zod";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "./store";

export function useAuth() {
  const { token, isHydrated, hydrate, login, logout } = useAuthStore(
    useShallow((state) => ({
      token: state.token,
      isHydrated: state.isHydrated,
      hydrate: state.hydrate,
      login: state.login,
      logout: state.logout,
    })),
  );

  return {
    token,
    isAuthenticated: Boolean(token),
    isHydrated,
    hydrate,
    login,
    logout,
  };
}

type FieldErrors = Partial<Record<keyof LoginFormValues, string>>;

interface UseLoginFormReturn {
  values: LoginFormValues;
  fieldErrors: FieldErrors;
  requestError: string | null;
  setField: <K extends keyof LoginFormValues>(key: K, value: string) => void;
  setRequestError: (error: string | null) => void;
  validate: () => LoginFormValues | null;
  clearErrors: () => void;
}

const DEFAULT_VALUES: LoginFormValues = {
  username: "emilys",
  password: "emilyspass",
};

export function useLoginForm(): UseLoginFormReturn {
  const [values, setValues] = useState<LoginFormValues>(DEFAULT_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState<string | null>(null);

  const setField = <K extends keyof LoginFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const clearErrors = () => {
    setFieldErrors({});
    setRequestError(null);
  };

  const validate = (): LoginFormValues | null => {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const errors = result.error as ZodError;
      const mapped: FieldErrors = {};
      for (const issue of errors.issues) {
        const key = issue.path[0] as keyof LoginFormValues;
        if (key && !mapped[key]) {
          mapped[key] = issue.message;
        }
      }
      setFieldErrors(mapped);
      return null;
    }

    return result.data;
  };

  return {
    values,
    fieldErrors,
    requestError,
    setField,
    setRequestError,
    validate,
    clearErrors,
  };
}
