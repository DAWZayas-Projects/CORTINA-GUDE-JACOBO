import math


def maximized(game, board_and_player, depth):
    (board, player) = board_and_player
    score = game.board_score(board)
    if (game.is_finished(depth, score, board)):
        return (None, score)
    maxim = [None, -99999]
    for child in game.children_boards(board, player):
        next_move = minimized(game, (child, game.change_player(player)), depth - 1)
        if (maxim[0] is None or next_move[1] > maxim[1]):
            maxim[0] = child
            maxim[1] = next_move[1]
    return maxim


def minimized(game, board_and_player, depth):
    (board, player) = board_and_player
    score = game.board_score(board)
    if (game.is_finished(depth, score, board)):
        return (None, score)
    minim = [None, 99999]
    for child in game.children_boards(board, player):
        next_move = maximized(game, (child, game.change_player(player)), depth - 1)
        if (minim[0] is None or next_move[1] < minim[1]):
            minim[0] = child
            minim[1] = next_move[1]
    return minim


def minimax_decision(game, board_and_player, depth):
    movement, score = maximized(game, board_and_player, depth)
    print(score)
    return movement


def maximized_alfa_beta(game, board_and_player, depth, alfa, beta):
    (board, player) = board_and_player
    score = game.board_score(board)
    if (game.is_finished(depth, score, board)):
        return (None, score)
    maxim = [None, -99999]
    for child in game.children_boards(board, player):
        next_move = minimized_alfa_beta(game, (child, game.change_player(player)), depth - 1, alfa, beta)
        if (maxim[0] is None or next_move[1] > maxim[1]):
            maxim[0] = child
            maxim[1] = next_move[1]
        if (maxim[1] >= beta):
            break
        if (maxim[1] > alfa):
            alfa = maxim[1]
    return maxim


def minimized_alfa_beta(game, board_and_player, depth, alfa, beta):
    (board, player) = board_and_player
    score = game.board_score(board)
    if (game.is_finished(depth, score, board)):
        return (None, score)
    minim = [None, 99999]
    for child in game.children_boards(board, player):
        next_move = maximized_alfa_beta(game, (child, game.change_player(player)), depth - 1, alfa, beta)
        if (minim[0] is None or next_move[1] < minim[1]):
            minim[0] = child
            minim[1] = next_move[1]
        if (minim[1] <= alfa):
            break
        if (minim[1] < beta):
            beta = minim[1]
    return minim


def minimax_alfa_beta_decision(game, board_and_player, depth):
    movement, score = maximized_alfa_beta(game, board_and_player, depth, -math.inf, math.inf)
    print(score)
    return movement
