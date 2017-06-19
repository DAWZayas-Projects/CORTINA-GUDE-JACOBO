import json

from server.api.algorithms.adversial import minimax_decision, minimax_alfa_beta_decision


class Connect4_Game:

    def __init__(self):
        self.rows = 6
        self.columns = 7
        self.status = 0
        self.depth = 4
        self.score = 100000
        self.player = 1
        self.board = []
        self.algorithm = 'minimax'

    def generate_board(self):
        self.board = [[None for x in range(self.columns)] for y in range(self.rows)]

    def is_finished(self, depth, score, board):
        if (depth == 0 or score == self.score or score == -self.score or Connect4_Game.is_board_full(self, board)):
            return True
        return False

    def is_board_full(self, board):
        for i in range(self.columns):
            if (board[0][i] is None):
                return False
        return True

    def change_turn(self):
        self.player = 1 if self.player == 2 else 2

    def change_player(self, player):
        return 1 if player == 2 else 2

    def make_move(self, column, board):
        if (self.board[0][column] is None and column >= 0 and column < self.columns):
            for y in range(self.rows - 1, -1, -1):
                if (board[y][column] is None):
                    board[y][column] = self.player
                    break
            return True
        else:
            return False

    def make_internal_move(self, column, board, player):
        if (self.board[0][column] is None and column >= 0 and column < self.columns):
            for y in range(self.rows - 1, -1, -1):
                if (board[y][column] is None):
                    board[y][column] = player
                    break
            return True
        else:
            return False

    def ai_movement(self):
        if not Connect4_Game.is_game_over(self):
            if self.algorithm == 'minimax':
                ai_move = minimax_decision(self, (self.board, self.player), self.depth)
            else:
                ai_move = minimax_alfa_beta_decision(self, (self.board, self.player), self.depth)
            self.board = ai_move
            Connect4_Game.change_turn(self)
            Connect4_Game.print_board(self, self.board)
            # Connect4_Game.make_move(self, ai_move, self.board)
            return ai_move

    def player_movement(self):
        if not Connect4_Game.is_game_over(self):
            player_move = input("Column move?")
            player_move = int(player_move)
            Connect4_Game.make_move(self, player_move, self.board)
            Connect4_Game.change_turn(self)
            Connect4_Game.print_board(self, self.board)

    def player_movement_remote(self, move):
        if not Connect4_Game.is_game_over(self):
            if move is not None:
                player_move = int(move)
                Connect4_Game.make_move(self, player_move, self.board)
                if Connect4_Game.is_game_over(self):
                    return {'status': self.status, 'board': self.board}
                else:
                    Connect4_Game.change_turn(self)
                    ai_move = Connect4_Game.ai_movement(self)
                    Connect4_Game.is_game_over(self)
                    return {'status': self.status, 'board': ai_move}
            else:
                ai_move = Connect4_Game.ai_movement(self)
                Connect4_Game.is_game_over(self)
                return {'status': self.status, 'board': ai_move}

    def children_boards(self, board, player):
        children = []
        for column in range(self.columns):
            new_board = self.clone_board(board)
            if (Connect4_Game.make_internal_move(self, column, new_board, player)):
                children.append(new_board)
        return children

    def clone_board(self, board):
        return [row[:] for row in board]

    def print_board(self, board):
        for i in range(self.rows):
            print(board[i])
        print("----------------------------------------------------")

    def start_game(self):
        Connect4_Game.generate_board(self)
        Connect4_Game.print_board(self, self.board)
        while self.status == 0:
            Connect4_Game.player_movement(self)
            Connect4_Game.ai_movement(self)

    def is_game_over(self):
        score = Connect4_Game.board_score(self, self.board)
        if (score == -self.score):
            self.status = 1
            print("You have won!")
            return True
        if (score == self.score):
            self.status = 2
            print("Computer won!")
            return True
        if (Connect4_Game.is_board_full(self, self.board)):
            self.status = 3
            print("Tie!")
            return True
        return False

    def score_position(self, board, row, column, delta_y, delta_x):
        human_points = 0
        computer_points = 0
        for i in range(4):
            if (board[row][column] == 1):
                human_points += 1
            elif (board[row][column] == 2):
                computer_points += 1
            row += delta_y
            column += delta_x
        if (human_points == 4):
            return -self.score
        elif (computer_points == 4):
            return self.score
        else:
            return computer_points

    def board_score(self, board):
        points = 0
        vertical_points = 0
        horizontal_points = 0
        diagonal_points1 = 0
        diagonal_points2 = 0
        for row in range(self.rows - 3):
            for column in range(self.columns):
                score = Connect4_Game.score_position(self, board, row, column, 1, 0)
                if (score == self.score):
                    return self.score
                if (score == -self.score):
                    return -self.score
                vertical_points += score
        for row in range(self.rows):
            for column in range(self.columns - 3):
                score = Connect4_Game.score_position(self, board, row, column, 0, 1)
                if (score == self.score):
                    return self.score
                if (score == -self.score):
                    return -self.score
                horizontal_points += score
        for row in range(self.rows - 3):
            for column in range(self.columns - 3):
                score = Connect4_Game.score_position(self, board, row, column, 1, 1)
                if (score == self.score):
                    return self.score
                if (score == -self.score):
                    return -self.score
                diagonal_points1 += score
        for row in range(3, self.rows):
            for column in range(self.columns - 3):
                score = Connect4_Game.score_position(self, board, row, column, -1, 1)
                if (score == self.score):
                    return self.score
                if (score == -self.score):
                    return -self.score
                diagonal_points2 += score
        points = horizontal_points + vertical_points + diagonal_points1 + diagonal_points2
        return points
