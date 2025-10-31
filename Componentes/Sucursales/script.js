//Composicion del mapa en genral
var map=L.map('map',{
    center: [32.497959, -116.965921],
    zoom: 15,
    zoomControl: false,
    minZoom: 5,
    maxZoom: 18
})

// El mapa 
var maptiler = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key={key}', {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors',
    maxZoom: 20,
    key: 'LHtJiCscQwkShyIPMXKp' // <-- reemplaza esto
}).addTo(map);

// Mapa CartoDB como alternativa
var cartoDB=L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
  attribution: "© CartoDB"
});

//PARA PONER LOS DOS TIPOS DE MAPAS
var baseMaps={
    "MapTiler Streets": maptiler,
    "CartoDB": cartoDB
}

L.control.layers(baseMaps).addTo(map);

//PARA PONER EL ZOOM EN LA PARTE SUPERIOR IZQUIERDA
L.control.zoom({
    position: "topleft",
    zoomInText: "+",
    zoomOutText: "-",
    zoomInTitle: "Acercar",
    zoomOutTitle: "Alejar"
}).addTo(map);



L.control.scale({
    position: "bottomleft",
    metric: true,
    imperial: false,
    maxWidth: 200,
}).addTo(map);


//MARCADORES
// icono General
var iconoPL = L.icon({
    iconUrl: "./img/MarcadorP&L.png",
    iconSize: [80, 80],     
    iconAnchor: [20, 40],   
});

// Marcador 5y10
var marcador5Y10 = L.marker([32.498548715618846, -116.96639865953074], {
    icon: iconoPL
}).addTo(map);

// Marcador Casa Blanca
var marcadorCasaB = L.marker([32.50159887220272, -116.89754779074997], {
    icon: iconoPL
}).addTo(map);

// Marcador Restaurant R
var marcadorR = L.marker([32.52984863854589, -117.03599228704998], {
    icon: iconoPL
}).addTo(map);

//Marcador Las Americas
var marcadorLA = L.marker([32.50387096456004, -116.98955285821424], {
    icon: iconoPL
}).addTo(map);

//Marcador Guaycura
var marcadorG = L.marker([32.50622096783539, -116.91733985636424], {
    icon: iconoPL
}).addTo(map);

//Marcador Playas
var marcadorPlayas = L.marker([32.527258409247196, -117.11746275342861], {
    icon: iconoPL
}).addTo(map);

var marcadorPR = L.marker([32.47813331799085, -116.92613187540711], {
    icon: iconoPL
}).addTo(map);

// 5y10 popup
var popupHtml = `
  <div class="custom-popup">
    <h3>5y10</h3>
    <div class="rating">★ 4.6 · 238 reseñas</div>
    <div class="address">Av. Paseo Del Río 123, Tijuana, BC</div>
    <div class="contact"><a href="https://www.pizzaylove.example" target="_blank">sitio web</a> · <a href="tel:+526612345678">+52 661 234 5678</a></div>
    <div class="hours">Abierto · 12:00–23:00</div>
  </div>
`;

// Casa Blanca popup
var popupHtmlCasaB = `
  <div class="custom-popup">
    <h3>Casa Blanca</h3>
    <div class="rating">★ 4.4 · 52 reseñas</div>
    <div class="address">Calle Ejemplo 456, Tijuana, BC</div>
    <div class="contact"><a href="https://www.casablanexample.com" target="_blank">sitio web</a> · <a href="tel:+526612345000">+52 661 234 5000</a></div>
    <div class="hours">Abierto · 09:00–21:00</div>
  </div>
`;

// Revolucion popup
var popupHtmlR = `
  <div class="custom-popup">
    <h3>Revolucion</h3>
    <div class="rating">★ 4.5 · 183 reseñas</div>
    <div class="address">Blvd. Agua Caliente 123, Tijuana, BC</div>
    <div class="contact"><a href="https://www.restaurantr.example" target="_blank">sitio web</a> · <a href="tel:+526641234567">+52 664 123 4567</a></div>
    <div class="hours">Abierto · 11:00–22:00</div>
  </div>
`;

