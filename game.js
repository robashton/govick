var Game = function(board) {
 this._board = board
 this._currentPlayer = BlackPlayer
 this._board.on("stone-placed", this.onStonePlaced.bind(this))
}

Game.prototype = {
  placeStone: function(x,y) {
    this._currentPlayer.move.call(this, x, y)
  },
  onStonePlaced: function() {
    this._currentPlayer = this._currentPlayer.next()
  }
}


var BlackPlayer = {
  move: function(x,y) { this._board.placeBlackStone(x,y) },
  next: function() { return WhitePlayer }
}

var WhitePlayer = {
  move: function(x,y) { this._board.placeWhiteStone(x,y) },
  next: function() { return BlackPlayer }
}


module.exports = Game
