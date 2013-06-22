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

  setupEdge = (rowValues, columnValues) ->
    for x in rowValues
      for y in columnValues
        Given "A board with 9x9 lines", ->
          board = new Board(9)

        When "Placing a stone on edge #{x}x#{y}", ->
          board.placeStone(x,y)
        
        Then "The stone should have 3 liberties", ->
          board.libertiesFor(x,y).should.equal(3)

  setupEdge([0], [1..7])
  setupEdge([8], [1..7])
  setupEdge([1..7], [0])
  setupEdge([1..7], [8])


Scenario "Placing a stone in the middle of the board and asking for its liberties", ->
  board = null

  setupCell = (rowValues, columnValues) ->
    for x in rowValues
      for y in columnValues
        Given "A board with 9x9 lines", ->
          board = new Board(9)

        When "Placing a stone on middle #{x}x#{y}", ->
          board.placeStone(x,y)
        
        Then "The stone should have 4 liberties", ->
          board.libertiesFor(x,y).should.equal(4)

  setupCell([1..7], [1..7])


Scenario "The liberties of two adjacent stones", ->
  board = null

  Given "A board with 9x9 lines", ->
    board = new Board(9)

  When "Placing a stone on 5x5", ->
    board.placeStone(5,5)

  And "Placing a stone on 5x6", ->
    board.placeStone(5,6)
  
  Then "The stone 5x5 should have 3 liberties", ->
    board.libertiesFor(5,5).should.equal(3)

  Then "The stone 5x6 should have 3 liberties", ->
    board.libertiesFor(5,6).should.equal(3)
