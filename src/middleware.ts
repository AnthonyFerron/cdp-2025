import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);

  // Liste des routes publiques accessibles sans connexion
  const publicRoutes = [
    "/",
    "/accueil",
    "/sign-in",
    "/sign-up",
    "/reset",
    "/reset-password",
    "/cgi",
    "/cgu",
    "/rgpd",
    "/confidentialite",
  ];

  const { pathname } = req.nextUrl;

  // Si la route est publique, laisser passer
  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    return NextResponse.next();
  }

  // Pour les routes protégées, vérifier la session
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - backend/api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!backend/api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)",
  ],
};
