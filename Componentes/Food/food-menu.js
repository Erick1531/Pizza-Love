// Variables globales
let cart = [];
let currentCategory = 'promociones';
let selectedPizza = null;
let pizzaConfig = {
    size: null,
    ingredients: [],
    extras: [],
    quantity: 1
};
let selectedPromo = null;
let promoConfig = {};

// Elementos del DOM
let mainContent, cartBtn, cartCount, pizzaModal, cartModal, closePizzaModal, closeCartModal, floatingCart;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    mainContent = document.getElementById('mainContent');
    cartBtn = document.getElementById('cartBtn');
    cartCount = document.getElementById('cartCount');
    pizzaModal = document.getElementById('pizzaModal');
    cartModal = document.getElementById('cartModal');
    closePizzaModal = document.getElementById('closePizzaModal');
    closeCartModal = document.getElementById('closeCartModal');
    floatingCart = document.getElementById('floatingCart');
    
    setupTabs();
    renderCategory('promociones');
    setupModalListeners();
});

// Setup tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            currentCategory = category;
            renderCategory(category);
        });
    });
}

// Setup modal listeners
function setupModalListeners() {
    cartBtn.addEventListener('click', () => showCartModal());
    floatingCart.addEventListener('click', () => showCartModal());
    closePizzaModal.addEventListener('click', () => hidePizzaModal());
    closeCartModal.addEventListener('click', () => hideCartModal());
    
    // Cerrar modal al hacer click fuera
    pizzaModal.addEventListener('click', (e) => {
        if (e.target === pizzaModal) hidePizzaModal();
    });
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) hideCartModal();
    });
    
    closePromoModal.addEventListener('click', () => hidePromoModal());
    promoModal.addEventListener('click', (e) => {
        if (e.target === promoModal) hidePromoModal();
    });
}

// Renderizar categoría
function renderCategory(category) {
    mainContent.innerHTML = '';
    
    console.log('Categoría seleccionada:', category); // Debug
    console.log('Datos disponibles:', menuData[category]); // Debug
    
    if (category === 'promociones') {
        renderPromociones();
    } else if (category === 'pizzas') {
        renderPizzas();
    } else {
        renderSimpleItems(category);
    }
}

// Renderizar promociones
function renderPromociones() {
    const grid = document.createElement('div');
    grid.className = 'items-grid';
    
    menuData.promociones.forEach(promo => {
        const card = document.createElement('div');
        card.className = 'item-card promo-card';
        
        const imageHTML = promo.image && (promo.image.includes('/') || promo.image.includes('.'))
            ? `<img src="${promo.image}" alt="${promo.name}" class="promo-image">`
            : `<div class="promo-icon">${promo.image}</div>`;
        
        card.innerHTML = `
            ${imageHTML}
            <div class="promo-content">
                <h3>${promo.name}</h3>
                <p class="description">${promo.description}</p>
                ${promo.details ? `<p class="details">${promo.details}</p>` : ''}
                <div class="promo-footer">
                    <span class="price">$${promo.price}</span>
                    <button class="add-btn">Agregar</button>
                </div>
            </div>
        `;
        
        card.querySelector('.add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (promo.options && promo.options.length > 0) {
                openPromoCustomizer(promo);
            } else {
                addPromoToCart(promo);
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
        
        // Si tiene imagen, usa img, si no usa emoji
        const imageHTML = pizza.image 
            ? `<img src="${pizza.image}" alt="${pizzaName}" class="pizza-image">`
            : `<div class="pizza-icon">🍕</div>`;
        
        card.innerHTML = `
            ${imageHTML}
            <h3>${pizzaName}</h3>
            <p class="description">${pizza.description}</p>
            <div class="pizza-price-section">
                <span class="price-label">Desde</span>
                <div class="price">$${pizza.sizes[0].price}</div>
                <button class="customize-btn">
                    Personalizar
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        `;
        
        card.addEventListener('click', () => {
            openPizzaCustomizer(pizzaName, pizza);
        });
        
        grid.appendChild(card);
    });
    
    mainContent.appendChild(grid);
}

// Renderizar items simples
function renderSimpleItems(category) {
    const grid = document.createElement('div');
    grid.className = 'items-grid';
    
    const items = menuData[category];
    if (!items) return;
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card simple-card';
        
        // Si tiene imagen, usa img, si no no muestra nada
        const imageHTML = item.image 
            ? `<img src="${item.image}" alt="${item.name}" class="simple-image">`
            : '';
        
        card.innerHTML = `
            ${imageHTML}
            <h3>${item.name}</h3>
            <p class="description">${item.description}</p>
            ${item.weight ? `<p class="weight">${item.weight}</p>` : ''}
            <div class="promo-footer">
                <span class="price">$${item.price}</span>
                <button class="add-btn">Agregar</button>
            </div>
        `;
        
        card.querySelector('.add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            addSimpleItemToCart(item);
        });
        
        grid.appendChild(card);
    });
    
    mainContent.appendChild(grid);
}

