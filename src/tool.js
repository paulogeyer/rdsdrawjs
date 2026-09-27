function pointInPoly(pts, x, y) {
  var inside = false;
  for(var i = 0, j = pts.length-1; i < pts.length; j = i++) {
    var xi = pts[i][0], yi = pts[i][1];
    var xj = pts[j][0], yj = pts[j][1];
    if(((yi > y) != (yj > y)) && (x < (xj-xi)*(y-yi)/(yj-yi || 1e-9)+xi))
      inside = !inside;
  }
  return inside;
}

function paintLinearPoly(gfx, pts, cs, sn, ids, profile) {
  if(!pts || pts.length < 3 || !ids.length)
    return;
  var minx = pts[0][0], maxx = minx, miny = pts[0][1], maxy = miny;
  var lo = Infinity, hi = -Infinity;
  for(var i = 0; i < pts.length; i++) {
    var px = pts[i][0], py = pts[i][1];
    if(px < minx) minx = px;
    if(px > maxx) maxx = px;
    if(py < miny) miny = py;
    if(py > maxy) maxy = py;
    var pr = px*cs+py*sn;
    if(pr < lo) lo = pr;
    if(pr > hi) hi = pr;
  }
  var span = hi-lo || 1;
  var x0 = Math.max(0, Math.floor(minx));
  var y0 = Math.max(0, Math.floor(miny));
  var x1 = Math.min(gfx.width-1, Math.ceil(maxx));
  var y1 = Math.min(gfx.height-1, Math.ceil(maxy));
  gfx.loadPixels();
  var pix = gfx.pixels;
  var w = gfx.width;
  var cols = [];
  for(var i = 0; i < ids.length; i++)
    cols.push(toolbox.palette.colors[ids[i]][1].levels);
  var n = cols.length;
  for(var y = y0; y <= y1; y++) {
    for(var x = x0; x <= x1; x++) {
      if(!pointInPoly(pts, x+0.5, y+0.5))
        continue;
      var t = ((x*cs+y*sn)-lo)/span;
      if(t < 0) t = 0;
      if(t > 0.9999) t = 0.9999;
      if(profile == 'tube')
        t = Math.sin(Math.PI*t);
      else if(typeof surfaceType != 'undefined' && surfaceType == 'ROUND')
        t = 0.5-0.5*Math.cos(Math.PI*t);
      var col = cols[Math.floor(t*n)];
      var i = 4*(x+y*w);
      pix[i] = col[0];
      pix[i+1] = col[1];
      pix[i+2] = col[2];
      pix[i+3] = 255;
    }
  }
  gfx.updatePixels();
}

class Tool {
  icon;
  name;
  desc;

  mouseOver() {
    if(mouseX > this.x && mouseX < this.x+32 &&
       mouseY > this.y && mouseY < this.y+32) {
      STATUS_MSG = this.desc;
    }
  }
}
