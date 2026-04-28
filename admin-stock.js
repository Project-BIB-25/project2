// Загрузка данных при старте
document.addEventListener('DOMContentLoaded', function() { // Инициализация
    loadStock(); // Загружаем склад
    
    // Фильтры и сортировка
    document.getElementById('categoryFilter').addEventListener('change', loadStock); // Фильтр категории
    document.getElementById('stockSort').addEventListener('change', loadStock); // Сортировка
    
    // Обработчик изменения количества на складе
    document.addEventListener('click', function(e) { // Слушаем клики
        if (e.target.classList.contains('stock-increase')) { // Увеличение
            const productId = parseInt(e.target.dataset.productId); // ID товара
            updateStock(productId, 1); // Увеличиваем
        }
        if (e.target.classList.contains('stock-decrease')) { // Уменьшение
            const productId = parseInt(e.target.dataset.productId); // ID товара
            updateStock(productId, -1); // Уменьшаем
        }
        if (e.target.classList.contains('stock-set')) { // Установка
            const productId = parseInt(e.target.dataset.productId); // ID товара
            const input = document.querySelector(`input[data-product-id="${productId}"]`); // Поле ввода
            const newStock = parseInt(input.value) || 0; // Новое значение
            setStock(productId, newStock); // Устанавливаем
        }
    }); // Конец обработчика клика
}); // Конец DOMContentLoaded

// Загрузка и отображение склада
function loadStock() { // Загружаем склад
    const categoryFilter = document.getElementById('categoryFilter').value; // Фильтр категории
    const sortBy = document.getElementById('stockSort').value; // Сортировка
    
    // Получаем товары из localStorage или из исходного массива
    let currentProducts = JSON.parse(localStorage.getItem('products') || JSON.stringify(products)); // Товары
    const stats = JSON.parse(localStorage.getItem('productStats') || '{}'); // Статистика
    
    // Фильтрация по категории
    if (categoryFilter !== 'all') { // Не все категории
        currentProducts = currentProducts.filter(p => p.category === categoryFilter); // Фильтр
    }
    
    // Сортировка
    currentProducts.sort((a, b) => { // Сортируем
        switch(sortBy) { // Выбор сортировки
            case 'name':
                return a.name.localeCompare(b.name); // По названию
            case 'stock-asc':
                return (a.stock || 0) - (b.stock || 0); // Остаток возр.
            case 'stock-desc':
                return (b.stock || 0) - (a.stock || 0); // Остаток убыв.
            case 'ordered':
                const aOrdered = stats[a.id]?.ordered || 0; // Заказано A
                const bOrdered = stats[b.id]?.ordered || 0; // Заказано B
                return bOrdered - aOrdered; // По заказано
            default:
                return 0; // Без сортировки
        }
    }); // Конец sort
    
    renderStock(currentProducts, stats); // Рендер таблицы
} // Конец loadStock

