"use client";

import {useState, useEffect, useMemo} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
  SearchIcon,
  Database,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import CarDetailModal from "@/components/car-detail-modal";
import {KentekenCheck} from "rdw-kenteken-check";
import {useLanguage} from "@/lib/i18n";

interface CarData {
    kenteken: string;
    voertuigsoort: string;
    merk: string;
    handelsbenaming: string;
    eerste_kleur: string;
    tweede_kleur?: string;
    wam_verzekerd: string;
    datum_eerste_tenaamstelling_in_nederland: string;
    datum_eerste_toelating: string;
    aantal_zitplaatsen?: string;
    aantal_cilinders?: string;
    cilinderinhoud?: string;
    massa_ledig_voertuig?: string;
    toegestane_maximum_massa_voertuig?: string;
    vervaldatum_apk?: string;
    brandstof_omschrijving?: string;
    carrosserie?: string;
    co2_uitstoot_gecombineerd?: string;
    wltp_co2_uitstoot_gecombineerd?: string;
    gem_brandstofverbruik_gecombineerd?: string;
    aantal_deuren?: string;
    emissiecode_omschrijving?: string;

    [key: string]: any;
}

/**
 * Search component for finding and displaying BMW Z3 vehicles
 * @returns {JSX.Element} The search page component
 */
