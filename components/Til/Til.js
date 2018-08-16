import React from "react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { Box } from "../framework/elements/Box";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { xonokai } from "react-syntax-highlighter/styles/prism";
import styled from "styled-components";

const golangExample = `func sum(nums ...int) {
    fmt.Print(nums, " ")
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}`;

export const TilBox = Box.extend`
  border-radius: 6px 6px 0 0;
`;

export const TilPreCode = styled.pre`
  margin: 0;
  border: none !important;
  border-radius: 0 0 6px 6px !important;
`;

export const Til = ({ title, code, expanded }) => (
  <div className="til">
    <TilBox>
      <div className="columns is-vcentered is-mobile">
        <div className="column is-2">
          <div className="column is-narrow has-text-grey-lighter is-size-4">
            TIL
          </div>
        </div>
        <div className="column has-text-left">
          <div className="columns is-gapless has-text-weight-semibold">
            <div className="column">{title}</div>
          </div>
        </div>
      </div>
    </TilBox>
    <div className="til-code has-text-left">
      <div className="accordion-hidden">
        <span className="icon is-medium is-size-3">
          <CategoryIcon category="react" />
        </span>
      </div>
      <SyntaxHighlighter language="go" style={xonokai} PreTag={TilPreCode} showLineNumbers>
        {golangExample}
      </SyntaxHighlighter>
    </div>
  </div>
);
