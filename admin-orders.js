// Загрузка данных при старте
document.addEventListener('DOMContentLoaded', function() { // Инициализация
    loadOrders(); // Загружаем заказы
    
    // Обработчик изменения статуса заказа
    document.addEventListener('change', function(e) { // Слушаем изменения
        if (e.target.classList.contains('order-status-select')) { // Проверяем селект
            const orderId = parseInt(e.target.dataset.orderId); // ID заказа
            const newStatus = e.target.value; // Новый статус
            updateOrderStatus(orderId, newStatus); // Обновляем статус
        }
    }); // Конец обработчика change
}); // Конец DOMContentLoaded

// Загрузка и отображение заказов
function loadOrders() { // Загружаем заказы
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]'); // История заказов
    const container = document.getElementById('ordersContainer'); // Контейнер вывода
    
    console.log('Загружено заказов:', orderHistory.length, orderHistory); // Отладка
    
    if (orderHistory.length === 0) { // Если заказов нет
        container.innerHTML = '<p class="empty-message">Заказы отсутствуют</p>'; // Пустое сообщение
        return; // Выходим
    }
    
    // Сортировка по дате (новые сначала)
    orderHistory.sort((a, b) => b.id - a.id); // Сортируем по ID
    
    let html = '<div class="orders-admin-list">'; // Начало списка
    
    orderHistory.forEach(order => { // Перебор заказов
        const totalSum = order.total || order.items.reduce((sum, item) => sum + item.price * item.quantity, 0); // Сумма
        const statusClass = getStatusClass(order.status || 'Новый'); // Класс статуса
        
        // Проверка наличия данных клиента
        const hasCustomer = order.customer && order.customer.fullName; // Флаг клиента
        
        html += `
            <div class="order-admin-card">
                <div class="order-admin-header">
                    <h3>Заказ #${order.id}</h3>
                    <div class="order-admin-status">
                        <select class="order-status-select ${statusClass}" data-order-id="${order.id}">
                            <option value="Новый" ${(order.status === 'Новый' || !order.status) ? 'selected' : ''}>🆕 Новый</option>
                            <option value="В обработке" ${order.status === 'В обработке' ? 'selected' : ''}>⏳ В обработке</option>
                            <option value="Подтверждён" ${order.status === 'Подтверждён' ? 'selected' : ''}>✅ Подтверждён</option>
                            <option value="Отправлен" ${order.status === 'Отправлен' ? 'selected' : ''}>🚚 Отправлен</option>
                            <option value="Доставлен" ${order.status === 'Доставлен' ? 'selected' : ''}>📦 Доставлен</option>
                            <option value="Отменён" ${order.status === 'Отменён' ? 'selected' : ''}>❌ Отменён</option>
                        </select>
                    </div>
                </div>
                
                <div class="order-admin-info">
                    <p><strong>Дата:</strong> ${order.date}</p>
                    <p><strong>Сумма:</strong> ${totalSum.toLocaleString()} ₽</p>
                </div>
                
                ${hasCustomer ? `
                <div class="order-customer-info">
                    <h4>Данные покупателя</h4>
                    <p><strong>ФИО:</strong> ${order.customer.fullName}</p>
                    <p><strong>Телефон:</strong> ${order.customer.phone}</p>
                    <p><strong>Email:</strong> ${order.customer.email}</p>
                    <p><strong>Адрес:</strong> ${order.customer.address.city}, ${order.customer.address.street}, дом ${order.customer.address.house}${order.customer.address.apartment ? ', кв. ' + order.customer.address.apartment : ''}</p>
                    ${order.customer.address.postalCode ? `<p><strong>Индекс:</strong> ${order.customer.address.postalCode}</p>` : ''}
                    ${order.customer.comment ? `<p><strong>Комментарий:</strong> ${order.customer.comment}</p>` : ''}
                    <p><strong>Способ оплаты:</strong> ${order.customer.paymentMethod}</p>
                </div>
                ` : ''}
                
                <div class="order-items">
                    <h4>Товары:</h4>
                    <table class="order-items-table">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Кол-во</th>
                                <th>Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td>${item.image || '📦'} ${item.name}</td>
                                    <td>${item.price.toLocaleString()} ₽</td>
                                    <td>${item.quantity}</td>
                                    <td>${(item.price * item.quantity).toLocaleString()} ₽</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3"><strong>Итого:</strong></td>
                                <td><strong>${totalSum.toLocaleString()} ₽</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        `; // Карточка заказа
    }); // Конец перебора заказов
    
    html += '</div>'; // Закрываем список
    container.innerHTML = html; // Вставляем HTML
} // Конец loadOrders

// Получение CSS-класса для статуса
function getStatusClass(status) { // Класс для статуса
    const statusMap = { // Карта классов
        'Новый': 'status-new', // Новый
        'В обработке': 'status-processing', // В обработке
        'Подтверждён': 'status-confirmed', // Подтверждён
        'Отправлен': 'status-shipped', // Отправлен
        'Доставлен': 'status-delivered', // Доставлен
        'Отменён': 'status-cancelled' // Отменён
    }; // Конец карты
    return statusMap[status] || ''; // Возвращаем класс
} // Конец getStatusClass

