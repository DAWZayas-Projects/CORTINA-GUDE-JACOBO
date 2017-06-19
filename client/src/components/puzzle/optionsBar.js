import React from 'react';
import {connect} from 'react-redux';

import {generatePuzzle, startGame, resolvePuzzleBFS} from '../../store/actions';
import styles from './radio.css';

const style = {
  navbarNav: {
    width: '100%',
    textAlign: 'center',
  },
  li: {
    float: 'left',
    display: 'inline-block',
  },
};

const mapDispatchToProps = dispatch => ({
  generatePuzzle: payload => dispatch(generatePuzzle(payload)),
  startGame: payload => dispatch(startGame(payload)),
  resolvePuzzleBFS: payload => dispatch(resolvePuzzleBFS(payload)),
});

const mapStateToProps = state => ({
  board: state.puzzle.board,
  dimension: state.puzzle.dimension,
});

const sizeArray = [3, 4, 5];
let sizeValue = 3;

const OptionsBar = ({generatePuzzle, startGame, resolvePuzzleBFS, board, dimension}) => {
  const handleClick = (e) => {
    // e.preventDefault();
    sizeValue = e.target.value;
    generatePuzzle({dimension: sizeValue});
  };

  const handleClickStart = (e) => {
    e.preventDefault();
    startGame({status: 1});
  };

  const handleClickResolveBFS = (e) => {
    e.preventDefault();
    const actualBoard = JSON.stringify(board);
    console.log(actualBoard);
    resolvePuzzleBFS({state: actualBoard, dimension});
  };

  return (
    <nav className="card navbar">
      <ul className="nav navbar-nav" style={style.navbarNav}>
        <li style={style.li}>
          <div className="card-block z-depth-1">
            <h5>Board size</h5>
            <div id="inputLevel" onChange={handleClick}>
              {sizeArray.map(size => (
                <label key={size} className={styles.radio} htmlFor={size}>
                  <input type="radio" name="size" value={size} id={size} defaultChecked={size === 3} />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  {size}
                </label>
              ))}
            </div>
          </div>
        </li>
        <li style={style.li}>
          <a href="#2" className="btn btn-default" onClick={handleClickStart}>start</a>
        </li>
        <li style={style.li}>
          <a href="#2" className="btn btn-default" onClick={handleClickResolveBFS}>resolve</a>
        </li>
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar);
