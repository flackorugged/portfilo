"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function FloatingPostButton() {
  return (
    <div className="lg:hidden fixed bottom-20 right-4 z-40">
      <Button
        size="lg"
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-black shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
