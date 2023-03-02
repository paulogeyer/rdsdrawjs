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
    window.alert("generate stuff");
    console.log("active: "+this.active);
    this.active = true;
    console.log("active: "+this.active);
  }

  keyPressed() {
    // deactivate RDS
    if(keyCode == 27)
      this.active = false;
  }

  render() {
    var w = 66+574;
    var h = 465;
    var outImg = createGraphics(w, h);

  }
}
