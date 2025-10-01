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
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface SignInFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSuccess, onSwitchToSignUp }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const supabase = createClient();
      
      // Determine if input is email or username
      const isEmail = data.emailOrUsername.includes("@");
      
      let email = data.emailOrUsername;
      
      if (!isEmail) {
        // Look up email by username
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .eq("username", data.emailOrUsername)
          .single();

        if (!profile) {
          throw new Error("Invalid username or password");
        }
        
        email = profile.email;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: data.password,
      });

      if (error) {
        throw new Error("Invalid email or password");
      }

      toast.success("Signed in successfully!");
      onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during sign in";
      toast.error(errorMessage);
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

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-600"
                  />
                </FormControl>
                <FormLabel className="text-sm text-gray-300">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          
          <Button
            type="button"
            variant="link"
            className="text-primary hover:text-primary/80 p-0 h-auto text-sm"
          >
            Forgot password?
          </Button>
        </div>

        <div className="flex-1"></div>
        
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-10 sm:h-11"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
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
