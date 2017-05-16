from flask import Flask, Blueprint, request
from flask_restplus import Resource

from server.api.endpoints.n_puzzle import name_space as n_puzzle_namespace
from server.api.restplus import api
# from server.api.games.connect_42 import Connect4_Game
# from server.api.games.connect_42 import Node


app = Flask(__name__)


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        print(">>>>>>>", request.form.get("hola"))
        return {'hello': 'world'}


def initialize_app(flask_app):
    blueprint = Blueprint('app', __name__, url_prefix='/app')
    api.init_app(blueprint)
    api.add_namespace(n_puzzle_namespace)
    flask_app.register_blueprint(blueprint)


def main():
    initialize_app(app)
    print('>>>>> Starting development server at http://{}/')
    app.run(debug=True)


if __name__ == '__main__':
    main()
