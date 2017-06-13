function App () {
  this.input = document.getElementById('name');
  this.form = document.getElementById('form');

  document.getElementById('button').addEventListener('click', this.handleFormSubmit.bind(this));
}

App.prototype = {
  handleFormSubmit: function (e) {
    var result = this.encodeString(this.input);

    e.preventDefault();
    document.body.classList.add(App.HOUSES[result]);

    form.classList.add('fade-out');
  },

  encodeString: function (input) {
    var sum = 0,
        letters = input.value.split('');

    for(var i = 0, len = letters.length; i < len; i++) {
      sum += letters[i].charCodeAt(0);
    }

    return sum % 4;
  }
};

App.HOUSES = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

document.addEventListener('DOMContentLoaded', function () {
  new App();
});