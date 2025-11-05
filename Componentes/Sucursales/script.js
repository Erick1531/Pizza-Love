// Configuración inicial del mapa
const map = L.map('map', {
    center: [32.497959, -116.965921],
    zoom: 15,
    zoomControl: false,
    minZoom: 5,
    maxZoom: 18
});

// Capas de mapa
const maptiler = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=LHtJiCscQwkShyIPMXKp', {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors',
    maxZoom: 20
}).addTo(map);

const cartoDB = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "© CartoDB"
});

// Controles del mapa
L.control.layers({
    "MapTiler Streets": maptiler,
    "CartoDB": cartoDB
}).addTo(map);

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

// Icono personalizado
const iconoPL = L.icon({
    iconUrl: "../../Img/pizzaandlove.png",
    iconSize: [35, 35],
    iconAnchor: [20, 40],
});

// Datos de las sucursales
const sucursales = [
    { nombre: "5y10", lat: 32.498548715618846, lng: -116.96639865953074, rating: "4.6", reviews: "238", direccion: "Av. Paseo Del Río 123, Tijuana, BC", web: "https://www.pizzaylove.example", tel: "+52 661 234 5678", horario: "12:00 - 23:00", abierto: true },
    { nombre: "Casa Blanca", lat: 32.50159887220272, lng: -116.89754779074997, rating: "4.4", reviews: "52", direccion: "Calle Ejemplo 456, Tijuana, BC", web: "https://www.casablanexample.com", tel: "+52 661 234 5000", horario: "09:00 - 21:00", abierto: true },
    { nombre: "Revolución", lat: 32.52984863854589, lng: -117.03599228704998, rating: "4.5", reviews: "183", direccion: "Blvd. Agua Caliente 123, Tijuana, BC", web: "https://www.restaurantr.example", tel: "+52 664 123 4567", horario: "11:00 - 22:00", abierto: true },
    { nombre: "Las Américas", lat: 32.50387096456004, lng: -116.98955285821424, rating: "4.7", reviews: "310", direccion: "Plaza Las Américas, Tijuana, BC", web: "https://www.lasamericas.example", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: true },
    { nombre: "Guaycura", lat: 32.50622096783539, lng: -116.91733985636424, rating: "4.6", reviews: "189", direccion: "Plaza Guaycura, Tijuana, BC", web: "https://www.lasamericas.example", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: true },
    { nombre: "Playas", lat: 32.527258409247196, lng: -117.11746275342861, rating: "4.5", reviews: "142", direccion: "Playas de Tijuana, BC", web: "https://www.lasamericas.example", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: true },
    { nombre: "Paseo del Río", lat: 32.47813331799085, lng: -116.92613187540711, rating: "4.8", reviews: "267", direccion: "Paseo del Río, Tijuana, BC", web: "https://www.lasamericas.example", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: true },
    { nombre: "Rosarito Norte", lat: 32.40271898466592, lng: -117.04871134771275, rating: "4.0", reviews: "0", direccion: "Rosarito Norte", web: "#", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: false },
    { nombre: "Rosarito Centro", lat: 32.36564452105704, lng: -117.05404487540713, rating: "4.0", reviews: "0", direccion: "Rosarito Centro", web: "#", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: false },
    { nombre: "Siglo XXI", lat: 32.48600260031889, lng: -116.9426866447214, rating: "4.0", reviews: "0", direccion: "Siglo XXI", web: "#", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: false },
    { nombre: "Libertad", lat: 32.530939866116476, lng: -117.0070310575167, rating: "4.0", reviews: "0", direccion: "Libertad", web: "#", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: false },
    { nombre: "Altabrisa", lat: 32.53058160188567, lng: -116.97340260609286, rating: "4.0", reviews: "0", direccion: "Altabrisa", web: "#", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: false },
    { nombre: "Industrial", lat: 32.536608608766905, lng: -116.92913298889998, rating: "4.0", reviews: "0", direccion: "Industrial", web: "#", tel: "+52 664 104 1080", horario: "10:00 - 22:00", abierto: false }
];

// Función para generar HTML del popup
const crearPopupHTML = (s) => `
    <div class="custom-popup">
        <h3>${s.nombre}</h3>
        <div class="rating">★ ${s.rating} · ${s.reviews} reseñas</div>
        <div class="address">${s.direccion}</div>
        <div class="contact">
            <a href="${s.web}" target="_blank">sitio web</a> · 
            <a href="tel:${s.tel}">${s.tel}</a>
        </div>
        <div class="hours">Abierto · ${s.horario}</div>
    </div>
`;

