// Данные товаров
const products = [
    // Сотовые телефоны (20 товаров)
    { id: 1, name: 'iPhone 15 Pro', category: 'phones', price: 129990, image: '📱', stock: 15 },
    { id: 2, name: 'Samsung Galaxy S24', category: 'phones', price: 89990, image: '📱', stock: 20 },
    { id: 3, name: 'Xiaomi 14 Pro', category: 'phones', price: 79990, image: '📱', stock: 25 },
    { id: 4, name: 'Google Pixel 8', category: 'phones', price: 74990, image: '📱', stock: 18 },
    { id: 5, name: 'OnePlus 12', category: 'phones', price: 69990, image: '📱', stock: 22 },
    { id: 6, name: 'iPhone 14', category: 'phones', price: 89990, image: '📱', stock: 30 },
    { id: 7, name: 'Samsung Galaxy A54', category: 'phones', price: 39990, image: '📱', stock: 40 },
    { id: 8, name: 'Xiaomi Redmi Note 13', category: 'phones', price: 24990, image: '📱', stock: 50 },
    { id: 9, name: 'Realme 11 Pro', category: 'phones', price: 29990, image: '📱', stock: 35 },
    { id: 10, name: 'OPPO Find X6', category: 'phones', price: 59990, image: '📱', stock: 12 },
    { id: 11, name: 'Huawei P60 Pro', category: 'phones', price: 64990, image: '📱', stock: 10 },
    { id: 12, name: 'Sony Xperia 1 V', category: 'phones', price: 94990, image: '📱', stock: 8 },
    { id: 13, name: 'Motorola Edge 40', category: 'phones', price: 44990, image: '📱', stock: 28 },
    { id: 14, name: 'Nothing Phone 2', category: 'phones', price: 54990, image: '📱', stock: 16 },
    { id: 15, name: 'Asus ROG Phone 7', category: 'phones', price: 84990, image: '📱', stock: 11 },
    { id: 16, name: 'Vivo X90 Pro', category: 'phones', price: 69990, image: '📱', stock: 19 },
    { id: 17, name: 'Honor Magic5 Pro', category: 'phones', price: 59990, image: '📱', stock: 24 },
    { id: 18, name: 'ZTE Axon 50', category: 'phones', price: 34990, image: '📱', stock: 32 },
    { id: 19, name: 'Infinix Note 30', category: 'phones', price: 19990, image: '📱', stock: 45 },
    { id: 20, name: 'Tecno Phantom X2', category: 'phones', price: 27990, image: '📱', stock: 38 },

    // Ноутбуки (20 товаров)
    { id: 21, name: 'MacBook Pro 16"', category: 'laptops', price: 249990, image: '💻', stock: 8 },
    { id: 22, name: 'Dell XPS 15', category: 'laptops', price: 189990, image: '💻', stock: 12 },
    { id: 23, name: 'HP Spectre x360', category: 'laptops', price: 149990, image: '💻', stock: 15 },
    { id: 24, name: 'Lenovo ThinkPad X1', category: 'laptops', price: 169990, image: '💻', stock: 18 },
    { id: 25, name: 'Asus ZenBook 14', category: 'laptops', price: 119990, image: '💻', stock: 22 },
    { id: 26, name: 'Acer Swift 3', category: 'laptops', price: 79990, image: '💻', stock: 30 },
    { id: 27, name: 'MSI GF63', category: 'laptops', price: 89990, image: '💻', stock: 25 },
    { id: 28, name: 'Razer Blade 15', category: 'laptops', price: 219990, image: '💻', stock: 7 },
    { id: 29, name: 'Microsoft Surface Laptop 5', category: 'laptops', price: 139990, image: '💻', stock: 14 },
    { id: 30, name: 'HP Pavilion 15', category: 'laptops', price: 69990, image: '💻', stock: 35 },
    { id: 31, name: 'Lenovo IdeaPad 5', category: 'laptops', price: 64990, image: '💻', stock: 28 },
    { id: 32, name: 'Asus ROG Strix G15', category: 'laptops', price: 159990, image: '💻', stock: 10 },
    { id: 33, name: 'Dell Inspiron 15', category: 'laptops', price: 59990, image: '💻', stock: 40 },
    { id: 34, name: 'Acer Predator Helios', category: 'laptops', price: 179990, image: '💻', stock: 9 },
    { id: 35, name: 'Samsung Galaxy Book3', category: 'laptops', price: 109990, image: '💻', stock: 16 },
    { id: 36, name: 'Huawei MateBook D', category: 'laptops', price: 74990, image: '💻', stock: 20 },
    { id: 37, name: 'LG Gram 17', category: 'laptops', price: 159990, image: '💻', stock: 11 },
    { id: 38, name: 'Gigabyte Aero 15', category: 'laptops', price: 199990, image: '💻', stock: 6 },
    { id: 39, name: 'Xiaomi RedmiBook Pro', category: 'laptops', price: 84990, image: '💻', stock: 24 },
    { id: 40, name: 'Honor MagicBook 14', category: 'laptops', price: 69990, image: '💻', stock: 27 },

    // Аксессуары (20 товаров)
    { id: 41, name: 'AirPods Pro 2', category: 'accessories', price: 24990, image: '🎧', stock: 50 },
    { id: 42, name: 'Samsung Galaxy Buds2', category: 'accessories', price: 12990, image: '🎧', stock: 60 },
    { id: 43, name: 'Logitech MX Master 3S', category: 'accessories', price: 9990, image: '🖱️', stock: 45 },
    { id: 44, name: 'Apple Magic Keyboard', category: 'accessories', price: 12990, image: '⌨️', stock: 35 },
    { id: 45, name: 'Sony WH-1000XM5', category: 'accessories', price: 34990, image: '🎧', stock: 28 },
    { id: 46, name: 'Anker PowerCore 20000', category: 'accessories', price: 4990, image: '🔋', stock: 80 },
    { id: 47, name: 'SanDisk Extreme 1TB', category: 'accessories', price: 14990, image: '💾', stock: 55 },
    { id: 48, name: 'Belkin USB-C Hub', category: 'accessories', price: 5990, image: '🔌', stock: 70 },
    { id: 49, name: 'Apple Watch Ultra', category: 'accessories', price: 89990, image: '⌚', stock: 15 },
    { id: 50, name: 'Samsung Galaxy Watch6', category: 'accessories', price: 29990, image: '⌚', stock: 32 },
    { id: 51, name: 'Xiaomi Mi Band 8', category: 'accessories', price: 3990, image: '⌚', stock: 100 },
    { id: 52, name: 'JBL Flip 6', category: 'accessories', price: 11990, image: '🔊', stock: 48 },
    { id: 53, name: 'Bose SoundLink', category: 'accessories', price: 19990, image: '🔊', stock: 22 },
    { id: 54, name: 'Razer DeathAdder V3', category: 'accessories', price: 7990, image: '🖱️', stock: 52 },
    { id: 55, name: 'HyperX Cloud II', category: 'accessories', price: 12990, image: '🎧', stock: 40 },
    { id: 56, name: 'Corsair K70 RGB', category: 'accessories', price: 15990, image: '⌨️', stock: 30 },
    { id: 57, name: 'Webcam Logitech C920', category: 'accessories', price: 8990, image: '📷', stock: 38 },
    { id: 58, name: 'Blue Yeti Микрофон', category: 'accessories', price: 14990, image: '🎤', stock: 25 },
    { id: 59, name: 'Elgato Stream Deck', category: 'accessories', price: 16990, image: '🎮', stock: 18 },
    { id: 60, name: 'DJI Osmo Mobile 6', category: 'accessories', price: 13990, image: '📱', stock: 21 }
];

