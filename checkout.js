// Страница оформления заказа
function renderOrderSummary() { // Рендер сводки
    const cart = getCart(); // Корзина
    const summaryDiv = document.getElementById('orderSummary'); // Контейнер сводки
    
    if (cart.length === 0) { // Если корзина пуста
        window.location.href = 'cart.html'; // Переход в корзину
        return; // Выходим
    }

    summaryDiv.innerHTML = cart.map(item => { // Формируем элементы
        const product = products.find(p => p.id === item.id); // Ищем товар
        return `
            <div class="summary-item">
                <div class="summary-item-info">
                    <span class="summary-item-emoji">${product.image}</span>
                    <div>
                        <div class="summary-item-name">${product.name}</div>
                        <div class="summary-item-quantity">${item.quantity} шт. × ${product.price.toLocaleString('ru-RU')} ₽</div>
                    </div>
                </div>
                <div class="summary-item-price">${(product.price * item.quantity).toLocaleString('ru-RU')} ₽</div>
            </div>
        `; // Шаблон элемента
    }).join(''); // Склеиваем HTML

    // Подсчет суммы
    const subtotal = cart.reduce((sum, item) => { // Сумма
        const product = products.find(p => p.id === item.id); // Ищем товар
        return sum + (product.price * item.quantity); // Добавляем
    }, 0); // Начальное значение

    document.getElementById('summarySubtotal').textContent = subtotal.toLocaleString('ru-RU') + ' ₽'; // Подитог
    document.getElementById('summaryTotal').textContent = subtotal.toLocaleString('ru-RU') + ' ₽'; // Итог
} // Конец renderOrderSummary

// Маска для телефона
function formatPhoneNumber(input) { // Формат телефона
    let value = input.value.replace(/\D/g, ''); // Оставляем цифры
    
    if (value.length > 0) { // Если есть ввод
        if (value[0] === '8') value = '7' + value.slice(1); // Замена 8 на 7
        if (value[0] !== '7') value = '7' + value; // Добавляем 7
    }
    
    let formatted = '+7'; // Префикс
    if (value.length > 1) { // Код
        formatted += ' (' + value.slice(1, 4); // Скобки
    }
    if (value.length >= 5) { // Первая часть
        formatted += ') ' + value.slice(4, 7); // Добавляем
    }
    if (value.length >= 8) { // Вторая часть
        formatted += '-' + value.slice(7, 9); // Добавляем
    }
    if (value.length >= 10) { // Третья часть
        formatted += '-' + value.slice(9, 11); // Добавляем
    }
    
    input.value = formatted; // Присваиваем
} // Конец formatPhoneNumber

// Обработка формы
function handleCheckout(e) { // Отправка формы
    e.preventDefault(); // Отмена отправки
    
    const formData = new FormData(e.target); // Данные формы
    const cart = getCart(); // Корзина
    
    // Проверка наличия товаров на складе
    const currentProducts = safeJsonParse(localStorage.getItem('products'), products); // Товары
    const insufficientStock = []; // Недостаток
    
    for (const item of cart) { // Перебор корзины
        const product = currentProducts.find(p => p.id === item.id); // Товар
        if (!product) continue; // Пропуск
        
        const availableStock = product.stock || 0; // Остаток
        if (availableStock < item.quantity) { // Если мало
            insufficientStock.push({
                name: product.name,
                requested: item.quantity,
                available: availableStock
            }); // Добавляем в список
        }
    }
    
    if (insufficientStock.length > 0) { // Если есть дефицит
        let message = 'Недостаточно товаров на складе:\n\n'; // Сообщение
        insufficientStock.forEach(item => { // Перебор
            message += `${item.name}: запрошено ${item.requested}, доступно ${item.available}\n`; // Строка
        }); // Конец перебора
        alert(message); // Показываем
        return; // Выходим
    }
    
    // Создание заказа
    const order = { // Объект заказа
        id: Date.now(), // ID
        date: new Date().toLocaleString('ru-RU'), // Дата
        status: 'Новый', // Статус
        customer: { // Покупатель
            fullName: formData.get('fullName'), // ФИО
            phone: formData.get('phone'), // Телефон
            email: formData.get('email'), // Email
            address: { // Адрес
                city: formData.get('city'), // Город
                street: formData.get('street'), // Улица
                house: formData.get('house'), // Дом
                apartment: formData.get('apartment'), // Квартира
                postalCode: formData.get('postalCode') // Индекс
            }, // Конец адреса
            paymentMethod: formData.get('paymentMethod'), // Способ оплаты
            comment: formData.get('comment') // Комментарий
        }, // Конец покупателя
        items: cart.map(item => { // Товары
            const product = products.find(p => p.id === item.id); // Товар
            return {
                id: item.id, // ID
                name: product.name, // Название
                price: product.price, // Цена
                image: product.image, // Иконка
                quantity: item.quantity // Количество
            };
        }), // Конец items
        total: cart.reduce((sum, item) => { // Итог
            const product = products.find(p => p.id === item.id); // Товар
            return sum + (product.price * item.quantity); // Сумма
        }, 0) // Начальное значение
    }; // Конец заказа
    
    // Резервирование товаров на складе (уменьшение количества)
    cart.forEach(item => { // Перебор корзины
        const productIndex = currentProducts.findIndex(p => p.id === item.id); // Индекс товара
        if (productIndex !== -1) { // Если найден
            currentProducts[productIndex].stock = (currentProducts[productIndex].stock || 0) - item.quantity; // Уменьшаем
        }
    }); // Конец перебора
    localStorage.setItem('products', JSON.stringify(currentProducts)); // Сохраняем товары
    
    // Сохранение заказа
    const orders = getOrderHistory(); // История заказов
    orders.push(order); // Добавляем заказ
    
    // Обновление статистики
    const stats = getProductStats(); // Статистика
    cart.forEach(item => { // Перебор корзины
        stats[item.id].ordered += item.quantity; // Увеличиваем ordered
        // purchased НЕ увеличиваем - это делает админ при подтверждении
        stats[item.id].inCart = 0; // Сбрасываем inCart
    }); // Конец перебора
    
    saveOrderHistory(orders); // Сохраняем историю
    saveProductStats(stats); // Сохраняем статистику
    
    // Очистка корзины
    saveCart([]); // Очищаем корзину
    updateBadges(); // Обновляем счетчики
    
    // Показ сообщения об успехе
    alert(`Спасибо за заказ, ${order.customer.fullName}!\n\nЗаказ №${order.id}\nСумма: ${order.total.toLocaleString('ru-RU')} ₽\n\nМы свяжемся с вами по телефону ${order.customer.phone} для подтверждения.`); // Уведомление
    
    // Переход в личный кабинет
    window.location.href = 'profile.html'; // Переход
} // Конец handleCheckout

// Инициализация
document.addEventListener('DOMContentLoaded', () => { // Инициализация
    renderOrderSummary(); // Рендер сводки
    
    // Маска телефона
    const phoneInput = document.getElementById('phone'); // Поле телефона
    phoneInput.addEventListener('input', () => formatPhoneNumber(phoneInput)); // Маска
    
    // Обработка формы
    const form = document.getElementById('checkoutForm'); // Форма
    form.addEventListener('submit', handleCheckout); // Обработчик submit
    
    // Валидация индекса (только цифры)
    const postalCodeInput = document.getElementById('postalCode'); // Поле индекса
    postalCodeInput.addEventListener('input', (e) => { // Обработчик ввода
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6); // Только цифры
    }); // Конец обработчика
}); // Конец DOMContentLoaded