import Link from "next/link"
import {
  Bell,
  Package2,
} from "lucide-react"

import { Button } from "@/components/ui/button"


import { ReactNode } from "react"
import SearchBar from "./SearchBar"
import AvatarMenu from "./AvatarMenu"
import MobileSheetMenu from "./MobileSheetMenu"
import DesktopMenu from "./DesktopMenu"
import UpgradeSubscriptionBadge from "./UpgradeSubscriptionBadge"
import LogoLink from "./LogoLink"

export function BaseLayoutMenu({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <LogoLink />
          <div className="flex-1">
            <DesktopMenu />
          </div>
          <UpgradeSubscriptionBadge />
        </div>
      </div>
      <div className="flex flex-col overflow-x-hidden">
        <header className="flex h-14 justify-between items-center md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSheetMenu />
          {/* <div className="w-full flex-1">
            <SearchBar />
          </div> */}
          <div className="">
            <AvatarMenu />
          </div>
        </header>
        {/* max-w-[1160px] */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 2xl:mx-auto 2xl:max-w-screen-xl">
          {children}
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  )
}
