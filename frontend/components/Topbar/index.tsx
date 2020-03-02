import React, { useMemo } from "react";
import { Navbar, Item, Menu, Content } from "../../framework/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "./Logo";
import { useMeSimpleQuery } from "generated/graphql";

const TopbarLink: React.FC<{ href: string }> = ({ href, children }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <Item link active={pathname === href}>
        {children}
      </Item>
    </Link>
  );
};
export const Topbar = () => {
  const { data, loading, error } = useMeSimpleQuery();
  const loggedIn = useMemo(() => !!data?.me, [data]);
  return (
    <Navbar>
      <Link href="/">
        <Item link brand>
          <Logo />
        </Item>
      </Link>
      <Menu>
        <TopbarLink href="/">Home</TopbarLink>
        <Content position="start">
          <TopbarLink href="/people">People</TopbarLink>
        </Content>
        <Content position="end">
          {error ? (
            error?.toString()
          ) : loading ? (
            "Loading.."
          ) : loggedIn ? (
            <TopbarLink href="/loggedin">Home</TopbarLink>
          ) : (
            <TopbarLink href="/login">Login</TopbarLink>
          )}
        </Content>
      </Menu>
    </Navbar>
  );
};
