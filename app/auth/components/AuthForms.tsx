"use client";

import { useState } from "react";
import Image from "next/image";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

interface AuthFormsProps {
  onSuccess: () => void;
  initialTab?: "signin" | "signup";
}

export function AuthForms({ onSuccess, initialTab = "signin" }: AuthFormsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="flex justify-center mb-6 -mt-8 mb-12">
        <Image
          src="/portfilogo.svg"
          alt="PortFilo Logo"
          width={60}
          height={60}
          className="w-15 h-15"
          priority
        />
      </div>
      
      {/* Forms with fixed height */}
      <div className="min-h-[500px]">
        {activeTab === "signin" ? (
          <SignInForm onSuccess={onSuccess} onSwitchToSignUp={() => setActiveTab("signup")} />
        ) : (
          <SignUpForm onSuccess={onSuccess} onSwitchToSignIn={() => setActiveTab("signin")} />
        )}
      </div>
    </div>
  );
}
