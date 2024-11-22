document.getElementById('search-box').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const searchResults = document.getElementById('search-results');

    if (query.length > 0) {
        // Mô phỏng dữ liệu tìm kiếm (sau này bạn có thể thay thế bằng API)
        const sampleData = [
            'Khuyến mãi',
            'Chuyên mục',
            'Sản phẩm mới'
        ];

        const filteredResults = sampleData.filter(item => item.toLowerCase().includes(query));
        
        // Xóa kết quả cũ
        searchResults.innerHTML = '';
        
        if (filteredResults.length > 0) {
            searchResults.style.display = 'block';
            filteredResults.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.textContent = item;
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'none';
        }
    } else {
        searchResults.style.display = 'none';
    }
});
