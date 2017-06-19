import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Queen, OptionsBar} from '../../components/queen';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const NQueenPage = () => (
  <div className="jumbotron">
    <div className="jumbotron">
      <h1 className="h1-responsive">N Queens</h1>
      <hr className="my-2" />
      <p className="lead">
        The N queens puzzle is the problem of placing N chess queens on an N×N chessboard
        so that no two queens threaten each other. Thus, a solution requires that no two queens
        share the same row, column, or diagonal.
      </p>
    </div>
    <div className="container">
      <div className="jumbotron row align-items-center">
        <Queen className="col-md-8" />
        <div className="col-md-3">
          <OptionsBar />
        </div>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(NQueenPage);
