import * as ActionTypes from '../actionTypes';

const initialState = {dimension: 3, status: 0, board: [0, 1, 2, 3, 4, 5, 6, 7, 8], winSequence: []};
export const puzzle = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DO_GENERATE_PUZZLE: {
      const dim = action.payload.dimension;
      const newBoard = [...Array(dim * dim).keys()];
      return {...state, dimension: dim, board: newBoard, status: 0};
    }
    case ActionTypes.DO_RESOLVE_PUZZLE_BFS:
      return {...state};
    case ActionTypes.DO_RESOLVE_PUZZLE_SUCCESS:
      return {...state, winSequence: action.payload.winSequence, status: 2};
    case ActionTypes.DO_RESOLVE_PUZZLE_ASTAR:
      return {...state};
    case ActionTypes.DO_MAKE_MOVE:
      return {...state, board: action.payload.board};
    case ActionTypes.DO_START_GAME:
      return {...state, status: action.payload.status};
    default:
      return state;
  }
};