// Función para generar HTML de tarjeta
const crearTarjetaHTML = (s) => {
    const statusBadge = s.abierto 
        ? '<span class="status-badge status-open">🟢 Abierto</span>'
        : '<span class="status-badge status-closed">🔴 Cerrado</span>';
    
    const reviewsText = s.reviews && s.reviews !== "0" ? `${s.reviews} reseñas` : 'Sin reseñas';
    const ratingText = s.rating && s.rating !== "" ? `★ ${s.rating}` : '';
    const webLink = s.web && s.web !== "#" ? `<a href="${s.web}" target="_blank">sitio web</a> · ` : '';

    return `
        <div class="location-card ${s.abierto ? '' : 'closed'}" data-lat="${s.lat}" data-lng="${s.lng}">
            <h3>${s.nombre}</h3>
            ${statusBadge}
            <div class="location-info">
                <div class="rating">${ratingText} ${reviewsText}</div>
                <div>📍 ${s.direccion}</div>
                <div>📞 ${s.tel}</div>
                <div>🕐 ${s.horario}</div>
                <div class="contact">${webLink}<a href="tel:${s.tel}">Llamar</a></div>
            </div>
        </div>
    `;
};

// Generar tarjetas dinámicamente
const locationsContainer = document.getElementById('locations-container');
if (locationsContainer) {
    locationsContainer.innerHTML = sucursales.map(crearTarjetaHTML).join('');
}

// Crear marcadores dinámicamente
const allMarkers = sucursales.map(sucursal => {
    return L.marker([sucursal.lat, sucursal.lng], { icon: iconoPL })
        .addTo(map)
        .bindPopup(crearPopupHTML(sucursal), {
            maxWidth: 350,
            className: 'custom-popup-wrapper'
        });
});

// Función para calcular distancia Haversine en metros
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = v => v * Math.PI / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

// Variable para el marcador del usuario
let userMarker;

// Función para mostrar la posición del usuario
const showPosition = (position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    map.setView([userLat, userLon], 13);

    if (userMarker) {
        userMarker.setLatLng([userLat, userLon]);
    } else {
        userMarker = L.marker([userLat, userLon]).addTo(map).bindPopup("Estás aquí");
    }

    // Encontrar sucursal más cercana
    let minDist = Infinity;
    let minIndex = -1;
    
    allMarkers.forEach((marker, i) => {
        const pos = marker.getLatLng();
        const d = haversineDistance(userLat, userLon, pos.lat, pos.lng);
        if (d < minDist) {
            minDist = d;
            minIndex = i;
        }
    });

    // Resaltar tarjeta más cercana y añadir mensaje
    const cards = document.querySelectorAll('.location-card');
    cards.forEach(c => {
        c.classList.remove('nearest');
        const oldBadge = c.querySelector('.nearest-badge');
        if (oldBadge) oldBadge.remove();
    });
    
    if (cards[minIndex]) {
        cards[minIndex].classList.add('nearest');
        // Añadir badge con mensaje si no existe
        let badge = cards[minIndex].querySelector('.nearest-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'nearest-badge';
            badge.textContent = '¡Esta es la sucursal más cercana!';
            cards[minIndex].appendChild(badge);
        }
        cards[minIndex].scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    
    if (allMarkers[minIndex]) {
        allMarkers[minIndex].openPopup();
        map.panTo(allMarkers[minIndex].getLatLng());
    }

    console.log('Sucursal más cercana:', sucursales[minIndex].nombre, 'Distancia:', Math.round(minDist), 'm');
};

// Función para manejar errores de geolocalización
const showError = (error) => {
    const mensajes = {
        [error.PERMISSION_DENIED]: "El usuario negó la solicitud de Geolocalización.",
        [error.POSITION_UNAVAILABLE]: "La ubicación no está disponible.",
        [error.TIMEOUT]: "La solicitud para obtener la ubicación ha caducado.",
        [error.UNKNOWN_ERROR]: "Ha ocurrido un error desconocido."
    };
    alert(mensajes[error.code] || "Error desconocido");
};

// Obtener ubicación del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    alert("Geolocalización no es soportada por este navegador.");
}

// Event listener para las tarjetas de ubicación
document.addEventListener('DOMContentLoaded', () => {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const lat = parseFloat(card.getAttribute('data-lat'));
            const lng = parseFloat(card.getAttribute('data-lng'));
            
            map.setView([lat, lng], 16);
            
            if (allMarkers[index]) {
                allMarkers[index].openPopup();
            }
        });
    });
});