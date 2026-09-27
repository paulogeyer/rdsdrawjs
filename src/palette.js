class Palette {
  button_xoffset = 5;
  button_yoffset = 25;
  button_width = 18;
  button_height = 10;

  colors = [[7, color(0,255,255)],
	    [6, color(0,203,255)],
	    [5, color(0,125,255)],
	    [4, color(0,28,255)],
	    [3, color(0,36,215)],
	    [2, color(0,40,170)],
	    [1, color(0,40,105)],
	    [0, color(0,0,0)],
	    [1, color(125,0,0)],
	    [2, color(186,0,0)],
	    [3, color(255,0,0)],
	    [4, color(255,154,0)],
	    [5, color(255,203,0)],
	    [6, color(255,239,0)],
	    [7, color(255,255,158)],
	    [8, color(255,255,255)]];

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cur_fg = 15;
    this.cur_bg = 7;
  }

  layout(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.pw = w;
    this.ph = h;
    var n = this.colors.length;
    this.header = h*25/256;
    this.pitch = (h-this.header)/n;
    this.button_xoffset = w*5/63;
    this.button_width = w*18/63;
    this.button_height = this.pitch*10/14;
    this.button_yoffset = this.header;
    this.fgx = w*39/63;
    this.labelSize = Math.max(8, w*11/63);
  }

  draw() {
    var colorn = this.colors.length;
    var w = this.pw || 63;
    var h = this.ph || 256;
    var pitch = this.pitch || 14;
    var header = this.header || 25;
    var bw = this.button_width;
    var bh = this.button_height;
    var bgx = this.x+this.button_xoffset;
    var fgx = this.x+(this.fgx || 39);

    fill(0, 28, 255);
    noStroke();
    rect(this.x, this.y, w, h);
    drawBorder(this.x, this.y, w, h);
    fill(255);
    textFont(fontIBM);
    textSize(this.labelSize || 11);
    textAlign(LEFT, BASELINE);
    text("BG", this.x+w*10/63, this.y+header*0.7);
    text("FG", this.x+w*42/63, this.y+header*0.7);

    for(var i = 0; i < colorn; i++) {
      var ci = colorn-i-1;
      var by = this.y+header+pitch*i;
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      text(this.colors[ci][0], this.x+w/2, by+bh/2);

      fill(this.colors[ci][1]);
      noStroke();
      rect(bgx, by, bw, bh);
      rect(fgx, by, bw, bh);

      if(ci == this.cur_bg) {
        stroke(255, 0, 0);
        noFill();
        rect(bgx, by, bw, bh);
      } else {
        drawBorder(bgx, by, bw, bh, false, true);
      }

      if(ci == this.cur_fg) {
        stroke(255, 0, 0);
        noFill();
        rect(fgx, by, bw, bh);
      } else {
        drawBorder(fgx, by, bw, bh, false, true);
      }
    }
    textAlign(LEFT, BASELINE);
  }

  range_ids() {
    var range = Math.abs(this.cur_fg-this.cur_bg);
    var r = [];
    var start = this.cur_bg;
    var end = this.cur_fg;

    if(start >= end) {
      var op = (a,b) => a-b;
      var cmp = (a,b) => a>=b;
    } else {
      var op = (a,b) => a+b;
      var cmp = (a,b) => a<=b;
    }

    for(var i = start; cmp(i,end); i=op(i,1)) {
      r.push(i);
    }

    return r;
  }

  cur_fg_color() {
    return this.colors[this.cur_fg][1];
  }

  cur_bg_color() {
    return this.colors[this.cur_bg][1];
  }

  swatchAt(mx, my) {
    var n = this.colors.length;
    var pitch = this.pitch || 14;
    var header = this.header || this.button_yoffset;
    var bw = this.button_width;
    var bh = this.button_height;
    var bgx = this.x+this.button_xoffset;
    var fgx = this.x+(this.fgx || (2*this.button_xoffset+29));
    for(var i = 0; i < n; i++) {
      var ci = n-i-1;
      var by = this.y+header+pitch*i;
      if(my < by || my >= by+bh)
        continue;
      if(mx >= bgx && mx < bgx+bw)
        return {which: 'bg', index: ci};
      if(mx >= fgx && mx < fgx+bw)
        return {which: 'fg', index: ci};
    }
    return null;
  }
}
