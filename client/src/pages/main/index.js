import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {server as serverConfig} from '../../../config';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const MainPage = () => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    <div className="row align-items-center">
      <div className="card col-md-4">
        <img
          className="z-depth-1 grey lighten-5 mt-1"
          src={'../../../static/images/puzzle_icon.png'}
          alt="Generic"
        />
        <div className="card-block">
          <h4 className="card-title">N Puzzle</h4>
          <p className="card-text">
            The object of the puzzle is to place the tiles in order by making sliding moves that use the empty space.
          </p>
          <Link to="/npuzzle" className="btn btn-default">
            n puzzle
          </Link>
        </div>
      </div>
      <div className="card col-md-4">
        <img
          className="z-depth-1 grey lighten-5 mt-1"
          src={'../../../static/images/connect_icon.png'}
          alt="Generic"
        />
        <div className="card-block">
          <h4 className="card-title">Connect 4</h4>
          <p className="card-text">
            The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four.
          </p>
          <Link to="/connect4" className="btn btn-default">
            connect 4
          </Link>
        </div>
      </div>
      <div className="card col-md-4">
        <img
          className="z-depth-1 grey lighten-5 mt-1"
          src={'../../../static/images/queen_icon.png'}
          alt="Generic"
        />
        <div className="card-block">
          <h4 className="card-title">N Queen</h4>
          <p className="card-text">
            The objective is that no two queens share the same row, column, or diagonal.
          </p>
          <Link to="/nqueen" className="btn btn-default">
            n queen
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
