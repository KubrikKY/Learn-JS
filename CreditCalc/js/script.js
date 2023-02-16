let form = document.forms.calculator;
let moneyBefore = document.getElementById('money-before');
let heightAfter = document.getElementById('height-after');
moneyBefore.innerHTML = form.money.value;

let parameters = Array.from(form.elements);

calcCredit(...parameters);

form.addEventListener ('change', () => {
    calcCredit(...parameters);
});

function calcCredit (initial, years, interest) {
  let result = Math.round(initial.value * (1 + (interest.value * 0.01)) ** (years.value / 12));
  moneyBefore.innerHTML = initial.value;
  document.getElementById('money-after').innerHTML = result;
  heightAfter.style.height = 100 + ((result - initial.value) / 100) + 'px';
}

  