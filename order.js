// ========================================
// BUBBLE BLISS ORDERING SYSTEM
// ========================================
// This file contains the core ordering functionality
// You can customize and extend this system with your own UI components

// ========================================
// CUSTOM UI INSERTION POINTS
// ========================================
/*
 * INSERTION POINT 1: Custom Menu Item Components
 * Location: Line 150+ (displayMenuItems function)
 * You can replace the default menu item HTML with your custom components
 * Example: Replace the menu-item-card div with your own React/Vue components
 */

/*
 * INSERTION POINT 2: Custom Cart UI
 * Location: Line 250+ (updateCartDisplay function)
 * Replace the default cart item HTML with your custom cart components
 * Example: Add animations, custom styling, or interactive elements
 */

/*
 * INSERTION POINT 3: Custom Modal/Popup System
 * Location: Line 100+ (openCustomizationModal function)
 * Replace the default modal with your own popup system
 * Example: Use libraries like SweetAlert2, custom React modals, etc.
 */

/*
 * INSERTION POINT 4: Custom Payment Integration
 * Location: Line 400+ (checkout function)
 * Add your payment processing logic here
 * Example: Stripe, PayPal, Square, or other payment gateways
 */

// ========================================
// GLOBAL VARIABLES & STATE MANAGEMENT
// ========================================
let cart = [];
let currentItem = null;
let orderTotal = 0;

// Menu items data - YOU CAN CUSTOMIZE THIS DATA STRUCTURE
const menuItems = [
    {
        id: 1,
        name: "Classic Milk Tea",
        description: "Traditional black tea with creamy milk and tapioca pearls",
        price: 5.50,
        category: "signature",
        image: "https://via.placeholder.com/200x150/8B4513/FFFFFF?text=Classic+Milk+Tea",
        // CUSTOM FIELD INSERTION POINT: Add your own fields here
        // allergens: ["dairy"],
        // calories: 250,
        // customizable: true,
        // popularity: 5
    },
    {
        id: 2,
        name: "Taro Bubble Tea",
        description: "Creamy taro flavor with chewy boba pearls",
        price: 6.00,
        category: "signature",
        image: "https://via.placeholder.com/200x150/9370DB/FFFFFF?text=Taro+Bubble+Tea"
    },
    {
        id: 3,
        name: "Matcha Latte",
        description: "Premium Japanese matcha with milk and pearls",
        price: 6.50,
        category: "milk-tea",
        image: "https://via.placeholder.com/200x150/228B22/FFFFFF?text=Matcha+Latte"
    },
    {
        id: 4,
        name: "Thai Tea",
        description: "Sweet and creamy Thai-style tea with condensed milk",
        price: 5.75,
        category: "milk-tea",
        image: "https://via.placeholder.com/200x150/FF8C00/FFFFFF?text=Thai+Tea"
    },
    {
        id: 5,
        name: "Passion Fruit Tea",
        description: "Refreshing passion fruit tea with popping boba",
        price: 5.00,
        category: "fruit-tea",
        image: "https://via.placeholder.com/200x150/FF6347/FFFFFF?text=Passion+Fruit"
    },
    {
        id: 6,
        name: "Lychee Green Tea",
        description: "Light green tea with sweet lychee flavor",
        price: 5.25,
        category: "fruit-tea",
        image: "https://via.placeholder.com/200x150/FFB6C1/FFFFFF?text=Lychee+Tea"
    },
    {
        id: 7,
        name: "Brown Sugar Boba",
        description: "Rich brown sugar syrup with fresh milk and boba",
        price: 7.00,
        category: "specialty",
        image: "https://via.placeholder.com/200x150/8B4513/FFFFFF?text=Brown+Sugar"
    },
    {
        id: 8,
        name: "Cheese Foam Tea",
        description: "Premium tea topped with creamy cheese foam",
        price: 6.75,
        category: "specialty",
        image: "https://via.placeholder.com/200x150/F5DEB3/000000?text=Cheese+Foam"
    }
];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // CUSTOM INITIALIZATION INSERTION POINT
    // Add your custom initialization code here
    // Example: Initialize third-party libraries, set up event listeners, etc.
    /*
    initializeCustomComponents();
    setupAnalytics();
    loadUserPreferences();
    */
});

