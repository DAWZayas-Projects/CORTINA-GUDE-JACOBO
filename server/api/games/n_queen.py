
class N_Queens_Game:

    def __init__(self, dimension):
        self.board = []
        self.dimension = dimension

    def generate_board(self):
        self.board = [[0 for x in range(self.dimension)] for y in range(self.dimension)]

    def print_solution(self):
        for i in range(self.dimension):
            print(self.board[i])
        print("----------------------------------------------------")

    def place_queens(self, queen):
        if (queen == self.dimension):
            return True
        for row in range(self.dimension):
            if (N_Queens_Game.is_legal_move(self, row, queen)):
                self.board[row][queen] = 1
                result = N_Queens_Game.place_queens(self, queen + 1)
                if (result):
                    return True
                self.board[row][queen] = 0
        return False

    def is_legal_move(self, row, column):
        for i in range(column):
            if (self.board[row][i] == 1):
                return False
        first = [x for x in range(row, -1, -1)]
        second = [x for x in range(column, -1, -1)]
        for i, j in zip(first, second):
            if (self.board[i][j] == 1):
                return False
        first = [x for x in range(row, self.dimension)]
        second = [x for x in range(column, -1, -1)]
        for i, j in zip(first, second):
            if (self.board[i][j] == 1):
                return False
        return True
