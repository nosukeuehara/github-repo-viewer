import "@testing-library/jest-dom/vitest";
import {afterAll, afterEach, beforeAll} from "vitest";
import {server} from "./msw/server";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams("q=react"),
}));

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
