import { z } from "zod";

export const UserSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Full name is required",
      })
      .min(1, "Full name is required"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type UserSchemaType = z.infer<typeof UserSchema>;
