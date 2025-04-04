import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/polygon", request.url));
  }

  const validPaths = ["polygon", "bsc"];
  if (!validPaths.includes(pathname.split(`/`)[1])) {
    console.log("entrou", pathname, pathname.split(`/`));
    return NextResponse.redirect(new URL("/polygon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|update.xml|service-worker.js|firebase-messaging-sw.js|robots.txt|sitemap.xml|ads.txt).*)",
  ],
};
