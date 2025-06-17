import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import AbcComponentPlaceholderBadge from "@/components/ui/abcBadge";
import XyzComponentPlaceholderBadge from "@/components/ui/xyzBadge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const componentRegistry: {
  [key: string]: React.ComponentType<{ id: string }>;
} = {
  "abc12345-def6-7890-ghij-klmnopqrstuv": AbcComponentPlaceholderBadge,
  "xyz98765-wxyz-4321-lmno-pqrstuvwxyza": XyzComponentPlaceholderBadge,
};
