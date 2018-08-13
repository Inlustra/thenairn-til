import React from 'react';
import Til from '../components/Til/Til';

export default () => (
  <div className="hero is-danger is-bold is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="title">Thomas Nairn</div>
        <div className="subtitle">Today I learned</div>
        <div className="columns is-centered">
          <div className="column is-8-desktop is-10-tablet is-12-mobile">
            <Til
              title="The reason quantum security is perfect. The particles are so small
            that light would affect the position of the particle itself."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