// Abrir personalizador de pizza
function openPizzaCustomizer(pizzaName, pizzaData) {
    selectedPizza = { name: pizzaName, data: pizzaData };
    pizzaConfig = {
        size: null,
        ingredients: [],
        extras: [],
        quantity: 1
    };
    
    document.getElementById('pizzaModalTitle').textContent = pizzaName;
    renderPizzaCustomizer();
    pizzaModal.classList.add('show');
}

// Renderizar personalizador de pizza
function renderPizzaCustomizer() {
    const modalBody = document.getElementById('pizzaModalBody');
    const pizza = selectedPizza.data;
    
    let html = `
        <p class="pizza-description">${pizza.description}</p>
        
        <div class="section">
            <h3>Selecciona el tamaño:</h3>
            <div class="sizes-grid" id="sizesGrid">
                ${pizza.sizes.map((size, idx) => `
                    <div class="size-option" data-size-index="${idx}">
                        <span class="size-name">${size.name}</span>
                        <span class="size-inches">${size.size}</span>
                        <span class="size-price">${size.price}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Ingredientes (si aplica)
    if (pizza.ingredients) {
        html += `
            <div class="section" id="ingredientsSection" style="display: none;">
                <h3>Selecciona ${pizza.maxIngredients ? `${pizza.maxIngredients} ingrediente${pizza.maxIngredients > 1 ? 's' : ''}` : 'tu ingrediente'}:</h3>
                <div class="ingredients-grid" id="ingredientsGrid">
                    ${pizza.ingredients.map((ing, idx) => `
                        <div class="ingredient-option" data-ingredient="${ing}">${ing}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Extras
    html += `
        <div class="section" id="extrasSection" style="display: none;">
            <h3>Extras:</h3>
            <div id="extrasContainer"></div>
        </div>
    `;
    
    // Cantidad
    html += `
        <div class="section" id="quantitySection" style="display: none;">
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
        <button class="add-to-cart-btn" id="addPizzaToCart" style="display: none;">
            Agregar al carrito - $<span id="totalPrice">0</span>
        </button>
    `;
    
    modalBody.innerHTML = html;
    setupPizzaCustomizerListeners();
}

// Setup listeners del personalizador
function setupPizzaCustomizerListeners() {
    const pizza = selectedPizza.data;
    
    // Tamaños
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            const sizeIndex = parseInt(this.getAttribute('data-size-index'));
            pizzaConfig.size = { ...pizza.sizes[sizeIndex], index: sizeIndex };
            pizzaConfig.extras = [];
            
            // Mostrar secciones
            if (pizza.ingredients) {
                document.getElementById('ingredientsSection').style.display = 'block';
            }
            document.getElementById('extrasSection').style.display = 'block';
            document.getElementById('quantitySection').style.display = 'block';
            document.getElementById('addPizzaToCart').style.display = 'block';
            
            renderExtras();
            updateTotalPrice();
        });
    });
    
    // Ingredientes
    if (pizza.ingredients) {
        document.querySelectorAll('.ingredient-option').forEach(option => {
            option.addEventListener('click', function() {
                const ingredient = this.getAttribute('data-ingredient');
                const maxIng = pizza.maxIngredients || 1;
                
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    pizzaConfig.ingredients = pizzaConfig.ingredients.filter(i => i !== ingredient);
                } else {
                    if (maxIng === 1) {
                        document.querySelectorAll('.ingredient-option').forEach(o => o.classList.remove('selected'));
                        pizzaConfig.ingredients = [ingredient];
                        this.classList.add('selected');
                    } else if (pizzaConfig.ingredients.length < maxIng) {
                        this.classList.add('selected');
                        pizzaConfig.ingredients.push(ingredient);
                    }
                }
                updateTotalPrice();
            });
        });
    }
    
    // Cantidad
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (pizzaConfig.quantity > 1) {
                pizzaConfig.quantity--;
                document.getElementById('quantityDisplay').textContent = pizzaConfig.quantity;
                updateTotalPrice();
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            pizzaConfig.quantity++;
            document.getElementById('quantityDisplay').textContent = pizzaConfig.quantity;
            updateTotalPrice();
        });
    }
    
    // Botón agregar
    const addBtn = document.getElementById('addPizzaToCart');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (pizzaConfig.size) {
                // Validar ingredientes si son requeridos
                if (pizza.ingredients && pizza.maxIngredients && pizzaConfig.ingredients.length === 0) {
                    alert('Por favor selecciona al menos un ingrediente');
                    return;
                }
                addPizzaToCart();
            }
        });
    }
}

