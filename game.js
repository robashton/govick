var Game = function(board) {
 this._board = board
 this._currentPlayer = "black"
 this._board.on("stone-placed", this.onStonePlaced.bind(this))
}

Game.prototype = {
  placeStone: function(x,y) {
    if (this._currentPlayer === "black") { 
      this._board.placeBlackStone(x,y)
    } else {
      this._board.placeWhiteStone(x,y)
    }
  },
  onStonePlaced: function() {
    this._currentPlayer = this._currentPlayer === "black" ? "white" : "black"
  }
}
module.exports = Game
