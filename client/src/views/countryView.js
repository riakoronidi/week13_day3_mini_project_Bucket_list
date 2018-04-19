var CountryView = function(){
  this.countries = [];
  this.bucket = [];
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

CountryView.prototype.addCountryToBucketList = function(country) {
  this.bucket.push(country);
  this.populateList(country);
  // debugger;
}

CountryView.prototype.populateList = function(country){
    const ul = document.querySelector('#countries');
    const li = document.createElement('li');
    li.innerText = `${country.name}`;
    ul.appendChild(li);
}

 module.exports = CountryView;
