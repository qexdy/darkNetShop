document.addEventListener("DOMContentLoaded", function() {
    const main = document.querySelector(".main");
    const totalAmountSpan = document.querySelector(".total-amount");

    // Получаем данные о товарах из LocalStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Создаем строку HTML с карточками товаров
    let html = "";
    let totalAmount = 0;
    cartItems.forEach(function(product) {
        // Найдем товар в массиве products по его id
        const productData = products.find(item => item.id === product.id);
        const inStock = productData ? productData.quantity : 0; // Получаем количество товара в наличии или 0, если информация недоступна

        html += `
            <section class="cart-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <h2>${product.name}</h2>
                    <p class="price">${product.price}</p>
                    <button class="remove-button" data-id="${product.id}">Удалить</button>
                </div>
                <div>
                    <div class="quantity-wrapper">
                        <div class="minusButton">-</div>
                        <div class="quantity">${product.quantity}</div>
                        <div class="plusButton">+</div>
                    </div>
                    <div>В наличии: <span class="in-stock">${inStock}</span></div>
                </div>
            </section>
        `;
        // Обновляем общую сумму
        totalAmount += parseFloat(product.price.replace('$', '')) * product.quantity;
    });

    // Вставляем сгенерированную строку HTML в основной контейнер
    main.innerHTML = html;

    // Выводим общую сумму на страницу
    totalAmountSpan.textContent = totalAmount.toFixed(2);

    // Добавляем слушатели событий для кнопок удаления товаров
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
            // Перезагружаем страницу после удаления товара
            location.reload();
        });
    });

    // Добавляем слушатели событий для кнопок "+" и "-"
    const plusButtons = document.querySelectorAll(".plusButton");
    plusButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            updateQuantity(event, 1);
        });
    });

    const minusButtons = document.querySelectorAll(".minusButton");
    minusButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            updateQuantity(event, -1);
        });
    });
});

function updateQuantity(event, change) {
    const cartItem = event.target.closest(".cart-item");
    const productId = cartItem.dataset.id;
    const quantityElement = cartItem.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent);
    let inStock = parseInt(cartItem.querySelector(".in-stock").textContent);

    quantity += change;

    if (quantity < 1) {
        quantity = 1;
    } else if (quantity > inStock) {
        quantity = inStock;
    }

    quantityElement.textContent = quantity;

    // Обновляем данные в LocalStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems = cartItems.map(product => {
        if (product.id === productId) {
            product.quantity = quantity;
        }
        return product;
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Пересчитываем и обновляем общую сумму
    let totalAmount = 0;
    cartItems.forEach(function(product) {
        totalAmount += parseFloat(product.price.replace('$', '')) * product.quantity;
    });
    const totalAmountSpan = document.querySelector(".total-amount");
    totalAmountSpan.textContent = totalAmount.toFixed(2);
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems = cartItems.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cartItems));
}