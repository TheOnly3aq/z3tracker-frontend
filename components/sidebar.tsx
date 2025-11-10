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
                        <Menu size={20}/>
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
                                <X size={20}/>
                            </button>
                        )}
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-8 h-8 bg-gradient-to-br ml-4 from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                <div className="bg-red-700 rounded-sm p-1 flex items-center justify-center w-8 h-8">
                                    <svg fill="#fff" viewBox="0 0 612 612" width="24" height="24">
                                        <g>
                                            <path
                                                d="M306,522.4c101.3,0,191.2-35.4,246.9-89.9l-50.2,0.2c-47.4,39.9-116.8,65-195.4,65c-146.7,0-261.1-87.4-261.1-195.2
                c0-124.4,114.5-195.2,261.1-195.2c9.3,0,16.8,4.3,11.2,12.4C288,156.4,201.2,274.5,185.4,300.1c-31.2,50.4-30.5,112.5,46,116.9H553
                c16.4,0,20.6-7.7,26.5-15.7c21.5-29.1,32.5-63.2,32.4-98.7c-0.1-92.7-65.3-162.1-161.2-196.3l-14.8,22.2
                c79.7,29.4,132.4,88.9,132.4,174.1c0,14.8-2.2,29.2-6.3,43.1c-3.6,12-10.5,22.2-23.7,22.2H281.7c-32.9,0-20.2-33.9-8-50.4
                c17.7-31.7,114.4-163.5,137.7-188.1c5.9-9,22.6-27.7-0.4-34.8c-32.7-7.8-68.1-11.8-105-11.8C137,82.7,0.1,169.5,0,302.5
                C-0.1,436.8,137,522.4,306,522.4L306,522.4z"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Lexus Tracker
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
                                            ? "bg-gradient-to-r from-red-500/20 to-red-600/20 text-white border border-red-500/30 glow-red"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                                    style={{animationDelay: `${index * 100}ms`}}
                                >
                                    <item.icon
                                        className={`w-5 h-5 mr-3 transition-colors ${
                                            isActive
                                                ? "text-red-400"
                                                : "text-gray-400 group-hover:text-white"
                                        }`}
                                    />
                                    {t(item.name)}
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
                                    )}
                                </LocalizedLink>
                            );
                        })}
                    </nav>
                    <div className="px-4 pb-4 border-t border-white/10">
                        <div className="flex items-center gap-1">
                            <LanguageSelector/>
                            <span className="text-xs text-gray-500">
                V2.3 • Made by KT
              </span>
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
