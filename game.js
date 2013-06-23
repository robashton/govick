var Game = function(board) {
 this._board = board
}

Game.prototype = {
  placeStone: function(x,y) {
    this._board.placeBlackStone(x,y)
  },
}

module.exports = Game
