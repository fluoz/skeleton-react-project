import { EyeOffIcon, EyeIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { createElement, useState } from "react";

type PasswordFieldProps = {
  form: UseFormReturn<any>;
  name?: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  description?: string | JSX.Element;
  className?: string;
};

export function PasswordInput({
  form,
  name = "password",
  placeholder = "Enter password",
  description,
  label,
  required = true,
  className,
}: PasswordFieldProps) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}{" "}
            {!required && (
              <span className="ml-1 font-normal text-gray-2">(Opsional)</span>
            )}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
              />
              <button
                type="button"
                className="text-muted-foreground absolute inset-y-0 right-0 flex cursor-pointer items-center p-3"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-4 w-4 text-slate-700",
                })}
              </button>
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
