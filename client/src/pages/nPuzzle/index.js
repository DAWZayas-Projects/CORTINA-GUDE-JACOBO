import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {server as serverConfig} from '../../../config';

import {Puzzle, OptionsBar} from '../../components/puzzle';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const NPuzzlePage = () => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    <div className="jumbotron">
      <h1 className="h1-responsive">N puzzle</h1>
      <hr className="my-2" />
      <p className="lead">
        The N-puzzle is a sliding puzzle that consists of a frame (NxN) of numbered
        square tiles (from 1 to N - 1) in random order with one tile missing. The object of the puzzle
        is to place the tiles in order by making sliding moves that use the empty space.
      </p>
    </div>
    <div className="container">
      <div className="jumbotron row align-items-center">
        <Puzzle className="col-md-8" />
        <div className="col-md-3">
          <OptionsBar />
        </div>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(NPuzzlePage);
