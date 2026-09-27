var activeDialog = null;

function openDialog(d) {
  d.radio = d.radio || 0;
  d.hits = [];
  activeDialog = d;
  if(d.status)
    STATUS_MSG = d.status;
}

function closeDialog() {
  activeDialog = null;
}

function dialogRows(d) {
  var n = 2;
  if(d.lines) n += d.lines.length;
  if(d.radios) n += d.radios.length;
  if(d.checks) n += d.checks.length;
  if(d.fields) n += d.fields.length;
  return n;
}

function dosWindow(x, y, w, h) {
  fill(0, 28, 255);
  noStroke();
  rect(x, y, w, h);
  stroke(0, 125, 255);
  strokeWeight(3);
  noFill();
  rect(x+1, y+1, w-3, h-3);
  stroke(0, 40, 170);
  strokeWeight(2);
  rect(x+5, y+5, w-11, h-11);
  stroke(0, 125, 255);
  strokeWeight(1);
  line(x+10, y+30, x+w-10, y+30);
}

function dosGroup(x, y, w, h, label) {
  noFill();
  stroke(0, 125, 255);
  strokeWeight(1);
  rect(x, y, w, h);
  var lw = textWidth(label)+8;
  fill(0, 28, 255);
  noStroke();
  rect(x+8, y-2, lw, 8);
  fill(255);
  text(label, x+12, y+6);
}

function dialogRadio(x, y, on) {
  noFill();
  stroke(255);
  strokeWeight(1);
  circle(x+6, y-5, 10);
  if(on) {
    noStroke();
    fill(255, 239, 0);
    circle(x+6, y-5, 5);
  }
}

function dialogBox(x, y, w, h) {
  fill(0, 0, 80);
  noStroke();
  rect(x, y, w, h);
  stroke(0, 40, 170);
  strokeWeight(1);
  line(x, y, x+w, y);
  line(x, y, x, y+h);
  stroke(0, 125, 255);
  line(x, y+h, x+w, y+h);
  line(x+w, y, x+w, y+h);
}

function dialogWidth(d) {
  textFont(fontIBM);
  textSize(16);
  var w = textWidth(d.title)+64;
  if(d.group)
    w = Math.max(w, textWidth(d.group)+64);
  if(d.lines) {
    for(var i = 0; i < d.lines.length; i++)
      w = Math.max(w, textWidth(d.lines[i])+48);
  }
  if(d.radios) {
    for(var i = 0; i < d.radios.length; i++)
      w = Math.max(w, textWidth('(*) '+d.radios[i])+80);
  }
  if(d.checks) {
    for(var i = 0; i < d.checks.length; i++)
      w = Math.max(w, textWidth(d.checks[i].label)+72);
  }
  if(d.fields) {
    for(var i = 0; i < d.fields.length; i++) {
      var f = d.fields[i];
      if(f.heading)
        w = Math.max(w, textWidth(f.heading)+48);
      else
        w = Math.max(w, textWidth(f.label)+(f.boxed ? 56 : textWidth(String(f.value)))+48);
    }
  }
  var buttons = dialogButtons(d);
  var bw = 16;
  for(var i = 0; i < buttons.length; i++)
    bw += textWidth(buttons[i])+34;
  return Math.min(WIDTH-24, Math.max(w, bw+48));
}

