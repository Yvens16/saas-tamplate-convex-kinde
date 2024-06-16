export interface IPricingCard {
  tier: {
    name: string,
    id: string,
    href: string,
    priceMonthly: string,
    description: string,
    features: { name: string, soon: boolean }[],
    featured: boolean,
    price: string,
  },
  index: number,
  premiumUsersCount: number,
  isConnected: boolean,
  userEmail: string,
}