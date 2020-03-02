import { NextPageContext } from "next";
import { parseCookies } from "nookies";

const COOKIE_NAME = "devtailjwt";

export const redirectUnauthenticated = (ctx: NextPageContext) => {
  if (!ctx.req || !ctx.res) return;
  const cookies = parseCookies(ctx);
  if (cookies[COOKIE_NAME]) return;
  if (ctx.req.url !== "/login") {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
};
