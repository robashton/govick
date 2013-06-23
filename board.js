var libertyCalculator = require('./libertycalculator')
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore')
  , util = require('util')

var Board = function(size){
  EventEmitter.call(this)
  this._size = size
  this._grid = new Array(size * size)
  this.on("stone-placed",this.onStonePlaced.bind(this))
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
  onStonePlaced: function(x,y) {
    var colourPlaced = this.colourAt(x,y)
    this.checkForLibertyBasedRemoval(x-1,y,colourPlaced)
    this.checkForLibertyBasedRemoval(x,y-1,colourPlaced)
    this.checkForLibertyBasedRemoval(x+1,y,colourPlaced)
    this.checkForLibertyBasedRemoval(x,y+1,colourPlaced)
  },
  checkForLibertyBasedRemoval: function(x,y, colourPlaced) {
    if(!this.hasStoneAt(x,y)) return
    if (this.colourAt(x,y) === colourPlaced) return
    if (this.libertiesFor(x,y) === 0)  {
      this.removeColouredGroupContaining(x,y, colourPlaced === "black" ? "white" : "black")
    }
  },
  removeColouredGroupContaining: function(x,y, colour) {
    if(this.colourAt(x,y) !== colour) return
    this._grid[this.indexFor(x,y)] = ""
    this.removeColouredGroupContaining(x-1, y, colour)
    this.removeColouredGroupContaining(x+1, y, colour)
    this.removeColouredGroupContaining(x, y-1, colour)
    this.removeColouredGroupContaining(x, y+1, colour)
  },
  dump: function() {
    console.log(util.inspect(this._grid))
  }
}
_.extend(Board.prototype, EventEmitter.prototype)

module.exports = Board
