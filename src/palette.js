class Palette {
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
    drawBorder(this.x, this.y, 63, 256);
    fill(255);
    textFont(fontIBM);
    text("BG", this.x+10, this.y+13);
    text("FG", this.x+42, this.y+13);

    for(var i = 0; i < colorn; i++) {
      var ci = colorn-i-1;
      fill(this.colors[ci][1]);
      noStroke();
      rect(this.x+6, this.y+22+13*i, 18, 8);
      rect(this.x+40, this.y+22+13*i, 18, 8);

      if(ci == this.cur_bg) {
	stroke(255,0,0);
	noFill();
	rect(this.x+6, this.y+22+13*i, 18, 8);
      }

      if(ci == this.cur_fg) {
	stroke(255,0,0);
	noFill();
	rect(this.x+40, this.y+22+13*i, 18, 8);
      }
    }
  }
}
