'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"
import { useOnClickOutside } from 'usehooks-ts'
import { useRef, useState } from 'react'

interface ILoginDiaglog {
  btnText: string,
  route: string
}

export default function LoginDialog({ btnText, route }: ILoginDiaglog) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null)

  const closeOpenDialog = () => {
    setOpen(!open);
  }

  useOnClickOutside(ref, closeOpenDialog)



  return <AlertDialog open={open} onOpenChange={closeOpenDialog}>
    <AlertDialogTrigger className="w-full text-center sm:mt-10 mt-8 block border-2 border-black px-[8px] py-[4px] shadow-action mr-2 font-semibold">{btnText}</AlertDialogTrigger>
    <AlertDialogContent ref={ref}>
      <AlertDialogHeader>
        <AlertDialogTitle>Se Connecter</AlertDialogTitle>
        <AlertDialogDescription>
          Tu dois te connecter pour pouvoir t'abonner.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="flex flex-col md:flex-row">
          <LoginLink authUrlParams={{ lang: "fr-FR" }} className="border-2 border-black px-[8px] py-[4px] shadow-action mr-2"
            postLoginRedirectURL={route}>Se Connecter</LoginLink>
          <RegisterLink authUrlParams={{ lang: "fr-FR" }} className="border-2 border-black px-[8px] py-[4px] shadow-action mt-3 md:mt-0"
            postLoginRedirectURL={route}>S'inscrire</RegisterLink>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}