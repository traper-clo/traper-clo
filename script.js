document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-list');

    // Функция загрузки данных
    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных");
            }
            return response.json();
        })
        .then(data => {
            renderProducts(data.products);
        })
        .catch(error => {
            console.error('Error:', error);
            productContainer.innerHTML = '<p style="text-align:center;">Пока нет товаров в наличии.</p>';
        });
});

function renderProducts(products) {
    const container = document.getElementById('product-list');
    
    if (!products || products.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Пока нет товаров в наличии.</p>';
        return;
    }

    container.innerHTML = ''; // Очищаем контейнер

    // Переворачиваем массив, чтобы новые товары были сверху
    products.reverse().forEach(item => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Проверяем, есть ли картинка, иначе ставим заглушку
        const imageSrc = item.image ? item.image : 'https://via.placeholder.com/400x400?text=No+Image';

        card.innerHTML = `
            <div class="image-container">
                <img src="${imageSrc}" alt="${item.title}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-top">
                    <div class="product-title">${item.title}</div>
                    <div class="product-price">${item.price} ₴</div>
                </div>
                <div class="product-details">
                    <span class="badge">${item.size}</span>
                    <span>Состояние: ${item.condition}</span>
                </div>
                <div class="product-desc">
                    ${item.body}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