function initializeApp() {
    showCategory('signature');
    updateCartDisplay();
    setupEventListeners();
}

// ========================================
// CATEGORY MANAGEMENT
// ========================================
function showCategory(category) {
    // Hide all categories
    document.querySelectorAll('.menu-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected category
    document.getElementById(category).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // CUSTOM CATEGORY CHANGE INSERTION POINT
    // Add your custom logic when category changes
    /*
    trackCategoryView(category);
    loadCategorySpecificData(category);
    updateCustomFilters(category);
    */
}

// ========================================
// CART MANAGEMENT SYSTEM
// ========================================
function addToCart(itemId, itemName, itemPrice) {
    // CUSTOM PRE-ADD VALIDATION INSERTION POINT
    // Add your validation logic here
    /*
    if (!validateItemAvailability(itemId)) {
        showCustomAlert('Item not available');
        return;
    }
    */
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: 1,
            // CUSTOM ITEM PROPERTIES INSERTION POINT
            // Add custom properties to cart items
            /*
            customizations: {},
            addedAt: new Date(),
            specialInstructions: '',
            */
        });
    }
    
    updateCartDisplay();
    
    // CUSTOM POST-ADD ACTIONS INSERTION POINT
    // Add your custom actions after adding to cart
    /*
    showAddToCartAnimation(itemId);
    trackAddToCart(itemId, itemName, itemPrice);
    updateRecommendations();
    */
}

function removeFromCart(itemId) {
    // CUSTOM PRE-REMOVE VALIDATION INSERTION POINT
    /*
    if (!confirmRemoval(itemId)) {
        return;
    }
    */
    
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    
    // CUSTOM POST-REMOVE ACTIONS INSERTION POINT
    /*
    trackItemRemoval(itemId);
    showRemovalAnimation();
    */
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        if (item.quantity === 0) {
            removeFromCart(itemId);
        } else {
            updateCartDisplay();
        }
    }
    
    // CUSTOM QUANTITY CHANGE INSERTION POINT
    /*
    trackQuantityChange(itemId, change);
    updatePriceAnimations();
    */
}

// ========================================
// CART DISPLAY & UI UPDATES
// ========================================
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // CUSTOM UI UPDATE INSERTION POINT - BEFORE RENDERING
    /*
    prepareCustomCartAnimations();
    updateCustomIndicators();
    */
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        subtotalElement.textContent = '$0.00';
        taxElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        checkoutBtn.disabled = true;
        
        // CUSTOM EMPTY CART INSERTION POINT
        /*
        showEmptyCartRecommendations();
        hideCustomCartFeatures();
        */
        return;
    }
    
    // Render cart items - CUSTOM CART ITEM RENDERING INSERTION POINT
    cartItemsContainer.innerHTML = cart.map(item => {
        // YOU CAN REPLACE THIS ENTIRE HTML STRUCTURE WITH YOUR CUSTOM COMPONENTS
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
        
        // ALTERNATIVE CUSTOM COMPONENT INSERTION POINT
        /*
        return createCustomCartItemComponent(item);
        */
    }).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.085; // 8.5% tax
    const total = subtotal + tax;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update display
    cartCount.textContent = totalItems;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
    
    // CUSTOM UI UPDATE INSERTION POINT - AFTER RENDERING
    /*
    animateCartChanges();
    updateCustomTotalDisplays();
    showPromotionalOffers(total);
    */
}

