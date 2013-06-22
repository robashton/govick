Board = require '../board'

Scenario "Placing a stone on the corner and asking for its liberties", ->
  setupCorner = (x, y) ->
    board = null

    Given "A board with 9x9 lines", ->
      board = new Board(9)

    When "Placing a stone on corner #{x}x#{y}", ->
      board.placeStone(x,y)
     
    Then "The stone should have 2 liberties", ->
      board.libertiesFor(x,y).should.equal(2)

  setupCorner(0,0)
  setupCorner(0,8)
  setupCorner(8,8)
  setupCorner(8,0)

Scenario "Placing a stone on a wall and asking for its liberties", ->
  board = null

  Given "A board with 9x9 lines", ->
    board = new Board(9)

  When "Placing a stone on intersection 0x5", ->
    board.placeStone(0,5)

  Then "The stone should have 3 liberties", ->
    board.libertiesFor(0,5).should.equal(3)



