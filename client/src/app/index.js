
// npm packages
import React from 'react';

import Navbar from '../components/navbar';

export default ({children}) => (
  <div className="container">
    <Navbar />
    {children}
  </div>
);
