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
  placeStone: function(x,y) {
    if(this.hasStoneAt(x,y)) 
      return this.showErrorMessage("Stone is already placed here")
    this._grid[this.indexFor(x,y)] = true
  },
  hasStoneAt: function(x,y) { 
    return this._grid[this.indexFor(x,y)]
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
    if(this.isTopLeft(x,y))
      return 2
    if(this.isTopRight(x,y))
      return 2
    if(this.isBottomLeft(x,y))
      return 2
    if(this.isBottomRight(x,y))
      return 2
    return 3
  },
  isTopLeft: function(x,y) {
    return (x === 0 && y === 0)
  },
  isTopRight: function(x,y) {
    return (x === this._size-1 && y === 0)
  },
  isBottomLeft: function(x,y) {
    return (x === 0 && y === this._size-1)
  },
  isBottomRight: function(x,y) {
    return (x === this._size-1 && y === this._size-1)
  }
}
module.exports = Board
