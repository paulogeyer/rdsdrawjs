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

  draw() {
    var colorn = this.colors.length;

    fill(0, 28, 255);
    noStroke();
    // rect(this.x, this.y, 63, 236);
    rect(this.x, this.y, 63, 256);
    drawBorder(this.x, this.y, 63, 256);
    fill(255);
    textFont(fontIBM);
    text("BG", this.x+10, this.y+15);
    text("FG", this.x+42, this.y+15);

    for(var i = 0; i < colorn; i++) {
      var ci = colorn-i-1;
      fill(255);
      noStroke();
      text(this.colors[ci][0], 28, this.y+33+14*i);

      fill(this.colors[ci][1]);
      noStroke();
      rect(this.x+this.button_xoffset, this.y+this.button_yoffset+14*i,
	   this.button_width, this.button_height);
      rect(this.x+2*this.button_xoffset+29,
	   this.y+this.button_yoffset+14*i,
	   this.button_width, this.button_height);

      if(ci == this.cur_bg) {
	stroke(255,0,0);
	noFill();
	rect(this.x+this.button_xoffset, this.y+this.button_yoffset+14*i,
	     this.button_width, this.button_height);
      } else {
	drawBorder(this.x+this.button_xoffset,
		   this.y+this.button_yoffset+14*i,
		   this.button_width, this.button_height, false, true);
      }

      if(ci == this.cur_fg) {
	stroke(255,0,0);
	noFill();
	rect(this.x+2*this.button_xoffset+29,
	     this.y+this.button_yoffset+14*i,
	     this.button_width, this.button_height);
      } else {
	drawBorder(this.x+2*this.button_xoffset+29,
		   this.y+this.button_yoffset+14*i,
		   this.button_width, this.button_height, false, true);
      }
    }
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
}
