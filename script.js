function add(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    update();
}

function update() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('count');
    if (countEl) countEl.textContent = cart.length;
}

update();

function loadCart() {
    const container = document.getElementById('list');
    if (!container) return; 
    
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<div class="empty">CART EMPTY</div>';
        document.getElementById('sub').textContent = '$0.00';
        document.getElementById('gst').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }

    let subtotal = 0;
    items.forEach((item, index) => {
        subtotal += item.price;
        const row = document.createElement('div');
        row.className = 'cart-row';
        row.innerHTML = `
            <span>${item.name}</span>
            <div>
                <span>$${item.price}</span>
                <button onclick="remove(${index})">X</button>
            </div>
        `;
        container.appendChild(row);
    });

    const tax = subtotal * 0.18;
    const absolute = subtotal + tax;

    document.getElementById('sub').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${absolute.toFixed(2)}`;
}

function remove(index) {
    let items = JSON.parse(localStorage.getItem('cart')) || [];
    items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(items));
    loadCart();
}

function resetCart() {
    localStorage.removeItem('cart');
    loadCart();
}

if (document.getElementById('list')) {
    loadCart();
}