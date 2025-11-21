// Variables globales
let cart = [];
let currentCategory = 'promociones';
let currentProduct = null;
let productConfig = {};
let selectedBranch = null;

// Elementos del DOM
let mainContent, cartBtn, cartCount, pizzaModal, cartModal, closePizzaModal, closeCartModal, floatingCart, branchModal, closeBranchModal;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    mainContent = document.getElementById('mainContent');
    cartBtn = document.getElementById('cartBtn');
    cartCount = document.getElementById('cartCount');
    pizzaModal = document.getElementById('pizzaModal');
    cartModal = document.getElementById('cartModal');
    branchModal = document.getElementById('branchModal');
    closePizzaModal = document.getElementById('closePizzaModal');
    closeCartModal = document.getElementById('closeCartModal');
    closeBranchModal = document.getElementById('closeBranchModal');
    floatingCart = document.getElementById('floatingCart');

    setupTabs();
    
    // Leer el hash de la URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        const tabButton = document.querySelector(`.tab[data-category="${hash}"]`);
        if (tabButton) {
            currentCategory = hash;
            tabButton.click();
        } else {
            renderCategory('promociones');
        }
    } else {
        renderCategory('promociones');
    }
    
    setupModalListeners();
});

// Setup tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-category');
            renderCategory(currentCategory);
        });
    });
}

// Setup modal listeners
function setupModalListeners() {
    cartBtn.addEventListener('click', () => showCartModal());
    floatingCart.addEventListener('click', () => showCartModal());
    closePizzaModal.addEventListener('click', () => hidePizzaModal());
    closeCartModal.addEventListener('click', () => hideCartModal());
    closeBranchModal.addEventListener('click', () => hideBranchModal());

    pizzaModal.addEventListener('click', (e) => {
        if (e.target === pizzaModal) hidePizzaModal();
    });
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) hideCartModal();
    });
    branchModal.addEventListener('click', (e) => {
        if (e.target === branchModal) hideBranchModal();
    });
}

// Renderizar categoría
function renderCategory(category) {
    mainContent.innerHTML = '';
    
    if (category === 'promociones') {
        renderItems(menuData.promociones, 'promo');
    } else if (category === 'pizzas') {
        renderPizzas();
    } else {
        renderItems(menuData[category], 'simple');
    }
}

