mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates , // starting position [lng, lat]
    zoom: 9 // starting zoom
});

console.log(listing.geometry.coordinates);
	
// Create a marker and add it to the map.

const marker = new mapboxgl.Marker({ color : "red"})     
    .setLngLat(listing.geometry.coordinates)         // Listing.geometry.coordinates
    .addTo(map);

const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(listing.geometry.coordinates)
    .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`)
    .addTo(map)



