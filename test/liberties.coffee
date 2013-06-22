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

