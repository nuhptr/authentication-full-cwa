"use client"

import { logout } from "@/app/actions/logout"

type LogoutButtonType = {
   children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonType) => {
   function handleOnClick() {
      logout()
   }

   return (
      <span className="cursor-pointer" onClick={handleOnClick}>
         {children}
      </span>
   )
}
