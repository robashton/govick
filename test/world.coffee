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

Scenario "Placing a single stone on the board", ->
  board = null

  Given "A board with 9x9 lines", ->
    board = new Board(9)

  When "Placing a stone on intersection 0x0", ->
    board.placeStone(0,0)

  Then "The stone should be placed on intersection 0x0", ->
    board.hasStoneAt(0,0).should.equal(true)

Scenario "Trying to place a stone where there already is a stone", ->
  board = null
  ignored = false

  Given "A board with 9x9 lines", ->
    board = new Board(9)
    board.on "stone-ignored", ->
      ignored = true

  When "Placing a stone on intersection 0x0", ->
    board.placeStone(0,0)

  And "Placing another stone on intersection 0x0", ->
    board.placeStone(0,0)

  Then "Then there should be an error raised", ->
    ignored.should.equal(true)


