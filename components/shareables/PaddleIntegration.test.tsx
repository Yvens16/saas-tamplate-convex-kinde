import { vi, expect, describe, test, afterEach, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/lib/test-utils';
import Paddleintegration from './PaddleIntegration';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { tr } from '@/lib/utils';

vi.mock("@paddle/paddle-js", async (importOriginal) => {
  return {
    ...await importOriginal<typeof import("@paddle/paddle-js")>(),
    initializePaddle: vi.fn().mockResolvedValue({
      Checkout: {
        open: vi.fn(),
      },
    }),
  }
})



describe("Paddle checkout btn", async () => {
  let nextNavigation = await import("next/navigation");
  let mockPaddleInstance: Paddle | undefined;
  beforeEach(async () => {
    mockPaddleInstance = await initializePaddle();
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test("Checkout open when checkout query params true", async () => {
    nextNavigation.useSearchParams = vi.fn().mockReturnValue(new URLSearchParams({ "checkout": "true" }))
    const { unmount } = render(<Paddleintegration
      priceId={'1234'}
      quantity={1}
      userEmail={'test@gmail.com'}
      btnText={tr({ key: "subscribe" })} />)
    await waitFor(() => {
      expect(mockPaddleInstance?.Checkout.open).toBeCalledTimes(1)
    })
    vi.clearAllMocks();
    unmount();
  })

  test("Checkout not open without checkout query params", async () => {
    nextNavigation.useSearchParams = vi.fn().mockReturnValue(new URLSearchParams({}))
    const { unmount } = render(<Paddleintegration
      priceId={'1234'}
      quantity={1}
      userEmail={'test@gmail.com'}
      btnText={tr({ key: "subscribe" })} />)
    await waitFor(() => {
      expect(mockPaddleInstance?.Checkout.open).not.toBeCalled()
    })
    vi.clearAllMocks();
    unmount();
  })

})