Board = require "../board"

Scenario "Placing a white stone", ->
  board = null

  Given "A 9x9 board", ->
    board = new Board(9)

  When "A placing a white stone on the board at 5x5", ->
    board.placeWhiteStone(5,5)

  Then "The stone at 5x5 should be white", ->
    board.isWhiteStoneAt(5,5).should.equal(true)

Scenario "Placing a black stone", ->
  board = null

  Given "A 9x9 board", ->
    board = new Board(9)

  When "A placing a black stone on the board at 5x5", ->
    board.placeBlackStone(5,5)

  Then "The stone at 5x5 should be black", ->
    board.isBlackStoneAt(5,5).should.equal(true)
