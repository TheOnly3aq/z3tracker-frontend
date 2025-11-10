"use client";

import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();

  // Get the current country code based on locale
  const getCurrentCountryCode = () => {
    return locale === "en" ? "GB" : "NL";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-white/5 transition-colors flex items-center justify-center focus:outline-none focus:ring-0"
          aria-label={t("common.language")}
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <ReactCountryFlag
            countryCode={getCurrentCountryCode()}
            svg
            style={{
              width: "16px",
              height: "16px",
            }}
            title={locale === "en" ? "English" : "Nederlands"}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 glass-effect border border-white/10"
      >
        <DropdownMenuItem
          onClick={() => setLocale("nl")}
          className={`cursor-pointer ${
            locale === "nl"
              ? "bg-red-500/20 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode="NL"
              svg
              style={{
                width: "14px",
                height: "14px",
              }}
              title="Nederlands"
            />
            {t("language.dutch")}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`cursor-pointer ${
            locale === "en"
              ? "bg-red-500/20 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode="GB"
              svg
              style={{
                width: "14px",
                height: "14px",
              }}
              title="English"
            />
            {t("language.english")}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
