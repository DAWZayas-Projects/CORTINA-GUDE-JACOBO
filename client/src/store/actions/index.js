import * as ActionTypes from '../actionTypes';

export const generatePuzzle = payload => ({
  type: ActionTypes.DO_GENERATE_PUZZLE,
  payload,
});

export const resolvePuzzleBFS = payload => ({
  type: ActionTypes.DO_RESOLVE_PUZZLE_BFS,
  payload,
});

export const resolvePuzzleAStar = payload => ({
  type: ActionTypes.DO_RESOLVE_PUZZLE_ASTAR,
  payload,
});

export const makeMove = payload => ({
  type: ActionTypes.DO_MAKE_MOVE,
  payload,
});

export const startGame = payload => ({
  type: ActionTypes.DO_START_GAME,
  payload,
});

export const makeMoveConnect = payload => ({
  type: ActionTypes.DO_MAKE_MOVE_CONNECT,
  payload,
});

export const newConnectGame = payload => ({
  type: ActionTypes.DO_NEW_CONNECT_GAME,
  payload,
});

export const newNQueenGame = payload => ({
  type: ActionTypes.DO_NEW_N_QUEEN_GAME,
  payload,
});

export const resolveNQueenGame = payload => ({
  type: ActionTypes.DO_RESOLVE_N_QUEEN_GAME,
  payload,
});

export const updateMoveNQueen = payload => ({
  type: ActionTypes.DO_UPDATE_MOVE_N_QUEEN_GAME,
  payload,
});
