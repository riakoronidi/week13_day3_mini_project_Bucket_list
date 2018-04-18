var CountryView = function(){
  this.countries = [];
}

CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  return this.countries;
}

CountryView.prototype.populateDropDown = function(){
  const select = document.getElementById('country-list');
  this.countries.forEach(function(country){
    const addedCountry = document.createElement('option');
    addedCountry.innerText = country.name;
    select.appendChild(addedCountry);
  })

}

CountryView.prototype.clear = function(country) {
  this.countries = [];
  const ul = document.querySelector('#countries');
  ul.innerHTML = '';
}

CountryView.prototype.populateList = function(country){
    const ul = document.querySelector('#countries');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${country.name}`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = CountryView;