// Renderizar extras
function renderExtras() {
    const pizza = selectedPizza.data;
    const sizeIndex = pizzaConfig.size.index;
    const container = document.getElementById('extrasContainer');
    
    let html = '';
    pizza.extras.forEach(extra => {
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
    
    // Setup listeners para extras
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const extraName = this.getAttribute('data-extra');
            const extraPrice = parseFloat(this.getAttribute('data-price'));
            
            if (this.checked) {
                pizzaConfig.extras.push({ name: extraName, price: extraPrice });
            } else {
                pizzaConfig.extras = pizzaConfig.extras.filter(e => e.name !== extraName);
            }
            
            updateTotalPrice();
        });
    });
}

// Actualizar precio total
function updateTotalPrice() {
    if (!pizzaConfig.size) return;
    
    let total = pizzaConfig.size.price;
    pizzaConfig.extras.forEach(extra => {
        total += extra.price;
    });
    total *= pizzaConfig.quantity;
    
    const totalPriceElement = document.getElementById('totalPrice');
    const addButton = document.getElementById('addPizzaToCart');
    
    if (totalPriceElement) {
        totalPriceElement.textContent = total;
    }
    
    // Validar si tiene ingredientes requeridos
    const pizza = selectedPizza.data;
    if (pizza.ingredients && pizza.maxIngredients) {
        const hasRequiredIngredients = pizzaConfig.ingredients.length > 0;
        if (addButton) {
            addButton.disabled = !hasRequiredIngredients;
            if (!hasRequiredIngredients) {
                addButton.style.opacity = '0.5';
                addButton.style.cursor = 'not-allowed';
            } else {
                addButton.style.opacity = '1';
                addButton.style.cursor = 'pointer';
            }
        }
    }
}

// Agregar pizza al carrito
function addPizzaToCart() {
    const item = {
        id: Date.now(),
        name: selectedPizza.name,
        size: pizzaConfig.size.name,
        ingredients: [...pizzaConfig.ingredients],
        extras: [...pizzaConfig.extras],
        quantity: pizzaConfig.quantity,
        totalPrice: parseInt(document.getElementById('totalPrice').textContent)
    };
    
    cart.push(item);
    updateCartUI();
    hidePizzaModal();
}

// Agregar promo al carrito
function addPromoToCart(promo) {
    const item = {
        id: Date.now(),
        name: promo.name,
        description: promo.description,
        totalPrice: promo.price,
        quantity: 1
    };
    
    cart.push(item);
    updateCartUI();
}

// Agregar item simple al carrito
function addSimpleItemToCart(item) {
    const cartItem = {
        id: Date.now(),
        name: item.name,
        description: item.description,
        totalPrice: item.price,
        quantity: 1
    };
    
    cart.push(cartItem);
    updateCartUI();
}

