import styled, { css } from "styled-components";
import { BaseTheme, Breakpoint } from "../base";
import { media, mediaDefault } from "../utils";
import { useState } from "react";

type NavbarTheme = {
  Navbar: {
    backgroundColor: string;
    gradientFrom: string;
    gradientTo: string;
    borderWidth: string;
    height: string | { [K in Breakpoint]?: string };
    zIndex: number;
    Item: {
      color: string;
      hoverColor: string;
      hoverBackgroundColor: string;
    };
  };
};

export const theme: NavbarTheme = {
  Navbar: {
    backgroundColor: "white",
    gradientFrom: "info",
    gradientTo: "primary",
    borderWidth: "1px",
    height: {
      mobile: "3.25rem",
      tablet: "4.25rem"
    },
    zIndex: 30,
    Item: {
      color: "greyTer",
      hoverColor: "primary",
      hoverBackgroundColor: "whiteTer"
    }
  }
};

type Theme = NavbarTheme & BaseTheme;

export type NavbarProps = {
  theme: Theme;
};

export const Navbar = styled.div<NavbarProps>`
  display: flex;
  position: relative;
  flex-wrap: wrap;

  background: ${({ theme: { colors, Navbar } }) =>
    colors[Navbar.color] || Navbar.color};

  ${({ theme: { Navbar, colors } }: NavbarProps) => {
    return css`
      position: relative;
      background-color: ${colors[Navbar.backgroundColor] ||
        Navbar.backgroundColor};
      z-index: ${Navbar.zIndex};
      border-bottom: ${Navbar.borderWidth} solid;
      border-image: linear-gradient(
          to right,
          ${colors[Navbar.gradientFrom]},
          ${colors[Navbar.gradientTo]}
        )
        5;
        box-sizing: unset;

        * {
          box-sizing: border-box;
        }
    `;
  }}

  ${({ theme }: NavbarProps) => {
    const height = theme.Navbar.height;
    switch (typeof height) {
      case "object":
        return (Object.keys(height) as Breakpoint[]).map(mediaSize =>
          media(
            mediaSize,
            css`
              height: ${height[mediaSize]};
            `
          )
        );
      default:
        return css`
          height: ${height};
        `;
    }
  }};
`;

export type ItemProps = {
  active?: boolean;
  link?: boolean;
  brand?: boolean;
};

export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;

  ${({ theme: { colors, Navbar } }) =>
    css`
      color: ${colors[Navbar.Item.color]};
    `};

  ${({ link }) =>
    link &&
    css`
      cursor: pointer;
    `}

  ${({ link, brand, active, theme: { colors, Navbar } }) => {
    if (!link || brand) {
      return;
    }
    const itemHoverCSS = css`
      background-color: ${colors[Navbar.Item.hoverBackgroundColor]};
      color: ${colors[Navbar.Item.hoverColor]};
    `;
    return active
      ? itemHoverCSS
      : css`
          :hover {
            ${itemHoverCSS}
          }
        `;
  }}

  img {
    ${({ theme: { Navbar } }) =>
      mediaDefault(
        Navbar.height,
        mediaHeight =>
          css`
            height: calc(${mediaHeight} - 1rem);
          `
      )}
  }
`;

export type ContentProps = {
  position: "start" | "end" | "center";
};

export const Content = styled.div<ContentProps>`
  display: flex;
  ${({ position }) =>
    position === "start"
      ? css`
          justify-content: flex-start;
          margin-right: auto;
        `
      : position === "end"
      ? css`
          justify-content: flex-end;
          margin-left: auto;
        `
      : css`
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
        `};
`;

export type MenuContainerProps = {
  visible: Breakpoint;
  active?: boolean;
};

export const MenuContainer = styled.div<MenuContainerProps>`
  display: none;

  ${({ visible }) =>
    media(
      visible,
      css`
        display: flex;
      `
    )}
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 0;

  ${({ active, visible, theme: { Navbar, colors } }) =>
    active &&
    css`
      border-bottom: ${Navbar.borderWidth} solid;
      background-color: ${colors[Navbar.backgroundColor] ||
        Navbar.backgroundColor};
      border-image: linear-gradient(
          to right,
          ${colors[Navbar.gradientFrom]},
          ${colors[Navbar.gradientTo]}
        )
        5;
      margin: -${Navbar.borderWidth};
      display: block;
      flex: 1 1 100%;
      background: ${({ theme: { colors, Navbar } }) =>
        colors[Navbar.color] || Navbar.color};
      ${Content} {
        display: block;
      }

      ${media(
        visible,
        css`
          display: flex;
          flex: 1 1 auto;
          ${Content} {
            display: flex;
          }
        `
      )}
    `}
`;

export type HamburgerProps = {
  open: boolean;
};

export const HamburgerContainer = styled.div<HamburgerProps>`
  ${({ theme: { Navbar } }) =>
    mediaDefault(
      Navbar.height,
      mediaHeight =>
        css`
          height: calc(${mediaHeight} - 1rem);
          width: calc(${mediaHeight} - 1rem);
        `
    )}

  ${({ open }) =>
    open &&
    css`
      span:nth-child(1) {
        transform: translateY(5px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-5px) rotate(-45deg);
      }
    `}

  span:nth-child(1) {
    top: calc(50% - 6px);
  }
  span:nth-child(2) {
    top: calc(50% - 1px);
  }
  span:nth-child(3) {
    top: calc(50% + 4px);
  }

  span {
    background: currentColor;

    display: block;
    height: 1px;
    left: calc(50% - 8px);
    position: absolute;
    -webkit-transform-origin: center;
    transform-origin: center;
    transition-duration: 86ms;
    transition-property: background-color, opacity, -webkit-transform;
    transition-property: background-color, opacity, transform;
    transition-property: background-color, opacity, transform, -webkit-transform;
    transition-timing-function: ease-out;
    width: 16px;
  }
`;

export const Hamburger: React.FC<HamburgerProps> = ({ open }) => (
  <HamburgerContainer open={open}>
    <span aria-hidden />
    <span aria-hidden />
    <span aria-hidden />
  </HamburgerContainer>
);

export type HamburgerContentProps = {
  invisible: Breakpoint;
};

export const HamburgerContent = styled.div<HamburgerContentProps>`
  justify-content: flex-end;
  margin-left: auto;
  display: flex;

  ${({ invisible }) =>
    media(
      invisible,
      css`
        display: none;
      `
    )}
`;

export const Menu: React.FC<Partial<MenuContainerProps>> = ({
  children,
  visible
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <HamburgerContent invisible={visible || "tablet"}>
        <Item link onClick={toggleOpen}>
          <Hamburger open={open} />
        </Item>
      </HamburgerContent>
      <MenuContainer visible={visible || "tablet"} active={open}>
        {children}
      </MenuContainer>
    </>
  );
};
