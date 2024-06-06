# Learn Authentication Complete Features

Implementation of authentication with complete features using Next.js, Prisma, and Next-Auth. Auth.js v5 beta is used for authentication. The project includes features such as login, register, forgot password, reset password, change profile data, Github OAuth, Google OAuth, and email verification.

<img width="1440" alt="next-auth" src="https://github.com/nuhptr/authentication-full-cwa/assets/50306963/a08cacc3-4f43-4a18-aafb-381f3f647355">

## Features

This project includes the following features:

-  [x] Login
-  [x] Register
-  [x] Forgot Password
-  [x] Reset Password
-  [x] Change Profile Data
-  [x] Github OAuth
-  [x] Google OAuth
-  [x] Email Verification

## General Packages

Packages that are used in the project:

-  [bcryptjs](https://www.npmjs.com/package/bcryptjs) - `bun add bcryptjs` - for hashing password
-  [@types/bcryptjs](https://www.npmjs.com/package/@types/bcryptjs) - `bun add -D @types/bcryptjs` - for typescript
-  [uuid](https://www.npmjs.com/package/uuid) - `bun add uuid` - for generating unique id
-  [@types/uuid](https://www.npmjs.com/package/@types/uuid) - `bun add -D @types/uuid` - for typescript
-  [react-icons](https://react-icons.github.io/react-icons/) - `bun add react-icons` - for icons
-  [winston](https://www.npmjs.com/package/winston) - `bun add winston` - for logging
-  [react-spinners](https://www.npmjs.com/package/react-spinners) -` bun add react-spinners` - for loading spinner
-  [crypto] (https://nodejs.org/api/crypto.html) - // built-in package, no need to install - for generating random token

## Auth Callbacks Links

```bash
callbackUrl: http://localhost:3000/api/auth/callback/[provider]
signinUrl: http://localhost:3000/api/auth/signin/[provider]
```

## Google OAuth

How to set up Google OAuth:

```bash
-  [Google Console](https://console.developers.google.com/)
-  open the console, create a project, go to the OAuth consent screen, create app-name, add email, and save
-  go to credentials, create credentials, OAuth client ID, web application
-  add http://localhost:3000 to authorized javascript origins
-  add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
-  copy client ID and client secret
```

## ShadcnUI

### Setup

Type `npx shadcn-ui@latest init`

Will generate some packages after the installation

-  `clsx`
-  `class-variance-authority`
-  `@radix-ui/react-icons`
-  `tailwind-merge`
-  `tailwindcss-animate`

Then add some component using: `npx shadcn-ui@latest add [component]`

When you add a component, it will add some packages related to the component

```bash
1. npx shadcn-ui@latest add button
added @radix-ui/react-slot
2. npx shadcn-ui@latest add form
added react-hook-form, zod, @hookform/resolvers, @radix-ui/react-label
3. npx shadcn-ui@latest add dropdown-menu
added @radix-ui/react-dropdown-menu
4. npx shadcn-ui@latest add react-avatar
added @radix-ui/react-avatar
5. npx shadcn-ui@latest add sooner
added next-themes & sooner
6. npx shadcn-ui@latest add switch
added @radix-ui/react-switch
7. npx shadcn-ui@latest add select
added @radix-ui/react-select
8. npx shadcn-ui@latest add dialog
added @radix-ui/react-dialog
9. npx shadcn-ui@latest add input
-nothing added
10. npx shadcn-ui@latest add badge
-nothing added
11. npx shadcn-ui@latest add card
-nothing added
```

## DB package & Auth package

Install prisma

-  [prisma](https://www.prisma.io/) - `bun add -D prisma@latest`,
-  [@auth/prisma-adapter](https://www.npmjs.com/package/@auth/prisma-adapter) - `bun add @auth/prisma-adapter`
-  [next-auth](https://authjs.dev/) v5 beta -` bun add next-auth@beta`

Then initialize prisma

-  `npx prisma init`

Automatically install packages

-  `@prisma/client@latest`
-  create `db.ts` and call `prisma client` package ("./lib/db.ts")

In .env file, add the following:

```bash
DATABASE_URL="your_db_url"
AUTH_SECRET="" // generate secret using **npx auth secret**
```

Create `middleware.ts`, `auth.ts`, and `auth.config.ts` (root folder)
Create `routes.ts` (root folder) for `auth routes` and `public routes`
Create database name in neon postgresql `https://console.neon.tech/app/welcome`

Then add scripts in package.json :

-  `"postinstall": "prisma generate"`
-  `"db:generate": "npx prisma generate"`
-  `"db:migrate": "npx prisma migrate dev"`
-  `"db:studio": "npx prisma studio"`

If you want to use the `auth` function in the layout, you can use the following code:

```typescript
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

## Resend Package Email

Create a new account in Resend using email

Open official documentations and choose `Next` quick start
Link: [Resend](https://resend.io/)

Install `Resend package` in the project
`bun add resend`

Create `mail.ts` in `lib` folder and add the following code

```typescript
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.RESEND_DOMAIN

// other code
```
