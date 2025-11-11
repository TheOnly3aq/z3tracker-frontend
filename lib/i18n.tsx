"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import nlMessages from "@/content/nl.json";
import enMessages from "@/content/en.json";

type Locale = "nl" | "en";
type Messages = typeof nlMessages;

const messages: Record<Locale, Messages> = {
  nl: nlMessages,
  en: enMessages,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, any>) => string;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("nl");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlLang = searchParams.get("lng");

    if (urlLang === "en") {
      setLocaleState("en");
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-language", "en");
        document.cookie = `preferred-language=en; max-age=${
          60 * 60 * 24 * 365
        }; path=/; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`;
      }
    } else if (urlLang === null) {
      if (typeof window !== "undefined") {
        const storedLang = localStorage.getItem("preferred-language");
        const cookieLang = document.cookie
          .split("; ")
          .find((row) => row.startsWith("preferred-language="))
          ?.split("=")[1];

        const preferredLang = storedLang || cookieLang;

        if (preferredLang === "en") {
          setLocaleState("en");
          const currentPath = window.location.pathname;
          const currentSearch = new URLSearchParams(window.location.search);
          currentSearch.set("lng", "en");
          const newUrl = `${currentPath}?${currentSearch.toString()}`;
          router.replace(newUrl);
        } else {
          setLocaleState("nl");
        }
      } else {
        setLocaleState("nl");
      }
    } else {
      setLocaleState("nl");
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-language", "nl");
        document.cookie = `preferred-language=nl; max-age=${
          60 * 60 * 24 * 365
        }; path=/; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`;
      }
    }
  }, [searchParams, router]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);

    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", newLocale);
      document.cookie = `preferred-language=${newLocale}; max-age=${
        60 * 60 * 24 * 365
      }; path=/; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`;
    }

    const currentPath = window.location.pathname;
    const currentSearch = new URLSearchParams(window.location.search);

    if (newLocale === "en") {
      currentSearch.set("lng", "en");
    } else {
      currentSearch.delete("lng");
    }

    const newSearch = currentSearch.toString();
    const newUrl = newSearch ? `${currentPath}?${newSearch}` : currentPath;

    router.push(newUrl);
  };

  const t = (key: string, values: Record<string, any> = {}): string => {
    const keys = key.split(".");
    let value: any = messages[locale];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key;
      }
    }

    if (typeof value === "string") {
      return Object.keys(values).reduce((str, placeholder) => {
        return str.replace(
          new RegExp(`{${placeholder}}`, "g"),
          values[placeholder]
        );
      }, value);
    }

    console.warn(
      `Translation value is not a string: ${key} for locale: ${locale}`
    );
    return key;
  };

  const getLocalizedPath = (path: string): string => {
    if (locale === "en") {
      const separator = path.includes("?") ? "&" : "?";
      return `${path}${separator}lng=en`;
    }
    return path;
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, getLocalizedPath }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { type Locale };
