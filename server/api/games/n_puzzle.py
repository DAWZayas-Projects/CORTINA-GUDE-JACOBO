from server.api.utils.node import Node
from server.api.algorithms.uninformed_search import breadth_first_search
from server.api.algorithms.informed_search import a_star


class N_Puzzle_Game:

    def __init__(self, dimension):
        self.dimension = dimension
        self.bfs_moves = 0
        self.a_star_moves = 0
        N_Puzzle_Game.board_positions(self)
        N_Puzzle_Game.goal_state(self)
        N_Puzzle_Game.board_sides(self)

    def board_positions(self):
        self.board_positions = {}
        index = 0
        for i in range(self.dimension):
            for j in range(self.dimension):
                self.board_positions[index] = [i, j]
                index += 1
        return self.board_positions

    def goal_state(self):
        self.goal_state = []
        for i in range(self.dimension * self.dimension):
            self.goal_state.append(i)
        return self.goal_state

    def board_sides(self):
        self.sides = {}
        squares = self.dimension * self.dimension
        self.sides["up"] = list(range(self.dimension))
        self.sides["down"] = list(range(squares - self.dimension, squares))
        self.sides["left"] = []
        for i in range(self.dimension):
            self.sides["left"].append(i * self.dimension)
        self.sides["right"] = []
        for i in range(self.dimension):
            self.sides["right"].append(i * self.dimension + self.dimension - 1)
        return self.sides

    def allowed_movements(self, state):
        allowed = []
        index = state.index(0)
        if index not in self.sides["up"]:
            allowed.append("up")
        if index not in self.sides["down"]:
            allowed.append("down")
        if index not in self.sides["left"]:
            allowed.append("left")
        if index not in self.sides["right"]:
            allowed.append("right")
        return allowed

    def new_state(self, state, action):
        new_state = state[:]
        index = state.index(0)
        displacement = None
        if action == "up":
            displacement = - self.dimension
        if action == "down":
            displacement = self.dimension
        if action == "left":
            displacement = -1
        if action == "right":
            displacement = 1
        new_state[index + displacement], new_state[index] = new_state[index], new_state[index + displacement]
        return new_state

    def heuristic(self, state):
        board_pos = self.board_positions
        distance = 0
        for index, number in enumerate(state):
            # print(board_pos[index], board_pos[number])
            distance += abs(board_pos[index][0] - board_pos[number][0]) + abs(board_pos[index][1] - board_pos[number][1])
        return distance

    def resolve_bfs(self, initial_state):
        return breadth_first_search(initial_state, self.goal_state, self)

    def resolve_a_star(self, initial_state):
        return a_star(initial_state, self.goal_state, self)

    def expand_node(self, node):
        """Returns a list of expanded nodes"""
        expanded_nodes = []
        movements = N_Puzzle_Game.allowed_movements(self, node.state)
        for move in movements:
            expanded_nodes.append(Node(N_Puzzle_Game.new_state(self, node.state, move), node, move, node.depth + 1, node.cost + 1))
        return expanded_nodes