// Обновление статуса заказа
function updateOrderStatus(orderId, newStatus) { // Обновляем статус
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]'); // История заказов
    const orderIndex = orderHistory.findIndex(o => o.id === orderId); // Индекс заказа
    
    if (orderIndex === -1) return; // Если не найден
    
    const oldStatus = orderHistory[orderIndex].status; // Старый статус
    orderHistory[orderIndex].status = newStatus; // Обновляем статус
    
    // Если статус изменён на "Подтверждён" или "Доставлен" - товары считаются купленными
    if ((newStatus === 'Подтверждён' || newStatus === 'Доставлен') && oldStatus !== 'Подтверждён' && oldStatus !== 'Доставлен') { // Проверка
        updateProductsPurchased(orderHistory[orderIndex].items); // Обновляем purchased
    }
    
    // Если статус изменён с "Подтверждён" на другой - откатить purchased
    if ((oldStatus === 'Подтверждён' || oldStatus === 'Доставлен') && newStatus !== 'Подтверждён' && newStatus !== 'Доставлен') { // Проверка
        rollbackProductsPurchased(orderHistory[orderIndex].items); // Откат
    }
    
    // Если заказ отменён - вернуть товары на склад
    if (newStatus === 'Отменён' && oldStatus !== 'Отменён') { // Проверка отмены
        returnProductsToStock(orderHistory[orderIndex].items); // Возврат на склад
        removeFromOrdered(orderHistory[orderIndex].items); // Удаление ordered
    }
    
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory)); // Сохраняем
    
    // Показать уведомление
    showNotification(`Статус заказа #${orderId} изменён: ${oldStatus} → ${newStatus}`); // Уведомление
    
    // Обновить отображение
    loadOrders(); // Перерисовка
} // Конец updateOrderStatus

// Обновление статистики purchased (товары подтверждены/куплены)
function updateProductsPurchased(items) { // Добавляем purchased
    const stats = JSON.parse(localStorage.getItem('productStats') || '{}'); // Статистика
    
    items.forEach(item => { // Перебор товаров
        if (!stats[item.id]) { // Если записи нет
            stats[item.id] = { ordered: 0, purchased: 0, inCart: 0, inFavorites: 0 }; // Инициализация
        }
        stats[item.id].purchased += item.quantity; // Увеличиваем purchased
    }); // Конец перебора
    
    localStorage.setItem('productStats', JSON.stringify(stats)); // Сохраняем
} // Конец updateProductsPurchased

// Откат статистики purchased
function rollbackProductsPurchased(items) { // Откат purchased
    const stats = JSON.parse(localStorage.getItem('productStats') || '{}'); // Статистика
    
    items.forEach(item => { // Перебор товаров
        if (stats[item.id]) { // Если запись есть
            stats[item.id].purchased = Math.max(0, stats[item.id].purchased - item.quantity); // Уменьшаем
        }
    }); // Конец перебора
    
    localStorage.setItem('productStats', JSON.stringify(stats)); // Сохраняем
} // Конец rollbackProductsPurchased

// Возврат товаров на склад при отмене заказа
function returnProductsToStock(items) { // Возврат на склад
    const currentProducts = JSON.parse(localStorage.getItem('products') || JSON.stringify(products)); // Текущие товары
    
    items.forEach(item => { // Перебор товаров
        const productIndex = currentProducts.findIndex(p => p.id === item.id); // Индекс товара
        if (productIndex !== -1) { // Если найден
            currentProducts[productIndex].stock = (currentProducts[productIndex].stock || 0) + item.quantity; // Возврат
        }
    }); // Конец перебора
    
    localStorage.setItem('products', JSON.stringify(currentProducts)); // Сохраняем
} // Конец returnProductsToStock

// Удаление из статистики ordered при отмене
function removeFromOrdered(items) { // Удаляем ordered
    const stats = JSON.parse(localStorage.getItem('productStats') || '{}'); // Статистика
    
    items.forEach(item => { // Перебор товаров
        if (stats[item.id]) { // Если запись есть
            stats[item.id].ordered = Math.max(0, stats[item.id].ordered - item.quantity); // Уменьшаем
        }
    }); // Конец перебора
    
    localStorage.setItem('productStats', JSON.stringify(stats)); // Сохраняем
} // Конец removeFromOrdered

// Показать уведомление
function showNotification(message) { // Уведомление
    const notification = document.createElement('div'); // Создаем элемент
    notification.className = 'notification'; // Класс
    notification.textContent = message; // Текст
    document.body.appendChild(notification); // Вставляем
    
    setTimeout(() => { // Показываем
        notification.classList.add('show'); // Добавляем класс
    }, 10); // Задержка
    
    setTimeout(() => { // Скрываем
        notification.classList.remove('show'); // Убираем класс
        setTimeout(() => { // Удаляем позже
            document.body.removeChild(notification); // Удаляем
        }, 300); // Задержка
    }, 3000); // Время показа
} // Конец showNotification