import { auth as middleware } from "@/auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  adminRoute
} from "./routes/routes";

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);

  /**
   * Checks if the given path matches any public routes, including dynamic ones.
   * @param {string} path - The current route path.
   * @returns {boolean} - True if the route is public.
   */
  const isPublicRoute = (path) => {
    if (publicRoutes.includes(path)) return true;

    // Check for dynamic routes
    const dynamicProductRoutePattern = /^\/product\/[a-zA-Z0-9_-]+$/; // Matches /product/:id
    return dynamicProductRoutePattern.test(path);
  };

  const isPublicRouteMatched = isPublicRoute(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined; // No actions for this route
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRouteMatched) {
    if (isAdminRoute) {
      return Response.redirect(new URL('/auth/adminLogin', nextUrl));
    }
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
