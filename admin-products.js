// Админ панель - все товары
function renderAdminProducts() { // Рендер списка товаров
    const stats = getProductStats(); // Получаем статистику
    const tbody = document.getElementById('adminTableBody'); // Находим tbody
    
    const categoryNames = { // Названия категорий
        phones: 'Телефоны', // Телефоны
        laptops: 'Ноутбуки', // Ноутбуки
        accessories: 'Аксессуары' // Аксессуары
    }; // Конец словаря
    
    tbody.innerHTML = products.map(product => { // Формируем строки
        const stat = stats[product.id]; // Статистика товара
        return `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${categoryNames[product.category]}</td>
                <td>${product.price.toLocaleString('ru-RU')} ₽</td>
                <td>${stat.inCart}</td>
                <td>${stat.inFavorites}</td>
                <td>${stat.ordered}</td>
                <td>${stat.purchased}</td>
            </tr>
        `; // Шаблон строки
    }).join(''); // Склеиваем HTML
} // Конец renderAdminProducts

document.addEventListener('DOMContentLoaded', () => { // Инициализация
    renderAdminProducts(); // Рендер списка
}); // Конец обработчика