// Actualizar UI del carrito
function updateCartUI() {
    const count = cart.length;
    cartCount.textContent = count;
    document.getElementById('floatingCartCount').textContent = count;
    document.getElementById('floatingCartTotal').textContent = `$${getCartTotal()}`;
    
    if (count > 0) {
        floatingCart.style.display = 'flex';
    } else {
        floatingCart.style.display = 'none';
    }
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
                        ${item.size ? `<p class="cart-item-detail">Tamaño: ${item.size}</p>` : ''}
                        ${item.ingredients && item.ingredients.length > 0 ? `<p class="cart-item-detail">Ingredientes: ${item.ingredients.join(', ')}</p>` : ''}
                        ${item.extras && item.extras.length > 0 ? `<p class="cart-item-detail">Extras: ${item.extras.map(e => e.name).join(', ')}</p>` : ''}
                        ${item.description && !item.size ? `<p class="cart-item-detail">${item.description}</p>` : ''}
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
            <button class="checkout-btn">Continuar al Pago</button>
            <button class="continue-shopping-btn" id="continueShopping">Seguir Comprando</button>
        </div>
    `;
    
    modalBody.innerHTML = html;
    
    // Setup listeners
    modalBody.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item-id'));
            removeFromCart(itemId);
        });
    });
    
    const continueBtn = document.getElementById('continueShopping');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            hideCartModal();
        });
    }
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
    selectedPizza = null;
    pizzaConfig = {
        size: null,
        ingredients: [],
        extras: [],
        quantity: 1
    };
}

function hideCartModal() {
    cartModal.classList.remove('show');
}

function openPromoCustomizer(promo) {
    selectedPromo = promo;
    promoConfig = {};
    document.getElementById('promoModalTitle').textContent = promo.name;
    renderPromoCustomizer();
    promoModal.classList.add('show');
}

function renderPromoCustomizer() {
    const modalBody = document.getElementById('promoModalBody');
    const promo = selectedPromo;
    
    let html = `<p class="promo-description">${promo.description}</p>`;
    
    promo.options.forEach((option, idx) => {
        html += `
            <div class="section">
                <h3>${option.type}:</h3>
                <div class="options-grid" id="optionsGrid-${idx}">
                    ${option.choices.map(choice => `
                        <div class="option-item" data-option-idx="${idx}" data-choice="${choice}">${choice}</div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += `
        <button class="add-to-cart-btn" id="addPromoToCart" style="display: none;">
            Agregar al carrito - $${promo.price}
        </button>
    `;
    
    modalBody.innerHTML = html;
    setupPromoCustomizerListeners();
}

function setupPromoCustomizerListeners() {
    const promo = selectedPromo;
    
    promo.options.forEach((option, idx) => {
        document.querySelectorAll(`#optionsGrid-${idx} .option-item`).forEach(item => {
            item.addEventListener('click', function() {
                const choice = this.getAttribute('data-choice');
                promoConfig[option.type] = choice;
                
                // Marcar seleccionado
                document.querySelectorAll(`#optionsGrid-${idx} .option-item`).forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                
                // Verificar si todas las opciones requeridas están seleccionadas
                const allRequiredSelected = promo.options.every(opt => !opt.required || promoConfig[opt.type]);
                document.getElementById('addPromoToCart').style.display = allRequiredSelected ? 'block' : 'none';
            });
        });
    });
    
    document.getElementById('addPromoToCart').addEventListener('click', () => {
        addPromoToCart(selectedPromo, promoConfig);
        hidePromoModal();
    });
}

// Modificar addPromoToCart para incluir config
function addPromoToCart(promo, config = {}) {
    const item = {
        id: Date.now(),
        name: promo.name,
        description: promo.description,
        totalPrice: promo.price,
        quantity: 1,
        options: config
    };
    
    cart.push(item);
    updateCartUI();
}
// Nueva función para ocultar modal de promo
function hidePromoModal() {
    promoModal.classList.remove('show');
    selectedPromo = null;
    promoConfig = {};
}