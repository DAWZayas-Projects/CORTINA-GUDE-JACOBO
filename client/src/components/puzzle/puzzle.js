import React, {Component} from 'react';
import {connect} from 'react-redux';

import {makeMove, startGame} from '../../store/actions';

import styles from './style.css';

const mapDispatchToProps = dispatch => ({
  makeMove: payload => dispatch(makeMove(payload)),
  startGame: payload => dispatch(startGame(payload)),
});

const mapStateToProps = state => ({
  board: state.puzzle.board,
  dimension: state.puzzle.dimension,
  status: state.puzzle.status,
  winSequence: state.puzzle.winSequence,
});

const generateLayout = (dim) => {
  let numbers = [...Array(dim * dim).keys()];
  numbers = numbers.map((n) => {
    const row = Math.floor(n / dim);
    const col = n % dim;
    return [80 * col, 80 * row];
  });
  return numbers;
};


class Puzzle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dimension: parseInt(this.props.dimension),
      layout: generateLayout(this.props.dimension),
      positions: this.props.board,
    };
    this.updatePosition = this.updatePosition.bind(this);
    this.generateRandomBoard = this.generateRandomBoard.bind(this);
    this.resolvePuzzle = this.resolvePuzzle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.board && nextProps.dimension) {
      this.setState({
        dimension: parseInt(nextProps.dimension),
        layout: generateLayout(nextProps.dimension),
        positions: nextProps.board,
      });
    }
    if (nextProps.status === 1 && this.props.status === 0) {
      this.generateRandomBoard();
    }
    if (nextProps.status === 2) {
      this.resolvePuzzle(nextProps.winSequence);
      this.props.startGame({status: 1});
    }
  }

  generateRandomBoard() {
    const {positions} = this.state;
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = positions.indexOf(0);
      const targetIndex = Math.floor((Math.random() * (this.state.dimension * this.state.dimension)));
      const dif = Math.abs(targetIndex - emptyIndex);
      if (dif === 1 || dif === this.state.dimension) {
        positions[emptyIndex] = positions[targetIndex];
        positions[targetIndex] = 0;
      }
    }
    this.setState({positions});
  }

  updatePosition(e) {
    e.preventDefault();
    const index = parseInt(e.target.innerHTML);
    const {positions} = this.state;
    const emptyIndex = positions.indexOf(0);
    const targetIndex = positions.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);
    if (dif === 1 || dif === this.state.dimension) {
      positions[emptyIndex] = index;
      positions[targetIndex] = 0;
      this.setState({positions});
      this.props.makeMove({board: positions});
      // evaluar victoria *****************************************
    }
  }

  resolvePuzzle(winSequence) {
    const positions = this.state.positions.slice();
    const win = winSequence;
    let index = 0;
    for (let i = 0; i < win.length; i++) {
      const emptyIndex = positions.indexOf(0);
      index = emptyIndex;
      switch (win[i]) {
        case 'up':
          index -= this.state.dimension;
          break;
        case 'down':
          index += this.state.dimension;
          break;
        case 'left':
          index -= 1;
          break;
        case 'right':
          index += 1;
          break;
        default:
      }
      positions[emptyIndex] = positions[index];
      positions[index] = 0;
      ((pos, x) => {
        setTimeout(() => { this.setState({positions: pos}); }, (x + 1) * 400);
      })(positions.slice(), i);
    }
  }

  render() {
    return (
      <div className={styles.puzzleContainer}>
        <div className={styles.puzzleGame}>
          {this.state.positions.map((i, key) => {
            const [x, y] = this.state.layout[this.state.positions.indexOf(key)];
            return (
              <div
                key={key}
                className={key ? styles.puzzleCell : styles.puzzleCell + ' ' + styles.puzzleCellEmpty}
                onClick={this.updatePosition}
                style={{transform: `translate3d(${x}px,${y}px,0) scale(1.1)`}}
              >{key}
              </div>);
          })}
        </div>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
