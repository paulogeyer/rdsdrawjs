class Tool {
  icon;
  name;
  desc;

  mouseOver() {
    if(mouseX > this.x && mouseX < this.x+32 &&
       mouseY > this.y && mouseY < this.y+32) {
      STATUS_MSG = this.desc;
    }
  }
}
