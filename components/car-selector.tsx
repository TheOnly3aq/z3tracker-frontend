"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { Car } from "lucide-react";
import type {LucideIcon} from "lucide-react";

type CarOption = {
    id: string;
    label: string;
    icon: LucideIcon;
};

const cars: CarOption[] = [{ id: "is250c", label: "IS 250C", icon: Car }];

export default function CarSelector() {
    const [mounted, setMounted] = useState(false);
    const [selectedCar, setSelectedCar] = useState<string>("is250c");

    useEffect(() => {
        const cookieValue = Cookies.get("selectedCar");
        if (cookieValue && cars.some(c => c.id === cookieValue)) {
            setSelectedCar(cookieValue);
        }
        setMounted(true);
    }, []);

    const selectedOption = cars.find(c => c.id === selectedCar) ?? cars[0];
    const selectedLabel = selectedOption?.label ?? "IS 250C";

    const handleSelect = (carId: string) => {
        Cookies.set("selectedCar", carId, {expires: 365, path: "/"});
        setSelectedCar(carId);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center h-10 w-10 justify-center p-2 glass-effect rounded-sm hover:bg-white/5 transition-colors"
                    aria-label={`Select car (${mounted ? selectedLabel : "Loading"})`}
                    style={{outline: "none", boxShadow: "none"}}
                >
                    {mounted ? (
                        <selectedOption.icon className="w-4 h-4 text-red-400"/>
                    ) : (
                        <Car className="w-4 h-4 text-gray-400"/>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-40 glass-effect border border-white/10"
            >
                {cars.map((car) => (
                    <DropdownMenuItem
                        key={car.id}
                        onClick={() => handleSelect(car.id)}
                        className={`cursor-pointer ${
                            selectedCar === car.id
                                ? "bg-red-500/20 text-white"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <car.icon className="w-4 h-4 text-red-400"/>
                            {car.label}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}