import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
} from "lucide-react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LogoLink from "./LogoLink"
import { menuRoutes } from "@/lib/menu-routes"
import { tr } from "@/lib/utils"
import UpgradeSubscriptionBadge from "./UpgradeSubscriptionBadge"

export default function MobileSheetMenu() {
  return <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <LogoLink />
        {menuRoutes.map((route, idx) => (
          <Link
            key={idx}
            href={route.href}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <route.icon className="h-5 w-5" />
            {tr({ key: route.label })}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <UpgradeSubscriptionBadge />
      </div>
    </SheetContent>
  </Sheet>
}