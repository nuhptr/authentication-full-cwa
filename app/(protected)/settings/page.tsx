"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"

import { SettingsModel } from "@/app/model/auth-model"
import { settings } from "@/app/actions/settings"
import { useCurrentUser } from "@/app/hooks/use-current-user"

import { Switch } from "@/components/ui/switch"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import {
   Form,
   FormField,
   FormControl,
   FormItem,
   FormLabel,
   FormMessage,
   FormDescription,
} from "@/components/ui/form"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormSuccess } from "@/components/FormSuccess"
import { FormError } from "@/components/FormError"
import { FormFields } from "@/components/form/Form"

export default function SettingsPage() {
   const user = useCurrentUser()
   const { update } = useSession()

   const [error, setError] = useState<string | undefined>()
   const [success, setSuccess] = useState<string | undefined>()
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof SettingsModel>>({
      resolver: zodResolver(SettingsModel),
      defaultValues: {
         name: user?.name || "",
         email: user?.email || "",
         password: undefined,
         newPassword: undefined,
         role: user?.role || undefined,
         isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      },
   })

   const handleOnSubmit = async (data: z.infer<typeof SettingsModel>) => {
      startTransition(() => {
         settings(data)
            .then((result) => {
               if (result.error) setError(result.error)

               if (result.success) {
                  update()
                  setSuccess(result.success)
               }
            })
            .catch(() => {
               setError("An error occurred while updating your settings. Please try again later.")
            })
      })
   }

   return (
      <Card className="w-[600px]">
         <CardHeader>
            <p className="text-2xl font-semibold text-center">** Settings</p>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
                  <div className="space-y-4">
                     <FormFields
                        control={form.control}
                        name="name"
                        title="Name"
                        placeholder="Jhon Doe"
                        disabled={isPending}
                     />

                     {/* If user using social media account this field is hidden */}
                     {user?.isOAuth === false && (
                        <>
                           <FormFields
                              control={form.control}
                              name="email"
                              title="Email"
                              type="email"
                              placeholder="jhondoe@gmail.com"
                              disabled={isPending}
                           />
                           <FormFields
                              control={form.control}
                              name="password"
                              title="Password"
                              placeholder="*******"
                              type="password"
                              disabled={isPending}
                           />
                           <FormFields
                              control={form.control}
                              name="newPassword"
                              title="New Password"
                              placeholder="*******"
                              type="password"
                              disabled={isPending}
                           />
                        </>
                     )}

                     <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select
                                 disabled={isPending}
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select a Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value={UserRole.USER}>User</SelectItem>
                                       <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                    </SelectContent>
                                 </FormControl>
                              </Select>

                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* If user using social media account hidden this field */}
                     {user?.isOAuth === false && (
                        <FormField
                           control={form.control}
                           name="isTwoFactorEnabled"
                           render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                                 <div className="space-y-0.5">
                                    <FormLabel>Two Factor Authentication</FormLabel>
                                    <FormDescription>
                                       Enable two-factor authentication for your account.
                                    </FormDescription>
                                 </div>
                                 <FormControl>
                                    <Switch
                                       checked={field.value}
                                       onChange={field.onChange}
                                       disabled={isPending}
                                    />
                                 </FormControl>
                              </FormItem>
                           )}
                        />
                     )}
                  </div>

                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button type="submit" disabled={isPending}>
                     Save
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
