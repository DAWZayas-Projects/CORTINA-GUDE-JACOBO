// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  route: state.routing.locationBeforeTransitions.pathname, // esto provoca el warning al logearse
});

const Navbar = () => (

  <nav className="navbar navbar-dark basic-gradient" style={{marginBottom: '10px', marginTop: '10px'}}>

    <div className="container">
      <Link to="/" className="navbar-brand">AI-Power</Link>
    </div>
  </nav>

);

export default connect(mapStateToProps, null)(Navbar);
