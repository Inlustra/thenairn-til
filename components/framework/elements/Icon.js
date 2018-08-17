import styled, { css } from "styled-components";

export const theme = {
  sizes: {
    small: "1rem",
    medium: "2rem",
    large: "3rem",
    default: "1.5rem"
  }
};

const getSize = ({ size, theme }) => {
  switch (typeof size) {
    case "string":
      return theme.Icon.sizes[size];
    default:
      return theme.Icon.sizes.default;
  }
};

export const Icon = styled.span`
  align-items: center;
  display: inline-flex;
  justify-content: center;

  ${props => {
    const size = getSize(props);
    return css`
      height: ${size};
      width: ${size};
    `;
  }};
`;
