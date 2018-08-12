import React from 'react';
import reactIcon from 'devicon/icons/react/react-original/wordmark.svg';

export const Til = () => (
  <div className="media">
    <div className="media-left">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-6">
            <div className="icon">
              <img alt="React" src={reactIcon} />
            </div>
          </div>
          <div className="tile is-6">
            <div className="icon">
              <img alt="React" src={reactIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>How to get started with next.js</strong>
          <br />I found a great starter, updated all the dependencies and it
          still works!
        </p>
      </div>
    </div>
    <div className="media-left">Link</div>
  </div>
);
