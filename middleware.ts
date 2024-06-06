import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
   const { nextUrl } = req
   const isLoggedIn = !!req.auth // !!req.auth means if req.auth is not null, then isLoggedIn is true

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
   const isAuthRoute = authRoutes.includes(nextUrl.pathname)

   if (isApiAuthRoute) return

   // if the route is an auth route and the user is logged in, redirect to /settings
   if (isAuthRoute) {
      if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      return
   }

   if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname

      if (nextUrl.search) callbackUrl += nextUrl.search
      const encodedCallbackUrl = encodeURIComponent(callbackUrl) // encode url to URI format

      return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
   }
})
