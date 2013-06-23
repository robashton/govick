var libertyCalculator = require('./libertycalculator')

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
    return !!this.colourAt(x,y)
  },
  isWhiteStoneAt: function(x,y){
    return  this.colourAt(x,y) === "white"
  },
  isBlackStoneAt: function(x,y){
    return  this.colourAt(x,y) === "black"
  },
  hasStoneWithColourAt: function(x,y,colour) {
    return  this.colourAt(x,y) === colour
  },
  colourAt: function(x,y) {
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
    return libertyCalculator(x,y,this)
  },
}
module.exports = Board
