import { v } from "convex/values";
import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";

const schema = defineEntSchema({
  users: defineEnt({
    name: v.string(),
  }),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);