export default function Search() {
    const {t} = useLanguage();
    const [cars, setCars] = useState<CarData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedCarFromStorage = "Z3";
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredAndSortedCars = useMemo(() => {
      let filtered = cars;

      if (searchTerm) {
        filtered = cars.filter((car) =>
          Object.values(car).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      if (!sortColumn) return filtered;

      const sorted = [...filtered].sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        if (aValue === undefined || aValue === null) aValue = "";
        if (bValue === undefined || bValue === null) bValue = "";

        if (sortColumn === "datum_eerste_toelating") {
          const getYear = (dateString: string | undefined) => {
            if (!dateString) return 0;
            if (/^\d{8}$/.test(dateString)) {
              return parseInt(dateString.slice(0, 4));
            }
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? 0 : date.getFullYear();
          };
          const aYear = getYear(aValue);
          const bYear = getYear(bValue);
          if (aYear === 0) return 1;
          if (bYear === 0) return -1;
          const comparison = aYear - bYear;
          return sortDirection === "asc" ? comparison : -comparison;
        }

        if (sortColumn === "wam_verzekerd") {
          const aInsured = aValue === "Ja" ? 1 : 0;
          const bInsured = bValue === "Ja" ? 1 : 0;
          const comparison = aInsured - bInsured;
          return sortDirection === "asc" ? comparison : -comparison;
        }

        const aStr = aValue.toString().toLowerCase();
        const bStr = bValue.toString().toLowerCase();

        if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
        if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      return sorted;
    }, [searchTerm, cars, sortColumn, sortDirection]);

    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, sortColumn, sortDirection]);

    const totalPages = Math.max(
      1,
      Math.ceil(filteredAndSortedCars.length / itemsPerPage)
    );
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCars = filteredAndSortedCars.slice(startIndex, endIndex);

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    };

    const getSortIcon = (column: string) => {
      if (sortColumn !== column) {
        return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
      }
      return sortDirection === "asc" ? (
        <ArrowUp className="w-3 h-3 ml-1 text-blue-400" />
      ) : (
        <ArrowDown className="w-3 h-3 ml-1 text-blue-400" />
      );
    };
    const url = `/api/cars/${selectedCarFromStorage}/stats/rdw-data`;


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const allCars = data.data || data || [];
                setCars(allCars);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();

        document.title =
          "Vehicle Search - Find Any BMW Z3 in Netherlands Database | Z3 RADAR";

        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            "Search through comprehensive BMW Z3 database using official RDW data. Find vehicle registration details, insurance status, specifications, and complete history instantly."
          );
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          const currentKeywords = metaKeywords.getAttribute("content") || "";
          const additionalKeywords =
            ", BMW vehicle search, RDW database lookup, vehicle registration search, BMW Z3 finder, Netherlands car database, license plate lookup, BMW voertuig zoeken, RDW database opzoeken, voertuigregistratie zoeken, BMW Z3 vinder, Nederland auto database, kenteken opzoeken, auto zoeken Nederland, voertuiggegevens zoeken, auto database zoeken, voertuig geschiedenis zoeken, kenteken check, auto informatie zoeken, voertuig opzoeken Nederland, Nederlandse auto zoeken, RDW kenteken opzoeken, auto registratie zoeken, voertuig database Nederland, auto gegevens opzoeken, RDW gegevens zoeken";
          metaKeywords.setAttribute(
            "content",
            currentKeywords + additionalKeywords
          );
        }

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement("link");
          canonical.setAttribute("rel", "canonical");
          document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", "https://Z3radar.com/search");

        const searchScript = document.createElement("script");
        searchScript.type = "application/ld+json";
        searchScript.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Vehicle Search",
          description: "Search BMW Z3 database using official RDW data",
          url: "https://Z3radar.com/search",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://Z3radar.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          mainEntity: {
            "@type": "Dataset",
            name: "BMW Z3 Vehicle Database",
            description:
              "Comprehensive database of BMW Z3 vehicles in the Netherlands",
            url: "https://Z3radar.com/search",
            provider: {
              "@type": "Organization",
              name: "Z3 RADAR",
              url: "https://Z3radar.com",
            },
          },
        });
        document.head.appendChild(searchScript);

        return () => {
            if (document.head.contains(searchScript)) {
                document.head.removeChild(searchScript);
            }
        };
    }, [url]);

    const handleCarClick = (car: CarData) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "N/A";
        if (/^\d{8}$/.test(dateString)) {
            return dateString.slice(0, 4);
        }
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "N/A" : date.getFullYear().toString();
    };

    return (
      <div className="space-y-8">
        <div className="ml-12 lg:ml-0">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <SearchIcon className="w-8 h-8 text-blue-500" />
            {t("search.title")}
          </h1>
          <p className="text-gray-400 text-lg">{t("search.subtitle")}</p>
        </div>

        <Card className="card-gradient hover-lift prevent-shift">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                <Database className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-white text-lg sm:text-xl">
                  {t("search.carDatabase")}
                </CardTitle>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {t("search.databaseSubtitle")}
                </p>
              </div>
            </div>
            <div className="relative flex gap-2">
              <Input
                placeholder={t("search.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-effect border-white/10 text-white placeholder-gray-400 focus:border-blue-500/50 transition-all text-sm sm:text-base"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30"></div>
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent absolute top-0"></div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <Table className="table-responsive">
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                          <TableHead
                            className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => handleSort("kenteken")}
                          >
                            <div className="flex items-center">
                              {t("search.headers.license")}
                              {getSortIcon("kenteken")}
                            </div>
                          </TableHead>
                          <TableHead
                            className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 sm:table-cell cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => handleSort("handelsbenaming")}
                          >
                            <div className="flex items-center">
                              {t("search.headers.model")}
                              {getSortIcon("handelsbenaming")}
                            </div>
                          </TableHead>
                          <TableHead
                            className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 hidden md:table-cell cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => handleSort("eerste_kleur")}
                          >
                            <div className="flex items-center">
                              {t("search.headers.color")}
                              {getSortIcon("eerste_kleur")}
                            </div>
                          </TableHead>
                          <TableHead
                            className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => handleSort("wam_verzekerd")}
                          >
                            <div className="flex items-center">
                              {t("search.headers.insured")}
                              {getSortIcon("wam_verzekerd")}
                            </div>
                          </TableHead>
                          <TableHead
                            className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 hidden lg:table-cell cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => handleSort("datum_eerste_toelating")}
                          >
                            <div className="flex items-center">
                              {t("search.headers.buildyear")}
                              {getSortIcon("datum_eerste_toelating")}
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedCars.map((car, index) => {
                          const formattedLicensePlate = new KentekenCheck(
                            car.kenteken
                          ).formatLicense();
                          return (
                            <TableRow
                              key={`${car.kenteken}-${startIndex + index}`}
                              className="border-white/10 hover:bg-white/5 prevent-shift cursor-pointer group"
                              style={{
                                animationDelay: `${Math.min(
                                  (startIndex + index) * 20,
                                  1000
                                )}ms`,
                                transform: "translate3d(0, 0, 0)",
                              }}
                              onClick={() => handleCarClick(car)}
                            >
                              <TableCell className="text-white font-mono font-semibold group-hover:text-blue-400 transition-colors text-xs sm:text-sm px-3 sm:px-4">
                                {formattedLicensePlate}
                              </TableCell>
                              <TableCell className="text-gray-300 group-hover:text-white transition-colors text-xs sm:text-sm px-3 sm:px-4 sm:table-cell">
                                {car.handelsbenaming}
                              </TableCell>
                              <TableCell className="text-gray-300 group-hover:text-white transition-colors text-xs sm:text-sm px-3 sm:px-4 hidden md:table-cell">
                                {car.eerste_kleur}
                              </TableCell>
                              <TableCell className="text-gray-300 px-2 sm:px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                                    car.wam_verzekerd === "Ja"
                                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  }`}
                                >
                                  {car.wam_verzekerd === "Ja"
                                    ? t("search.yes")
                                    : t("search.no")}
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-300 group-hover:text-white transition-colors text-xs px-2 sm:px-4 hidden lg:table-cell">
                                {formatDate(car.datum_eerste_toelating)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-gray-400">
                    {filteredAndSortedCars.length === 0
                      ? t("search.noResults") ?? "No results"
                      : `Showing ${startIndex + 1}-${Math.min(
                          endIndex,
                          filteredAndSortedCars.length
                        )} of ${filteredAndSortedCars.length}`}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-xs sm:text-sm rounded-md glass-effect border border-white/10 hover:bg-white/5 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={safePage <= 1}
                      aria-label="Previous page"
                    >
                      Prev
                    </button>
                    <span className="text-xs sm:text-sm text-gray-400">
                      Page {safePage} of {totalPages}
                    </span>
                    <button
                      className="px-3 py-1.5 text-xs sm:text-sm rounded-md glass-effect border border-white/10 hover:bg-white/5 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={safePage >= totalPages}
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <CarDetailModal
          car={selectedCar}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
}
