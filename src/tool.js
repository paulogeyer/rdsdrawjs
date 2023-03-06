class Tool {
  icon;
  name;
  desc;

  isFirefox() {
    var ua = navigator.userAgent.toLowerCase();
    var check = function(r) {
      return r.test(ua);
    };
    var isWebKit = check(/webkit/);    
    var isGecko = !isWebKit && check(/gecko/);
    return isGecko;
  }

  mouseOver() {
    if(mouseX > this.x && mouseX < this.x+32 &&
       mouseY > this.y && mouseY < this.y+32) {
      STATUS_MSG = this.desc;
    }
  }
}
