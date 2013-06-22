var Board = function(size){
  this.size = size
  this.grid = new Array(size * size)
}
Board.prototype = {
  width: function(){
    return this.size
  },
  height: function(){
    return this.size
  },
  numberOfStones: function(){
    return 0
  },
  placeStone: function(x,y) {
    this.grid[this.indexFor(x,y)] = true
  },
  hasStoneAt: function(x,y) { 
    return this.grid[this.indexFor(x,y)]
  },
  indexFor: function(x,y) {
    return x + y * this.size
  }
}
module.exports = Board