// ========================================
// CHECKOUT & PAYMENT SYSTEM
// ========================================
function checkout() {
    if (cart.length === 0) return;
    
    // CUSTOM PRE-CHECKOUT VALIDATION INSERTION POINT
    /*
    if (!validateCheckoutRequirements()) {
        showCustomValidationErrors();
        return;
    }
    */
    
    const orderData = {
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.085,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.085,
        timestamp: new Date(),
        // CUSTOM ORDER DATA INSERTION POINT
        /*
        customerInfo: getCustomerInfo(),
        deliveryInfo: getDeliveryInfo(),
        paymentMethod: getSelectedPaymentMethod(),
        specialInstructions: getSpecialInstructions(),
        */
    };
    
    // CUSTOM PAYMENT PROCESSING INSERTION POINT
    /*
    processPayment(orderData)
        .then(paymentResult => {
            if (paymentResult.success) {
                submitOrder(orderData);
                showOrderConfirmation(paymentResult.orderId);
            } else {
                showPaymentError(paymentResult.error);
            }
        })
        .catch(error => {
            handlePaymentError(error);
        });
    */
    
    // Default demo behavior (replace with your payment system)
    alert(`Order Total: $${orderData.total.toFixed(2)}\n\nThis is a demo. In production, this would process payment and submit the order.`);
    
    // Clear cart after successful order
    cart = [];
    updateCartDisplay();
    
    // CUSTOM POST-CHECKOUT ACTIONS INSERTION POINT
    /*
    trackOrderCompletion(orderData);
    sendOrderConfirmationEmail(orderData);
    updateInventory(orderData.items);
    showThankYouPage();
    */
}

// ========================================
// EVENT LISTENERS & INTERACTIONS
// ========================================
function setupEventListeners() {
    // CUSTOM EVENT LISTENERS INSERTION POINT
    /*
    document.addEventListener('keydown', handleKeyboardShortcuts);
    window.addEventListener('beforeunload', saveCartToLocalStorage);
    document.addEventListener('visibilitychange', handlePageVisibilityChange);
    */
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
// CUSTOM UTILITY FUNCTIONS INSERTION POINT
/*
function createCustomCartItemComponent(item) {
    // Your custom cart item component logic
    return customHTML;
}

function validateItemAvailability(itemId) {
    // Your availability checking logic
    return true;
}

function trackAddToCart(itemId, itemName, itemPrice) {
    // Your analytics tracking logic
    console.log('Item added to cart:', itemId);
}

function showCustomAlert(message) {
    // Your custom alert/notification system
    alert(message);
}

function processPayment(orderData) {
    // Your payment processing logic
    return Promise.resolve({ success: true, orderId: 'ORDER123' });
}

function submitOrder(orderData) {
    // Your order submission logic
    console.log('Order submitted:', orderData);
}
*/

// ========================================
// CUSTOM CSS CLASS INSERTION POINTS
// ========================================
/*
 * You can add custom CSS classes to elements by modifying these functions:
 * 
 * 1. In updateCartDisplay(): Add custom classes to cart items
 * 2. In addToCart(): Add animation classes
 * 3. In showCategory(): Add transition classes
 * 
 * Example:
 * element.classList.add('your-custom-class');
 * element.classList.add('animate-slide-in');
 */

// ========================================
// INTEGRATION EXAMPLES
// ========================================
/*
 * EXAMPLE 1: React Component Integration
 * 
 * function renderReactCartItem(item) {
 *     const container = document.createElement('div');
 *     ReactDOM.render(<CustomCartItem item={item} />, container);
 *     return container.innerHTML;
 * }
 * 
 * EXAMPLE 2: Vue.js Integration
 * 
 * const cartApp = new Vue({
 *     el: '#cart-items',
 *     data: { cartItems: cart },
 *     template: '<custom-cart-component :items="cartItems"></custom-cart-component>'
 * });
 * 
 * EXAMPLE 3: Custom Animation Library
 * 
 * function animateAddToCart(itemId) {
 *     anime({
 *         targets: `[data-item-id="${itemId}"]`,
 *         scale: [1, 1.1, 1],
 *         duration: 300
 *     });
 * }
 */