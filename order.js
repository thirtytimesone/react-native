// Menu items data
const menuItems = [
    {
        id: 1,
        name: "Classic Milk Tea",
        description: "Traditional black tea with creamy milk and tapioca pearls",
        price: 5.50,
        category: "milk-tea",
        image: "🧋"
    },
    {
        id: 2,
        name: "Taro Bubble Tea",
        description: "Creamy taro flavor with chewy boba pearls",
        price: 6.00,
        category: "milk-tea",
        image: "🟣"
    },
    {
        id: 3,
        name: "Matcha Latte",
        description: "Premium Japanese matcha with milk and pearls",
        price: 6.50,
        category: "specialty",
        image: "🍵"
    },
    {
        id: 4,
        name: "Fruit Tea",
        description: "Refreshing fruit-infused tea with popping boba",
        price: 5.00,
        category: "fruit-tea",
        image: "🍓"
    },
    {
        id: 5,
        name: "Thai Milk Tea",
        description: "Sweet and creamy Thai-style tea with condensed milk",
        price: 5.75,
        category: "milk-tea",
        image: "🧡"
    },
    {
        id: 6,
        name: "Passion Fruit Tea",
        description: "Tropical passion fruit with green tea base",
        price: 5.25,
        category: "fruit-tea",
        image: "🥭"
    },
    {
        id: 7,
        name: "Brown Sugar Milk Tea",
        description: "Rich brown sugar syrup with fresh milk and boba",
        price: 6.75,
        category: "specialty",
        image: "🤎"
    },
    {
        id: 8,
        name: "Lychee Green Tea",
        description: "Sweet lychee flavor with refreshing green tea",
        price: 5.50,
        category: "fruit-tea",
        image: "🍇"
    }
];

// Cart state
let cart = [];
let currentItem = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayMenuItems('all');
    setupCategoryButtons();
    updateCartDisplay();
});

// Display menu items
function displayMenuItems(category) {
    const menuContainer = document.getElementById('menu-items');
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    menuContainer.innerHTML = filteredItems.map(item => `
        <div class="menu-item-card" onclick="openCustomizationModal(${item.id})">
            <div style="font-size: 2rem; text-align: center; margin-bottom: 10px;">${item.image}</div>
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <div class="menu-item-price">$${item.price.toFixed(2)}</div>
        </div>
    `).join('');
}

// Setup category buttons
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Display items for selected category
            displayMenuItems(this.dataset.category);
        });
    });
}

// Open customization modal
function openCustomizationModal(itemId) {
    currentItem = menuItems.find(item => item.id === itemId);
    if (!currentItem) return;
    
    document.getElementById('modal-item-name').textContent = currentItem.name;
    document.getElementById('item-quantity').textContent = '1';
    
    // Reset form
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = input.hasAttribute('checked');
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    
    updateModalPrice();
    document.getElementById('customization-modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('customization-modal').style.display = 'none';
    currentItem = null;
}

// Change quantity
function changeQuantity(change) {
    const quantityElement = document.getElementById('item-quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
    updateModalPrice();
}

// Update modal price
function updateModalPrice() {
    if (!currentItem) return;
    
    let price = currentItem.price;
    const quantity = parseInt(document.getElementById('item-quantity').textContent);
    
    // Add size upcharge
    const sizeInput = document.querySelector('input[name="size"]:checked');
    if (sizeInput) {
        price += parseFloat(sizeInput.dataset.price || 0);
    }
    
    // Add addon prices
    const addonInputs = document.querySelectorAll('input[name="addons"]:checked');
    addonInputs.forEach(input => {
        price += parseFloat(input.dataset.price || 0);
    });
    
    const totalPrice = price * quantity;
    document.getElementById('modal-price').textContent = totalPrice.toFixed(2);
}

// Add event listeners for price updates
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="size"], input[name="addons"]').forEach(input => {
        input.addEventListener('change', updateModalPrice);
    });
});

// Add to cart
function addToCart() {
    if (!currentItem) return;
    
    const quantity = parseInt(document.getElementById('item-quantity').textContent);
    const size = document.querySelector('input[name="size"]:checked').value;
    const ice = document.querySelector('input[name="ice"]:checked').value;
    const sweetness = document.querySelector('input[name="sweetness"]:checked').value;
    const addons = Array.from(document.querySelectorAll('input[name="addons"]:checked')).map(input => input.value);
    
    let itemPrice = currentItem.price;
    const sizeInput = document.querySelector('input[name="size"]:checked');
    if (sizeInput) {
        itemPrice += parseFloat(sizeInput.dataset.price || 0);
    }
    
    const addonInputs = document.querySelectorAll('input[name="addons"]:checked');
    addonInputs.forEach(input => {
        itemPrice += parseFloat(input.dataset.price || 0);
    });
    
    const cartItem = {
        id: Date.now(), // Unique ID for cart item
        itemId: currentItem.id,
        name: currentItem.name,
        price: itemPrice,
        quantity: quantity,
        customizations: {
            size: size,
            ice: ice,
            sweetness: sweetness + '%',
            addons: addons
        }
    };
    
    cart.push(cartItem);
    updateCartDisplay();
    closeModal();
}

// Remove from cart
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const finalTotalElement = document.getElementById('final-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = '0.00';
        subtotalElement.textContent = '0.00';
        taxElement.textContent = '0.00';
        finalTotalElement.textContent = '0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    // Display cart items
    cartItemsContainer.innerHTML = cart.map(item => {
        const customizationText = [
            item.customizations.size === 'large' ? 'Large' : 'Regular',
            item.customizations.ice.replace('-', ' '),
            item.customizations.sweetness + ' sweet',
            ...item.customizations.addons.map(addon => addon.replace('-', ' '))
        ].join(', ');
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h5>${item.name} x${item.quantity}</h5>
                    <div class="cart-item-details">${customizationText}</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update displays
    cartCount.textContent = totalItems;
    cartTotal.textContent = total.toFixed(2);
    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    finalTotalElement.textContent = total.toFixed(2);
    checkoutBtn.disabled = false;
}

// Checkout function
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) return;
    
    alert('Thank you for your order! This is a demo - in a real implementation, this would process payment and send the order to the kitchen.');
    cart = [];
    updateCartDisplay();
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('customization-modal');
    if (event.target === modal) {
        closeModal();
    }
});