import React from 'react';

export default ({ category, type = "plain" }) => {
  return (
  <span className={`devicon-${category}-${type} colored`}/>
)};
