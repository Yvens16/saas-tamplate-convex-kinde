import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { CircleUser } from "lucide-react"
import { tr } from "@/lib/utils"
import { routes } from "@/lib/routes"
import Link from "next/link"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
export default function AvatarMenu() {
  const menus = [{ label: "settings", href: routes.settings }]
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{tr({ key: "my_account" })}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {menus.map((route, idx) => (
        <DropdownMenuItem key={idx}>
          <Link href={route.href}>{tr({ key: route.label })}</Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem><LogoutLink
        postLogoutRedirectURL={routes.home}
      >{tr({ key: "logout" })}</LogoutLink></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}