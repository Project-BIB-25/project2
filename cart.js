// Страница корзины
function calculateTotal() { // Подсчет суммы
    const cart = getCart(); // Берем корзину
    return cart.reduce((total, item) => { // Суммируем
        const product = products.find(p => p.id === item.id); // Ищем товар
        return total + (product.price * item.quantity); // Добавляем сумму
    }, 0); // Начальное значение
} // Конец calculateTotal

function updateQuantity(productId, delta) { // Обновление количества
    let cart = getCart(); // Берем корзину
    const item = cart.find(item => item.id === productId); // Находим позицию
    
    if (item) { // Если позиция найдена
        item.quantity += delta; // Меняем количество
        if (item.quantity <= 0) { // Если меньше нуля
            cart = cart.filter(i => i.id !== productId); // Удаляем
        }
        saveCart(cart); // Сохраняем корзину
        renderCart(); // Перерисовка
        updateBadges(); // Обновление счетчиков
    }
} // Конец updateQuantity

function removeFromCart(productId) { // Удаление из корзины
    let cart = getCart(); // Берем корзину
    const stats = getProductStats(); // Статистика
    
    cart = cart.filter(item => item.id !== productId); // Удаляем товар
    stats[productId].inCart = 0; // Сбрасываем inCart
    
    saveCart(cart); // Сохраняем корзину
    saveProductStats(stats); // Сохраняем статистику
    renderCart(); // Перерисовка
    updateBadges(); // Обновление счетчиков
} // Конец removeFromCart

function renderCart() { // Рендер корзины
    const cart = getCart(); // Берем корзину
    const tbody = document.getElementById('cartTableBody'); // Тело таблицы
    const emptyMsg = document.getElementById('emptyCart'); // Сообщение
    const table = document.querySelector('.cart-table'); // Таблица
    const totalDiv = document.querySelector('.cart-total'); // Блок итога

    if (cart.length === 0) { // Если пусто
        tbody.innerHTML = ''; // Очищаем
        emptyMsg.style.display = 'block'; // Показываем сообщение
        table.style.display = 'none'; // Скрываем таблицу
        totalDiv.style.display = 'none'; // Скрываем итог
        return; // Выходим
    }

    emptyMsg.style.display = 'none'; // Скрываем сообщение
    table.style.display = 'table'; // Показываем таблицу
    totalDiv.style.display = 'block'; // Показываем итог

    tbody.innerHTML = cart.map((item, index) => { // Формируем строки
        const product = products.find(p => p.id === item.id); // Ищем товар
        const sum = product.price * item.quantity; // Сумма позиции
        
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString('ru-RU')} ₽</td>
                <td>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${product.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${product.id}, 1)">+</button>
                    </div>
                </td>
                <td>${sum.toLocaleString('ru-RU')} ₽</td>
                <td>
                    <button class="btn btn-remove" onclick="removeFromCart(${product.id})">
                        Удалить
                    </button>
                </td>
            </tr>
        `; // Шаблон строки
    }).join(''); // Склеиваем HTML

    document.getElementById('totalPrice').textContent = calculateTotal().toLocaleString('ru-RU'); // Итог
} // Конец renderCart

function checkout() { // Оформление заказа
    const cart = getCart(); // Берем корзину
    if (cart.length === 0) return; // Если пусто

    const order = { // Формируем заказ
        id: Date.now(), // ID заказа
        date: new Date().toLocaleString('ru-RU'), // Дата
        items: cart.map(item => { // Товары заказа
            const product = products.find(p => p.id === item.id); // Ищем товар
            return {
                id: item.id, // ID товара
                name: product.name, // Название
                price: product.price, // Цена
                quantity: item.quantity, // Количество
                sum: product.price * item.quantity // Сумма
            };
        }), // Конец map
        total: calculateTotal() // Итог
    }; // Конец заказа
    
    const orders = getOrderHistory(); // История заказов
    orders.push(order); // Добавляем заказ
    
    const stats = getProductStats(); // Статистика
    cart.forEach(item => { // Перебор корзины
        stats[item.id].ordered += item.quantity; // Увеличиваем ordered
        stats[item.id].purchased += item.quantity; // Увеличиваем purchased
        stats[item.id].inCart = 0; // Сбрасываем inCart
    }); // Конец перебора
    
    saveOrderHistory(orders); // Сохраняем историю
    saveProductStats(stats); // Сохраняем статистику
    
    alert('Спасибо за заказ! Общая сумма: ' + calculateTotal().toLocaleString('ru-RU') + ' ₽'); // Сообщение
    
    saveCart([]); // Очищаем корзину
    updateBadges(); // Обновляем счетчики
    renderCart(); // Перерисовка
} // Конец checkout

document.addEventListener('DOMContentLoaded', () => { // Инициализация
    renderCart(); // Рендер корзины
}); // Конец обработчика