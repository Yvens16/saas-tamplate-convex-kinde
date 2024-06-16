import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn, tr } from "@/lib/utils";
import PricingCard from "@/components/pricing/PricingCard";
// export const metadata = {
//   title: "App Router",
// };

// interface IPage {
//   searchParams?: {
//     [key: string]: string | string[] | undefined,
//   },
//   params?: { slug: string };
// }
// { searchParams }: IPage

export default async function Page() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isConnected = await isAuthenticated();
  const user = await getUser();
  console.log('user:', user)


  const premiumUsersCount = 0;
  // const premiumUsersCount = await fetchQuery(api.users.countPremiumUser, {});
  const isEarlyBirdValid = premiumUsersCount <= 150;

  const tiers = [
    {
      name: isEarlyBirdValid ? tr({ key: "first_to_come" }) : tr({ key: "price" }),
      id: 'early-bird',
      href: '#',
      priceMonthly: isEarlyBirdValid ? '19,99€' : '34,99€',
      description: tr({ key: "all_features_access" }),
      features: [
        { name: tr({ key: "all_problems" }), soon: false },
        { name: tr({ key: "all_courses" }), soon: false },
        { name: tr({ key: "all_companies_projects" }), soon: true },
        { name: tr({ key: "all_workshop" }), soon: true },
        { name: tr({ key: "early_access" }), soon: false },
        { name: tr({ key: "private_community" }), soon: false },
        // "Notion Check Jotion",
        // "Task Management",
        // "Job Board",
        // "MVP Board",(Travailler par des PM en devenir, des deigner et des dev)
      ],
      featured: true,
      price: isEarlyBirdValid ? process.env.NEXT_PUBLIC_PADDLE_EARLY_BIRD_PRICE! : process.env.NEXT_PUBLIC_PADDLE_REGULAR_PRICE!
    },
    {
      name: 'Futur Prix',
      id: 'true-price',
      href: '#',
      priceMonthly: '34,99€',
      description: '',
      features: [],
      featured: false,
      price: ""
    },
  ]
  if (!isEarlyBirdValid) tiers.pop();

  return <div className="relative isolate  px-6 py-24 sm:py-32 lg:px-8">
    <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
      <div
        className="mx-auto aspect-[1155/678] w-[72.1875rem] opacity-30"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
    <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
      <div className="bg-black text-white rounded-sm p-2 w-fit mx-auto min-w-[90px]">
        <h2 className="text-base font-semibold leading-7 rounded-sm border border-btn">{tr({ key: "pricing" })}</h2>
      </div>
      <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
        {tr({ key: "become_a_hunted_developer" })}
      </p>
    </div>
    <p className="mx-auto max-w-2xl text-lg text-black mt-6 text-center">
      {tr({ key: "be_first_to_join" })} <span className='font-semibold text-btn bg-black rounded-md p-1'>{tr({ key: "early_bird_price" })}</span> {tr({ key: "you_and_friend_for_life" })}
    </p>
    <div className={cn(
      "mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2",
      {
        "lg:max-w-xl lg:grid-cols-1": isEarlyBirdValid === false
      }
    )}>
      {tiers.map((tier, tierIdx) => (
        <PricingCard key={tierIdx} tier={tier} index={tierIdx} premiumUsersCount={0} isConnected={isConnected} userEmail={user?.email!} />
      ))}
    </div>
  </div>;
}