// Инициализация статистики // Заголовок блока
function initProductStats() { // Инициализация статистики
    const stats = {}; // Объект статистики
    products.forEach(product => { // Перебор товаров
        stats[product.id] = { // Запись статистики
            inCart: 0, // В корзине
            inFavorites: 0, // В избранном
            ordered: 0, // Заказано
            purchased: 0 // Куплено
        }; // Конец записи
    }); // Конец перебора
    return stats; // Возвращаем объект
} // Конец initProductStats
// Получение данных из localStorage // Заголовок блока
function safeJsonParse(raw, fallback) { // Безопасный разбор JSON
    try { const r = raw ? JSON.parse(raw) : fallback; return (r !== null && r !== undefined) ? r : fallback; } catch (e) { return fallback; }
} // Конец safeJsonParse
// Пустая строка
function getFavorites() { // Получить избранное
    const v = safeJsonParse(localStorage.getItem('favorites'), []); return Array.isArray(v) ? v : [];
} // Конец getFavorites
// Пустая строка
function getCart() { // Получить корзину
    const v = safeJsonParse(localStorage.getItem('cart'), []); return Array.isArray(v) ? v : [];
} // Конец getCart
// Пустая строка
function getOrderHistory() { // Получить историю заказов
    const v = safeJsonParse(localStorage.getItem('orderHistory'), []); return Array.isArray(v) ? v : [];
} // Конец getOrderHistory
// Пустая строка
function getProductStats() { // Получить статистику
    return safeJsonParse(localStorage.getItem('productStats'), null) || initProductStats(); // Возврат статистики
} // Конец getProductStats
// Сохранение данных в localStorage // Заголовок блока
function saveFavorites(favorites) { // Сохранить избранное
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Сериализация
} // Конец saveFavorites
// Пустая строка
function saveCart(cart) { // Сохранить корзину
    localStorage.setItem('cart', JSON.stringify(cart)); // Сериализация
} // Конец saveCart
// Пустая строка
function saveOrderHistory(orders) { // Сохранить историю
    localStorage.setItem('orderHistory', JSON.stringify(orders)); // Сериализация
} // Конец saveOrderHistory
// Пустая строка
function saveProductStats(stats) { // Сохранить статистику
    localStorage.setItem('productStats', JSON.stringify(stats)); // Сериализация
} // Конец saveProductStats
// Обновление счетчиков в header // Заголовок блока
function updateBadges() { // Обновление бейджей
    const favorites = getFavorites(); // Избранное
    const cart = getCart(); // Корзина
    // Пустая строка
    const favCount = document.getElementById('favCount'); // Счетчик избранного
    const cartCount = document.getElementById('cartCount'); // Счетчик корзины
    // Пустая строка
    if (favCount) favCount.textContent = favorites.length; // Обновление избранного
    if (cartCount) { // Если есть счетчик
        const total = cart.reduce((sum, item) => sum + item.quantity, 0); // Сумма позиций
        cartCount.textContent = total; // Обновление корзины
    } // Конец if
} // Конец updateBadges
// Toggle избранного // Заголовок блока
function toggleFavorite(productId) { // Переключение избранного
    let favorites = getFavorites(); // Избранное
    const stats = getProductStats(); // Статистика
    const index = favorites.indexOf(productId); // Индекс
    // Пустая строка
    if (index > -1) { // Если уже в избранном
        favorites.splice(index, 1); // Удаляем
        stats[productId].inFavorites--; // Уменьшаем счетчик
    } else { // Иначе добавляем
        favorites.push(productId); // Добавляем
        stats[productId].inFavorites++; // Увеличиваем счетчик
    } // Конец if
    // Пустая строка
    saveFavorites(favorites); // Сохраняем избранное
    saveProductStats(stats); // Сохраняем статистику
    updateBadges(); // Обновляем бейджи
} // Конец toggleFavorite
// Toggle корзины // Заголовок блока
function toggleCart(productId) { // Переключение корзины
    let cart = getCart(); // Корзина
    const stats = getProductStats(); // Статистика
    const existingItem = cart.find(item => item.id === productId); // Поиск
    // Пустая строка
    if (existingItem) { // Если товар в корзине
        cart = cart.filter(item => item.id !== productId); // Удаляем
        stats[productId].inCart = 0; // Сбрасываем счетчик
    } else { // Иначе добавляем
        cart.push({ id: productId, quantity: 1 }); // Добавляем
        stats[productId].inCart = 1; // Устанавливаем счетчик
    } // Конец if
    // Пустая строка
    saveCart(cart); // Сохраняем корзину
    saveProductStats(stats); // Сохраняем статистику
    updateBadges(); // Обновляем бейджи
} // Конец toggleCart
// Создание карточки товара // Заголовок блока
function createProductCard(product) { // Создание карточки
    const favorites = getFavorites(); // Избранное
    const cart = getCart(); // Корзина
    const isFavorite = favorites.includes(product.id); // Флаг избранного
    const isInCart = cart.some(item => item.id === product.id); // Флаг корзины
    // Пустая строка
    // Получаем актуальное количество на складе // Комментарий
    const currentProducts = safeJsonParse(localStorage.getItem('products'), products); // Текущие товары
    const currentProduct = currentProducts.find(p => p.id === product.id); // Текущий товар
    const stock = currentProduct ? (currentProduct.stock || 0) : (product.stock || 0); // Остаток
    const outOfStock = stock === 0; // Флаг отсутствия
    // Пустая строка
    const categoryNames = { // Словарь категорий
        phones: 'Телефоны', // Телефоны
        laptops: 'Ноутбуки', // Ноутбуки
        accessories: 'Аксессуары' // Аксессуары
    }; // Конец словаря
    // Пустая строка
    return `
        <div class="product-card ${outOfStock ? 'out-of-stock' : ''}">
            <div class="product-image">${product.image}</div>
            <div class="product-category">${categoryNames[product.category]}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
            <div class="product-stock ${stock < 10 ? 'low-stock' : ''}">
                ${outOfStock ? '❌ Нет в наличии' : `📦 На складе: ${stock} шт.`}
            </div>
            <div class="product-actions">
                <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" data-product-id="${product.id}" data-action="favorite" title="${isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
                <button class="btn btn-cart ${isInCart ? 'active' : ''}" ${outOfStock ? 'disabled' : ''} data-product-id="${product.id}" data-action="cart" title="${outOfStock ? 'Нет в наличии' : (isInCart ? 'Удалить из корзины' : 'Добавить в корзину')}">
                    🛒
                </button>
            </div>
        </div>
    `; // HTML карточки
} // Конец createProductCard
// Делегирование событий для кнопок // Заголовок блока
document.addEventListener('click', (e) => { // Обработчик клика
    const target = e.target.closest('[data-action]'); // Поиск цели
    if (!target) return; // Выход если нет цели
    // Пустая строка
    const productId = parseInt(target.dataset.productId); // ID товара
    const action = target.dataset.action; // Действие
    // Пустая строка
    if (action === 'favorite') { // Избранное
        toggleFavorite(productId); // Переключение
        // Перезагрузить страницу для обновления // Комментарий
        location.reload(); // Перезагрузка
    } else if (action === 'cart') { // Корзина
        toggleCart(productId); // Переключение
        // Перезагрузить страницу для обновления // Комментарий
        location.reload(); // Перезагрузка
    } // Конец условий
}); // Конец обработчика
// Инициализация при загрузке страницы // Заголовок блока
document.addEventListener('DOMContentLoaded', () => { // Инициализация
    updateBadges(); // Обновляем бейджи
    // Пустая строка
    // Бургер меню // Комментарий
    const burger = document.getElementById('burger'); // Кнопка бургер
    const nav = document.getElementById('nav'); // Навигация
    // Пустая строка
    if (burger && nav) { // Если элементы найдены
        burger.addEventListener('click', () => { // Обработчик клика
            burger.classList.toggle('active'); // Переключаем класс
            nav.classList.toggle('active'); // Переключаем класс
        }); // Конец обработчика
    } // Конец if
}); // Конец DOMContentLoaded