document.addEventListener("DOMContentLoaded", function() {
    const numberInput = document.getElementById("number");

    numberInput.addEventListener("input", function(event) {
        const value = event.target.value.trim();
        if (value.startsWith("+90")) {
            return; // Не добавляем "+90", если он уже присутствует в начале
        }

        if (value.length > 0 && !value.startsWith("+")) {
            // Если введенные данные начинаются с числа, добавляем "+90"
            event.target.value = "+90" + value;
        }
    });

    const tgInput = document.getElementById("tg");

    tgInput.addEventListener("input", function(event) {
        const value = event.target.value.trim();
        if (value.startsWith("@")) {
            return; // Не добавляем "@", если он уже присутствует в начале
        }

        if (value.length > 0 && !value.startsWith("@")) {
            // Если введенные данные не начинаются с "@", добавляем "@"
            event.target.value = "@" + value;
        }
    });

    // Валидация формы (оставляем предыдущий код валидации без изменений)
    const form = document.getElementById("checkout-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();
        const tg = document.getElementById("tg").value.trim();

        if (!validateUsername(username)) {
            alert("Пожалуйста, введите корректное имя пользователя.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Пожалуйста, введите корректный email.");
            return;
        }

        if (!validateNumber(number)) {
            alert("Пожалуйста, введите корректный номер телефона.");
            return;
        }

        if (!validateTelegram(tg)) {
            alert("Пожалуйста, введите корректный Telegram.");
            return;
        }

        // Если все данные введены верно, можно отправить форму
        form.submit();
    });

    function validateUsername(username) {
        return username !== "";
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateNumber(number) {
        const re = /^\+90\d{10}$/; // Предполагаем, что номер телефона должен начинаться с "+90" и содержать еще 10 цифр
        return re.test(number);
    }

    function validateTelegram(tg) {
        const re = /^@[a-zA-Z0-9_]+$/; // Предполагаем, что Telegram ID должен начинаться с "@" и содержать только буквы, цифры и знак "_"
        return re.test(tg);
    }
});
