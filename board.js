var Board = function(size){
  this._size = size
  this._grid = new Array(size * size)
  this._lastMessage = ""
}
Board.prototype = {
  width: function(){
    return this._size
  },
  height: function(){
    return this._size
  },
  numberOfStones: function(){
    return 0
  },
  placeStone: function(x,y,colour) {
    if(this.hasStoneAt(x,y)) 
      return this.showErrorMessage("Stone is already placed here")
    this._grid[this.indexFor(x,y)] = colour || "white"
  },
  placeWhiteStone: function(x,y){
    this.placeStone(x,y,"white")
  },
  placeBlackStone: function(x,y){
    this.placeStone(x,y,"black")
  },
  hasStoneAt: function(x,y) { 
    return !!this._grid[this.indexFor(x,y)]
  },
  isWhiteStoneAt: function(x,y){
    return this._grid[this.indexFor(x,y)] === "white"
  },
  isBlackStoneAt: function(x,y){
    return this._grid[this.indexFor(x,y)] === "black"
  },
  indexFor: function(x,y) {
    return x + y * this._size
  },
  showErrorMessage: function(message) {
    this._lastMessage = message
  },
  lastMessage: function()  {
    return this._lastMessage
  },
  libertiesFor: function(x,y) {
    var liberties = 0
    liberties += this.collectLibertiesFor(x-1, y)
    liberties += this.collectLibertiesFor(x+1, y)
    liberties += this.collectLibertiesFor(x, y+1)
    liberties += this.collectLibertiesFor(x, y-1)
    return liberties
  },
  collectLibertiesFor: function(x,y) {
    if(x < 0 || y < 0) return 0
    if(x >= this._size || y >= this._size) return 0
    return this.hasStoneAt(x,y) ? 0 : 1
  }
}
module.exports = Board
