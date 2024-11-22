
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElem = document.getElementById('total-price-value');
    const checkoutButton = document.getElementById('checkout-button');

    // Kiểm tra nếu giỏ hàng rỗng
    if (cart.length === 0) {
        cartTableBody.innerHTML = `<tr><td colspan="5" class="text-center">Giỏ hàng của bạn trống</td></tr>`;
        totalPriceElem.textContent = '0';
        checkoutButton.disabled = true; // Vô hiệu hóa nút thanh toán nếu giỏ hàng trống
        return;
    }

    // Xóa hết nội dung cũ trong bảng
    cartTableBody.innerHTML = '';

    // Tính tổng tiền và thêm sản phẩm vào bảng
    let totalPrice = 0;
    cart.forEach(item => {
        // Đảm bảo có hình ảnh mặc định nếu không có
        const imageUrl = item.image || 'imager/pp.jpeg';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imageUrl}" alt="${item.name}" style="width: 50px; height: 50px;">${item.name}</td>
            <td>${item.price.toLocaleString()} ₫</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.sku}', -1)">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.sku}', 1)">+</button>
            </td>
            <td>${(item.price * item.quantity).toLocaleString()} ₫</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.sku}')">Xóa</button></td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElem.textContent = totalPrice.toLocaleString(); // Hiển thị tổng tiền với định dạng
    checkoutButton.disabled = false; // Kích hoạt nút thanh toán khi có sản phẩm
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(sku, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.sku === sku);

    if (productIndex !== -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity <= 0) {
            cart[productIndex].quantity = 1; // Giới hạn số lượng tối thiểu là 1
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(sku) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.sku !== sku); // Lọc sản phẩm không phải SKU này
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Hiển thị lại giỏ hàng
}

// Chuyển sang trang thanh toán
function chuyenSangThanhToan() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'thanhtoan.html';
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    displayCart();

    // Thêm sự kiện cho nút thanh toán
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', chuyenSangThanhToan);
    }
});
