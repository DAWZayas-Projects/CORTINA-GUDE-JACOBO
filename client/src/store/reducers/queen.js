import * as ActionTypes from '../actionTypes';

const initialState = {dimension: 8, status: -1, queens: 0, board: []};
export const queen = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DO_RESOLVE_N_QUEEN_GAME_SUCCESS:
      return {...state, board: action.payload.board, status: action.payload.status, queens: 0};
    case ActionTypes.DO_UPDATE_MOVE_N_QUEEN_GAME:
      return {...state, board: action.payload.board, queens: action.payload.queens};
    case ActionTypes.DO_NEW_N_QUEEN_GAME: {
      const newBoard = [];
      const dimension = action.payload.dimension;
      for (let r = 0; r < dimension; r++) {
        const row = [];
        for (let c = 0; c < dimension; c++) {
          row.push(0);
        }
        newBoard.push(row);
      }
      return {...state, status: 0, dimension, board: newBoard, queens: 0};
    }
    default:
      return state;
  }
};
