Game = require("../game")
Board = require("../board")

Scenario "Making the first move in a game", ->
  game = null
  board = new Board(9)

  Given "The game has not started", ->
    game = new Game(board)

  When "The first move is made", ->
    game.placeStone(5,5)

  Then "The first stone placed is black", ->
   board.isBlackStoneAt(5,5).should.equal(true) 
