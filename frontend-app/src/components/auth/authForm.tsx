"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomerAuthStore } from "@/stores/customerAuth.store";
import {
  customerLoginSchema,
  customerRegisterSchema,
  type CustomerLoginFormData,
  type CustomerRegisterFormData,
} from "@/lib/validators/customerAuth.validator";
import { Button } from "@/components/ui/custom/button/Button";
import { InputField } from "@/components/ui/custom/inputField/inputField";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/custom/tabs/tabs";

import { Loader2, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  onSuccess?: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const { login, register, isLoading, clearError } =
    useCustomerAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<CustomerLoginFormData>({
    resolver: zodResolver(customerLoginSchema),
  });

  const registerForm = useForm<CustomerRegisterFormData>({
    resolver: zodResolver(customerRegisterSchema),
  });

  const onLoginSubmit = async (data: CustomerLoginFormData) => {
    clearError();
    await login(data);
    const storeError = useCustomerAuthStore.getState().error;
    if (storeError) {
      // map generic server error to password field so user sees it under the input
      loginForm.setError("password", { type: "server", message: storeError });
      return;
    }

    onSuccess?.();
  };

  const onRegisterSubmit = async (data: CustomerRegisterFormData) => {
    clearError();
    await register(data);
    const storeError = useCustomerAuthStore.getState().error;
    if (storeError) {
      // map generic registration/server error to email field by default
      registerForm.setError("email", { type: "server", message: storeError });
      return;
    }

    onSuccess?.();
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="w-full flex justify-center py-5 bg-ink">
        <TabsTrigger className="py-3.5 mx-1 font-bold" value="login">
          Sign In
        </TabsTrigger>
        <TabsTrigger className="py-3.5 mx-1 font-bold" value="register">
          Register
        </TabsTrigger>
      </TabsList>

      {/* Login Form */}
      <TabsContent value="login" className="mt-3">
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-4"
          noValidate
        >
          <InputField
            id="login-email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={loginForm.formState.errors.email?.message}
            disabled={isLoading}
            {...loginForm.register("email")}
          />

          <div className="relative">
            <InputField
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={loginForm.formState.errors.password?.message}
              disabled={isLoading}
              inputClassName="pr-10"
              {...loginForm.register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-0 top-6.5 z-10"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full py-5 mt-7 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </TabsContent>

      {/* Register Form */}
      <TabsContent value="register" className="mt-3">
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="space-y-4"
          noValidate
        >
          <InputField
            id="register-name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={registerForm.formState.errors.name?.message}
            disabled={isLoading}
            {...registerForm.register("name")}
          />

          <InputField
            id="register-email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={registerForm.formState.errors.email?.message}
            disabled={isLoading}
            {...registerForm.register("email")}
          />

          <InputField
            id="register-phone"
            label="Phone Number"
            type="tel"
            placeholder="+965 91234567"
            error={registerForm.formState.errors.phone?.message}
            disabled={isLoading}
            {...registerForm.register("phone")}
          />

          <div className="relative">
            <InputField
              id="register-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={registerForm.formState.errors.password?.message}
              disabled={isLoading}
              inputClassName="pr-10"
              {...registerForm.register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-0 top-6.5 z-10"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="relative">
            <InputField
              id="register-confirm-password"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              error={registerForm.formState.errors.confirmPassword?.message}
              disabled={isLoading}
              inputClassName="pr-10"
              {...registerForm.register("confirmPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-0 top-6.5 z-10"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full py-5 mt-7 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
