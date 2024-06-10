import { expect, test } from "vitest";
import { api } from "./_generated/api";
import { convexTest, runCtx } from "./setup.testing";
import schema from "./schema";


test("sending messages", async () => {
  const t = convexTest(schema);

  await t.run(async (baseCtx) => {
    const ctx = await runCtx(baseCtx);

    return await ctx.table("users").insert({ name: "Yvens" })
  })
});