function dialogDraw() {
  var d = activeDialog;
  if(!d)
    return;
  var w = dialogWidth(d);
  var h = 108+dialogRows(d)*20+(d.group ? 28 : 0);
  var x = Math.max(8, (WIDTH-w)/2);
  var y = Math.max(8, (HEIGHT-h)/2-8);
  dosWindow(x, y, w, h);
  textFont(fontIBM);
  textSize(16);
  textAlign(CENTER, BASELINE);
  fill(255, 239, 0);
  noStroke();
  text(d.title, x+w/2, y+22);
  textAlign(LEFT, BASELINE);
  var yy = y+52;
  d.hits = [];
  fill(255);
  if(d.lines) {
    textAlign(CENTER, BASELINE);
    for(var i = 0; i < d.lines.length; i++) {
      text(d.lines[i], x+w/2, yy);
      yy += 18;
    }
    textAlign(LEFT, BASELINE);
  }
  if(d.radios) {
    var gh = d.radios.length*18+20;
    if(d.group) {
      dosGroup(x+12, yy, w-24, gh+6, d.group);
      yy += 16;
    }
    for(var i = 0; i < d.radios.length; i++) {
      var on = i == d.radio;
      fill(on ? color(255, 239, 0) : 255);
      noStroke();
      text((on ? '(*) ' : '( ) ')+d.radios[i], x+28, yy);
      d.hits.push({x: x+14, y: yy-14, w: w-28, h: 18, i: i, kind: 'radio'});
      yy += 18;
    }
    if(d.group)
      yy += 14;
  }
  if(d.checks) {
    for(var i = 0; i < d.checks.length; i++) {
      var c = d.checks[i];
      dialogBox(x+16, yy-12, 12, 12);
      if(c.on) {
        stroke(255, 239, 0);
        strokeWeight(2);
        line(x+18, yy-6, x+22, yy-2);
        line(x+22, yy-2, x+26, yy-10);
      }
      fill(255);
      noStroke();
      text(c.label, x+34, yy);
      d.hits.push({x: x+10, y: yy-14, w: w-20, h: 18, i: i, kind: 'check'});
      yy += 18;
    }
  }
  if(d.fields) {
    for(var i = 0; i < d.fields.length; i++) {
      var f = d.fields[i];
      fill(255);
      noStroke();
      if(f.heading) {
        text(f.heading, x+12, yy);
        yy += 18;
        continue;
      }
      text(f.label, x+16, yy);
      if(f.boxed) {
        var fx = x+20+textWidth(f.label);
        dialogBox(fx, yy-13, 28, 16);
        fill(255, 239, 0);
        noStroke();
        text(f.value, fx+6, yy);
        d.hits.push({x: fx, y: yy-14, w: 28, h: 18, i: i, kind: 'field'});
      } else {
        text(f.value, x+16+textWidth(f.label), yy);
      }
      yy += 18;
    }
  }
  yy += 16;
  var buttons = dialogButtons(d);
  var widths = [];
  var bw = 0;
  for(var i = 0; i < buttons.length; i++) {
    widths[i] = textWidth(buttons[i])+28;
    bw += widths[i]+8;
  }
  var bx = x+(w-(bw-8))/2;
  for(var i = 0; i < buttons.length; i++) {
    var tw = widths[i];
    drawBorder(bx, yy-16, tw, 22, true);
    if(i == 0)
      drawBorder(bx+3, yy-13, tw-6, 16, false);
    fill(255, 239, 0);
    noStroke();
    textAlign(CENTER, BASELINE);
    text(buttons[i], bx+tw/2, yy);
    textAlign(LEFT, BASELINE);
    d.hits.push({x: bx, y: yy-16, w: tw, h: 22, name: buttons[i], kind: 'button'});
    bx += tw+6;
  }
  if(d.status)
    STATUS_MSG = d.status;
}

function dialogKey() {
  var d = activeDialog;
  if(!d)
    return false;
  if(keyCode == 27) {
    if(d.onCancel)
      d.onCancel();
    closeDialog();
    return true;
  }
  if(keyCode == 13) {
    if(d.onAccept)
      d.onAccept(d);
    return true;
  }
  if(keyCode == 32) {
    if(d.radios && d.radios.length)
      d.radio = (d.radio+1)%d.radios.length;
    else if(d.checks && d.checks.length)
      dialogToggleCheck(d, 0);
    return true;
  }
  if((keyCode == 73 || key == 'i' || key == 'I') && d.checks && d.checks.length) {
    dialogToggleCheck(d, 0);
    return true;
  }
  if(d.fields && key >= '0' && key <= '9') {
    var boxed = [];
    for(var i = 0; i < d.fields.length; i++)
      if(d.fields[i].boxed)
        boxed.push(d.fields[i]);
    if(boxed.length && d.onDigit) {
      d.onDigit(boxed[d.boxI || 0], key, d.boxI || 0);
      return true;
    }
  }
  if(d.onKey)
    d.onKey(d);
  return true;
}

function dialogToggleCheck(d, i) {
  var c = d.checks[i];
  c.on = !c.on;
  if(c.toggle)
    c.toggle(c.on);
}

function dialogClick() {
  var d = activeDialog;
  if(!d)
    return false;
  for(var i = 0; i < d.hits.length; i++) {
    var h = d.hits[i];
    if(mouseX < h.x || mouseX >= h.x+h.w || mouseY < h.y || mouseY >= h.y+h.h)
      continue;
    if(h.kind == 'radio')
      d.radio = h.i;
    else if(h.kind == 'field') {
      var n = 0;
      for(var j = 0; j < h.i; j++)
        if(d.fields[j].boxed)
          n++;
      d.boxI = n;
    }
    else if(h.kind == 'check')
      dialogToggleCheck(d, h.i);
    else if(h.kind == 'button')
      dialogButton(d, h.name);
    return true;
  }
  return true;
}

function dialogButtons(d) {
  var buttons = (d.buttons && d.buttons.length) ? d.buttons.slice() : ['CANCEL'];
  var hasAction = false;
  for(var i = 0; i < buttons.length; i++) {
    if(buttons[i] != 'CANCEL' && buttons[i] != "DON'T SAVE")
      hasAction = true;
  }
  if(!hasAction)
    buttons.unshift('ENTER');
  return buttons;
}

function dialogButton(d, name) {
  if(name == 'CANCEL' || name == "DON'T SAVE") {
    if(d.onCancel)
      d.onCancel();
    closeDialog();
    return;
  }
  if(name == 'ENTER') {
    if(d.onAccept)
      d.onAccept(d);
    else
      closeDialog();
    return;
  }
  if(d.onButton)
    d.onButton(name);
}
