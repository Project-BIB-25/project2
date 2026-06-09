// Страница избранного
function renderFavorites() { // Рендер избранного
    const favorites = getFavorites(); // Список избранного
    const favoriteProducts = products.filter(p => favorites.includes(p.id)); // Товары в избранном
    const grid = document.getElementById('favoritesGrid'); // Контейнер
    const emptyMsg = document.getElementById('emptyFavorites'); // Сообщение

    if (favoriteProducts.length === 0) { // Если пусто
        grid.innerHTML = ''; // Очищаем
        emptyMsg.style.display = 'block'; // Показываем сообщение
        return; // Выходим
    }

    emptyMsg.style.display = 'none'; // Скрываем сообщение
    grid.innerHTML = favoriteProducts.map(product => createProductCard(product)).join(''); // Рендер карточек
} // Конец renderFavorites

document.addEventListener('DOMContentLoaded', () => { // Инициализация
    renderFavorites(); // Рендер
}); // Конец обработчика