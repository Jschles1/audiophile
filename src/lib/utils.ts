import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateProductName(name: string) {
  return name
    .replace(" Headphones", "")
    .replace(" Earphones", "")
    .replace(" Speaker", "");
}
