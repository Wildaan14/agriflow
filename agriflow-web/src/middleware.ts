import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/auth/login(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // If user is not on a public route and not signed in via Clerk/Cookie, redirect to login
  const { userId } = await auth();
  const demoRole = req.cookies.get('agriflow_role')?.value;

  if (!isPublicRoute(req) && !userId && !demoRole) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
