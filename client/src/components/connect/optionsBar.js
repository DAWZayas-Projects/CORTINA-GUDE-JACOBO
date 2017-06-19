import React from 'react';
import {connect} from 'react-redux';

import {newConnectGame} from '../../store/actions';

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

const levelArray = ['easy', 'medium', 'hard'];
const algorithms = ['minimax', 'alphaBeta'];
const players = ['You', 'Computer'];
let level = 'medium';
let algorithm = 'minimax';
let firstPlayer = 1;

const mapDispatchToProps = dispatch => ({
  startGame: payload => dispatch(newConnectGame(payload)),
});

const mapStateToProps = state => ({
  board: state.puzzle.board,
  dimension: state.puzzle.dimension,
});

const OptionsBar = ({startGame}) => {

  const handleClickNewGame = (e) => {
    e.preventDefault();
    startGame({level, algorithm, firstPlayer});
  };

  const setLevel = (e) => {
    level = e.target.value;
  };

  const setAlgorithm = (e) => {
    algorithm = e.target.value;
  };

  const setPlayer = (e) => {
    firstPlayer = e.target.value === 'You' ? 1 : 2;
  };

  return (
    <nav className="card navbar navbar-dark">
      <ul className="nav navbar-nav" style={style.navbarNav}>
        <li style={style.li}>
          <div className="card-block z-depth-1">
            <h5>AI level</h5>
            <div id="inputLevel" onChange={setLevel}>
              {levelArray.map(lv => (
                <label key={lv} className={styles.radio} htmlFor={lv}>
                  <input type="radio" name="level" value={lv} id={lv} defaultChecked={lv === 'medium'} />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  {lv}
                </label>
              ))}
            </div>
          </div>
        </li>
        <li style={style.li}>
          <div className="card-block z-depth-1">
            <h5>AI algorithm</h5>
            <div id="inputAlgorithm" onChange={setAlgorithm}>
              {algorithms.map(al => (
                <label key={al} className={styles.radio} htmlFor={al}>
                  <input type="radio" name="algorithm" value={al} id={al} defaultChecked={al === 'minimax'} />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  {al}
                </label>
              ))}
            </div>
          </div>
        </li>
        <li style={style.li}>
          <div className="card-block z-depth-1">
            <h5>First player</h5>
            <div id="inputAlgorithm" onChange={setPlayer}>
              {players.map(pl => (
                <label key={pl} className={styles.radio} htmlFor={pl}>
                  <input type="radio" name="players" value={pl} id={pl} defaultChecked={pl === 'You'} />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  {pl}
                </label>
              ))}
            </div>
          </div>
        </li>
        <li style={style.li}>
          <a href="#2" className="btn btn-default" onClick={handleClickNewGame}>New game</a>
        </li>
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar);
