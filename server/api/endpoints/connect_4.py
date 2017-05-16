import ast

from flask import request
from flask_restplus import Resource

from server.api.restplus import api
from server.api.games.connect4 import Connect4_Game


name_space = api.namespace('games/connect_4', description='things related to connec_4 game')


@name_space.route('/')
class End_Connect_4(Resource):

    def post(self):
        
