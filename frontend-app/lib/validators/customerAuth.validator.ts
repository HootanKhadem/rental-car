import { z } from "zod";

// Schema برای فرم لاگین
export const customerLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Schema برای فرم ثبت‌نام
export const customerRegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^(\+965|00965)?[2569]\d{7}$/,
        "Invalid Kuwait phone number (e.g., +965 91234567)",
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// استخراج تایپ‌ها از Schemaها
export type CustomerLoginFormData = z.infer<typeof customerLoginSchema>;
export type CustomerRegisterFormData = z.infer<typeof customerRegisterSchema>;
