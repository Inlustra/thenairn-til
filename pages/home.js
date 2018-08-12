import React from 'react';
import { Til } from '../components/til';

export const Home = () => (
  <section className="hero is-info is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title">Thomas Nairn</p>
        <p className="subtitle">Today I learned</p>
        <div className="columns">
            <div className="is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                <Til />
            </div>
        </div>
      </div>
    </div>
  </section>
);
