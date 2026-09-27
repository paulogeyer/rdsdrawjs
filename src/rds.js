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
    toolbox.selectTool(this);
    this.active = true;
    this.render();
  }

  keyPressed() {
    if(keyCode == 27) {
      this.active = false;
      cImg = undefined;
    }
  }

  depthMap(pixels, w, h) {
    var colors = toolbox.palette.colors;
    var n = colors.length;
    var pr = new Uint8Array(n);
    var pg = new Uint8Array(n);
    var pb = new Uint8Array(n);
    var pd = new Uint8Array(n);
    var exact = new Map();

    for(var i = 0; i < n; i++) {
      var lv = colors[i][1].levels;
      pr[i] = Math.round(lv[0]);
      pg[i] = Math.round(lv[1]);
      pb[i] = Math.round(lv[2]);
      pd[i] = colors[i][0];
      exact.set((pr[i]<<16)|(pg[i]<<8)|pb[i], pd[i]);
    }

    var depth = new Uint8Array(w*h);
    for(var p = 0, i = 0; p < w*h; p++, i += 4) {
      var key = (pixels[i]<<16)|(pixels[i+1]<<8)|pixels[i+2];
      var d = exact.get(key);
      if(d == undefined) {
        var best = Infinity;
        var r = pixels[i], g = pixels[i+1], b = pixels[i+2];
        d = 0;
        for(var c = 0; c < n; c++) {
          var dr = r-pr[c], dg = g-pg[c], db = b-pb[c];
          var dist = dr*dr+dg*dg+db*db;
          if(dist < best) {
            best = dist;
            d = pd[c];
          }
        }
      }
      depth[p] = d;
    }
    return depth;
  }

  mu = 1/3;
  eye = 132;

  separation(z) {
    var sep = Math.round((1-this.mu*z)*this.eye/(2-this.mu*z));
    if(sep < 1)
      sep = 1;
    return sep;
  }

  smoothDepth(depth, w, h) {
    var n = w*h;
    var a = new Float64Array(n);
    var b = new Float64Array(n);
    for(var i = 0; i < n; i++)
      a[i] = depth[i]/8;
    for(var pass = 0; pass < 2; pass++) {
      for(var y = 0; y < h; y++) {
        var row = y*w;
        for(var x = 0; x < w; x++) {
          var s = a[row+x]*2;
          var c = 2;
          if(x > 0) { s += a[row+x-1]; c++; }
          if(x+1 < w) { s += a[row+x+1]; c++; }
          if(y > 0) { s += a[row-w+x]; c++; }
          if(y+1 < h) { s += a[row+w+x]; c++; }
          b[row+x] = s/c;
        }
      }
      var tmp = a;
      a = b;
      b = tmp;
    }
    return a;
  }

  render() {
    var carrier = this.carrier_img;
    var cw = carrier.width;
    var ch = carrier.height;
    var w = canvas.canvas.width;
    var h = canvas.canvas.height;
    if(cw == 0 || ch == 0)
      return;

    carrier.loadPixels();
    canvas.canvas.loadPixels();
    this.eye = cw*2;
    var zmap = this.smoothDepth(this.depthMap(canvas.canvas.pixels, w, h), w, h);
    var mu = this.mu;
    var E = this.eye;
    var far = this.separation(0);
    var cp = carrier.pixels;

    var outImg = createGraphics(w, h);
    outImg.pixelDensity(1);
    outImg.loadPixels();
    var op = outImg.pixels;
    var same = new Int32Array(w);

    for(var y = 0; y < h; y++) {
      var row = y*w;
      for(var x = 0; x < w; x++)
        same[x] = x;

      for(var x = 0; x < w; x++) {
        var z = zmap[row+x];
        var s = this.separation(z);
        var left = x-(s>>1);
        var right = left+s;
        if(left < 0 || right >= w)
          continue;

        var t = 1;
        var visible = true;
        var zt = z;
        while(visible && zt < 1) {
          zt = z+2*(2-mu*z)*t/(mu*E);
          var zl = x-t >= 0 ? zmap[row+x-t] : 0;
          var zr = x+t < w ? zmap[row+x+t] : 0;
          if(zl >= zt || zr >= zt)
            visible = false;
          t++;
        }
        if(!visible)
          continue;

        var l = same[left];
        var guard = 0;
        while(l != left && l != right && guard++ < w) {
          if(l < right) {
            left = l;
            l = same[left];
          } else {
            same[left] = right;
            left = right;
            l = same[left];
            right = l;
          }
        }
        same[left] = right;
      }

      for(var x = w-1; x >= 0; x--) {
        var idx = 4*(row+x);
        var sidx;
        var src;
        if(same[x] == x) {
          sidx = 4*((x%far)%cw+(y%ch)*cw);
          src = cp;
        } else {
          sidx = 4*(row+same[x]);
          src = op;
        }
        op[idx] = src[sidx];
        op[idx+1] = src[sidx+1];
        op[idx+2] = src[sidx+2];
        op[idx+3] = 255;
      }
    }

    outImg.updatePixels();
    cImg = outImg;
  }
}
