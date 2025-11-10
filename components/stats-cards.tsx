"use client"

import {useState, useEffect} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Car, Palette, Shield, Import, TrendingUp} from "lucide-react"
import {useLanguage} from "@/lib/i18n";

interface CarData {
    eerste_kleur: string
    wam_verzekerd: string
    datum_eerste_tenaamstelling_in_nederland: string
    datum_eerste_toelating: string
}

export default function StatsCards() {
    const {t} = useLanguage();
    const [stats, setStats] = useState({
        total: 0,
        sameColor: 0,
        insured: 0,
        imported: 0,
    });
    const [loading, setLoading] = useState(true);
    const selectedCar = "Z3";
    const url = `/api/cars/${selectedCar}/stats/rdw-data`;

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(url
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const allCars: CarData[] = data.data || data || [];

                const sameColorCars = allCars.filter(
                    (car) => car.eerste_kleur === "ROOD"
                );
                const insured = allCars.filter((car) => car.wam_verzekerd === "Ja");
                const imported = allCars.filter(
                    (car) =>
                        car.datum_eerste_tenaamstelling_in_nederland !==
                        car.datum_eerste_toelating
                );

                setStats({
                    total: allCars.length,
                    sameColor: sameColorCars.length,
                    insured: insured.length,
                    imported: imported.length,
                });
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [url]);

    const cards = [
        {
            title: t("stats.totalCars"),
            value: stats.total,
            icon: Car,
            gradient: "from-blue-500/20 to-blue-600/20",
            iconColor: "text-blue-400",
            borderColor: "border-blue-500/30",
        },
        {
            title: t("stats.redCars"),
            value: stats.sameColor,
            icon: Palette,
            gradient: "from-red-500/20 to-red-600/20",
            iconColor: "text-red-400",
            borderColor: "border-red-500/30",
        },
        {
            title: t("stats.insuredCars"),
            value: stats.insured,
            icon: Shield,
            gradient: "from-green-500/20 to-green-600/20",
            iconColor: "text-green-400",
            borderColor: "border-green-500/30",
        },
        {
            title: t("stats.importedCars"),
            value: stats.imported,
            icon: Import,
            gradient: "from-yellow-500/20 to-yellow-600/20",
            iconColor: "text-yellow-400",
            borderColor: "border-yellow-500/30",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    className="card-gradient hover-lift group cursor-pointer prevent-shift "
                    style={{
                        animationDelay: `${index * 150}ms`,
                        transform: "translate3d(0, 0, 0)",
                    }}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle
                            className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                            {card.title}
                        </CardTitle>
                        <div
                            className={`p-1.5 sm:p-2 bg-gradient-to-br ${card.gradient} rounded-lg border ${card.borderColor} group-hover:scale-110 transition-transform duration-300`}
                        >
                            <card.icon
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${card.iconColor}`}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex items-center space-x-2">
                            <div
                                className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors duration-300">
                                {loading ? (
                                    <div className="animate-pulse bg-gray-600 h-6 sm:h-8 w-12 sm:w-16 rounded"></div>
                                ) : (
                                    <span
                                        className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {card.value.toLocaleString()}
                  </span>
                                )}
                            </div>
                            <TrendingUp
                                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-green-400 transition-colors duration-300"/>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 transition-colors duration-300">
                            {loading ? t("common.loading") : t("stats.updatedNow")}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
