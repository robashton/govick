var Board = function(size){
  this.size = size
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
  }
}
module.exports = Board
