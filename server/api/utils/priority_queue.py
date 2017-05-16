import heapq


class PriorityQueue:
    def __init__(self):
        self.elements = []

    def empty(self):
        return len(self.elements) == 0

    def put(self, priority, node):
        heapq.heappush(self.elements, (priority, node))

    def get(self):
        return heapq.heappop(self.elements)[1]

    def position(self, node):
        pos = [index for index, item in enumerate(self.elements) if item[1].state == node.state]
        if len(pos) == 0:
            return -1
        else:
            return pos[0]

    def update_cost(self, position, cost, node):
        self.elements[position] = (cost, node)
