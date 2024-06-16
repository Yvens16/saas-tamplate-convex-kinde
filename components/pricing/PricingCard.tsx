import { cn, tr } from "@/lib/utils"
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from 'lucide-react'
import Paddleintegration from "../shareables/PaddleIntegration";
import LoginDialog from "../shareables/LoginDialog";
import { IPricingCard } from "@/types/pricing";
import { routes } from "@/lib/routes";


export default function PricingCard({ tier, index, premiumUsersCount, isConnected, userEmail }: IPricingCard) {
  return <div
    className={cn(
      "max-w-[448px]",
      tier.featured ? 'relative bg-white shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
      tier.featured
        ? ''
        : index === 0
          ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
          : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
      'rounded-md p-6 ring-2 ring-black ring-inset sm:p-10'
    )}
  >
    <h3 id={tier.id} className="text-base font-semibold leading-7 text-indigo-600">
      {tier.name}
    </h3>
    {tier.featured ? <Badge className='bg-black  text-[12px] text-green_valid  border border-green_valid'>({premiumUsersCount}/150) {tr({ key: "participants" })}</Badge> : null}
    <p className="mt-4 flex items-baseline gap-x-2">
      <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
      <span className="text-base text-gray-500">/{tr({ key: "month" })}</span>
    </p>
    <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10">
      {tier.features.map((feature) => (
        <li key={feature.name} className="flex gap-x-3 relative">
          <BadgeCheck className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
          {feature.name} {feature.soon ? <Badge className='absolute right-0 -top-2 lg:top-unset bg-black  text-[10px] text-yellow  border border-yellow'>{tr({ key: "soon" })}</Badge> : null}
        </li>
      ))}
    </ul>
    {/* <Paddleintegration
        priceId={tier.price!}
        quantity={1}
        userEmail={"yvens@gmail.com"} btnText={tr({ key: "subscribe" })} /> */}
    {tier.featured ? <>
      {!isConnected ? <LoginDialog btnText={tr({ key: "become_premium" })} route={`${routes.pricing}?checkout=true`} /> : <Paddleintegration
        priceId={tier.price!}
        quantity={1}
        userEmail={userEmail} btnText={tr({ key: "subscribe" })} />}
    </> : null}
  </div>
}