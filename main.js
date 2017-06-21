function App () {
  this.input = document.getElementById('name');
  this.form = document.getElementById('form');
  this.result = document.getElementById('result');
  this.houseName = document.getElementById('housename');

  document.getElementById('button').addEventListener('click', this.handleFormSubmit.bind(this));

  this.input.focus();
}

App.prototype = {
  handleFormSubmit: function (e) {
    var result,
        isForced = App.FORCED[this.input.value];

    if (isForced) {
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
  }
};

App.HOUSES = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
App.FORCED = {
  'Ella': 3,
  'Cynthia': 3,
  'Will': 1
};

document.addEventListener('DOMContentLoaded', function () {
  new App();
});
