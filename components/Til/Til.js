import React from 'react';
import reactIcon from 'devicon/icons/react/react-original.svg';
import CategoryIcon from '../CategoryIcon/CategoryIcon';

export default ({title}) => (
  <div className="box">
    <div className="columns is-mobile is-vcentered">
      <div className="column is-2">
        <div className="level">
          <div className="level-item has-text-centered">
            <span className="icon is-medium">
              <CategoryIcon category="react"/>
            </span>
          </div>
        </div>
      </div>
      <div className="column has-text-left">
        <div className="columns is-gapless has-text-weight-semibold">
          <div className="column is-narrow has-text-grey-lighter">
            TIL&nbsp;
          </div>
          <div className="column">
            {title}
          </div>
        </div>
      </div>
    </div>
  </div>
);
