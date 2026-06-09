// Личный кабинет
function renderProfile() { // Рендер профиля
    renderOrderHistory(); // История заказов
    renderProfileFavorites(); // Избранное
    renderProfileCart(); // Корзина
} // Конец renderProfile

function renderOrderHistory() { // Рендер истории заказов
    const orders = getOrderHistory(); // Заказы
    const orderHistory = document.getElementById('orderHistory'); // Контейнер
    
    if (orders.length === 0) { // Если нет заказов
        orderHistory.innerHTML = '<p class="empty-message">История заказов пуста</p>'; // Сообщение
        return; // Выходим
    }

    orderHistory.innerHTML = orders.map(order => { // Формируем карточки
        const statusClass = getStatusClass(order.status || 'Новый'); // Класс статуса
        return `
        <div class="order-item">
            <div class="order-header">
                <h4>Заказ #${order.id}</h4>
                <div class="order-meta">
                    <span class="order-date">${order.date}</span>
                    <span class="order-status ${statusClass}">${order.status || 'Новый'}</span>
                </div>
            </div>
            <table class="order-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Товар</th>
                        <th>Цена</th>
                        <th>Кол-во</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map((item, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${item.image || ''} ${item.name}</td>
                            <td>${item.price.toLocaleString('ru-RU')} ₽</td>
                            <td>${item.quantity}</td>
                            <td>${(item.price * item.quantity).toLocaleString('ru-RU')} ₽</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="order-total">
                <strong>Итого: ${(order.total || calculateTotal(order.items)).toLocaleString('ru-RU')} ₽</strong>
            </div>
        </div>
    `; // Карточка заказа
    }).reverse().join(''); // Новые сверху
} // Конец renderOrderHistory

function getStatusClass(status) { // Класс статуса
    const statusMap = { // Карта классов
        'Новый': 'status-new', // Новый
        'В обработке': 'status-processing', // В обработке
        'Подтверждён': 'status-confirmed', // Подтверждён
        'Отправлен': 'status-shipped', // Отправлен
        'Доставлен': 'status-delivered', // Доставлен
        'Отменён': 'status-cancelled' // Отменён
    }; // Конец карты
    return statusMap[status] || 'status-new'; // Возвращаем
} // Конец getStatusClass

function calculateTotal(items) { // Сумма позиций
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0); // Суммируем
} // Конец calculateTotal

function renderProfileFavorites() { // Рендер избранного
    const favorites = getFavorites(); // Список избранного
    document.getElementById('profileFavCount').textContent = favorites.length; // Счетчик
    
    const favoriteProducts = products.filter(p => favorites.includes(p.id)); // Товары
    const profileFavorites = document.getElementById('profileFavorites'); // Контейнер
    
    if (favoriteProducts.length === 0) { // Если пусто
        profileFavorites.innerHTML = '<p class="empty-message">Нет избранных товаров</p>'; // Сообщение
        return; // Выходим
    }

    const categoryNames = { // Названия категорий
        phones: 'Телефоны', // Телефоны
        laptops: 'Ноутбуки', // Ноутбуки
        accessories: 'Аксессуары' // Аксессуары
    }; // Конец словаря

    profileFavorites.innerHTML = favoriteProducts.slice(0, 4).map(product => `
        <div class="product-card-mini">
            <div class="product-image-mini">${product.image}</div>
            <div class="product-category">${categoryNames[product.category]}</div>
            <h4>${product.name}</h4>
            <p class="product-price">${product.price.toLocaleString('ru-RU')} ₽</p>
        </div>
    `).join(''); // Рендер карточек
} // Конец renderProfileFavorites

function renderProfileCart() { // Рендер корзины
    const cart = getCart(); // Корзина
    const profileCart = document.getElementById('profileCart'); // Контейнер
    
    if (cart.length === 0) { // Если пусто
        profileCart.innerHTML = '<p class="empty-message">Корзина пуста</p>'; // Сообщение
        return; // Выходим
    }

    const cartItems = cart.map(item => { // Преобразуем
        const product = products.find(p => p.id === item.id); // Товар
        return { ...product, quantity: item.quantity }; // Объект
    }); // Конец map
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0); // Итог

    profileCart.innerHTML = `
        <ul class="cart-summary">
            ${cartItems.map(item => `
                <li>
                    <span>${item.name}</span>
                    <span>${item.quantity} шт. × ${item.price.toLocaleString('ru-RU')} ₽ = ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                </li>
            `).join('')}
        </ul>
        <div class="cart-summary-total">
            <strong>Итого: ${total.toLocaleString('ru-RU')} ₽</strong>
        </div>
    `; // Итоговый HTML
} // Конец renderProfileCart

document.addEventListener('DOMContentLoaded', () => { // Инициализация
    renderProfile(); // Рендер профиля
}); // Конец обработчика
