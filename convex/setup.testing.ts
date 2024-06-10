import { convexTest as baseConvexTest } from "convex-test";
import { SchemaDefinition, StorageActionWriter } from "convex/server";
import { EntDefinition, entsTableFactory } from "convex-ents";
import { MutationCtx } from "./_generated/server";
import { entDefinitions } from "./schema";

// Work around a TypeScript subtyping issue with Ents schemas
type GenericEntSchema = Record<string, EntDefinition>;
export function convexTest<Schema extends GenericEntSchema>(
  schema: SchemaDefinition<Schema, boolean>,
) {
  return baseConvexTest(schema);
}

// Use inside t.run() to use Ents
export async function runCtx(
  ctx: MutationCtx & { storage: StorageActionWriter },
) {
  return {
    ...ctx,
    table: entsTableFactory(ctx, entDefinitions),
    db: undefined,
  };
}