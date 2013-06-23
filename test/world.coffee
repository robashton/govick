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

Scenario "Trying to place a stone where it will have no liberties", ->
  board = null
  ignored = false

  Given "A board with a 3x3 eye formation", ->
    board = new Board(9)
    board.placeWhiteStone(4,4)
    board.placeWhiteStone(5,4)
    board.placeWhiteStone(6,4)
    
    board.placeWhiteStone(4,5)
    board.placeWhiteStone(6,5)

    board.placeWhiteStone(4,6)
    board.placeWhiteStone(5,6)
    board.placeWhiteStone(6,6)
    board.on "stone-ignored", ->
      ignored = true

  When "Placing a stone in the middle of the eye", ->
    board.placeBlackStone(5,5)

  Then "Then there should be an error raised", ->
    ignored.should.equal(true)

Scenario "Removing a stone when it is devoid of liberties", ->
  board = null

  Given "A white stone with one liberty", ->
    board = new Board(9)
    board.placeWhiteStone(5,5)
    board.placeBlackStone(5,4)
    board.placeBlackStone(6,5)
    board.placeBlackStone(5,6)

  When "Placing a black stone on the white stone's remaining liberty", ->
    board.placeBlackStone(4,5)

  Then "The white stone should be removed from the board", ->
    board.hasStoneAt(5,5).should.equal(false)
