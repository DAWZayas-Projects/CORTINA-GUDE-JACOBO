from flask import Flask, Blueprint, request
from flask_restplus import Resource
from flask_cors import CORS, cross_origin

from server.api.endpoints.n_puzzle import name_space as n_puzzle_namespace
from server.api.endpoints.connect_4 import name_space as connect_4_namespace
from server.api.endpoints.n_queen import name_space as n_queen_namespace
from server.api.restplus import api
# from server.api.games.connect_42 import Connect4_Game
# from server.api.games.n_queen import N_Queens_Game


app = Flask(__name__)
CORS(app)


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        print(">>>>>>>", request.form.get("hola"))
        return {'hello': 'world'}


def initialize_app(flask_app):
    blueprint = Blueprint('app', __name__, url_prefix='/app')
    api.init_app(blueprint)
    api.add_namespace(n_puzzle_namespace)
    api.add_namespace(connect_4_namespace)
    api.add_namespace(n_queen_namespace)
    flask_app.register_blueprint(blueprint)


def main():
    initialize_app(app)
    print('>>>>> Starting development server at http://{}/')
    app.run(debug=True)


if __name__ == '__main__':
    main()
