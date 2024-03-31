document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".buttoncard");

    buttons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            const productId = event.target.closest(".product").id;
            const productData = getProductData(productId);

            if (productData) {
                console.error("Товар уже добавлен в корзину:", productData.name);
            } else {
                const product = {
                    id: productId,
                    name: event.target.closest(".product").querySelector("h2").textContent,
                    price: event.target.closest(".product").querySelector(".price").textContent,
                    image: event.target.closest(".product").querySelector("img").getAttribute('src'),
                    quantity:1
                };                

                addToCart(product);
                console.log("Товар добавлен в корзину:", product.name);
            }
        });
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function getProductData(productId) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.find(product => product.id === productId);
    }
});
