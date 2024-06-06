/**
 * Array of public routes that can be accessed without authentication
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"]

/**
 * Array of routes that require authentication
 */
export const authRoutes: string[] = [
   "/auth/login",
   "/auth/register",
   "/auth/error",
   "/auth/reset",
   "/auth/new-password",
]

/**
 * Prefix for all API routes
 */
export const apiAuthPrefix: string = "/api/auth"

/**
 * Default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"
