import * as ActionTypes from '../actionTypes';

const initialState = {rows: 6, cols: 7, status: -1, board: []};
export const connect = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DO_MAKE_MOVE_CONNECT:
      return {...state, status: -1};
    case ActionTypes.DO_MAKE_MOVE_CONNECT_SUCCESS:
      return {...state, board: action.payload.board, status: action.payload.status};
    case ActionTypes.DO_NEW_CONNECT_GAME_SUCCESS: {
      return {...state, status: 0, gameId: action.payload.gameId, board: action.payload.board};
    }
    default:
      return state;
  }
};
