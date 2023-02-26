class Pyramid extends FlatPlane {
  constructor() {
    super();
    this.icon = loadImage('icons/pyramid.png');
    this.name = 'Pyramid';
    this.desc = 'painting tool: PYRAMID';
  }

  // drawFinal() {
  //   var ids = toolbox.palette.range_ids();
  //   var l = ids.length;
  //   var maxX = this.maxX();
  //   var minX = this.minX();
  //   var midX = (minX+maxX)/2.0;
  //   var lX = maxX-minX;
  //   var maxY = this.maxY();
  //   var minY = this.minY();
  //   var midY = (minY+maxY)/2.0;
  //   var lY = maxY-minY;

  //   for(var i = 0; i < l; i++) {
  //     drawRect(this.pt1x, this.pt1y);
  //   }
  // }

  maxX() {
    return Math.max([this.pt1x, this.pt2x, this.pt3x, this.pt4x]);
  }

  minX() {
    return Math.min([this.pt1x, this.pt2x, this.pt3x, this.pt4x]);
  }

  maxY() {
    return Math.max([this.pt1y, this.pt2y, this.pt3y, this.pt4y]);
  }

  minY() {
    return Math.min([this.pt1y, this.pt2y, this.pt3y, this.pt4y]);
  }
}