// Отображение таблицы склада
function renderStock(productsToShow, stats) { // Рендер склада
    const container = document.getElementById('stockContainer'); // Контейнер
    
    let html = `
        <table class="stock-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Товар</th>
                    <th>Категория</th>
                    <th>Цена</th>
                    <th>На складе</th>
                    <th>Заказано</th>
                    <th>Куплено</th>
                    <th>Управление</th>
                </tr>
            </thead>
            <tbody>
    `; // Заголовок таблицы
    
    productsToShow.forEach(product => { // Перебор товаров
        const productStats = stats[product.id] || { ordered: 0, purchased: 0, inCart: 0, inFavorites: 0 }; // Статистика товара
        const stockLevel = product.stock || 0; // Остаток
        const stockClass = getStockLevelClass(stockLevel); // Класс остатка
        
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.image} ${product.name}</td>
                <td>${getCategoryName(product.category)}</td>
                <td>${product.price.toLocaleString()} ₽</td>
                <td class="${stockClass}"><strong>${stockLevel}</strong></td>
                <td>${productStats.ordered}</td>
                <td>${productStats.purchased}</td>
                <td class="stock-controls">
                    <button class="stock-btn stock-decrease" data-product-id="${product.id}">−</button>
                    <input type="number" class="stock-input" data-product-id="${product.id}" value="${stockLevel}" min="0">
                    <button class="stock-btn stock-increase" data-product-id="${product.id}">+</button>
                    <button class="stock-btn-primary stock-set" data-product-id="${product.id}">Установить</button>
                </td>
            </tr>
        `; // Строка товара
    }); // Конец перебора
    
    html += `
            </tbody>
        </table>
    `; // Конец таблицы
    
    container.innerHTML = html; // Вставляем HTML
} // Конец renderStock

// Получение класса для уровня запасов
function getStockLevelClass(stock) { // Класс уровня
    if (stock === 0) return 'stock-empty'; // Нет
    if (stock < 10) return 'stock-low'; // Мало
    if (stock < 30) return 'stock-medium'; // Средне
    return 'stock-good'; // Достаточно
} // Конец getStockLevelClass

// Получение названия категории
function getCategoryName(category) { // Название категории
    const names = { // Словарь
        'phones': 'Телефоны', // Телефоны
        'laptops': 'Ноутбуки', // Ноутбуки
        'accessories': 'Аксессуары' // Аксессуары
    }; // Конец словаря
    return names[category] || category; // Возвращаем
} // Конец getCategoryName

// Обновление количества на складе (+ или -)
function updateStock(productId, delta) { // Обновляем остаток
    let currentProducts = JSON.parse(localStorage.getItem('products') || JSON.stringify(products)); // Товары
    const productIndex = currentProducts.findIndex(p => p.id === productId); // Индекс товара
    
    if (productIndex === -1) return; // Если не найден
    
    const currentStock = currentProducts[productIndex].stock || 0; // Текущий остаток
    const newStock = Math.max(0, currentStock + delta); // Новый остаток
    
    currentProducts[productIndex].stock = newStock; // Сохраняем
    localStorage.setItem('products', JSON.stringify(currentProducts)); // Пишем в хранилище
    
    showNotification(`Остаток товара "${currentProducts[productIndex].name}" изменён: ${currentStock} → ${newStock}`); // Уведомление
    loadStock(); // Обновляем таблицу
} // Конец updateStock

// Установка конкретного значения на складе
function setStock(productId, newStock) { // Установка остатка
    if (newStock < 0) { // Проверка
        showNotification('Количество не может быть отрицательным', 'error'); // Ошибка
        return; // Выходим
    }
    
    let currentProducts = JSON.parse(localStorage.getItem('products') || JSON.stringify(products)); // Товары
    const productIndex = currentProducts.findIndex(p => p.id === productId); // Индекс товара
    
    if (productIndex === -1) return; // Если не найден
    
    const oldStock = currentProducts[productIndex].stock || 0; // Старый остаток
    currentProducts[productIndex].stock = newStock; // Новый остаток
    localStorage.setItem('products', JSON.stringify(currentProducts)); // Сохраняем
    
    showNotification(`Остаток товара "${currentProducts[productIndex].name}" установлен: ${oldStock} → ${newStock}`); // Уведомление
    loadStock(); // Обновляем таблицу
} // Конец setStock

// Показать уведомление
function showNotification(message, type = 'success') { // Уведомление
    const notification = document.createElement('div'); // Создаем элемент
    notification.className = `notification ${type}`; // Класс
    notification.textContent = message; // Текст
    document.body.appendChild(notification); // Вставляем
    
    setTimeout(() => { // Показываем
        notification.classList.add('show'); // Добавляем класс
    }, 10); // Задержка
    
    setTimeout(() => { // Скрываем
        notification.classList.remove('show'); // Убираем класс
        setTimeout(() => { // Удаляем
            document.body.removeChild(notification); // Удаляем
        }, 300); // Задержка
    }, 3000); // Время показа
} // Конец showNotification