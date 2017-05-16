from server.api.utils.priority_queue import PriorityQueue
from server.api.utils.node import Node


def create_node(state, parent, movement, depth, cost):
    return Node(state, parent, movement, depth, cost)


def get_solution_movements(node):
    moves = []
    temp = node
    while temp.depth > 1:
        moves.insert(0, temp.movement)
        # display_board(temp.state)
        temp = temp.parent
    moves.insert(0, temp.movement)
    # display_board(temp.state)
    # display_board(temp.parent.state)
    return moves


def a_star(start, goal, game):
    frontier = PriorityQueue()
    frontier.put(0, create_node(start, None, None, 0, 0))
    explored = set()
    while not frontier.empty():
        node = frontier.get()
        explored.add(str(node.state))
        if node.state == goal:
            print("a_star eplored: ", len(explored))
            return get_solution_movements(node)
        for neighbor in game.expand_node(node):
            str_n = str(neighbor.state)
            neighbor_frontier_pos = frontier.position(neighbor)
            cost = neighbor.cost + game.heuristic(neighbor.state)
            if str_n not in explored and neighbor_frontier_pos == -1:
                frontier.put(cost, neighbor)
            elif neighbor_frontier_pos != -1:
                frontier.update_cost(neighbor_frontier_pos, cost, neighbor)
    return None
