import { Resolvers } from "../types";
import userResolvers, { Context as UserContext } from "./user";
import tilResolvers, { Context as TilContext } from "./til";
import authResolvers, { Context as AuthContext } from "./auth";

type Context = UserContext & TilContext & AuthContext;

const resolvers: Resolvers<Context> = {
  ...userResolvers,
  ...tilResolvers,
  ...authResolvers
};

export default resolvers;
