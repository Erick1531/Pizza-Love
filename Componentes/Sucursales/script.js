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

// Función para generar HTML del popup
const crearPopupHTML = (s) => {
    return `
        <div class="custom-popup">
            <h3 class="popup-title">${s.nombre}</h3>
            <div class="popup-info">
                <div class="popup-item">
                    <span class="popup-icon">📍</span>
                    <span class="popup-text">${s.direccion}</span>
                </div>
                <div class="popup-item">
                    <span class="popup-icon">📞</span>
                    <a href="tel:${s.tel}" class="popup-link">${s.tel}</a>
                </div>
                <div class="popup-item">
                    <span class="popup-icon">🕐</span>
                    <span class="popup-text">${s.horario}</span>
                </div>
            </div>
            <a href="tel:${s.tel}" class="popup-button">Llamar ahora</a>
        </div>
    `;
};

// Función para generar HTML de tarjeta
const crearTarjetaHTML = (s) => {
    const statusBadge = s.abierto 
        ? '<span class="status-badge status-open">🟢 Abierto</span>'
        : '<span class="status-badge status-closed">🔴 Cerrado</span>';

    const selectButton = selectionMode && s.abierto 
        ? `<button class="select-branch-btn" onclick="selectBranch('${s.nombre.replace(/'/g, "\\'")}')">✓ Seleccionar esta sucursal</button>` 
        : '';

    return `
        <div class="location-card ${s.abierto ? '' : 'closed'}" data-lat="${s.lat}" data-lng="${s.lng}" data-nombre="${s.nombre}">
            <h3>${s.nombre}</h3>
            ${statusBadge}
            <div class="location-info">
                <div>📍 ${s.direccion}</div>
                <div>📞 ${s.tel}</div>
                <div>🕐 ${s.horario}</div>
                <div class="contact"><a href="tel:${s.tel}">Llamar</a></div>
            </div>
            ${selectButton}
        </div>
    `;
};

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

// Variables globales
let userMarker;
let allMarkers = [];
let sucursales = [];
let selectionMode = false;

// Verificar si estamos en modo selección
const urlParams = new URLSearchParams(window.location.search);
selectionMode = urlParams.get('select') === 'true';

// Función principal que inicializa el mapa con los datos
const inicializarMapa = (data) => {
    sucursales = data.sucursales;

    // Generar tarjetas dinámicamente
    const locationsContainer = document.getElementById('locations-container');
    if (locationsContainer) {
        locationsContainer.innerHTML = sucursales.map(crearTarjetaHTML).join('');
    }

    // Crear marcadores dinámicamente
    allMarkers = sucursales.map(sucursal => {
        return L.marker([sucursal.lat, sucursal.lng], { icon: iconoPL })
            .addTo(map)
            .bindPopup(crearPopupHTML(sucursal), {
                maxWidth: 350,
                className: 'custom-popup-wrapper'
            });
    });

    // Event listener para las tarjetas de ubicación
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

    // Obtener ubicación del usuario después de cargar las sucursales
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalización no es soportada por este navegador.");
    }
};

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

// Función para seleccionar una sucursal (accesible globalmente)
window.selectBranch = function(branchName) {
    const branch = sucursales.find(s => s.nombre === branchName);
    if (branch && branch.abierto) {
        // Guardar sucursal seleccionada en sessionStorage
        sessionStorage.setItem('selectedBranch', JSON.stringify(branch));
        
        // Mostrar confirmación
        if (confirm(`¿Confirmar sucursal ${branch.nombre}?\n\n${branch.direccion}`)) {
            // Regresar al menú
            window.location.href = '../Food/index.html';
        }
    }
};

// Función para obtener la sucursal más cercana (accesible desde otros scripts)
window.getNearestBranch = function() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    
                    let minDist = Infinity;
                    let nearest = null;
                    
                    sucursales.forEach(sucursal => {
                        if (sucursal.abierto) { // Solo considerar sucursales abiertas
                            const d = haversineDistance(userLat, userLon, sucursal.lat, sucursal.lng);
                            if (d < minDist) {
                                minDist = d;
                                nearest = { ...sucursal, distance: Math.round(d) };
                            }
                        }
                    });
                    
                    if (nearest) {
                        resolve(nearest);
                    } else {
                        reject(new Error('No se encontraron sucursales abiertas'));
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocalización no soportada'));
        }
    });
};

// CARGAR DATOS DESDE ARCHIVO JSON
fetch('sucursales.json')
    .then(response => response.json())
    .then(data => {
        inicializarMapa(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        alert('No se pudieron cargar los datos de las sucursales');
    });