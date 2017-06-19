import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Connect, OptionsBar} from '../../components/connect';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Connect4Page = () => (
  <div className="jumbotron">
    <div className="jumbotron">
      <h1 className="h1-responsive">Connect 4</h1>
      <hr className="my-2" />
      <p className="lead">
        Connect Four is a two-player connection game in which the players take
        turns dropping colored discs from the top into a seven-column, six-row
        vertically suspended grid. The pieces fall straight down, occupying the
        next available space within the column. The objective of the game is to
        be the first to form a horizontal, vertical, or diagonal line of four.
      </p>
    </div>
    <div className="container">
      <div className="jumbotron row align-items-center">
        <Connect className="col-md-8" />
        <div className="col-md-4">
          <OptionsBar />
        </div>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Connect4Page);
