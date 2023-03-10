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
    if(this.isFirefox()) {
      window.alert("Unfortunately, the stereogram render doesn't work on firefox yet. At the moment Chrome/Chromium are recommended.");
    } else {
      toolbox.selectedTool = this;
      this.active = true;
      this.render();
    }
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

    return 15-color_id;
  }

  colorDepth(x,y, im) {
    var c = color(canvas.canvas.get(x,y));
    var color_id = this.similarColorDepth(c);
    var color_depth = toolbox.palette.colors[color_id][0];
    var d = 16+16*color_id;

    return d;
  }

  d(x,y, img) {
    var e = 250.0;
    var v = 800.0;
    var cd = this.colorDepth(x,y, img);
    var z = cd;
    return e*(1.0/(1.0+v/z));
  }

  getPixel(x,y,im) {
    var i = 4*(x+y*im.width);
    var p = color(im.pixels[i],
		  im.pixels[i+1],
		  im.pixels[i+2]);

    return p;
  }

  setPixel(x, y, im, p) {
    var i = 4*(x+y*im.width);
    im.pixels[i] = p.levels[0];
    im.pixels[i+1] = p.levels[1];
    im.pixels[i+2] = p.levels[2];
    im.pixels[i+3] = 255;
  }

  render() {
    var cw = this.carrier_img.width;
    var ch = this.carrier_img.height;
    var w = canvas.canvas.width;
    var h = canvas.canvas.height;

    var outImg = createGraphics(w, h);
    outImg.pixelDensity(1);

    var im_array = new Array(4*w*h);
    
    outImg.loadPixels();
    this.carrier_img.loadPixels();
    canvas.canvas.loadPixels();

    for(var x = 0; x < outImg.width; x++) {
      for(var y = 0; y < outImg.height; y++) {
	var p;
	var d = round(this.d(x, y, canvas.canvas));
	var idx = 4*(x+y*w);
	if(x < d) {
	  p = color(this.getPixel((x % cw), (y % ch), this.carrier_img));
	} else {
	  var xidx = 4*(x-d+y*w);
	  p = color(outImg.pixels[xidx],
		    outImg.pixels[xidx+1],
		    outImg.pixels[xidx+2]);
	}

	outImg.pixels[idx] = p.levels[0];
	outImg.pixels[idx+1] = p.levels[1];
	outImg.pixels[idx+2] = p.levels[2];
	outImg.pixels[idx+3] = 255;
      }
    }

    outImg.updatePixels();

    console.log("done");
    cImg = outImg;
  }
}
