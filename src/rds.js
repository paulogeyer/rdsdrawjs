class RDS extends Tool {
  carrier_img = loadImage('carrier_img.png');
  carrier_img2 = loadImage('carrimg.jpg');
  carrimg;
  icon = loadImage('icons/rds.png');
  name = 'rds';
  desc = 'RDS GENERATION: make a 3D-Image';
  active = false;

  constructor() {
    super();

    this.carrimg = createGraphics(canvas.w, canvas.h);
    this.carrimg.loadPixels();
    for(var x = 0; x < canvas.w; x++) {
      for(var y = 0; y < canvas.h; y++) {
	this.carrimg.set(x, y, color(128*((noise(400*x,400*y) % 2)+(noise(x/8,y/8) % 4)),
				     128*((noise(x/10,y/10) % 2)+(noise(x/3,y/3) % 2)),
				     128*((noise(70*x+10,70*y+10) % 9)+(noise(70*x,70*y) % 6))));
	// this.carrimg.set(x, y, color('red'));
      }
    }
    this.carrimg.updatePixels();
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

    return (15-color_id);
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
    var e = 250.0;
    var v = 800.0;
    var cd = 100+this.colorDepth(x,y, img);
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
    var cw = this.carrimg.width;
    var ch = this.carrimg.height;
    var w = canvas.canvas.width;
    var h = canvas.canvas.height;
    var outImg = createGraphics(w, h);
    
    this.carrier_img.loadPixels();
    canvas.canvas.loadPixels();
    outImg.loadPixels();

    // fill the canvas with the carrier image
    // for(var i = 0; i < 3; i++) {
    //   outImg.image(this.carrimg, cw*i, 0);
    //   outImg.image(this.carrimg, cw*i, ch);
    // }

    for(var x = 0; x < outImg.width; x++) {
      for(var y = 0; y < outImg.height; y++) {
	var p;
	var d = this.d(x, y, canvas.canvas);
	if(x < d) {
	  // p = this.carrimg.get((x % cw), (y % ch));
	  p = this.getPixel(x % cw, y % ch, this.carrimg);
	} else {
	  // p = outImg.get(x-d, y);
	  // p = color('purple');
	  // console.log("d: "+d);
	  p = this.getPixel(x-d, y, outImg);
	}

	// outImg.set(x, y, p);
	this.setPixel(x, y, outImg, color(p));
	// var idx = 4*(x+y*w);
	// outImg.pixels[idx] = p.levels[0];
	// outImg.pixels[idx+1] = p.levels[1];
	// outImg.pixels[idx+2] = p.levels[2];
	// outImg.pixels[idx+3] = 255;
      }
    }

    outImg.updatePixels();

    console.log("done");
    cImg = outImg;
    // cImg = this.carrimg;
  }
}
