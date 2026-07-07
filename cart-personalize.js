// Function to update the cart icon in the navbar
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartNotification = document.querySelector('.cart-notification');
    if (cartNotification) {
        cartNotification.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

    // Add item with customization
function addToCart(name, price, color, size, image, customName = null, jerseyNumber = null) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => 
        item.name === name && 
        item.size === size && 
        item.customName === customName && 
        item.jerseyNumber === jerseyNumber
    );

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item exists
    } else {
        // Add new item to the cart
        const product = { name, price, color, size, image, quantity: 1 };
        if (customName) product.customName = customName;
        if (jerseyNumber) product.jerseyNumber = jerseyNumber;
        cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart icon
    updateCartIcon();

    // Redirect to the cart page
    window.location.href = 'cart.html';
}

// Function to add a product to the cart with personalization or customization
function addToCartWithPersonalization() {
    // Get product details from the HTML
    const productDetails = document.querySelector('.product-details');
    if (!productDetails) return; // Exit if no product details are found

    const productName = productDetails.dataset.productName;
    const productPrice = parseFloat(productDetails.dataset.productPrice);
    const productColor = productDetails.dataset.productColor;
    const productImage = productDetails.dataset.productImage;

    // Get user inputs
    const size = document.querySelector('.sizes select').value;
    const customizeName = document.querySelector('.Customize input[type="text"]').value;
    const jerseyNumber = document.querySelector('.Customize input[type="number"]').value;

    // Determine if customization is used
    const isCustomized = customizeName.trim() !== '' || jerseyNumber.trim() !== '';

    // Add player name to the product name if not customized
    const fullProductName = isCustomized ? productName : `${productName} - ${document.querySelector('.personalize select').value}`;

    // Add the product to the cart
    addToCart(fullProductName, productPrice, productColor, size, productImage, customizeName, jerseyNumber);
}

// Function to render the cart items on the cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    // Render each cart item
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h2>${item.name}</h2>
                <p>$${item.price.toFixed(2)} | ${item.color} | SIZE: ${item.size}</p>
                ${item.customName ? `<p>Custom Name: ${item.customName}</p>` : ''}
                ${item.jerseyNumber ? `<p>Jersey Number: ${item.jerseyNumber}</p>` : ''}
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-item" onclick="updateQuantity(${index}, -${item.quantity})">Remove</button>
                </div>
                <p class="item-total">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update the cart total
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
    
    // Update the order summary
    if (typeof updateOrderSummary === 'function') {
        updateOrderSummary();
    }
}

// Function to update the quantity of a cart item
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update quantity
    cart[index].quantity += change;

    // Remove the item if the quantity is 0 or less
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the UI
    renderCart();
    updateCartIcon();
    
    // Update the order summary
    if (typeof updateOrderSummary === 'function') {
        updateOrderSummary();
    }
}

// Disable personalize select when customize inputs are filled
document.addEventListener('DOMContentLoaded', function() {
    const personalizeSelect = document.querySelector('.personalize select');
    const customizeInputs = document.querySelectorAll('.Customize input');

    if (personalizeSelect && customizeInputs) {
        customizeInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (input.value.trim() !== '') {
                    personalizeSelect.disabled = true;
                } else {
                    personalizeSelect.disabled = false;
                }
            });
        });
    }

    // Add event listener to the "Add to Cart" button
    const addToCartButton = document.getElementById('add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCartWithPersonalization);
    }
});

// Initial cart icon update (for all pages)
updateCartIcon();

// Initial render for the cart page
if (window.location.pathname.includes('cart.html')) {
    renderCart();
    updateOrderSummary();
}