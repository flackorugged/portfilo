import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export type MessageType = "success" | "error" | "warning";

interface MessageProps {
  type: MessageType;
  message: string;
  className?: string;
}

const MESSAGE_ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
} as const;

const MESSAGE_STYLES = {
  success: "bg-primary/10 border-primary/20 text-primary",
  error: "bg-red-500/10 border-red-500/20 text-red-400",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
} as const;

export function Message({ type, message, className }: MessageProps) {
  const Icon = MESSAGE_ICONS[type];
  const styles = MESSAGE_STYLES[type];

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
        "flex items-center gap-2 px-4 py-3 rounded-lg border",
        "text-sm font-medium backdrop-blur-sm",
        "animate-in slide-in-from-top-2 duration-300",
        "max-w-[90vw] sm:max-w-md",
        styles,
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

export interface MessageData {
  type: MessageType;
  text: string;
}

interface MessageContainerProps {
  children: ReactNode;
  message?: MessageData | null;
}

export function MessageContainer({ children, message }: MessageContainerProps) {
  return (
    <div className="relative">
      {message && (
        <Message
          type={message.type}
          message={message.text}
        />
      )}
      {children}
    </div>
  );
}
