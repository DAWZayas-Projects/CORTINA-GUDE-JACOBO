import ast

from flask import request
from flask_restplus import Resource

from server.api.restplus import api
from server.api.games.n_puzzle import N_Puzzle_Game


name_space = api.namespace('games/n_puzzle', description='things related to n_puzzle game')


@name_space.route('/')
class End_N_Puzzle(Resource):

    def post(self):
        state = request.form.get("state")
        initial_state = ast.literal_eval(state)
        dimension = int(request.form.get("dimension"))
        game = N_Puzzle_Game(dimension)
        return game.resolve_bfs(initial_state)
