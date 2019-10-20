import { merge } from "lodash";
import userResolvers, { Context as UserContext } from "./user";
import tilResolvers, { Context as TilContext } from "./til";
import tagResolvers, { Context as TagContext } from "./tag";
import { Resolvers } from "../../generated/graphql";

type Context = UserContext & TilContext & TagContext;

const resolvers: Resolvers<Context> = merge(
  {},
  userResolvers,
  tilResolvers,
  tagResolvers
);

export default resolvers;
