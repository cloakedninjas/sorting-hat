function App () {
  this.input = document.getElementById('name');
  this.form = document.getElementById('form');
  this.result = document.getElementById('result');
  this.nameLabel = document.getElementById('name-label');
  this.quote = document.getElementById('quote');
  this.houseName = document.getElementById('housename');

  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.particles = [];

  this.width = this.canvas.width = window.innerWidth;
  this.height = this.canvas.height = window.innerHeight;
  this.mouse = { x: this.width * 0.5, y: this.height * 0.5 };

  document.getElementById('button').addEventListener('click', this.handleFormSubmit.bind(this));

  for (var i = 0; i <= 200; i++) {
    this.particles[i] = new Particle(this.ctx, Math.random() * this.width, Math.random() * this.height);
  }

  document.body.addEventListener('mousemove', function (e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }.bind(this));

  requestAnimationFrame(this.frameTick.bind(this));

  this.input.focus();
}

App.prototype = {
  handleFormSubmit: function (e) {
    var result,
        isForced = App.FORCED[this.input.value];

    if (isForced !== undefined) {
      result = isForced;
    } else {
      result = this.encodeString(this.input.value);
    }
    var houseResult = App.HOUSES[result];

    e.preventDefault();
    e.stopPropagation();
    document.body.classList.add(houseResult);

    this.form.classList.add('fade-out');
    this.result.style.display = 'block';
    this.houseName.textContent = houseResult;
    this.nameLabel.textContent = this.input.value;
    this.quote.textContent = App.QUOTES[result];

    setTimeout(function () {
      this.result.classList.add('fade-in');
    }.bind(this), 1000);

  },

  encodeString: function (input) {
    var sum = 0,
        letters = input.split('');

    for(var i = 0, len = letters.length; i < len; i++) {
      sum += letters[i].charCodeAt(0);
    }

    return sum % 4;
  },

  frameTick: function () {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].attract(this.mouse.x, this.mouse.y);
      this.particles[i].integrate();
      this.particles[i].draw();
    }

    requestAnimationFrame(this.frameTick.bind(this));
  }
};

App.HOUSES = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
App.QUOTES = [
    'With a lion as its crest and Professor McGonagall at its head, Gryffindor is the house which most values the virtues of courage, bravery and determination',
    'Slytherin produces more than its share of Dark wizards, but also turns out leaders who are proud, ambitious and cunning. Merlin is one particularly famous Slytherin',
    'Hufflepuffs value hard work, patience, loyalty, and fair play. The house has produced its share of great wizards – not least Newt Scamander, author of Fantastic Beasts and Where to Find Them',
    'Ravenclaws prize wit, learning, and wisdom. It\'s an ethos etched into founder Rowena Ravenclaw diadem: "wit beyond measure is man\'s greatest treasure"'
];
App.FORCED = {
  'Ella': 3,
  'Cynthia': 3,
  'Will': 1,
  'Sarah': 0
};

document.addEventListener('DOMContentLoaded', function () {
  new App();
});
