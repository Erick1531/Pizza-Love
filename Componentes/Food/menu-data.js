// Datos del menú de Pizza & Love
// Datos del menú de Pizza & Love
const menuData = {
    promociones: [
        {
            id: 'promo-1',
            name: 'Dedotes',
            description: 'Los ✌️ DEDOTES se piden dulces o salados, con 🧀 queso-crema o mozzarella.',
            details: '-DULCES con mantequilla, azúcar y canela.\n-SALADOS al ajo y acompañados de 3oz. de salsa de tomate.\n\n📍Pídelos en mostrador o a domicilio.',
            price: 69,
            image: '🥖',
            options: [
                {
                    type: 'Tipo',
                    choices: ['Dulces', 'Salados'],
                    required: true
                },
                {
                    type: 'Adicional',
                    choices: ['Queso-Crema', 'Mozzarella', 'Ninguno'],
                    required: false
                }
            ]
        },
        {
            id: 'promo-2',
            name: 'Combo Pepperoni Summer',
            description: '1 Pizza Familiar de Pepperoni + 1 Soda de 2 litros',
            details: '*Hazla por Mediana $199 o MEGA por $309',
            price: 276,
            image: '🍕',
            options: [
                {
                    type: 'Soda de 2 Litros',
                    choices: ['Coca Cola', 'Fresca', 'Sidral Mundet'],
                    required: true
                }
            ]
        },
        {
            id: 'promo-3',
            name: '2 Medianas al Gusto',
            description: 'Escoge 2 pizzas medianas de la especialidad que gustes.',
            price: 309,
            image: '🍕',
            options: [
                {
                    type: 'Especialidad Pizza 1',
                    choices: ['María', 'Carnosa', 'Superlove', 'Waikiki', 'SuperPepe', 'Franchesca', 'Siciliana', 'La Flaca'],
                    required: true
                },
                {
                    type: 'Especialidad Pizza 2',
                    choices: ['María', 'Carnosa', 'Superlove', 'Waikiki', 'SuperPepe', 'Franchesca', 'Siciliana', 'La Flaca'],
                    required: true
                }
            ]
        },
        {
            id: 'promo-4',
            name: '2 Familiares Al Gusto',
            description: 'Escoge 2 pizzas familiares de la especialidad que gustes.',
            price: 439,
            image: '🍕',
            options: [
                {
                    type: 'Especialidad Pizza 1',
                    choices: ['María', 'Carnosa', 'Superlove', 'Waikiki', 'SuperPepe', 'Franchesca', 'Siciliana', 'La Flaca'],
                    required: true
                },
                {
                    type: 'Especialidad Pizza 2',
                    choices: ['María', 'Carnosa', 'Superlove', 'Waikiki', 'SuperPepe', 'Franchesca', 'Siciliana', 'La Flaca'],
                    required: true
                }
            ]
        },
        {
            id: 'promo-5',
            name: '2 Megas al Gusto',
            description: 'Escoge 2 pizzas megas de la especialidad que gustes.',
            price: 509,
            image: '🍕',
            options: [
                {
                    type: 'Especialidad Pizza 1',
                    choices: ['María', 'Carnosa', 'Superlove', 'Waikiki', 'SuperPepe', 'Franchesca', 'Siciliana', 'La Flaca'],
                    required: true
                },
                {
                    type: 'Especialidad Pizza 2',
                    choices: ['María', 'Carnosa', 'Superlove', 'Waikiki', 'SuperPepe', 'Franchesca', 'Siciliana', 'La Flaca'],
                    required: true
                }
            ]
        },
        {
            id: 'promo-6',
            name: 'Agrega A Tu Orden y Hazlo Combo',
            description: '1 Espagueti de Mantequilla o tomate + 1 Soda de 2 litros',
            details: '*Agrégalo a cualquier orden y conviértelo en combo.',
            price: 139,
            image: '🍝',
            options: [
                {
                    type: 'Tipo de Espagueti',
                    choices: ['Mantequilla', 'Tomate'],
                    required: true
                },
                {
                    type: 'Soda de 2 Litros',
                    choices: ['Coca Cola', 'Fresca', 'Sidral Mundet'],
                    required: true
                }
            ]
        }
    ],
    pizzas: {
        'Pizza de 1 Ingrediente': {
            id: 'pizza-1-ing',
            description: 'Pizza de antojo sencillo. Escoge tu ingrediente favorito.',
            image: './image/pizza/un-ingrediente.png',
            ingredients: ['Pepperoni', 'Jamón', 'Piña', 'Tocino', 'Chorizo', 'Chile Jalapeño', 'Aceituna Negra', 'Cebolla', 'Champiñón', 'Salchicha Italiana', 'Pimiento Morrón', 'Tomate Horneado'],
            maxIngredients: 1,
            sizes: [
                { name: 'Chica', size: '8"', price: 109 },
                { name: 'Mediana', size: '12"', price: 159 },
                { name: 'Familiar', size: '16"', price: 229 },
                { name: 'Mega', size: '18"', price: 269 },
                { name: 'Gigante', size: '28"', price: 499 }
            ]
            // No extras for this pizza
        },
        'María': {
            id: 'pizza-maria',
            description: 'Base de frijol, chorizo, tocino, cebolla y jalapeños.',
            image: './image/pizza/maria.png',
            sizes: [
                { name: 'Chica', size: '10"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'Carnosa': {
            id: 'pizza-carnosa',
            description: 'Pepperoni, jamón, tocino y chorizo.',
            image: './image/pizza/carnosa.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'Superlove': {
            id: 'pizza-superlove',
            description: 'Pepperoni, jamón, tocino, champiñones, aceitunas y pimiento morrón.',
            image: './image/pizza/superlove.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'Waikiki': {
            id: 'pizza-waikiki',
            description: 'Jamón y piña.',
            image: './image/pizza/waikiki.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'SuperPepe': {
            id: 'pizza-superpepe',
            description: 'Mucho pepperoni.',
            image: './image/pizza/superpepe.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'Franchesca': {
            id: 'pizza-franchesca',
            description: 'Pepperoni, salchicha italiana y pimiento morrón.',
            image: './image/pizza/franchesca.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'Siciliana': {
            id: 'pizza-siciliana',
            description: 'Pepperoni, champiñones y pimiento morrón.',
            image: './image/pizza/siciliana.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'La Flaca': {
            id: 'pizza-flaca',
            description: 'Pan delgado (opcional), champiñones, cebolla, aceituna negra, pimiento morrón y tomate horneado.',
            image: './image/pizza/flaca.png',
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            options: [
                {
                    type: 'Pan delgado',
                    choices: ['Si', 'No'],
                    required: false
                }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        },
        'Mi Pizza': {
            id: 'pizza-mi',
            description: '3 Ingredientes a escoger.',
            image: './image/pizza/mipizza.png',
            ingredients: ['Chorizo', 'Jalapeño', 'Cebolla', 'Jamón', 'Piña', 'Pepperoni', 'Salchicha Italiana', 'Champiñón', 'Aceituna Negra', 'Chile Morrón', 'Tocino', 'Tomate Horneado'],
            maxIngredients: 3,
            sizes: [
                { name: 'Chica', size: '8"', price: 119 },
                { name: 'Mediana', size: '12"', price: 174 },
                { name: 'Familiar', size: '16"', price: 249 },
                { name: 'Mega', size: '18"', price: 299 },
                { name: 'Gigante', size: '28"', price: 549 }
            ],
            extras: [
                { name: 'Queso Extra', prices: [32, 42, 56, 62, 99] },
                { name: 'Orilla de Queso', prices: [0, 42, 56, 62, 99] },
                { name: 'Ingrediente Extra', prices: [5, 10, 19, 29, 49] }
            ]
        }
    },
    espaguetis: [
        {
            id: 'esp-1',
            name: 'Espagueti Sencillo',
            description: 'Espagueti sencillo con opción de salsa.',
            details: 'Elige entre mantequilla, tomate o champiñon.',
            weight: '300g',
            price: 109,
            image: './image/pasta/sencillo.png',
            options: [
                {
                    type: 'Tipo de Salsa',
                    choices: ['Mantequilla', 'Tomate', 'Champiñón'],
                    required: true
                }
            ]
        },
        { id: 'esp-2', name: 'Espagueti a la Crema', description: 'Sazonado con especias, crema, jamón, morrón, champiñones y queso gratinado.', image:'./image/pasta/crema.png', price: 129, weight: '300g' },
        {
            id: 'esp-3',
            name: 'Espagueti Superlove',
            description: 'Espagueti Superlove con opción opcional de salsa de tomate.',
            details: 'Incluye carne molida, champiñones y salsa especial.',
            price: 129,
            image: './image/pasta/superlove.png',
            weight: '300g',
            options: [
                {
                    type: 'Agregar Salsa de Tomate',
                    choices: ['Sí', 'No'],
                    required: false
                }
            ]
        },
        {
            id: 'esp-4',
            name: 'Espagueti de Charola',
            description: 'Espagueti de charola, elige uno de los otros tipos.',
            details: 'Para compartir, con opción de elegir variante.',
            price: 549,
            image: './image/pasta/charola.png',
            weight: '1.2kg',
            options: [
                {
                    type: 'Tipo de Espagueti',
                    choices: ['Tomate', 'Mantequilla', 'Champiñón', 'A la Crema', 'Superlove'],
                    required: true
                }
            ]
        },
    ],
    alitas: [
        { id: 'alitas-1', name: 'Alitas Medianas', description: 'BBQ, Picosa o Mango Habanero.', image:'./image/alitasYpapas/medianas.png', price: 179, weight: '480g', 
            options: [ 
                {
                type: 'Salsa', 
                choices: ['BBQ', 'Picosa', 'Mango Habanero'],
                required: true 
                }
            ]
        },
        { id: 'alitas-2', name: 'Alitas Grandes', description: 'BBQ, Picosa o Mango Habanero.', image:'./image/alitasYpapas/grandes.png', price: 329, weight: '960g', 
            options: [ 
                {
                type: 'Salsa', 
                choices: ['BBQ', 'Picosa', 'Mango Habanero'],
                required: true 
                }
            ]
        },
        { id: 'alitas-3', name: 'Papotas', description: 'Papas en gajos sazonadas con porción de cátsup.', image:'./image/alitasYpapas/papas.png', price: 69, weight: '300g' }
    ],
    ensaladas: [
        { id: 'ens-1', name: 'Ensalada Verde', description: 'Lechuga romana, cebolla, pimiento morrón, tomate, aceituna negra, champiñones y aderezo Ranch.', image:'./image/ensalada/verde.png', price: 109 },
        { id: 'ens-2', name: 'Ensalada Vinagreta', description: 'Lechuga romana, champiñones, queso feta, arándanos y aderezo vinagreta semi dulce.', image:'./image/ensalada/vinagreta.png', price: 129 }
    ],
    complementos: [
        { id: 'comp-1', name: 'Pan de Ajo con Queso', description: 'Pan barnizado de mantequilla, sal de ajo y queso mozzarella gratinado.', image:'./image/complementos/panAjo.png', price: 69 },
        { id: 'comp-2', name: 'Calzoné', description: 'Pizza cerrada tipo empanada con salsa de tomate, queso y la especialidad de tu gusto.', image:'./image/complementos/calzone.png', price: 139 },
        { id: 'comp-3', name: 'Pepe Roll', description: 'Un rollo de mucho pepperoni con queso y salsa de tomate.', image:'./image/complementos/peperoll.png', price: 139 },
        { id: 'comp-4', name: 'Nutelove', description: 'Calzone relleno de Nutella espolvoreado con azúcar glass.', image:'./image/complementos/nutelove.png', price: 119 }
    ],
    extras: [
        { id: 'ext-1', name: 'Salsa Love Chipotle Sobrecito', description: '', price: 5 },
        { id: 'ext-2', name: 'Salsa Love Chipotle Botella', description: '160 ml.', price: 40 },
        { id: 'ext-3', name: 'Chile Quebrado Sobrecito', description: '', price: 3 },
        { id: 'ext-4', name: 'Aderezo Ranch', description: '2 oz.', price: 10 },
        { id: 'ext-5', name: 'Aderezo Vinagreta', description: '2 oz.', price: 12 },
        { id: 'ext-6', name: 'Salsa Picosita Búfalo', description: '2 oz.', price: 7 },
        { id: 'ext-7', name: 'Salsa BBQ', description: '2 oz.', price: 7 },
        { id: 'ext-8', name: 'Salsa de tomate', description: '2 oz.', price: 10 },
        { id: 'ext-9', name: 'Parmesano', description: '1 oz.', price: 7 }
    ],
    bebidas: [
        { id: 'beb-1', name: 'Soda de 355 ml', description: 'Coca Cola.', image:'./image/bebidas/355.png', price: 20 },
        { id: 'beb-2', name: 'Soda de 2 Litros', description: 'Coca Cola, Coca Light, Sprite o Manzana.', image:'./image/bebidas/2l.png', price: 54, 
            options: [ 
                {
                type: 'Sabor', 
                choices: ['Coca cola', 'Coca Light', 'Sprite', 'Manzana'],
                required: true 
                }
            ]
        },
        { id: 'beb-3', name: 'Soda de 600 ml', description: 'Coca Cola.', image:'./image/bebidas/600.png', price: 30 },
        { id: 'beb-4', name: 'Fuze Té 600 ml', description: 'Durazno, verde o negro.', image:'./image/bebidas/fuze.png', price: 30, 
            options: [ 
                {
                type: 'Sabor', 
                choices: ['Té de Durazno', 'Té verde', 'Té negro'],
                required: true 
                }
            ]
        },
        { id: 'beb-5', name: 'Agua Embotellada', description: 'Ciel de 1 litro.', image:'./image/bebidas/ciel.png', price: 22 }
    ]
};