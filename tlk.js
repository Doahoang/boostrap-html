
function themvaogiohang(button) {
    const productName = button.getAttribute('data-name');
    const productSku = button.getAttribute('data-sku');
    const productPrice = button.getAttribute('data-price');        
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const product = {
        sku: productSku,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    const existingProductIndex = cart.findIndex(item => item.sku === productSku);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert("Đã thêm vào giỏ hàng!");
    }

    function muangay(button) {
        // Lấy thông tin sản phẩm từ thuộc tính data-*
        const product = {
            name: button.getAttribute('data-name'),
            sku: button.getAttribute('data-sku'),
            price: parseInt(button.getAttribute('data-price')),
            image: button.getAttribute('data-image'),
            quantity: 1 // Mặc định 1 sản phẩm
        };

        // Lưu sản phẩm vào localStorage (thay thế giỏ hàng hiện tại)
        localStorage.setItem('checkoutCart', JSON.stringify([product]));

        // Chuyển hướng đến trang thanh toán
        window.location.href = 'thanhtoan.html';
    }


    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.bi-cart4').nextSibling.textContent = `(${totalCount})`;
    }
    document.addEventListener('DOMContentLoaded', updateCartCount);

