import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * WinPro wordmark (dark text on transparent) — for use on light backgrounds like the
 * header. Intrinsic size 500×142; constrain height via `className` (e.g. h-8 w-auto).
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo-wordmark.png"
      alt="WinPro Window Cleaning"
      width={500}
      height={142}
      priority={priority}
      className={cn("h-8 w-auto", className)}
    />
  );
}

/**
 * Square WinPro icon (squeegee mark on a dark tile) — for dark backgrounds like the
 * footer, and reused as the favicon/app icon. Intrinsic 350×350.
 */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt="WinPro Window Cleaning"
      width={350}
      height={350}
      className={cn("h-12 w-12", className)}
    />
  );
}
