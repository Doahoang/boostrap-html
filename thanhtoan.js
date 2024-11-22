document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');

    orderItems.innerHTML = '';

    if (cart.length === 0) {
        orderItems.innerHTML = `<tr><td colspan="5" class="text-center">Không có sản phẩm nào</td></tr>`; // Thêm một cột cho ảnh
    } else {
        let total = 0;
        cart.forEach(item => {
            const imageUrl = item.image || 'imager/pp.jpeg';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${imageUrl}" alt="${item.name}" style="width: 50px; height: 50px;">${item.name}</td>
                <td>${item.price.toLocaleString()} ₫</td>
                <td>${item.quantity}</td>
            `; 
            orderItems.appendChild(row);
            total += item.price * item.quantity;
        });
    
        orderTotal.textContent = `${total.toLocaleString()} ₫`; // Cập nhật tổng tiền giỏ hàng
    }
    
    

    // Danh sách quận/huyện và xã/phường theo tỉnh
    const data = {
        Hanoi: {
            districts: {
                "Ba Dinh": ["Phuc Xa", "Truc Bach", "Cong Vi"],
                "Hoan Kiem": ["Hang Dao", "Hang Bong", "Cua Dong"]
            }
        },
        HCM: {
            districts: {
                "District 1": ["Ben Nghe", "Da Kao", "Nguyen Thai Binh"],
                "District 3": ["Vo Thi Sau", "Le Van Sy", "Nguyen Dinh Chieu"]
            }
        },
        ThuaThienHue: {
            districts: {
                "HuongThuy": ["Thuy Duong", "Thuy Phuong", "Phu Bai", "Thuy Chau"],
                "HueCity": ["Phu Hoi", "Phu Nhuan", "Vinh Ninh", "Thuan Hoa"]
            }
        }
    };

    // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành
    document.getElementById('city').addEventListener('change', function () {
        const city = this.value;
        const districtSelect = document.getElementById('district');
        const wardSelect = document.getElementById('ward');

        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        if (city && data[city]) {
            Object.keys(data[city].districts).forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });

    // Cập nhật danh sách xã/phường khi chọn quận/huyện
    document.getElementById('district').addEventListener('change', function () {
        const district = this.value;
        const city = document.getElementById('city').value;
        const wardSelect = document.getElementById('ward');

        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        if (city && district && data[city].districts[district]) {
            data[city].districts[district].forEach(ward => {
                const option = document.createElement('option');
                option.value = ward;
                option.textContent = ward;
                wardSelect.appendChild(option);
            });
        }
    });

    // Lắng nghe sự kiện submit của form
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn gửi form đến server

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const district = document.getElementById('district').value.trim();
        const ward = document.getElementById('ward').value.trim();

        if (!name || !phone || !email || !address || !city || !district || !ward) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        alert('Đặt hàng thành công!');

        localStorage.removeItem('cart');

        checkoutForm.reset();
        document.getElementById('district').innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        document.getElementById('ward').innerHTML = '<option value="">Chọn Xã/Phường</option>';

        orderItems.innerHTML = '<tr><td colspan="3" class="text-center">Không có sản phẩm nào</td></tr>';
        orderTotal.textContent = '0 ₫';

        updateCartCount();
    });
});
