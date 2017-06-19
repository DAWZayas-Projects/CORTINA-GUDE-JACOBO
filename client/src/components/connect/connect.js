import React, {Component} from 'react';
import {connect} from 'react-redux';

import {makeMoveConnect, newConnectGame} from '../../store/actions';

import styles from './style.css';

const mapDispatchToProps = dispatch => ({
  makeMoveConnect: payload => dispatch(makeMoveConnect(payload)),
  newConnectGame: () => dispatch(newConnectGame()),
});

const mapStateToProps = state => ({
  board: state.connect.board,
  rows: state.connect.rows,
  cols: state.connect.cols,
  status: state.connect.status,
  gameId: state.connect.gameId,
});

class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };

    // Bind play function to App component
    this.play = this.play.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      this.setState({
        board: nextProps.board,
      });
    }
  }

  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    const board = [];
    for (let r = 0; r < 6; r++) {
      const row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null);
      }
      board.push(row);
    }

    this.setState({
      board,
    });
  }

  play(c) {
    if (this.props.status === 0) {
      // Place piece on board
      const board = this.state.board;
      if (board[0][c]) {
        return;
      }
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = 1;
          break;
        }
      }
      this.setState({
        board,
      });
      this.props.makeMoveConnect({col: c, gameId: this.props.gameId});
    }
  }

  componentWillMount() {
    this.initBoard();
  }

  render() {
    return (
      <div>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>

        <div className="jumbotron">
          <h2 className="message">
            {this.props.status === 1 ? 'You win!!' :
              this.props.status === 2 ? 'Computer wins!!' :
              this.props.status === 3 ? 'Tie!!' : null}</h2>
        </div>
      </div>
    );
  }
}

// Row component
const Row = ({row, play}) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
    </tr>
  );
};

const Cell = ({value, columnIndex, play}) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }

  return (
    <td>
      <div className={styles.cell} onClick={() => { play(columnIndex); }}>
        <div className={color === 'white' ? styles.white : color === 'red' ? styles.red : styles.yellow}></div>
      </div>
    </td>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
