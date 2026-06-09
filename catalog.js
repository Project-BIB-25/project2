// Каталог товаров
let currentPage = 1; // Текущая страница
const itemsPerPage = 8; // Товаров на странице
let currentCategory = 'all'; // Текущая категория
let searchQuery = ''; // Поисковый запрос
let sortOrder = ''; // Порядок сортировки

// Фильтрация и сортировка
function getFilteredProducts() { // Получаем отфильтрованные
    let filtered = products; // Исходный список

    if (currentCategory !== 'all') { // Фильтр категории
        filtered = filtered.filter(p => p.category === currentCategory); // Применяем фильтр
    }

    if (searchQuery) { // Если есть поиск
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        ); // Фильтрация по имени
    }

    if (sortOrder === 'asc') { // Сортировка по возрастанию
        filtered = [...filtered].sort((a, b) => a.price - b.price); // По цене
    } else if (sortOrder === 'desc') { // Сортировка по убыванию
        filtered = [...filtered].sort((a, b) => b.price - a.price); // По цене
    }

    return filtered; // Возвращаем результат
} // Конец getFilteredProducts

// Отображение товаров
function renderProducts() { // Рендер товаров
    const filtered = getFilteredProducts(); // Фильтрованные
    const totalPages = Math.ceil(filtered.length / itemsPerPage); // Всего страниц
    const start = (currentPage - 1) * itemsPerPage; // Начальный индекс
    const end = start + itemsPerPage; // Конечный индекс
    const pageProducts = filtered.slice(start, end); // Товары страницы

    const grid = document.getElementById('productsGrid'); // Сетка товаров
    if (!grid) return; // Выход если элемент не найден
    grid.innerHTML = pageProducts.map(product => createProductCard(product)).join(''); // Рендер карточек

    renderPagination(totalPages); // Рендер пагинации
} // Конец renderProducts

// Пагинация
function renderPagination(totalPages) { // Рендер пагинации
    const pagination = document.getElementById('pagination'); // Контейнер пагинации
    if (!pagination) return; // Выход если элемент не найден
    
    if (totalPages <= 1) { // Если одна страница
        pagination.innerHTML = ''; // Очищаем
        return; // Выходим
    }

    pagination.innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(1)">&lt;&lt;</button>
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">&lt;</button>
        <button class="active">${currentPage} / ${totalPages}</button>
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">&gt;</button>
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${totalPages})">&gt;&gt;</button>
    `; // Кнопки пагинации
} // Конец renderPagination

function goToPage(page) { // Переход на страницу
    currentPage = page; // Установка страницы
    renderProducts(); // Перерисовка
} // Конец goToPage

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => { // Инициализация
    // Категории
    document.querySelectorAll('.category-list a').forEach(link => { // Ссылки категорий
        link.addEventListener('click', (e) => { // Обработчик клика
            e.preventDefault(); // Отмена перехода
            document.querySelectorAll('.category-list a').forEach(l => l.classList.remove('active')); // Сбрасываем класс
            e.target.classList.add('active'); // Добавляем активный
            currentCategory = e.target.dataset.category; // Устанавливаем категорию
            currentPage = 1; // Сброс страницы
            renderProducts(); // Перерисовка
        }); // Конец обработчика
    }); // Конец перебора

    // Поиск
    const searchEl = document.getElementById('search'); // Поле поиска
    if (searchEl) { // Если элемент найден
        searchEl.addEventListener('input', (e) => { // Обработчик ввода
            searchQuery = e.target.value; // Запрос поиска
            currentPage = 1; // Сброс страницы
            renderProducts(); // Перерисовка
        }); // Конец обработчика
    } // Конец if

    // Сортировка
    const sortEl = document.getElementById('sort'); // Поле сортировки
    if (sortEl) { // Если элемент найден
        sortEl.addEventListener('change', (e) => { // Обработчик сортировки
            sortOrder = e.target.value; // Установка сортировки
            renderProducts(); // Перерисовка
        }); // Конец обработчика
    } // Конец if

    renderProducts(); // Первый рендер
}); // Конец DOMContentLoaded