import styled from "styled-components";

export const theme = {
  shadow: `0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)`,
  padding: `1.25rem`,
  radius: `6px`,
  backgroundColor: `#fff`,
}

export const Box = styled.div`
  display: block;
  color: ${({theme}) => theme.defaultTextColor};
  box-shadow: ${({theme}) => theme.Box.shadow};
  padding: ${({theme}) => theme.Box.padding};
  border-radius: ${({theme}) => theme.Box.radius};
  background-color: ${({theme}) => theme.Box.backgroundColor};
`