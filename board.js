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
    return this.seekLibertiesAround(x,y,{},0)
  },
  seekLibertiesAround: function(x,y,visited,count) {
    if(this.touchCacheFor(x,y,visited)) return count
    var colour = this.colourAt(x,y)
    count = this.collectLibertiesFor(x-1, y, colour, visited, count)
    count = this.collectLibertiesFor(x+1, y, colour, visited, count)
    count = this.collectLibertiesFor(x, y+1, colour, visited, count)
    count = this.collectLibertiesFor(x, y-1, colour, visited, count)
    return count
  },
  touchCacheFor: function(x,y, visited) {
    var key = this.createCacheKeyFor(x,y)
    if (visited[key]) return true
    visited[key] = true
    return false
  },
  collectLibertiesFor: function(x,y, colour, visited, count) {
    if(x < 0 || y < 0) return count
    if(x >= this._size || y >= this._size) return count
    if(!this.hasStoneAt(x,y)) return count+1
    if(this.hasStoneWithColourAt(x,y, colour)) {
      return this.seekLibertiesAround(x,y, visited, count)
    }
    return count
  },
  createCacheKeyFor: function(x,y) {
    return [x,y].join(",")
  },
}
module.exports = Board
