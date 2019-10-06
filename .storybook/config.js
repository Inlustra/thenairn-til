import React from "react";
import { createTheme } from "../components/framework/theme";
import GlobalStyles from "../components/framework/globals";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "styled-components";

const ThemeProviderDecorator = (fn: React.FC<any>) => (
  <ThemeProvider
    theme={createTheme([], {
      defaultFontFamily: "Lato, Montserrat, Arial"
    })}
  >
    <>
      <GlobalStyles />
      {fn()}
    </>
  </ThemeProvider>
);

addDecorator(ThemeProviderDecorator);
configure(require.context("../components", true, /\.stories\.tsx$/), module);
