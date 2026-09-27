class Freehand extends Tool {
  constructor() {
    super();
    this.icon = loadImage('icons/freehand.png');
    this.name = 'freehand';
    this.desc = 'painting tool: FREEHAND DRAWING (select with right mousebutton for settings)';
    this.previousMouseX = -1;
    this.previousMouseY = -1;
    this.shapes = ['round', 'rectangular'];
    this.shapeI = 0;
    this.penSize = 1;
    this.dotty = false;
  }

  openSettings() {
    var self = this;
    var snap = {shapeI: this.shapeI, penSize: this.penSize, dotty: this.dotty};
    openDialog({
      title: 'SHAPE OF THE PEN',
      status: 'Select shape and size, press [ENTER] when done.',
      radios: ['round', 'rectangular'],
      radio: this.shapeI,
      checks: [{label: 'draw dotty', on: this.dotty}],
      fields: [{label: 'Size (0...50):', value: String(this.penSize), boxed: true}],
      buttons: ['CANCEL'],
      onKey: function(d) {
        if(keyCode == 38)
          self.penSize = Math.min(50, self.penSize+1);
        if(keyCode == 40)
          self.penSize = Math.max(0, self.penSize-1);
        if(keyCode == 8)
          self.penSize = Math.floor(self.penSize/10);
        d.fields[0].value = String(self.penSize);
      },
      onDigit: function(f, key) {
        var n = Number(String(self.penSize)+key);
        if(n > 50)
          n = Number(key);
        self.penSize = n;
        f.value = String(n);
      },
      onAccept: function(d) {
        self.shapeI = d.radio;
        self.dotty = d.checks[0].on;
        closeDialog();
      },
      onCancel: function() {
        self.shapeI = snap.shapeI;
        self.penSize = snap.penSize;
        self.dotty = snap.dotty;
      }
    });
  }

  draw() {
    var drawing = this.previousMouseX != -1;
    if(mouseIsPressed && (drawing || mouseInCanvas())) {
      var x = mouseX-canvas.x;
      var y = mouseY-canvas.y;
      if(!drawing) {
        pushUndo();
        this.previousMouseX = x;
        this.previousMouseY = y;
        var col = mouseButton == RIGHT
          ? toolbox.palette.colors[toolbox.palette.cur_bg][1]
          : toolbox.palette.colors[toolbox.palette.cur_fg][1];
        this.stamp(x, y, col);
      } else {
        var col = mouseButton == RIGHT
          ? toolbox.palette.colors[toolbox.palette.cur_bg][1]
          : toolbox.palette.colors[toolbox.palette.cur_fg][1];
        this.stampLine(this.previousMouseX, this.previousMouseY, x, y, col);
        this.previousMouseX = x;
        this.previousMouseY = y;
      }
    } else {
      this.previousMouseX = -1;
      this.previousMouseY = -1;
    }
  }

  onUndo() {
    this.previousMouseX = -1;
    this.previousMouseY = -1;
  }

  stamp(x, y, col) {
    var s = Math.max(1, this.penSize);
    var g = canvas.canvas;
    g.noStroke();
    g.fill(col);
    if(this.shapeI == 0)
      g.circle(x, y, s);
    else
      g.rect(x-s/2, y-s/2, s, s);
  }

  stampLine(x0, y0, x1, y1, col) {
    var s = Math.max(1, this.penSize);
    var step = this.dotty ? s*2 : Math.max(1, s/3);
    var dist = Math.hypot(x1-x0, y1-y0);
    var n = Math.max(1, Math.floor(dist/step));
    for(var i = 1; i <= n; i++) {
      var t = i/n;
      this.stamp(x0+(x1-x0)*t, y0+(y1-y0)*t, col);
    }
  }

}
