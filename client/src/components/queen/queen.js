import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateMoveNQueen} from '../../store/actions';

import styles from './style.css';

const mapDispatchToProps = dispatch => ({
  updateMove: payload => dispatch(updateMoveNQueen(payload)),
});

const mapStateToProps = state => ({
  board: state.queen.board,
  dimension: state.queen.dimension,
  queens: state.queen.queens,
  status: state.queen.status,
});

class Queen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      dimension: this.props.dimension,
      queens: 0,
    };

    // Bind play function to App component
    this.play = this.play.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      console.log('board ' + nextProps.board)
      this.setState({
        board: nextProps.board,
        queens: nextProps.queens,
      });
    }
  }

  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    const board = [];
    for (let r = 0; r < this.state.dimension; r++) {
      const row = [];
      for (let c = 0; c < this.state.dimension; c++) {
        row.push(0);
      }
      board.push(row);
    }

    this.setState({
      board,
    });
  }

  canPlace(row, column) {
    const board = this.state.board.slice();
    let valid = true;
    for (let i = 0; i < column; i++) {
      if (board[row][i] === 1 || board[row][i] === 2) {
        board[row][i] = 2;
        setTimeout(() => {
          board[row][i] = 1;
          this.setState({board});
        }, 1000);
        valid = false;
        break;
      }
    }
    for (let i = row, j = column; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1 || board[i][j] === 2) {
        board[i][j] = 2;
        setTimeout(() => {
          board[i][j] = 1;
          this.setState({board});
        }, 1000);
        valid = false;
        break;
      }
    }
    for (let i = row, j = column; i < board.length && j >= 0; i++, j--) {
      if (board[i][j] === 1 || board[i][j] === 2) {
        board[i][j] = 2;
        setTimeout(() => {
          board[i][j] = 1;
          this.setState({board});
        }, 1000);
        valid = false;
        break;
      }
    }
    if (valid) {
      board[row][column] = 1;
      this.props.updateMove({board, queens: this.state.queens + 1});
    }
    this.setState({
      board,
      // queens: valid ? this.state.queens + 1 : this.state.queens,
    });
  }

  play(column, row) {
    if (this.props.status === 0) {
      // Place piece on board
      const board = this.state.board;
      if (board[row][column] === 1 || board[row][column] === 2) {
        board[row][column] = 0;
        this.props.updateMove({board, queens: this.state.queens - 1});
        this.setState({
          board,
          // queens: this.state.queens - 1,
        });
      } else {
        this.canPlace(row, column);
      }
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
            {this.state.board.map((row, i) => (<Row key={i} row={row} rowIndex={i} play={this.play} />))}
          </tbody>
        </table>

        <h2 className="message">
          {this.props.status === 1 ? 'You win!!' :
            this.props.status === 2 ? 'Resolved by AI' :
            this.props.status === 3 ? 'No solution with this positions' : null}</h2>
      </div>
    );
  }
}

// Row component
const Row = ({row, play, rowIndex}) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} rowIndex={rowIndex} play={play} />)}
    </tr>
  );
};

const Cell = ({value, columnIndex, rowIndex, play}) => {
  let color = 'whit';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }

  return (
    <td style={{padding: '0px'}}>
      <div className={
        (rowIndex % 2 === 0 && columnIndex % 2 === 0) ||
        (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) ? styles.cellDark :
        styles.cellSoft} onClick={() => { play(columnIndex, rowIndex); }}
      >
        {color === 'yellow' ?
          (<img
            src="../../../static/images/red_queen.png"
            style={{width: '60px'}}
          />) : null}
        {color === 'red' ?
          (<img
            src="../../../static/images/white_queen.png"
            style={{width: '60px'}}
          />) : null}

      </div>
    </td>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Queen);
