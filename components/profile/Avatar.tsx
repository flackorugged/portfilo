"use client";

import { memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};

export const Avatar = memo(function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const firstLetter = (fallback || "U").charAt(0).toUpperCase();
  
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-full", sizeClasses[size], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48px, 64px"
        />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-full bg-gray-600 text-white font-medium",
        sizeClasses[size],
        className
      )}
    >
      {firstLetter}
    </div>
  );
});
