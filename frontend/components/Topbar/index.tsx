import React from "react";
import { Navbar, Item, Menu, Content } from "../../framework/components/Navbar";
import Link from "next/link";
import { Button } from "../../framework/elements/Button";
import { useRouter } from "next/router";
import { Logo } from "./Logo";

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
export const Topbar = () => (
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
        <Item as="div">
          <Button color="danger">Contact</Button>
        </Item>
      </Content>
    </Menu>
  </Navbar>
);
