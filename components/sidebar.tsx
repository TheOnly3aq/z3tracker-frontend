"use client";

import {usePathname} from "next/navigation";
import {BarChart3, Search, Camera, Info, Menu, X} from "lucide-react";
import {useState} from "react";
import {useLanguage} from "@/lib/i18n";
import LanguageSelector from "@/components/language-selector";
import LocalizedLink from "@/components/localized-link";

const navigation = [
    {name: "navigation.dashboard", href: "/", icon: BarChart3},
    {name: "navigation.search", href: "/search/", icon: Search},
    {name: "navigation.photos", href: "/photos/", icon: Camera},
    {name: "navigation.about", href: "/about/", icon: Info},
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {t} = useLanguage();

    const isPathActive = (href: string) => pathname === href;

    return (
      <>
        {!isMobileMenuOpen && (
          <div className="lg:hidden fixed top-4 left-2 z-50">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-3 rounded-xl glass-effect hover:bg-white/5 transition-all duration-300 hover-lift"
            >
              <Menu size={20} />
            </button>
          </div>
        )}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 glass-effect transform transition-all duration-500 ease-in-out lg:translate-x-0 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div
              className={`relative flex items-center justify-center h-20 px-4 border-b border-white/10 ${
                isMobileMenuOpen ? "pl-12" : ""
              }`}
            >
              {isMobileMenuOpen && (
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="lg:hidden absolute left-3  -translate-y-1/2 p-3 rounded-xl glass-effect hover:bg-white/5 transition-all duration-300 hover-lift"
                >
                  <X size={20} />
                </button>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 ml-4 flex items-center justify-center">
                  <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Z3 RADAR
                </h1>
              </div>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
              {navigation.map((item, index) => {
                const isActive = isPathActive(item.href);
                return (
                  <LocalizedLink
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover-lift ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-white border border-blue-500/30 glow-red"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    {t(item.name)}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </LocalizedLink>
                );
              })}
            </nav>
            <div className="px-4 pb-4 border-t border-white/10">
              <div className="flex items-center gap-1">
                <LanguageSelector />
                <span className="text-xs text-gray-500">V1.0 • Made by KT</span>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </>
    );
}
