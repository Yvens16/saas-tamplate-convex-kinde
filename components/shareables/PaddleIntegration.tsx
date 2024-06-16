'use client'
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
interface IPaddleIntegration {
  priceId: string,
  quantity: number,
  userEmail: string,
  country?: string,
  btnText: string,
}

export default function Paddleintegration({ priceId, quantity, userEmail, btnText }: IPaddleIntegration) {
  const searchParams = useSearchParams();
  const isCheckout = searchParams?.get("checkout");
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const environment = process.env.NODE_ENV === "production" ? "production" : "sandbox";
    const authToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN!;
    initializePaddle({ environment: environment, token: authToken }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    )
  }, []);

  useEffect(() => {
    if (isCheckout && paddle && priceId) {
      openCheckout();
    }
  }, [paddle, priceId])

  function openCheckout() {
    paddle?.Checkout.open({
      items: [{ priceId: priceId, quantity: quantity }],
      settings: {
        showAddDiscounts: true,
        locale: "fr",
        // T-1868 Add Success URL and Create page
        successUrl: "",
      },
      customData: {
        customerEmail: userEmail
      },
      customer: { email: userEmail }
    });
  }

  return <>
    <button
      onClick={openCheckout}
      className={"paddle_button w-full text-center sm:mt-10 mt-8 block border-2 border-black px-[8px] py-[4px] shadow-action mr-2 font-semibold"}
    >
      {btnText}
    </button>
  </>
}