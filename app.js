$(document).ready(function(){
    $('#form-login').on('submit', function (event) {
        event.preventDefault();
        const username = $('.form-group input[type="text"]').val();
        const password = $('.form-group input[type="password"]').val();

        // Kiểm tra tên đăng nhập phải chứa ký tự '@'
        if (!username.includes('@')) {
            alert('Tên đăng nhập phải chứa ký tự @');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*,])(?=.*[a-z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa và 1 ký tự đặc biệt');
            return;
        }
        window.location.href = "index.html";
    });
});