/**
 * Next.js Instrumentation
 * E2Eテスト時にMSWを有効にしてGitHub APIをモックする
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.ENABLE_MSW === "true"
  ) {
    const {server} = await import("@/test/msw/server");

    server.listen({onUnhandledRequest: "bypass"});

    console.log("MSW is enabled for E2E testing");
  }
}
