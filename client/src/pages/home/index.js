import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {server as serverConfig} from '../../../config';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Home = () => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    <div className="card text-xs-center">
      <h4 className="card-block card-title">Hello</h4>
    </div>
    <div className="card card-block text-xs-center">
      <h4 className="card-block text-xs-center">Welcome to the IA Power</h4>
    </div>
    <div className="text-xs-center">
      <Link to="/main" className="btn btn-default">Entrar</Link>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