// Las Americas popup
var popupHtmlLA = `
  <div class="custom-popup">
    <h3>Las Américas</h3>
    <div class="rating">★ 4. · 310 reseñas</div>
    <div class="address">Plaza Las Américas, Tijuana, BC</div>
    <div class="contact"><a href="https://www.lasamericas.example" target="_blank">sitio web</a> · <a href="tel:+526641041080">+52 664 104 1080</a></div>
    <div class="hours">Abierto · 10:00–22:00</div>
  </div>
`;

//Guaycura popup
var popupHtmlG = `
  <div class="custom-popup">
    <h3>Las Américas</h3>
    <div class="rating">★ 4. · 310 reseñas</div>
    <div class="address">Plaza Las Américas, Tijuana, BC</div>
    <div class="contact"><a href="https://www.lasamericas.example" target="_blank">sitio web</a> · <a href="tel:+526641041080">+52 664 104 1080</a></div>
    <div class="hours">Abierto · 10:00–22:00</div>
  </div>
`;

//Playas popup
var popupHtmlPlayas = `
  <div class="custom-popup">
    <h3>Las Américas</h3>
    <div class="rating">★ 4. · 310 reseñas</div>
    <div class="address">Plaza Las Américas, Tijuana, BC</div>
    <div class="contact"><a href="https://www.lasamericas.example" target="_blank">sitio web</a> · <a href="tel:+526641041080">+52 664 104 1080</a></div>
    <div class="hours">Abierto · 10:00–22:00</div>
  </div>
`;

//Pasea del Rios popup
var popupHtmlPR = `
  <div class="custom-popup">
    <h3>Las Américas</h3>
    <div class="rating">★ 4. · 310 reseñas</div>
    <div class="address">Plaza Las Américas, Tijuana, BC</div>
    <div class="contact"><a href="https://www.lasamericas.example" target="_blank">sitio web</a> · <a href="tel:+526641041080">+52 664 104 1080</a></div>
    <div class="hours">Abierto · 10:00–22:00</div>
  </div>
`;

// Actualiza las opciones de los popups para hacerlos más anchos
var popupOptions = {
    maxWidth: 350,
    className: 'custom-popup-wrapper'
};

// Actualiza los bindPopup con las nuevas opciones
marcador5Y10.bindPopup(popupHtml, popupOptions);
marcadorCasaB.bindPopup(popupHtmlCasaB, popupOptions);
marcadorR.bindPopup(popupHtmlR, popupOptions);
marcadorLA.bindPopup(popupHtmlLA, popupOptions);
marcadorG.bindPopup(popupHtmlG, popupOptions);
marcadorPlayas.bindPopup(popupHtmlPlayas, popupOptions);
marcadorPR.bindPopup(popupHtmlPR, popupOptions);

// Función para obtener la ubicación del usuario
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalización no es soportada por este navegador.");
    }
}

// Función para mostrar la posición del usuario en el mapa
function showPosition(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    // Centrar el mapa en la ubicación del usuario
    map.setView([userLat, userLon], 15);

    // Agregar un marcador en la ubicación del usuario
    var userMarker = L.marker([userLat, userLon]).addTo(map)
        .bindPopup("Estás aquí").openPopup();
}

// Función para manejar errores de geolocalización
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario negó la solicitud de Geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud para obtener la ubicación ha caducado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido.");
            break;
    }
}

// Llamar a la función para obtener la ubicación del usuario
getUserLocation();




document.addEventListener('DOMContentLoaded', function() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            
            // Centrar el mapa en la sucursal seleccionada
            map.setView([lat, lng], 16);
            
            // Abrir el popup correspondiente
            const markers = [marcador5Y10, marcadorCasaB, marcadorR, marcadorLA, marcadorG, marcadorPlayas, marcadorPR];
            if (markers[index]) {
                markers[index].openPopup();
            }
        });
    });
});