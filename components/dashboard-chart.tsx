"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Activity,
  AlertCircle,
  RefreshCw,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ChartData {
  date: string;
  count: number;
  originalDate: string;
  displayDate?: string;
}

interface DailyDifference {
  date: string;
  changes?: {
    added?: string[] | string;
    removed?: string[] | string;
  };
  totalChanges?: number;
}

type DataSource = "monthly" | "daily";

/**
 * Dashboard chart component that displays car registration statistics
 * Supports both monthly and daily data views with pagination for daily data
 */
export default function DashboardChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [dataSource, setDataSource] = useState<DataSource>("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyDifferences, setDailyDifferences] = useState<DailyDifference[]>(
    []
  );
  const [allData, setAllData] = useState<ChartData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  const { t } = useLanguage();
  const selectedCar = "Z3";

  const extractArrayFromResponse = (rawData: any): any[] => {
    if (Array.isArray(rawData)) return rawData;
    if (rawData && typeof rawData === "object") {
      const keys = [
        "data",
        "result",
        "results",
        "items",
        "records",
        "response",
      ];
      for (const key of keys) {
        if (Array.isArray(rawData[key])) return rawData[key];
      }
    }
    return [];
  };

  const extractField = (
    item: any,
    fields: string[],
    fallback: any = null,
    isNumeric = false
  ) => {
    for (const field of fields) {
      if (item[field] !== undefined && item[field] !== null) {
        return isNumeric ? Number(item[field]) || 0 : String(item[field]);
      }
    }
    return fallback;
  };

  const formatDateForDisplay = useCallback(
    (dateStr: string, source: DataSource): string => {
      try {
        const date = new Date(dateStr);
        const month = date
          .toLocaleString("en", { month: "short" })
          .toLowerCase();
        return source === "daily" ? `${date.getDate()} ${month}` : month;
      } catch {
        return dateStr;
      }
    },
    []
  );

  const fetchChartData = useCallback(
    async (source: DataSource) => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = source === "daily" ? "daily-count" : "monthly-count";
        const response = await fetch(
          `/api/cars/${selectedCar}/stats/${endpoint}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const rawData = await response.json();
        const dataArray = extractArrayFromResponse(rawData);

        if (dataArray.length === 0) {
          setChartData([]);
          setError("No data available from API");
          return;
        }

        const formattedData: ChartData[] = dataArray.map(
          (item: any, index: number) => {
            const date = extractField(
              item,
              [
                "date",
                "month",
                "day",
                "period",
                "time",
                "timestamp",
                "_id",
                "id",
              ],
              `Entry ${index + 1}`
            );
            const count = extractField(
              item,
              ["count", "total", "value", "amount", "quantity", "number"],
              0,
              true
            );
            return { date, count, originalDate: date };
          }
        );

        let filteredData = formattedData
          .map((item) => ({
            ...item,
            originalDate: item.originalDate || item.date,
            displayDate: formatDateForDisplay(item.date, source),
          }))
          .filter((item) => {
            if (source === "daily") {
              const itemDate = new Date(item.originalDate);
              return !isNaN(itemDate.getTime());
            }
            return true;
          })
          .sort(
            (a, b) =>
              new Date(a.originalDate).getTime() -
              new Date(b.originalDate).getTime()
          );

        if (source === "monthly") {
          filteredData = filteredData.slice(-12);
        }

        setAllData(filteredData);
        setCurrentPage(
          source === "daily"
            ? Math.max(0, Math.ceil(filteredData.length / itemsPerPage) - 1)
            : 0
        );
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch data"
        );
        setChartData([]);
      } finally {
        setLoading(false);
      }
    },
    [formatDateForDisplay, selectedCar, itemsPerPage]
  );

  const fetchDailyDifferences = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/cars/${selectedCar}/stats/daily-differences`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) return;
      const data = await response.json();
      setDailyDifferences(
        Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []
      );
    } catch {
      setDailyDifferences([]);
    }
  }, [selectedCar]);

  useEffect(() => {
    fetchChartData(dataSource);
  }, [dataSource, fetchChartData]);

  const paginatedData = useMemo(() => {
    if (allData.length === 0) return [];
    const startIndex = currentPage * itemsPerPage;
    return allData.slice(startIndex, startIndex + itemsPerPage).map((item) => ({
      date: item.displayDate!,
      count: item.count,
      originalDate: item.originalDate,
    }));
  }, [allData, currentPage, itemsPerPage]);

  useEffect(() => {
    setChartData(paginatedData);
    if (paginatedData.length > 0) {
      fetchDailyDifferences();
    }
  }, [paginatedData, fetchDailyDifferences]);

  const totalPages = useMemo(
    () => Math.ceil(allData.length / itemsPerPage),
    [allData.length, itemsPerPage]
  );

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  const getDifferencesByDate = useCallback(
    (formattedDate: string) => {
      if (!dailyDifferences.length) return null;
      const matchingEntry = dailyDifferences.find((item) => {
        const itemDateStr = new Date(item.date).toISOString().split("T")[0];
        return itemDateStr === formattedDate;
      });
      if (!matchingEntry?.changes) return null;
      const { changes } = matchingEntry;
      return {
        added: Array.isArray(changes.added)
          ? changes.added
          : changes.added
          ? [changes.added]
          : [],
        removed: Array.isArray(changes.removed)
          ? changes.removed
          : changes.removed
          ? [changes.removed]
          : [],
        totalChanges: matchingEntry.totalChanges || 0,
      };
    },
    [dailyDifferences]
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload?: ChartData }>;
    label?: string;
  }) => {
    if (!active || !payload?.length || typeof label !== "string") return null;
    const dateForLookup = payload[0]?.payload?.originalDate || label;
    const differences = getDifferencesByDate(dateForLookup);
    return (
      <div className="rounded-xl p-3 !z-50 shadow-2xl border border-white/10 bg-white/30 max-w-xs backdrop-blur-md backdrop-saturate-150">
        <h1 className="text-white font-medium text-sm mb-1">
          {dataSource === "daily" ? t("dashboard.day") : t("dashboard.month")}:{" "}
          {label}
        </h1>
        <p className="text-blue-400 font-semibold text-sm mb-1">
          {t("dashboard.count")}: {payload[0].value}
        </p>
        {differences && differences.totalChanges > 0 && (
          <div className="text-xs text-gray-400 mt-1">
            <span className="block">{t("dashboard.differences")}:</span>
            <span className="block">
              {t("dashboard.added")}: {differences.added.length}
            </span>
            <span className="block">
              {t("dashboard.removed")}: {differences.removed.length}
            </span>
            <span className="block">
              {t("dashboard.totalChanges")}: {differences.totalChanges}
            </span>
          </div>
        )}
      </div>
    );
  };

  const handleRetry = useCallback(() => {
    fetchChartData(dataSource);
  }, [dataSource, fetchChartData]);

  return (
    <Card className="card-gradient hover-lift prevent-shift">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-white text-lg sm:text-xl">
                {t("dashboard.carStatistics")}
              </CardTitle>
              <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">
                  {dataSource === "daily"
                    ? `${chartData.length} ${t("dashboard.entries")} (${t(
                        "dashboard.page"
                      )} ${currentPage + 1} ${t("dashboard.of")} ${totalPages})`
                    : t("dashboard.lastMonths")}{" "}
                  {t("dashboard.registrationData")}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-row sm:items-center sm:justify-between space-x-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2 sm:order-1 order-1 w-full max-w-xs">
                <div className="sm:hidden w-full">
                  <div className="relative">
                    <select
                      value={dataSource}
                      onChange={(e) =>
                        setDataSource(e.target.value as DataSource)
                      }
                      className="w-full h-11 rounded-sm appearance-none bg-transparent text-gray-300 text-sm border border-white/20 pl-3 pr-8 py-2 glass-effect focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      aria-label={t("dashboard.selectDataSource")}
                    >
                      <option value="monthly">{t("dashboard.monthly")}</option>
                      <option value="daily">{t("dashboard.daily")}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center space-x-1">
                  <button
                    onClick={() => setDataSource("monthly")}
                    className={`flex items-center justify-center px-3 py-2 glass-effect rounded-lg transition-colors text-sm ${
                      dataSource === "monthly"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "hover:bg-white/5 text-gray-400 border border-white/10"
                    }`}
                    aria-pressed={dataSource === "monthly"}
                    title={t("dashboard.showMonthlyData")}
                  >
                    {t("dashboard.monthly")}
                  </button>
                  <button
                    onClick={() => setDataSource("daily")}
                    className={`flex items-center justify-center px-3 py-2 glass-effect rounded-lg transition-colors text-sm ${
                      dataSource === "daily"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "hover:bg-white/5 text-gray-400 border border-white/10"
                    }`}
                    aria-pressed={dataSource === "daily"}
                    title={t("dashboard.showDailyData")}
                  >
                    {t("dashboard.daily")}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-3 sm:order-2 order-2">
                <div className="hidden sm:flex items-center space-x-2">
                  <button
                    onClick={handleRetry}
                    className="flex h-10 items-center justify-center p-2 glass-effect rounded-sm hover:bg-white/5 transition-colors"
                    title={t("dashboard.refreshData")}
                  >
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                {dataSource === "daily" && allData.length > itemsPerPage && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 0}
                      className="flex items-center justify-center p-2 glass-effect rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t("dashboard.previousPage")}
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="inline-flex items-center text-xs text-gray-400 whitespace-nowrap">
                      {currentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage >= totalPages - 1}
                      className="flex items-center justify-center p-2 glass-effect rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t("dashboard.nextPage")}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 !px-0">
        <div className="h-64 sm:h-80 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 border-blue-500/30"></div>
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 border-blue-500 border-t-transparent absolute top-0"></div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-2 text-sm sm:text-base">
                  {t("dashboard.apiConnectionIssue")}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 max-w-xs">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="px-3 py-2 sm:px-4 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-xs sm:text-sm"
                >
                  {t("dashboard.retryConnection")}
                </button>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Activity className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm sm:text-base">
                  {t("dashboard.noDataAvailable")}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {t("dashboard.checkApiConnection")}
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={200}
                data={chartData}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="20%" stopColor="#0166B1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0166B1" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#2a2a2aff" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 10", "dataMax + 1"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#0166B1"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
