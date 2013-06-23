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

Scenario "Making the second move in a game", ->
  game = null
  board = new Board(9)

  Given "The first move in a game has been made", ->
    game = new Game(board)
    game.placeStone(5,5)

  When "The second move is made", ->
    game.placeStone(5,6)

  Then "The second stone is white", ->
   board.isWhiteStoneAt(5,6).should.equal(true)

Scenario "Trying to place the stone in the same position twice", ->
  game = null
  board = new Board(9)

  Given "The first move in a game has been made", ->
    game = new Game(board)
    game.placeStone(5,5)

  When "The second move is made to the same position", ->
    game.placeStone(5,5)
    
  And "A third move is made to a valid position", ->
    game.placeStone(5,6)

  Then "The third move placed a white stone", ->
   board.isWhiteStoneAt(5,6).should.equal(true)
