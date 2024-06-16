import '@testing-library/jest-dom/vitest'

import { server } from './mocks/server';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

// To mock useRouter in the component test
vi.mock('next/navigation', () => {
  return {
    ...require('next-router-mock'),
    useSearchParams: vi.fn(),
    usePathname: vi.fn()
  }
});


vi.mock("@paddle/paddle-js", async () => {
  return {
    ...require("@paddle/paddle-js"),
    initializePaddle: async () => vi.fn(),
    Paddle: vi.fn(),
  }
})

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());