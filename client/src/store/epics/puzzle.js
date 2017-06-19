import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import {server as serverConfig} from '../../../config';

export const resolvePuzzleBFS = action$ => action$
    .ofType(ActionTypes.DO_RESOLVE_PUZZLE_BFS)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/app/games/n_puzzle/bfs/`, payload)
      .map(res => res.response)
      .map(game => ({
        type: ActionTypes.DO_RESOLVE_PUZZLE_SUCCESS,
        payload: {winSequence: game},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.DO_RESOLVE_PUZZLE_ERROR,
          payload: {error},
        },
      )),
    );

export const resolvePuzzleASTAR = action$ => action$
    .ofType(ActionTypes.DO_RESOLVE_PUZZLE_BFS)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/app/games/n_puzzle/astar/`, payload)
      .map(res => res.response)
      .map(game => ({
        type: ActionTypes.DO_RESOLVE_PUZZLE_SUCCESS,
        payload: {winSequence: game},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.DO_RESOLVE_PUZZLE_ERROR,
          payload: {error},
        },
      )),
    );
