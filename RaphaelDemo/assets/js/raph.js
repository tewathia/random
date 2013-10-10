  var r = Raphael("holder"),
  fin = function () {
    this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
  },
  fout = function () {
    this.flag.animate({opacity: 0}, 300, function () {this.remove();});
  },
  fin2 = function () {
    var y = [], res = [];
    for (var i = this.bars.length; i--;) {
      y.push(this.bars[i].y);
      res.push(this.bars[i].value || "0");
    }
    this.flag = r.popup(this.bars[0].x, Math.min.apply(Math, y), res.join(", ")).insertBefore(this);
  },
  fout2 = function () {
    this.flag.animate({opacity: 0}, 300, function () {this.remove();});
  },
  txtattr = { font: "12px sans-serif" };

  r.text(480, 10, "Horizontal Stacked Bar Chart").attr(txtattr);

  r.hbarchart(330, 20, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 42, 11, 71, 8, 32, 29, 47]], {stacked: true}).hover(fin, fout);
