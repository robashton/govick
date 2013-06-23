module.exports = function(x,y, board) {
  var visited = {}
    ,  count = 0
    , colour = board.colourAt(x,y)

  collectLibertiesAround(x,y)
  return count

  function collectLibertiesAround(x, y) {
    collectLibertiesFor(x-1, y)
    collectLibertiesFor(x+1, y)
    collectLibertiesFor(x, y+1)
    collectLibertiesFor(x, y-1)
  }

  function touchCacheFor(x,y) {
    var key = createCacheKeyFor(x,y)
    if (visited[key]) return true
    visited[key] = true
    return false
  }

  function collectLibertiesFor(x,y) {
    if(x < 0 || y < 0) return
    if(x >= board.width() || y >= board.height()) return
    if(touchCacheFor(x,y)) return
    if(!board.hasStoneAt(x,y)) return count++
    if(board.hasStoneWithColourAt(x,y, colour)) 
      return collectLibertiesAround(x,y)
  }

  function createCacheKeyFor(x,y) {
    return [x,y].join(",")
  }
}
