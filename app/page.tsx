"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { SplashPage } from "@/components/splash-page";
import { SignInForm } from "./auth/components/SignInForm";
import { SignUpForm } from "./auth/components/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleAuthSuccess = useCallback(() => {
    // For signup, switch to sign-in tab
    // For signin, the middleware will handle the redirect to /home
    if (activeTab === "signup") {
      setActiveTab("signin");
    } else {
      window.location.href = "/home";
    }
  }, [activeTab]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as "signin" | "signup");
  }, []);

  if (showSplash) {
    return <SplashPage onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white select-none">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex flex-col min-h-screen px-4 py-6">
          {/* Logo - Mobile */}
          <div className="flex justify-center mb-8">
            <Image
              src="/portfilogo.svg"
              alt="PortFilo Logo"
              width={120}
              height={120}
              className="w-24 h-24"
              priority
            />
          </div>

          {/* Headline - Mobile */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Happening now
            </h1>
            <p className="text-lg font-bold text-white/80">
              See what&apos;s up.
            </p>
          </div>

          {/* Auth Forms - Mobile */}
          <div className="flex-1 flex flex-col justify-center">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-sm mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-off-black border-gray-700 mb-6">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-400 dark:text-gray-400 dark:data-[state=active]:text-black text-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-400 dark:text-gray-400 dark:data-[state=active]:text-black text-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="mt-0">
                <SignInForm 
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignUp={() => setActiveTab("signup")}
                />
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <SignUpForm 
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignIn={() => setActiveTab("signin")}
                />
              </TabsContent>
            </Tabs>

            {/* Legal Text - Mobile */}
            <p className="text-xs text-gray-400 mt-6 text-center px-4">
              By signing up, you agree to the{" "}
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
{" "}and{" "}
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
              , including{" "}
              <span className="text-primary hover:underline cursor-pointer">Cookie Use</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-row min-h-screen">
        {/* Logo - Desktop */}
        <div className="flex-1 flex items-center justify-end pr-20">
          <Image
            src="/portfilogo.svg"
            alt="PortFilo Logo"
            width={300}
            height={300}
            className="w-auto h-auto"
            priority
          />
        </div>

        {/* Content - Desktop */}
        <div className="flex-1 flex items-center justify-start pl-6">
          <div className="w-full max-w-sm">
            {/* Headline - Desktop */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-14">
                For the Filos
              </h1>
              <p className="text-3xl font-bold text-white/80">
                See what&apos;s up.
              </p>
            </div>

            {/* Auth Forms - Desktop */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-off-black border-gray-700">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-400 dark:text-gray-400 dark:data-[state=active]:text-black"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-400 dark:text-gray-400 dark:data-[state=active]:text-black"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="mt-6">
                <SignInForm 
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignUp={() => setActiveTab("signup")}
                />
              </TabsContent>
              
              <TabsContent value="signup" className="mt-6">
                <SignUpForm 
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignIn={() => setActiveTab("signin")}
                />
              </TabsContent>
            </Tabs>

            {/* Legal Text - Desktop */}
            <p className="text-xs text-gray-400 mt-6">
              By signing up, you agree to the{" "}
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
{" "}and{" "}
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
              , including{" "}
              <span className="text-primary hover:underline cursor-pointer">Cookie Use</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
