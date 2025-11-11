import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_ENDPOINTS = new Set([
  "daily-count",
  "monthly-count",
  "daily-differences",
  "rdw-data",
  "summary",
]);
const ALLOWED_CARS = new Set(["Z3"]);

export async function GET(
  req: Request,
  { params }: { params: { car: string; endpoint: string } }
) {
  noStore();

  try {
    const { car, endpoint } = params;

    if (!ALLOWED_ENDPOINTS.has(endpoint)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 400 });
    }

    if (!ALLOWED_CARS.has(car)) {
      return NextResponse.json({ error: "Car not available" }, { status: 400 });
    }

    const providedKey = req.headers.get("x-api-key") || "";
    const expectedKey = process.env.API_KEY || "";
    if (!expectedKey) {
      return NextResponse.json(
        { error: "API_KEY is not configured" },
        { status: 500 }
      );
    }

    const referer = req.headers.get("referer") || "";
    const host = req.headers.get("host") || "";
    let isSameOrigin = false;
    try {
      if (referer && host) {
        const refUrl = new URL(referer);
        isSameOrigin = refUrl.host === host;
      }
    } catch {
      isSameOrigin = false;
    }

    if (providedKey !== expectedKey && !isSameOrigin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const base = process.env.API_URL;
    if (!base) {
      return NextResponse.json(
        { error: "API_URL is not configured" },
        { status: 500 }
      );
    }

    const target = `${base.replace(/\/+$/, "")}/${encodeURIComponent(
      car
    )}/stats/${encodeURIComponent(endpoint)}`;
    const upstream = await fetch(target, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": expectedKey,
      },
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await upstream.json()
      : await upstream.text();

    const noCacheHeaders = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    };

    if (typeof body === "string") {
      return new NextResponse(body, {
        status: upstream.status,
        headers: {
          "content-type": contentType,
          ...noCacheHeaders,
        },
      });
    }

    return NextResponse.json(body, {
      status: upstream.status,
      headers: noCacheHeaders,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
