import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { tr } from "@/lib/utils"
import Link from "next/link"
import { routes } from "@/lib/routes"

export default function UpgradeSubscriptionBadge() {
  return <div className="mt-auto p-4">
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>{tr({ key: "upgrade_to_pro" })}</CardTitle>
        <CardDescription>
          {tr({ key: "upgrade_description" })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full">
          <Link href={routes.pricing}>
            {tr({ key: "subscribe" })}
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
}