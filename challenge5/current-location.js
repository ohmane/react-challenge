// got this from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
// this finds the coordinates of current location and then searches for those coordinates

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// doesnt work all the time but it is supposed to go through and get the coordinates of current
// location and then clikc on the search button 
function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  var coordinates = Math.round(crd.latitude) + '&' + Math.round(crd.longitude);
  document.querySelector('input').value = coordinates;
  // clicks on the first button inside of form
   console.log(crd);
  console.log(coordinates);
  document.querySelector('form button').click();

};
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
