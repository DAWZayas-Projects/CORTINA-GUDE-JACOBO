class Node:
    def __init__(self, state, parent, movement, depth, cost):
        self.state = state
        self.parent = parent
        self.movement = movement
        self.depth = depth
        self.cost = cost

    def __eq__(self, other):
        return self.cost == other.cost

    def __ne__(self, other):
        return self.cost != other.cost

    def __lt__(self, other):
        return self.cost < other.cost

    def __gt__(self, other):
        return self.cost > other.cost

    def __le__(self, other):
        return self.cost <= other.cost

    def __ge__(self, other):
        return self.cost >= other.cost
