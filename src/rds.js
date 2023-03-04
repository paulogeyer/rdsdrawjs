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
    if(keyCode == 27) {
      this.active = false;
      cImg = undefined;
    }
  }

  colorDist(c1,c2) {
    var r = Math.sqrt((c1.levels[0]-c2.levels[0])**2+
		      (c1.levels[1]-c2.levels[1])**2+
		      (c1.levels[2]-c2.levels[2])**2);
    return r;
  }

  similarColorDepth(c) {
    var l = toolbox.palette.colors.length;
    var color_id = undefined;
    var sim_id = Infinity;

    for(var i = 0; i < l; i++) {
      var cc = toolbox.palette.colors[i];
      var csim = this.colorDist(cc[1], c);
      if(csim < sim_id) {
	sim_id = csim;
	color_id = i;
      }
    }

    return color_id;
  }

  colorDepth(x,y, im) {
    var c = color(canvas.canvas.get(x,y));
    // var c = im.get(x,y);
    var color_id = this.similarColorDepth(c);
    // var color_depth = toolbox.palette.colors[color_id][0];
    var d = 16*color_id;

    return d;
  }

  d(x,y, img) {
    var e = 300.0;
    var v = 800.0;
    var cd = 100+this.colorDepth(x,y, img);
    var z = cd;
    return e*(1.0/(1.0+v/z));
  }

  render() {
    var cw = this.carrier_img.width;
    var ch = this.carrier_img.height;
    var w = canvas.canvas.width;
    var h = canvas.canvas.height;
    var outImg = createGraphics(w, h);
    outImg.background('gray');

    // fill the canvas with the carrier image
    for(var i = 0; i < 10; i++) {
      outImg.image(this.carrier_img, cw*i, 0);
    }

    this.carrier_img.loadPixels();
    canvas.canvas.loadPixels();
    outImg.loadPixels();

    for(var x = 0; x < outImg.width; x++) {
      for(var y = 0; y < outImg.height; y++) {
	var p;
	var d = this.d(x, y, canvas.canvas);
	if(x < d) {
	  p = this.carrier_img.get(x % cw, y);
	} else {
	  p = outImg.get(x-d, y);
	}

	outImg.set(x, y, p);
      }
    }

    outImg.updatePixels();

    console.log("done");
    cImg = outImg;
  }
}
