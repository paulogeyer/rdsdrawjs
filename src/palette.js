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
  }

  draw() {
    var colorn = this.colors.length;
    for(var i = 0; i < colorn; i++) {
      fill(this.colors[colorn-i-1][1]);
      noStroke();
      rect(this.x+8, this.y+14*i, 20, 10);
      rect(this.x+38, this.y+14*i, 20, 10);
    }
  }
}
