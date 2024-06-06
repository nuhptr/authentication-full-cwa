import React, { FC } from "react"
import Link from "next/link"
import { Control } from "react-hook-form"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormType = {
   control: Control<any>
   name: string
   disabled: boolean
   title: string
   button?: boolean
   type?: InputProps["type"]
   placeholder?: string
}

export const FormFields: FC<FormType> = ({
   control,
   name,
   disabled,
   button,
   title,
   type,
   placeholder,
}) => {
   return (
      <FormField
         control={control}
         name={name}
         disabled={disabled}
         render={({ field }) => (
            <FormItem>
               <FormLabel htmlFor={name}>{title}</FormLabel>
               <FormControl>
                  <Input {...field} placeholder={placeholder} type={type} />
               </FormControl>
               {button && (
                  <Button
                     size="sm"
                     variant="link"
                     asChild
                     className="px-0 font-normal text-destructive"
                  >
                     <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
               )}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
