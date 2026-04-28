// Админ панель - товары по категориям
function renderCategoryTable(category, tbodyId) { // Рендер таблицы по категории
    const stats = getProductStats(); // Получаем статистику
    const categoryProducts = products.filter(p => p.category === category); // Фильтруем товары
    const tbody = document.getElementById(tbodyId); // Находим tbody
    
    tbody.innerHTML = categoryProducts.map(product => { // Формируем строки
        const stat = stats[product.id]; // Статистика товара
        return `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString('ru-RU')} ₽</td>
                <td>${stat.inCart}</td>
                <td>${stat.inFavorites}</td>
                <td>${stat.ordered}</td>
            </tr>
        `; // Шаблон строки
    }).join(''); // Склеиваем HTML
} // Конец renderCategoryTable

document.addEventListener('DOMContentLoaded', () => { // Инициализация
    renderCategoryTable('phones', 'phonesTable'); // Телефоны
    renderCategoryTable('laptops', 'laptopsTable'); // Ноутбуки
    renderCategoryTable('accessories', 'accessoriesTable'); // Аксессуары
}); // Конец обработчика