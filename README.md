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

## Shadcn Library

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

## DB Library & Auth Library

-   [prisma] - pnpm add -D prisma, add @prisma/client (https://www.prisma.io/)
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
```

## General Library

-   [react-icons] - pnpm add react-icons (https://react-icons.github.io/react-icons/)
-   [bcryptjs] - pnpm add bcryptjs (https://www.npmjs.com/package/bcryptjs)
-   [@types/bcryptjs] - pnpm add -D @types/bcryptjs (https://www.npmjs.com/package/@types/bcryptjs)
-   [winston] - pnpm add winston (https://www.npmjs.com/package/winston)
