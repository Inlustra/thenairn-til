import React from "react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { dark } from 'react-syntax-highlighter/styles/prism';


const golangExample = `func sum(nums ...int) {
    fmt.Print(nums, " ")
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}`

export function getLanguageMeta(language) {
  return {
      syntax: language,
  //    image: import(`./icons/${language}.svg`)
  }
}

export default ({ title, code, expanded }) => (
  <div className="til">
    <div className="box">
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
    </div>
    <div className="til-code has-text-left">
      <div className="accordion-hidden">
          <span className="icon is-medium is-size-3">
            <CategoryIcon category="react"/>
          </span>
      </div>
      <SyntaxHighlighter language='go' style={dark}>{golangExample}</SyntaxHighlighter>
      
    </div>
  </div>
);
