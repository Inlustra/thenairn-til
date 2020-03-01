import Cookies from "js-cookie";
import { Operation } from "apollo-boost";

const AUTH_COOKIE_NAME = "devtail.token";

export const setToken = (token: string | undefined) =>
  token
    ? Cookies.set(AUTH_COOKIE_NAME, token)
    : Cookies.remove(AUTH_COOKIE_NAME);

export const authRequest = (operation: Operation) => {
  const token = Cookies.get("AUTH_COOKIE_NAME");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }
  })
};
