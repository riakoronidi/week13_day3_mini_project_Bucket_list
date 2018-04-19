var CountryView = function(){
  this.countries = [];
  this.bucket = [];
  this.coordsArray = [];
  this.markers = [];
  // const container = document.getElementById('main-map');
  // const center = {lat: 33, lng: 65};
  // const zoom = 3;
  // this.googleMap = new google.maps.Map(container, {
  //   center: coords,
  //   zoom: zoom
  // })
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
}

CountryView.prototype.populateList = function(country){
  const ul = document.querySelector('#countries');
  const li = document.createElement('li');
  li.innerText = `${country.name}`;
  ul.appendChild(li);
}

CountryView.prototype.getCoords = function() {
  for(let country of this.bucket){
    const coords = {
      "lat": country.latlng[0],
      "lng": country.latlng[1]
    }
    this.coordsArray.push(coords);
  }
  console.log(this.coordsArray);
  // debugger;
  return this.coordsArray;
}


module.exports = CountryView;
