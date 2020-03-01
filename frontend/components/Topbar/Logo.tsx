import React from "react";
import { Text } from "@devtale/ui/elements/Text";
import styled from "styled-components";

const LogoContainer = styled.div`
  text-align: center;
  padding: 0 8px;
`;

export const Logo: React.FC = () => (
  <LogoContainer>
    <Text size={4} color="black" weight="bold" as="span">
      dev
    </Text>
    <Text size={6} color="primary" as="span">
      tale
    </Text>
  </LogoContainer>
);
