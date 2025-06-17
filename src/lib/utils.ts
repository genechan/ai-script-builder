import { abcComponentId, xyzComponentId } from "@/constant";
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
  [abcComponentId]: AbcComponentPlaceholderBadge,
  [xyzComponentId]: XyzComponentPlaceholderBadge,
};
