import { test, expect, describe } from "vitest";
import { render, screen } from "@/lib/test-utils";
import userEvent from "@testing-library/user-event";
import PricingCard from "./PricingCard";
import { tr } from "@/lib/utils";


describe("Pricing Card", () => {
  const tiers = [
    {
      name: tr({ key: "first_to_come" }),
      id: 'early-bird',
      href: '#',
      priceMonthly: '19,99€',
      description: tr({ key: "all_features_access" }),
      features: [
        { name: tr({ key: "all_problems" }), soon: false },
        { name: tr({ key: "all_courses" }), soon: false },
        { name: tr({ key: "all_companies_projects" }), soon: true },
        { name: tr({ key: "all_workshop" }), soon: true },
        { name: tr({ key: "early_access" }), soon: false },
        { name: tr({ key: "private_community" }), soon: false },
      ],
      featured: true,
      price: process.env.NEXT_PUBLIC_PADDLE_EARLY_BIRD_PRICE!
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

  test("User not connected", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<PricingCard
      isConnected={false}
      tier={tiers[0]}
      index={0}
      premiumUsersCount={0}
      userEmail={""} />)


    const premiumBtn = screen.getByRole("button", { name: /Devenir un membre premium/i })
    await user.click(premiumBtn);
    const loginDialog = await screen.findByRole("heading", { name: /Se Connecter/i })
    const loginLink = await screen.findByRole("link", { name: /Se Connecter/i })
    const registerLink = await screen.findByRole("link", { name: /S'inscrire/i })
    expect(loginDialog).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    unmount();
  })

  test("User connected", async () => {
    const user = userEvent.setup();
    const { unmount, container } = render(<PricingCard
      isConnected={true}
      tier={tiers[0]}
      index={0}
      premiumUsersCount={0}
      userEmail={""} />)

    const checkOutBtn = screen.getByRole("button", { name: /S'abonner/i })
    expect(checkOutBtn).toBeInTheDocument();
    await user.click(checkOutBtn);
    unmount();
  })

})