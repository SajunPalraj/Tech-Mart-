import { clerkMiddleware } from "@clerk/nextjs/server";

export const config = {
  matcher: [
    // Skip Next.js internals and all static assets, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(API|api|trpc)(.*)',
  ],
};

const clerkHandler = clerkMiddleware(async (auth, request) => {
  // Define pages that unauthenticated users can see
  const isPublicRoute = (req) => {
    const path = req.nextUrl.pathname;
    
    // Explicit list of public base paths
    if (
      path === '/' ||
      path === '/login' ||
      path === '/register' ||
      path === '/forgot-password' ||
      path === '/reset-password' ||
      path === '/sso-callback' ||
      path.startsWith('/products') ||
      path.startsWith('/wishlist')
    ) {
      return true;
    }
    
    // Wildcard paths for standard content and APIs
    if (path.startsWith('/page/')) return true;
    if (path.startsWith('/API/')) return true;
    if (path.startsWith('/api/webhooks')) return true;
    
    return false;
  };

  if (!isPublicRoute(request)) {
    await auth.protect(); // Protects only private user routes like /profile
  }
});

// Next.js 16 export for proxy routing
export function proxy(request, event) {
  return clerkHandler(request, event);
}

export default function defaultProxy(request, event) {
  return clerkHandler(request, event);
}
