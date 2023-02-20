class RDSCanvas {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.canvas = createGraphics(w, h);
    this.canvas.background(0);
  }

  draw() {
    image(this.canvas, this.x, this.y);
    drawBorder(this.x, this.y, this.w, this.h);
  }
}
