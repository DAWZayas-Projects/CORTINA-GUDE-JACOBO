from server.api.utils.node import Node
import time


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


def breadth_first_search(start, goal, game):
    frontier = []
    frontier.append(create_node(start, None, None, 0, 0))
    frontier_set = set()
    explored = set()
    while len(frontier) > 0:
        node = frontier.pop(0)
        explored.add(str(node.state))
        if node.state == goal:
            print("bfs eplored: ", len(explored))
            return get_solution_movements(node)
        for neighbor in game.expand_node(node):
            str_n = str(neighbor.state)
            if str_n not in explored and str_n not in frontier_set:
                frontier.append(neighbor)
                frontier_set.add(str(neighbor.state))
    return None


def depth_first_search(start, goal, f_expand_node):
    frontier = []
    frontier.append(create_node(start, None, None, 0, 0))
    frontier_set = set()
    explored = set()
    while len(frontier) > 0:
        time.sleep(3)
        node = frontier.pop()
        print("node")
        print("frontier")
        print(frontier)
        explored.add(str(node.state))
        if node.state == goal:
            return get_solution_movements(node)
        for neighbor in f_expand_node(node, frontier):
            print("sons")
            str_n = str(neighbor.state)
            if str_n not in explored and str_n not in frontier_set:
                frontier.append(neighbor)
                frontier_set.add(str(neighbor.state))
    return None
