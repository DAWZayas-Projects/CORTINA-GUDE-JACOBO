import ast

from flask import request
from flask_restplus import Resource

from server.api.restplus import api
from server.api.games.n_queen import N_Queens_Game


name_space = api.namespace('games/n_queen', description='things related to n_queen game')


@name_space.route('/')
class End_N_Queen(Resource):

    def post(self):
        board = request.form.get('state')
        print(board)
        new_board = ast.literal_eval(board)
        num_queens = int(request.form.get('queens'))
        print(type(new_board))
        dimension = int(request.form.get('dimension'))
        for i in range(dimension):
            for j in range(dimension):
                if (new_board[i][j] == 0):
                    new_board[i][j] = None
        game = N_Queens_Game(dimension)
        print(new_board)
        print("hola")
        game.board = new_board
        if (game.place_queens(num_queens)):
            print("dentro")
            return {'status': 2, 'board': game.board}
        else:
            return {'status': 3, 'board': new_board}
