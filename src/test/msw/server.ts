import {setupServer} from "msw/node";
import {handlers} from "./handlers";

/**
 * MSWサーバー
 * - Unit/Integration Test: Vitestのsetup.tsで起動
 * - E2E Test: instrumentation.tsで起動
 */
export const server = setupServer(...handlers);
