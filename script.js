const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.header-icons a[href="cart.html"]'); // Select the cart icon
const cartModal = document.createElement('div'); // Create a modal for the cart display

// Create an empty cart array to store selected products
let cart = [];

// Function to add a product to the cart
function addToCart(productId) {
    // Find the product details based on the productId
    const productElement = document.querySelector(`[data-product-id="${productId}"]`).parentElement;
    const productName = productElement.querySelector('h3').textContent;
    const productPrice = productElement.querySelector('p').textContent;

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment the quantity if the product already exists
    } else {
        // Add a new product to the cart
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace('₹', '')), // Remove the currency symbol and convert to number
            quantity: 1
        });
    }
}

// Function to update the cart display
function updateCartDisplay() {
    // Clear the modal content
    cartModal.innerHTML = '';

    // Add cart items to the modal
    if (cart.length === 0) {
        cartModal.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const cartList = document.createElement('ul');
        cartList.style.listStyle = 'none';
        cartList.style.padding = '0';

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.justifyContent = 'space-between';
            listItem.style.alignItems = 'center';

            const itemText = document.createElement('span');
            itemText.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.style.marginLeft = '10px';
            removeButton.style.backgroundColor = '#ff4d4d';
            removeButton.style.color = '#fff';
            removeButton.style.border = 'none';
            removeButton.style.borderRadius = '4px';
            removeButton.style.padding = '5px 10px';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });

            listItem.appendChild(itemText);
            listItem.appendChild(removeButton);
            cartList.appendChild(listItem);
        });

        const totalPrice = document.createElement('p');
        totalPrice.textContent = `Total Price: ₹${getTotalPrice()}`;

        cartModal.appendChild(cartList);
        cartModal.appendChild(totalPrice);
    }

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.backgroundColor = '#333';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.padding = '5px 10px';
    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    cartModal.appendChild(closeButton);
    cartModal.style.display = 'block';
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Function to get the total price of the cart
function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Add event listeners to all 'Add to Cart' buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-product-id');
        addToCart(productId);
    });
});

// Display cart modal when the cart icon is clicked
cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    cartModal.style.position = 'fixed';
    cartModal.style.top = '50%';
    cartModal.style.left = '50%';
    cartModal.style.transform = 'translate(-50%, -50%)';
    cartModal.style.backgroundColor = '#fff';
    cartModal.style.padding = '20px';
    cartModal.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    cartModal.style.borderRadius = '8px';
    cartModal.style.zIndex = '1000';

    updateCartDisplay();
    document.body.appendChild(cartModal);
});


