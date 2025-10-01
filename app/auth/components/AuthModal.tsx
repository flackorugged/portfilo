"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AuthForms } from "./AuthForms";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialTab = "signin" }: AuthModalProps) {
  const router = useRouter();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-black border-gray-800 text-white p-6 sm:p-8">
        <VisuallyHidden>
          <DialogTitle>Join PortFilo</DialogTitle>
        </VisuallyHidden>
        <AuthForms onSuccess={onClose} initialTab={initialTab} />
      </DialogContent>
    </Dialog>
  );
}
