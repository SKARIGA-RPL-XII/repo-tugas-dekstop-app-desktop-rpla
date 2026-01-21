import { useState } from "react";
import { User } from "../../types/user";
import { ApiError } from "../../types/Api";

type ProfileForm = {
  username: string;
  email: string;
  role: string;
  password?: string;
  confirmPassword?: string;
};

export function useProfileDialog(user: User) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<ProfileForm>({
    username: user.username,
    email: user.email,
    role: user.role,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<ProfileForm>>({});

  const openEdit = () => {
    setForm({
      username: user.username,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setOpen(true);
  };

  const close = () => setOpen(false);

  const setField = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const submit = async <T = void,>(
    onValid: (payload: Partial<User>) => Promise<T>,
  ) => {
    try {
      const payload: Partial<User> = {
        username: form.username,
        email: form.email,
        role: form.role,
      };

      if (form.password) payload.password = form.password;

      await onValid(payload);
      setOpen(false);
      return true;
    } catch (err) {
      const error = err as ApiError;
      setErrors({ username: error.message });
      return false;
    }
  };

  return {
    open,
    openEdit,
    close,
    form,
    setField,
    errors,
    submit,
  };
}
