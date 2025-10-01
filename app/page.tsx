"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SplashPage } from "@/components/splash-page";
import { AuthModal } from "./auth/components/AuthModal";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  if (showSplash) {
    return <SplashPage onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white select-none">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Logo */}
        <div className="flex-1 flex items-start md:items-center mb-8 justify-start md:justify-end pt-4 pl-4 md:pt-0 md:pr-20">
          <Image
            src="/portfilogo.svg"
            alt="PortFilo Logo"
            width={300}
            height={300}
            className="w-[100px] h-[100px] md:w-auto md:h-auto"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex-1 pl-10 flex items-center justify-start pl-4 pr-4 md:pl-6 md:pr-0">
          <div className="w-full max-w-sm">
            {/* Headline */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-14">
                  For the Filos
                </h1>
                <p className="text-xl md:text-3xl font-bold text-white/80">
                  See what's up.
                </p>
              </div>

            {/* Sign-up Buttons */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <Button 
                className="w-full h-10 md:h-12 text-sm md:text-base font-semibold bg-white text-black hover:bg-white/80 border border-gray-300"
                variant="default"
              >
                Sign up with Google
              </Button>
              
              <div className="relative my-3 md:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs md:text-sm">
                  <span className="px-2 bg-black text-gray-400">OR</span>
                </div>
              </div>
              
              <Button 
                className="w-full h-10 md:h-12 text-sm md:text-base font-semibold bg-primary hover:bg-primary/80 text-black font-bold"
                variant="default"
                onClick={() => openAuthModal("signup")}
              >
                Create account
              </Button>
            </div>

            {/* Legal Text */}
            <p className="text-xs text-gray-400 mb-6 md:mb-8">
              By signing up, you agree to the{" "}
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
              {" "}and{" "}
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
              , including{" "}
              <span className="text-primary hover:underline cursor-pointer">Cookie Use</span>.
            </p>

            {/* Sign in section */}
            <div className="pb-10">
              <p className="text-white mb-3 md:mb-4 font-bold text-white/80 text-sm md:text-base">
                Already have an account?
              </p>
              <Button 
                className="w-full h-10 md:h-12 text-sm md:text-base border border-gray-600 text-white hover:bg-white/10"
                variant="outline"
                onClick={() => openAuthModal("signin")}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} initialTab={authModalTab} />
    </div>
  );
}
