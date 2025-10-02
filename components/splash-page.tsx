"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface SplashPageProps {
  onComplete: () => void;
}

export function SplashPage({ onComplete }: SplashPageProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    // Small delay to allow fade out animation
    setTimeout(onComplete, 300);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(handleComplete, 1500);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src="/portfilogo.svg"
        alt="PortFilo Logo"
        width={200}
        height={200}
        className="w-40 h-40 animate-pulse"
        priority
      />
    </div>
  );
}
