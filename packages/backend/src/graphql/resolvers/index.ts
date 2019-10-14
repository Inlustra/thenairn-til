import { Resolvers } from "../types";
import { merge } from "lodash";
import userResolvers, { Context as UserContext } from "./user";
import tilResolvers, { Context as TilContext } from "./til";
import { IResolvers } from "apollo-server-koa";

type Context = UserContext & TilContext;

const resolvers: Resolvers<Context> = merge({}, userResolvers, tilResolvers);

export default resolvers;