// Renderizar items genéricos
function renderItems(items, type) {
    const grid = document.createElement('div');
    grid.className = 'items-grid';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${type}-card`;
        
        const imageHTML = item.image && (item.image.includes('/') || item.image.includes('.'))
            ? `<img src="${item.image}" alt="${item.name}" class="${type === 'promo' ? 'promo' : 'simple'}-image">`
            : `<div class="${type === 'promo' ? 'promo' : 'simple'}-icon">${item.image || ''}</div>`;
        
        const hasOptions = (item.options && item.options.length > 0);
        
        if (type === 'promo') {
            card.innerHTML = `
                ${imageHTML}
                <div class="promo-content">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    ${item.details ? `<p class="details">${item.details}</p>` : ''}
                    <div class="promo-footer">
                        <span class="price">$${item.price}</span>
                        <button class="add-btn">${hasOptions ? 'Personalizar' : 'Agregar'}</button>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                ${imageHTML}
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                ${item.weight ? `<p class="weight">${item.weight}</p>` : ''}
                <div class="promo-footer">
                    <span class="price">$${item.price}</span>
                    <button class="add-btn">${hasOptions ? 'Personalizar' : 'Agregar'}</button>
                </div>
            `;
        }
        
        card.querySelector('.add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (hasOptions) {
                openCustomizer(item, type);
            } else {
                addToCart(item);
            }
        });
        
        grid.appendChild(card);
    });
    
    mainContent.appendChild(grid);
}

// Renderizar pizzas
function renderPizzas() {
    const grid = document.createElement('div');
    grid.className = 'items-grid';
    
    Object.keys(menuData.pizzas).forEach(pizzaName => {
        const pizza = menuData.pizzas[pizzaName];
        const card = document.createElement('div');
        card.className = 'item-card pizza-card';
        
        const imageHTML = pizza.image 
            ? `<img src="${pizza.image}" alt="${pizzaName}" class="pizza-image">`
            : `<div class="pizza-icon">🍕</div>`;
        
        card.innerHTML = `
            ${imageHTML}
            <h3>${pizzaName}</h3>
            <p class="description">${pizza.description}</p>
            <div class="promo-footer">
                <span class="price">$${pizza.sizes[0].price}</span>
                <button class="add-btn">Personalizar</button>
            </div>
        `;
        
        card.addEventListener('click', () => {
            openCustomizer({ ...pizza, name: pizzaName }, 'pizza');
        });
        
        grid.appendChild(card);
    });
    
    mainContent.appendChild(grid);
}

// Abrir personalizador universal
function openCustomizer(product, type) {
    currentProduct = { ...product, type };
    productConfig = {
        quantity: 1,
        size: null,
        ingredients: [],
        extras: [],
        options: {}
    };

    document.getElementById('pizzaModalTitle').textContent = product.name;
    renderPizzaCustomizer();
    pizzaModal.classList.add('show');
}

// Renderizar personalizador de pizza
function renderPizzaCustomizer() {
    const modalBody = document.getElementById('pizzaModalBody');
    const product = currentProduct;
    let basePrice = product.price || (product.sizes ? product.sizes[0].price : 0);
    
    let html = `<p class="pizza-description">${product.description}</p>`;
    if (product.details) {
        html += `<p class="pizza-description" style="font-size: 0.875rem; color: #6b7280;">${product.details}</p>`;
    }
    
    // Tamaños
    if (product.sizes) {
        html += `
            <div class="section">
                <h3>Selecciona el tamaño:</h3>
                <div class="sizes-grid">
                    ${product.sizes.map((size, idx) => `
                        <div class="size-option" data-type="size" data-index="${idx}">
                            <span class="size-name">${size.name}</span>
                            <span class="size-inches">${size.size}</span>
                            <span class="size-price">$${size.price}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Ingredientes
    if (product.ingredients) {
        html += `
            <div class="section" id="ingredientsSection" style="${product.sizes ? 'display: none;' : ''}">
                <h3>Selecciona ${product.maxIngredients ? `${product.maxIngredients} ingrediente${product.maxIngredients > 1 ? 's' : ''}` : 'tu ingrediente'}:</h3>
                <div class="ingredients-grid">
                    ${product.ingredients.map(ing => `
                        <div class="ingredient-option" data-type="ingredient" data-value="${ing}">${ing}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Extras
    if (product.extras) {
        html += `
            <div class="section" id="extrasSection" style="display: none;">
                <h3>Extras:</h3>
                <div id="extrasContainer"></div>
            </div>
        `;
    }
    
    // Opciones genéricas
    if (product.options && product.options.length > 0) {
        product.options.forEach((option, idx) => {
            html += `
                <div class="section">
                    <h3>${option.type}${option.required ? ' *' : ' (opcional)'}:</h3>
                    <div class="options-grid">
                        ${option.choices.map(choice => {
                            const choiceText = typeof choice === 'string' ? choice : choice.name;
                            const choicePrice = typeof choice === 'object' && choice.price ? choice.price : null;
                            return `
                                <div class="option-item" data-type="option" data-option-key="${option.type}" data-value="${choiceText}" ${choicePrice ? `data-price="${choicePrice}"` : ''}>
                                    ${choiceText}
                                    ${choicePrice ? `<br><span style="color: #fb0404; font-weight: bold; font-size: 0.875rem;">$${choicePrice}</span>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
    }
    
    // Cantidad
    html += `
        <div class="section">
            <h3>Cantidad:</h3>
            <div class="quantity-controls">
                <button class="quantity-btn" id="decreaseQty">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <span class="quantity-display" id="quantityDisplay">1</span>
                <button class="quantity-btn" id="increaseQty">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Botón agregar
    html += `
        <button class="add-to-cart-btn" id="addToCartBtn" ${product.sizes || (product.options && product.options.some(o => o.required)) ? 'style="display: none;"' : ''}>
            Agregar al carrito - $<span id="totalPrice">${basePrice}</span>
        </button>
    `;
    
    modalBody.innerHTML = html;
    setupPizzaListeners();
}

// Setup listeners pizza
function setupPizzaListeners() {
    const product = currentProduct;
    
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            const sizeIndex = parseInt(this.getAttribute('data-index'));
            productConfig.size = { ...product.sizes[sizeIndex], index: sizeIndex };
            productConfig.extras = [];
            
            if (product.ingredients) {
                document.getElementById('ingredientsSection').style.display = 'block';
            }
            if (product.extras) {
                document.getElementById('extrasSection').style.display = 'block';
                renderExtras();
            }
            document.getElementById('addToCartBtn').style.display = 'block';
            updateTotalPrice();
        });
    });
    
    document.querySelectorAll('.ingredient-option').forEach(option => {
        option.addEventListener('click', function() {
            const ingredient = this.getAttribute('data-value');
            const maxIng = product.maxIngredients || 1;
            
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                productConfig.ingredients = productConfig.ingredients.filter(i => i !== ingredient);
            } else {
                if (maxIng === 1) {
                    document.querySelectorAll('.ingredient-option').forEach(o => o.classList.remove('selected'));
                    productConfig.ingredients = [ingredient];
                    this.classList.add('selected');
                } else if (productConfig.ingredients.length < maxIng) {
                    this.classList.add('selected');
                    productConfig.ingredients.push(ingredient);
                }
            }
            updateTotalPrice();
        });
    });
    
    document.querySelectorAll('.option-item').forEach(option => {
        option.addEventListener('click', function() {
            const optionKey = this.getAttribute('data-option-key');
            const value = this.getAttribute('data-value');
            const price = this.getAttribute('data-price');
            
            document.querySelectorAll(`.option-item[data-option-key="${optionKey}"]`).forEach(o => {
                o.classList.remove('selected');
            });
            
            this.classList.add('selected');
            productConfig.options[optionKey] = price ? { value, price: parseInt(price) } : value;
            
            updateTotalPrice();
            checkRequiredOptions();
        });
    });
    
    document.getElementById('decreaseQty')?.addEventListener('click', () => {
        if (productConfig.quantity > 1) {
            productConfig.quantity--;
            document.getElementById('quantityDisplay').textContent = productConfig.quantity;
            updateTotalPrice();
        }
    });
    
    document.getElementById('increaseQty')?.addEventListener('click', () => {
        productConfig.quantity++;
        document.getElementById('quantityDisplay').textContent = productConfig.quantity;
        updateTotalPrice();
    });
    
    document.getElementById('addToCartBtn')?.addEventListener('click', () => {
        if (validateProduct()) {
            addConfiguredProductToCart();
        }
    });
}

// Renderizar extras
function renderExtras() {
    const product = currentProduct;
    if (!product.extras || !productConfig.size) return;
    
    const sizeIndex = productConfig.size.index;
    const container = document.getElementById('extrasContainer');
    
    let html = '';
    product.extras.forEach(extra => {
        const price = extra.prices[sizeIndex];
        if (price > 0) {
            html += `
                <div class="extra-option">
                    <label>
                        <input type="checkbox" data-extra="${extra.name}" data-price="${price}">
                        <span>${extra.name}</span>
                    </label>
                    <span class="extra-price">+$${price}</span>
                </div>
            `;
        }
    });
    
    container.innerHTML = html;
    
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const extraName = this.getAttribute('data-extra');
            const extraPrice = parseFloat(this.getAttribute('data-price'));
            
            if (this.checked) {
                productConfig.extras.push({ name: extraName, price: extraPrice });
            } else {
                productConfig.extras = productConfig.extras.filter(e => e.name !== extraName);
            }
            
            updateTotalPrice();
        });
    });
}

// Actualizar precio total
function updateTotalPrice() {
    const product = currentProduct;
    let basePrice = product.price || 0;
    
    if (productConfig.size) {
        basePrice = productConfig.size.price;
    }
    
    Object.values(productConfig.options).forEach(option => {
        if (typeof option === 'object' && option.price) {
            basePrice = option.price;
        }
    });
    
    productConfig.extras.forEach(extra => {
        basePrice += extra.price;
    });
    
    const total = basePrice * productConfig.quantity;
    
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = total;
    }
    
    const addButton = document.getElementById('addToCartBtn');
    if (product.ingredients && product.maxIngredients && addButton) {
        const hasRequiredIngredients = productConfig.ingredients.length > 0;
        addButton.disabled = !hasRequiredIngredients;
        addButton.style.opacity = hasRequiredIngredients ? '1' : '0.5';
        addButton.style.cursor = hasRequiredIngredients ? 'pointer' : 'not-allowed';
    }
}

// Verificar opciones requeridas
function checkRequiredOptions() {
    const product = currentProduct;
    const addButton = document.getElementById('addToCartBtn');
    
    if (!product.options || !addButton) return;
    
    const allRequiredSelected = product.options
        .filter(opt => opt.required)
        .every(opt => productConfig.options[opt.type]);
    
    if (allRequiredSelected && !product.sizes) {
        addButton.style.display = 'block';
    }
}

// Validar producto
function validateProduct() {
    const product = currentProduct;
    
    if (product.sizes && !productConfig.size) {
        alert('Por favor selecciona un tamaño');
        return false;
    }
    
    if (product.ingredients && product.maxIngredients && productConfig.ingredients.length === 0) {
        alert('Por favor selecciona al menos un ingrediente');
        return false;
    }
    
    if (product.options) {
        const missingRequired = product.options
            .filter(opt => opt.required)
            .find(opt => !productConfig.options[opt.type]);
        
        if (missingRequired) {
            alert(`Por favor selecciona: ${missingRequired.type}`);
            return false;
        }
    }
    
    return true;
}

// Agregar producto configurado al carrito
function addConfiguredProductToCart() {
    const product = currentProduct;
    const totalPrice = parseInt(document.getElementById('totalPrice').textContent);
    
    let description = [];
    
    if (productConfig.size) {
        description.push(`Tamaño: ${productConfig.size.name}`);
    }
    
    if (productConfig.ingredients.length > 0) {
        description.push(`Ingredientes: ${productConfig.ingredients.join(', ')}`);
    }
    
    if (productConfig.extras.length > 0) {
        description.push(`Extras: ${productConfig.extras.map(e => e.name).join(', ')}`);
    }
    
    Object.keys(productConfig.options).forEach(key => {
        const value = productConfig.options[key];
        const displayValue = typeof value === 'object' ? value.value : value;
        description.push(`${key}: ${displayValue}`);
    });
    
    const item = {
        id: Date.now(),
        name: product.name,
        description: description.join(' | '),
        quantity: productConfig.quantity,
        totalPrice: totalPrice
    };
    
    cart.push(item);
    updateCartUI();
    hidePizzaModal();
}

// Agregar producto simple al carrito
function addToCart(product) {
    const item = {
        id: Date.now(),
        name: product.name,
        description: product.description,
        quantity: 1,
        totalPrice: product.price
    };
    
    cart.push(item);
    updateCartUI();
}

// Actualizar UI del carrito
function updateCartUI() {
    const count = cart.length;
    cartCount.textContent = count;
    document.getElementById('floatingCartCount').textContent = count;
    document.getElementById('floatingCartTotal').textContent = `$${getCartTotal()}`;
    
    floatingCart.style.display = count > 0 ? 'flex' : 'none';
}

// Obtener total del carrito
function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
}

// Mostrar modal del carrito
function showCartModal() {
    renderCart();
    cartModal.classList.add('show');
}

// Renderizar carrito
function renderCart() {
    const modalBody = document.getElementById('cartModalBody');
    document.getElementById('cartModalCount').textContent = cart.length;
    
    if (cart.length === 0) {
        modalBody.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p style="font-size: 1.125rem;">Tu carrito está vacío</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Agrega productos para comenzar tu pedido</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="cart-items">';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-content">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        ${item.description ? `<p class="cart-item-detail">${item.description}</p>` : ''}
                        ${item.quantity > 1 ? `<p class="cart-item-detail">Cantidad: ${item.quantity}</p>` : ''}
                    </div>
                    <div class="cart-item-price-section">
                        <p class="cart-item-price">$${item.totalPrice}</p>
                        <button class="remove-btn" data-item-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    html += `
        <div class="cart-total">
            <div class="cart-total-row">
                <span class="cart-total-label">Total:</span>
                <span class="cart-total-price">$${getCartTotal()}</span>
            </div>
            <button class="checkout-btn" id="checkoutBtn">Continuar al Pago</button>
            <button class="continue-shopping-btn" id="continueShopping">Seguir Comprando</button>
        </div>
    `;
    
    modalBody.innerHTML = html;
    
    modalBody.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item-id'));
            removeFromCart(itemId);
        });
    });
    
    document.getElementById('continueShopping')?.addEventListener('click', () => {
        hideCartModal();
    });
    
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        proceedToCheckout();
    });
}

// Proceder al pago - Mostrar sucursal más cercana
function proceedToCheckout() {
    hideCartModal();
    
    const modalBody = document.getElementById('branchModalBody');
    modalBody.innerHTML = `
        <div class="loading-branch">
            <div class="spinner"></div>
            <p>Buscando sucursal más cercana...</p>
        </div>
    `;
    
    branchModal.classList.add('show');
    
    // Obtener sucursal más cercana directamente
    getNearestBranchLocal()
        .then(branch => {
            selectedBranch = branch;
            renderBranchSelection(branch);
        })
        .catch(error => {
            console.error('Error al obtener sucursal:', error);
            renderBranchError(error);
        });
}

// Función local para obtener sucursal más cercana
function getNearestBranchLocal() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalización no soportada'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                
                try {
                    // Cargar sucursales desde JSON (ajusta la ruta según tu estructura)
                    const response = await fetch('../Sucursales/sucursales.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    
                    let minDist = Infinity;
                    let nearest = null;
                    
                    data.sucursales.forEach(sucursal => {
                        if (sucursal.abierto) {
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
                } catch (error) {
                    reject(new Error('Error al cargar sucursales'));
                }
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// Función Haversine para calcular distancia
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = v => v * Math.PI / 180;
    const R = 6371000; // Radio de la Tierra en metros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Renderizar selección de sucursal
function renderBranchSelection(branch) {
    const modalBody = document.getElementById('branchModalBody');
    
    modalBody.innerHTML = `
        <div class="branch-selection">
            <div class="branch-header">
                <h3>Sucursal más cercana</h3>
                <p class="branch-distance">📍 A ${(branch.distance / 1000).toFixed(1)} km de tu ubicación</p>
            </div>
            
            <div class="branch-card-selected">
                <h4>${branch.nombre}</h4>
                <div class="branch-info">
                    <p>📍 ${branch.direccion}</p>
                    <p>📞 ${branch.tel}</p>
                    <p>🕐 ${branch.horario}</p>
                </div>
            </div>
            
            <div class="branch-actions">
                <button class="confirm-branch-btn" id="confirmBranchBtn">
                    Confirmar Sucursal
                </button>
                <button class="change-branch-btn" id="changeBranchBtn">
                    Ver Todas las Sucursales
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('confirmBranchBtn').addEventListener('click', () => {
        confirmBranch(branch);
    });
    
    document.getElementById('changeBranchBtn').addEventListener('click', () => {
        goToMapPage();
    });
}

// Renderizar error de sucursal
function renderBranchError(error) {
    const modalBody = document.getElementById('branchModalBody');
    
    let errorMessage = 'No se pudo obtener tu ubicación.';
    
    if (error.code === 1) {
        errorMessage = 'Necesitamos acceso a tu ubicación para encontrar la sucursal más cercana.';
    } else if (error.code === 2) {
        errorMessage = 'No se pudo determinar tu ubicación actual.';
    } else if (error.code === 3) {
        errorMessage = 'Se agotó el tiempo de espera al obtener tu ubicación.';
    }
    
    modalBody.innerHTML = `
        <div class="branch-error">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3>Error de ubicación</h3>
            <p>${errorMessage}</p>
            <button class="view-map-btn" id="viewMapBtn">
                Ver Mapa de Sucursales
            </button>
        </div>
    `;
    
    document.getElementById('viewMapBtn').addEventListener('click', () => {
        goToMapPage();
    });
}

// Confirmar sucursal y proceder
function confirmBranch(branch) {
    // Aquí puedes procesar el pedido con la sucursal seleccionada
    alert(`Pedido confirmado para la sucursal: ${branch.nombre}\n\nTotal: $${getCartTotal()}\n\n¡Gracias por tu compra!`);
    
    // Limpiar carrito
    cart = [];
    updateCartUI();
    hideBranchModal();
}

// Ir a la página del mapa
function goToMapPage() {
    // Guardar el carrito antes de ir al mapa
    localStorage.setItem('tempCart', JSON.stringify(cart));
    // Redirigir a la página del mapa con parámetro para selección
    window.location.href = '../Sucursales/index.html?select=true';
}

// Eliminar del carrito
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    renderCart();
}

// Ocultar modales
function hidePizzaModal() {
    pizzaModal.classList.remove('show');
    currentProduct = null;
    productConfig = { quantity: 1, size: null, ingredients: [], extras: [], options: {} };
}

function hideCartModal() {
    cartModal.classList.remove('show');
}

function hideBranchModal() {
    branchModal.classList.remove('show');
    selectedBranch = null;
}