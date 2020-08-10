console.log('sw.js');
var cache_name = "ProWeatherApp"; // The string used to identify our cache
var imNames = ['clear.svg', 'cloudy.svg', 'Haze.svg', 'rainy.svg', 'rainandthinser.svg', 'thunderClouds.svg'];

const assets = [
    "index.html",
    "js/covid.js",
    "js/main.js",
    "js/ui-control.js",
    "css/style.css",
    "css/install.css",
    "images/favicon192.png",
    "images/favicon512.png"
    
];

imNames.forEach(function(el){
    assets.push('images/day/' + el);
    assets.push('images/night/' + el);
    console.log('downloading ..' + el);
});



self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
    );
});




self.addEventListener('activate', function(ev){
    console.log('SW Activated!');
});

self.addEventListener('fetch', function(event){
    console.log('Fetch ev');
    if (ev.request.url === "https://localhost:5500") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/index.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});