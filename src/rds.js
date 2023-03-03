class RDS extends Tool {
  carrier_img = loadImage('carrier_img.png');
  icon = loadImage('icons/rds.png');
  name = 'rds';
  desc = 'RDS GENERATION: make a 3D-Image';
  active = false;

  constructor() {
    super();
  }

  click() {
    // window.alert("generate stuff");
    console.log("active: "+this.active);
    this.active = true;
    console.log("active: "+this.active);
    this.render();
  }

  keyPressed() {
    // deactivate RDS
    if(keyCode == 27)
      this.active = false;
  }

  colorDepth(x,y) {
    var c = color(canvas.canvas.get(x,y));
    var d = 0;

    for(var i = 0; i < toolbox.palette.colors.length; i++) {
      if(c.toString() == toolbox.palette.colors[i][1].toString()) {
	return i;
      }
    }

    console.log("x: "+x);
    console.log("y: "+y);
    console.log("c: "+c.toString())

    return 0;
  }

  d(x,y) {
    var e = 60.0;
    var v = 800.0;
    var z = 100.0+map(this.colorDepth(x,y), 0, 15, 0, 255);
    // console.log("z: "+z);
    return e*(1.0/(1.0+v/z));
  }

  render() {
    // var w = 66+574;
    var w = canvas.canvas.width;
    var h = canvas.canvas.height;
    var outImg = createGraphics(w, h);
    outImg.background('red');
    console.log("do stuff here");

    outImg.loadPixels();

    for(var x = 0; x < w; x++) {
      for(var y = 0; y < h; y++) {
	var d = this.d(x,y);
	// console.log("d: "+d);
	// console.log("x: "+x);
	// console.log("y: "+y);
	if(x < d) {
	  // console.log("x < d");
	  var p = this.carrier_img.get((x % this.carrier_img.width), (y % this.carrier_img.height));
	} else {
	  // console.log("x >= d");
	  console.log("d: "+d);
	  console.log("x: "+x);
	  console.log("y: "+y);
	  var p = outImg.get(x-d, y);
	}
	// console.log(p.toString());
	outImg.set(x, y, color(p));
      }
    }

    outImg.updatePixels();

    console.log("done");
    cImg = outImg;
    // noLoop();
  }
}
