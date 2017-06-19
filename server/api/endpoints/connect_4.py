import ast

from flask import request
from flask_restplus import Resource

from server.api.restplus import api
from server.api.games.connect_4 import Connect4_Game

from server.api.mongo.mongo import db
from bson.objectid import ObjectId


name_space = api.namespace('games/connect_4', description='things related to connec_4 game')


@name_space.route('/')
class End_Connect_4(Resource):

    def post(self):
        move = int(request.form.get("col"))
        object_id = ObjectId(request.form.get("gameId"))

        return make_move(object_id, move)
        # initial_state = ast.literal_eval(state)
        # dimension = int(request.form.get("dimension"))
        # game = N_Puzzle_Game(dimension)
        # return game.resolve_bfs(initial_state)


@name_space.route('/new/')
class End_Connect_4_new(Resource):

    def get(self):
        level = request.headers.get('level')
        algorithm = request.headers.get('algorithm')
        print(algorithm)
        firstPlayer = int(request.headers.get('firstPlayer'))
        num_level = 4
        if level == 'easy':
            num_level = 2
        elif level == 'hard':
            num_level = 6
        connect_collection = db.connect_4
        board = [[None for x in range(7)] for y in range(6)]
        new_game = {'status': 0, 'depth': num_level, 'player': firstPlayer, 'board': board, 'algorithm': algorithm}
        game_id = connect_collection.insert_one(new_game).inserted_id

        if firstPlayer == 2:
            result = make_move(game_id, None)
            return {'gameId': str(game_id), 'board': result['board']}

        return {'gameId': str(game_id), 'board': board}


def make_move(object_id, move):
    connect_collection = db.connect_4
    stored_game = connect_collection.find_one({'_id': object_id})
    game = Connect4_Game()
    game.status = stored_game['status']
    game.player = stored_game['player']
    game.depth = stored_game['depth']
    game.board = stored_game['board']
    game.algorithm = stored_game['algorithm']

    ai_move = game.player_movement_remote(move)

    connect_collection.update_one(
        {'_id': object_id},
        {'$set': {
                'status': game.status,
                'player': game.player,
                'board': game.board,
                }}, upsert=False)
    return ai_move
