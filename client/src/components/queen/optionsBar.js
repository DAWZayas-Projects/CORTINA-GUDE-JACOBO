import React from 'react';
import {connect} from 'react-redux';

import {newNQueenGame, resolveNQueenGame} from '../../store/actions';

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

const levelArray = [4, 8, 16];
let level = 8;

const mapDispatchToProps = dispatch => ({
  startGame: payload => dispatch(newNQueenGame(payload)),
  resolveNQueen: payload => dispatch(resolveNQueenGame(payload)),
});

const mapStateToProps = state => ({
  board: state.queen.board,
  dimension: state.queen.dimension,
  queens: state.queen.queens,
});

const OptionsBar = ({startGame, resolveNQueen, board, dimension, queens}) => {

  const handleClickNewGame = (e) => {
    e.preventDefault();
    startGame({dimension: level});
  };

  const handleClickResolveNQueen = (e) => {
    e.preventDefault();
    const actualBoard = JSON.stringify(board);
    resolveNQueen({state: actualBoard, dimension, queens});
  };

  const setLevel = (e) => {
    level = parseInt(e.target.value);
  };

  return (
    <nav className="card navbar">
      <ul className="nav navbar-nav" style={style.navbarNav}>
        <li style={style.li}>
          <div className="card-block z-depth-1">
            <h5>Board size</h5>
            <div id="inputLevel" onChange={setLevel}>
              {levelArray.map(lv => (
                <label key={lv} className={styles.radio} htmlFor={lv}>
                  <input type="radio" name="level" value={lv} id={lv} defaultChecked={lv === 8} />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  {lv}
                </label>
              ))}
            </div>
          </div>
        </li>
        <li style={style.li}>
          <a href="#2" className="btn btn-default" onClick={handleClickNewGame}>New game</a>
        </li>
        <li style={style.li}>
          <a href="#2" className="btn btn-default" onClick={handleClickResolveNQueen}>resolve</a>
        </li>
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar);
