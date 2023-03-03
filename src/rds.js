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

  colorDist(c1,c2) {
    var r = Math.sqrt((c1.levels[0]-c2.levels[0])**2+
		      (c1.levels[1]-c2.levels[1])**2+
		      (c1.levels[2]-c2.levels[2])**2);
    return r;
  }

  colorDepth(x,y, im) {
    var c = color(canvas.canvas.get(x,y));
    // var c = this.getColor(x, y, im);
    var l = toolbox.palette.colors.length;
    var d = 0;

    for(var i = 0; i < l; i++) {
      // if(c.toString() == toolbox.palette.colors[i][1].toString()) {
      if(this.colorDist(c, toolbox.palette.colors[i][1]) < 170) {
	return 16*i;
      }
    }

    console.log(c);

    for(var i = 0; i < toolbox.palette.colors.length; i++) {
      console.log(this.colorDist(c, toolbox.palette.colors[i][1]));
    }

    throw "couldn't find color depth";

    return undefined;
  }

  d(x,y, img) {
    var e = 200;
    var v = 800.0;
    var cd = this.colorDepth(x,y, img);
    var z = 100.0+cd; // map(cd, 0, 15, 0, 255);
    // console.log("z: "+z);
    return e*(1.0/(1.0+v/z));
  }

  getColor(x, y, img) {
    var i = 4*(x+y*img.w);
    var c = color(img[i],
		  img[i+1],
		  img[i+2]);
    return c;
  }

  setColor(x, y, img, c) {
    // console.log(c);
    // console.log(c.levels);
    var i = 4*(x+y*img.w);
    img.pixels[i] = c.levels[0];
    img.pixels[i+1] = c.levels[1];
    img.pixels[i+2] = c.levels[2];
    img.pixels[i+3] = 255;
    return img;
  }

  render() {
    var cw = this.carrier_img.width;
    var ch = this.carrier_img.height;
    var w = canvas.canvas.width;
    var h = canvas.canvas.height;
    var outImg = createGraphics(w+cw, h);
    outImg.background('red');
    outImg.image(this.carrier_img, 0, 0);
    console.log("do stuff here");

    this.carrier_img.loadPixels();
    canvas.canvas.loadPixels();
    outImg.loadPixels();

    for(var x = cw; x < outImg.width; x++) {
      for(var y = 0; y < outImg.height; y++) {
	var d = this.d(x, y, canvas.canvas);
	/// console.log("d: "+d);
	// console.log("x: "+x);
	// console.log("y: "+y);
	if(x < d) {
	  // console.log("x < d");
	  var p = this.carrier_img.get((x % this.carrier_img.width), (y % this.carrier_img.height));
	  // var p = this.getColor((x % this.carrier_img.width),
	  // 			(y % this.carrier_img.height),
	  // 			this.carrier_img.pixels);
	  //var p = color('yellow');
	} else {
	  // console.log("x >= d");
	  // console.log("d: "+d);
	  // console.log("x: "+x);
	  // console.log("y: "+y);
	  var p = outImg.get((x-d) % w, y);
	  if(p == undefined)
	    p = color('purple');
	  // var p = this.getColor(x-d-100, y, outImg.pixels);
	  // var p = color('purple');
	}
	// console.log(p.toString());
	// outImg.set(x, y, color(p));
	// this.setColor(x, y, outImg, p);
	if(p) {
	  outImg.set(x, y, p);
	} else {
	  console.log("x: "+x);
	  console.log("y: "+x);
	  throw "undefined";
	}
      }
    }

    outImg.updatePixels();

    console.log("done");
    cImg = outImg;
    // noLoop();
  }
}
