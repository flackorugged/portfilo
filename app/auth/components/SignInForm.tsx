"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema, type SignInFormData } from "../lib/validations";
import { signIn } from "../actions/auth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSuccess, onSwitchToSignUp }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      // For now, we'll assume emailOrUsername is an email
      // In a production app, you'd want to handle username lookup here
      const result = await signIn(data.emailOrUsername, data.password);
      
      if (result.success) {
        toast.success("Welcome back!");
        router.push("/home");
        onSuccess();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during sign in";
      
      // Check if it's an email not confirmed error
      if (errorMessage.includes("email not confirmed") || errorMessage.includes("Email not confirmed")) {
        toast.error("Please check your email and click the verification link before signing in.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full flex flex-col">
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email or username"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 h-10 sm:h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 pr-10 h-10 sm:h-11"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-gray-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs text-gray-300">
                  Remember me
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex-1"></div>
        
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-10 sm:h-11"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-primary hover:text-primary/80 underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
}