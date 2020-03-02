import { parseCookies } from "nookies";
import { NextApolloContext } from "./apollo";
import { MeSimpleQueryResult, MeSimpleDocument } from "generated/graphql";

const COOKIE_NAME = "devtailjwt";

export const redirectAuthenticated = async (
  location: string,
  ctx: NextApolloContext
) => {
  if (!ctx.req || !ctx.res) return;
  const cookies = parseCookies(ctx);
  if (!cookies[COOKIE_NAME]) return;
  if (ctx.req.url !== location) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  }
};

export const redirectUnauthenticated = async (ctx: NextApolloContext) => {
  if (!ctx.req || !ctx.res) return;
  if (ctx.req.url !== "/login") return;
  const { data } = await ctx.apolloClient.query<MeSimpleQueryResult>({
    query: MeSimpleDocument
  });
  if (!!data?.data?.me?.id) return;
  ctx.res.writeHead(302, { Location: "/login" });
  ctx.res.end();
};
