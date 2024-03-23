# Learn Authentication Complete Features

## Features

-   [x] Login
-   [x] Register
-   [x] Forgot Password
-   [x] Reset Password
-   [x] Change Profile Data
-   [x] Github OAuth
-   [x] Google OAuth
-   [x] Email Verification

## Auth Important Links

-   callbackUrl: http://localhost:3000/api/auth/callback/[provider]
-   signinUrl: http://localhost:3000/api/auth/signin/[provider]

## Google OAuth

-   [Google Console](https://console.developers.google.com/)
-   open console, create project, and go to OAuth consent screen, create app-name, and add email, and save
-   go to credentials, create credentials, OAuth client ID, web application
-   add http://localhost:3000 to authorized javascript origins
-   add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
-   copy client id and client secret

## Shadcn package

-   npx shadcn-ui@latest init

```text
   will generate some packages
   (clsx, class-variance-authority, @radix-ui/react-icons, tailwind-merge, tailwindcss-animate)
```

-   npx shadcn-ui@latest add [component]

```text
- example button, automatically add `@radix-ui/react-slot` package
- card `not adding package`
- form `react-hook-form, zod, @hookform/resolvers, @radix-ui/react-label` package
- input `-nothing adding` package
```

## DB package & Auth package

-   [prisma] - pnpm add -D prisma@latest, add @prisma/client@latest (https://www.prisma.io/)
-   [@auth/prisma-adapter] - pnpm add @auth/prisma-adapter (https://www.npmjs.com/package/@auth/prisma-adapter)
-   [next-auth] v5 beta - pnpm add next-auth@beta (https://authjs.dev/)
    ```text
    - npx auth secret (to generate auth secret)
    - create middleware.ts, auth.ts, and auth.config.ts (root folder)
    - create route.ts (root folder)
    ```

```text
- create db.ts and add prisma client ("./lib/db.ts")
- npx prisma init
- create db in neon `https://console.neon.tech/app/welcome`
- add .env file and add DATABASE_URL
- "db:generate": "npx prisma generate",
- "db:migrate": "npx prisma migrate dev"
if needed
- "db:studio": "npx prisma studio"
```

## Resend Package Email

-   create a new account in Resend using email
-   open docs and choose nextjs quick start
-   install `Resend package` in the project (pnpm add resend)
-   create mail.ts in lib folder and add the following code

## General Packages

-   [react-icons] - pnpm add react-icons (https://react-icons.github.io/react-icons/)
-   [bcryptjs] - pnpm add bcryptjs (https://www.npmjs.com/package/bcryptjs)
-   [@types/bcryptjs] - pnpm add -D @types/bcryptjs (https://www.npmjs.com/package/@types/bcryptjs)
-   [winston] - pnpm add winston (https://www.npmjs.com/package/winston)
-   [uuid] - pnpm add uuid (https://www.npmjs.com/package/uuid)
-   [@types/uuid] - pnpm add -D @types/uuid (https://www.npmjs.com/package/@types/uuid)
-   [react-spinners] - pnpm add react-spinners (https://www.npmjs.com/package/react-spinners)
