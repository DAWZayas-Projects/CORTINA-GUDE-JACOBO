import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import {server as serverConfig} from '../../../config';

export const resolveNQueen = action$ => action$
    .ofType(ActionTypes.DO_RESOLVE_N_QUEEN_GAME)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/app/games/n_queen/`, payload)
      .map(res => res.response)
      .map(game => ({
        type: ActionTypes.DO_RESOLVE_N_QUEEN_GAME_SUCCESS,
        payload: {board: game.board, status: game.status},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.DO_RESOLVE_N_QUEEN_GAME_ERROR,
          payload: {error},
        },
      )),
    );
