/* eslint-disable */

export default function (locations) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHJhbmF2MDA2IiwiYSI6ImNsMDhlOHpkZzAwMnczYmxmdmZvcDh3enYifQ.op5kq_Pv6zYpP3ZlFR6kpg';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pranav006/clb6phied002414p5ecn258tq',
    scrollZoom: false,
    // center: [-118.05, 37.28],
    // zoom: 6,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Zoom map to a level to display the current markup
    bounds.extend(loc.coordinates);
  });

  // Zoom map to a level to display the current markup
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 140,
      left: 100,
      right: 100,
    },
  });
}
