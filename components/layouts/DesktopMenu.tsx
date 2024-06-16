"use client"
import Link from "next/link"
import { menuRoutes } from "@/lib/menu-routes"
import { tr } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

export default function DesktopMenu() {
  const pathname = usePathname()
  return <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
    {menuRoutes.map((route, index) => (
      <Link
        key={index}
        href={route.href}
        className={cn(
          `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`,
          {
            "text-red-600": pathname === route.href
          }
        )}
      >
        {<route.icon className="h-4 w-4" />}
        {tr({ key: route.label })}
      </Link>
    ))}
  </nav>
}