import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import {server as serverConfig} from '../../../config';

export const makeMoveConnect = action$ => action$
    .ofType(ActionTypes.DO_MAKE_MOVE_CONNECT)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/app/games/connect_4/`, payload)
      .map(res => res.response)
      .map(game => ({
        type: ActionTypes.DO_MAKE_MOVE_CONNECT_SUCCESS,
        payload: {board: game.board, status: game.status},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.DO_MAKE_MOVE_CONNECT_ERROR,
          payload: {error},
        },
      )),
    );

export const startNewConnectGame = action$ => action$
    .ofType(ActionTypes.DO_NEW_CONNECT_GAME)
    .switchMap(({payload}) => Observable
      .ajax.get(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/app/games/connect_4/new/`, payload)
      .map(res => res.response)
      .map(game => ({
        type: ActionTypes.DO_NEW_CONNECT_GAME_SUCCESS,
        payload: {gameId: game.gameId, board: game.board},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.DO_NEW_CONNECT_GAME_ERROR,
          payload: {error},
        },
      )),
    );
