Board = require "../board"

Scenario "Creating and empty board", ->
  board = null

  Given "No game has been started", ->
    ""

  When "We create 9x9 board", ->
    board = new Board(9)

  Then "The board should have a width of 9", ->
    board.width().should.equal(9)

  And "The board should have a height of 9", ->
    board.height().should.equal(9)

  And "The board should have no stones on it", ->
    board.numberOfStones().should.equal(0)

