var DAMPING = 0.99;

function Particle(ctx, x, y) {
  this.ctx = ctx;
  this.x = this.oldX = x;
  this.y = this.oldY = y;
}

Particle.prototype.integrate = function() {
  var velocityX = (this.x - this.oldX) * DAMPING;
  var velocityY = (this.y - this.oldY) * DAMPING;

  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocityX;
  this.y += velocityY;
};

Particle.prototype.attract = function(x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) {
    var invX = Math.random() > 0.5 ? 1 : -1;
    var invY = Math.random() > 0.5 ? 1 : -1;

    this.x = x + (Math.random() * 200 * invX);
    this.y = y + (Math.random() * 200 * invY);
    this.oldX = this.x;
    this.oldY = this.y;
  } else {
    this.x += dx / distance;
    this.y += dy / distance;
  }

};

Particle.prototype.draw = function() {
  this.ctx.strokeStyle = 'silver';
  this.ctx.lineWidth = 2;
  this.ctx.beginPath();
  this.ctx.moveTo(this.oldX, this.oldY);
  this.ctx.lineTo(this.x, this.y);
  this.ctx.stroke();
};
