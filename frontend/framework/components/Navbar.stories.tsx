import React from "react";
import { Navbar, Item, Menu, Content } from "./Navbar";
import { Button } from "../elements/Button";
import { Text } from "../elements/Text";

export default { title: "Topbar" };

export const withMenu = () => (
  <Navbar>
    <Item link brand>
      <Text size={4} color="black" weight="bold" as="span">
        The
      </Text>
      <Text size={6} color="primary" as="span">
        Nairn
      </Text>
    </Item>
    <Menu>
      <Item link>Home</Item>
      <Content position="start">
        <Item link>People</Item>
      </Content>
      <Content position="end">
        <Item as="div">
          <Button color="info" glow>
            Contact
          </Button>
        </Item>
      </Content>
    </Menu>
  </Navbar>
);

export const centered = () => (
  <Navbar>
    <Content position="center">
      <Item link brand>
        <Text size={4} color="black" weight="bold" as="span">
          The
        </Text>
        <Text size={6} color="primary" as="span">
          Nairn
        </Text>
      </Item>
    </Content>
  </Navbar>
);
