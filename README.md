# Learn Authentication Complete Features

<img width="1440" alt="next-auth" src="https://github.com/nuhptr/authentication-full-cwa/assets/50306963/a08cacc3-4f43-4a18-aafb-381f3f647355">

## Features

-  [x] Login
-  [x] Register
-  [x] Forgot Password
-  [x] Reset Password
-  [x] Change Profile Data
-  [x] Github OAuth
-  [x] Google OAuth
-  [x] Email Verification

## Auth Important Links

-  callbackUrl: http://localhost:3000/api/auth/callback/[provider]
-  signinUrl: http://localhost:3000/api/auth/signin/[provider]

## Google OAuth

-  [Google Console](https://console.developers.google.com/)
-  open the console, create a project, go to the OAuth consent screen, create app-name, add email, and save
-  go to credentials, create credentials, OAuth client ID, web application
-  add http://localhost:3000 to authorized javascript origins
-  add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
-  copy client ID and client secret

## Shadcn package

-  npx shadcn-ui@latest init

```text
   will generate some packages
   (clsx, class-variance-authority, @radix-ui/react-icons, tailwind-merge, tailwindcss-animate)
```

-  npx shadcn-ui@latest add [component]

```text
- example button, automatically adding `@radix-ui/react-slot` package
- card `-nothing adding package`
- form `adding react-hook-form, zod, @hookform/resolvers, @radix-ui/react-label` package
- input `-nothing adding` package
- dropdwon-menu `@radix-ui/react-dropdown-menu` package
- avatar `adding @radix-ui/react-avatar` package
- badge `-nothing adding` package
- sooner `adding next-themes & sooner` package
- switch `adding @radix-ui/react-switch` package
- select `adding @radix-ui/react-select` package
- dialog `adding @radix-ui/react-dialog` package
```

## DB package & Auth package

-  [prisma] - pnpm add -D prisma@latest, add @prisma/client@latest (https://www.prisma.io/)
-  [@auth/prisma-adapter] - pnpm add @auth/prisma-adapter (https://www.npmjs.com/package/@auth/prisma-adapter)
-  [next-auth] v5 beta - pnpm add next-auth@beta (https://authjs.dev/)
   ```text
   - npx auth secret (to generate auth secret) => add to .env file (AUTH_SECRET)
   - create middleware.ts, auth.ts, and auth.config.ts (root folder)
   - create routes.ts (root folder) for auth routes and public routes
   ```
-  ```ts
   // layout.tsx (root folder)
   import { auth } from "@/auth"

   const session = await auth()

   return (
      <SessionProvider session={session}>
         <html lang="en">
            <body className={inter.className}>{children}</body>
         </html>
      </SessionProvider>
   )
   ```

```text
- create db.ts and add prisma client ("./lib/db.ts")
- npx prisma init
- create db in neon `https://console.neon.tech/app/welcome`
- add .env file and add DATABASE_URL
- add scripts in package.json ("postinstall": "prisma generate",)
- "db:generate": "npx prisma generate",
- "db:migrate": "npx prisma migrate dev"
---if needed
- "db:studio": "npx prisma studio"
```

## Resend Package Email

-  create a new account in Resend using email
-  open docs and choose nextjs quick start
-  install `Resend package` in the project (pnpm add resend)
-  create mail.ts in lib folder and add the following code

## General Packages

-  [react-icons] - bun add react-icons (https://react-icons.github.io/react-icons/)
-  [bcryptjs] - bun add bcryptjs (https://www.npmjs.com/package/bcryptjs)
-  [@types/bcryptjs] - bun add -D @types/bcryptjs (https://www.npmjs.com/package/@types/bcryptjs)
-  [winston] - bun add winston (https://www.npmjs.com/package/winston)
-  [uuid] - bun add uuid (https://www.npmjs.com/package/uuid)
-  [@types/uuid] - bun add -D @types/uuid (https://www.npmjs.com/package/@types/uuid)
-  [react-spinners] - bun add react-spinners (https://www.npmjs.com/package/react-spinners)
-  [crypto] - bun add crypto (https://nodejs.org/api/crypto.html) // built-in package, no need to install
