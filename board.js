var libertyCalculator = require('./libertycalculator')
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore')

var Board = function(size){
  EventEmitter.call(this)
  this._size = size
  this._grid = new Array(size * size)
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
    if(this.hasStoneAt(x,y) || this.libertiesFor(x,y,colour) === 0) 
      return this.emit('stone-ignored', x, y)
    this._grid[this.indexFor(x,y)] = colour || "white"
    this.emit('stone-placed', x, y)
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
  libertiesFor: function(x,y,colour) {
    return libertyCalculator(x,y,this,colour)
  },
}
_.extend(Board.prototype, EventEmitter.prototype)

module.exports = Board
