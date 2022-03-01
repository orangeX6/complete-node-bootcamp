/*  eslint-disable */

'use-strict';

console.log(' hello from the client side ');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicHJhbmF2MDA2IiwiYSI6ImNsMDhlOHpkZzAwMnczYmxmdmZvcDh3enYifQ.op5kq_Pv6zYpP3ZlFR6kpg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
