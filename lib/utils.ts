import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import fr from "@/public/translations/fr.json"
import en from "@/public/translations/en.json"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface LoginTranslations {
  [key: string]: string;
}

export function tr({ lang = "fr", key }: { lang?: "en" | "fr", key: string }) {
  const translations: LoginTranslations = lang === "fr" ? fr : en;
  return translations[key];
}