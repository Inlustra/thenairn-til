import React from 'react';
import bulma from '../styles/bulma.scss';
import { Home } from './home'

const Index = () => (
  <section>
    <style dangerouslySetInnerHTML={{ __html: bulma }} />
    <Home />
  </section>
);

export default Index;

