import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Don't modify API routes, static files, or Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Get language from URL parameter
  const lang = url.searchParams.get("lng");

  // If no language parameter is set, check for stored preference in cookies
  if (!lang) {
    const storedLang = request.cookies.get("preferred-language")?.value;

    // If user had English preference, redirect to English version
    if (storedLang === "en") {
      url.searchParams.set("lng", "en");
      return NextResponse.redirect(url);
    }
  }

  // Set language cookie to remember preference
  const response = NextResponse.next();
  if (lang === "en") {
    response.cookies.set("preferred-language", "en", {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } else {
    response.cookies.set("preferred-language", "nl", {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
