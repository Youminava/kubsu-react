// calculator.js - внешний файл с JavaScript кодом калькулятора

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация калькулятора после загрузки DOM
    initCalculator();
});

function initCalculator() {
    // Получаем элементы DOM
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalCostElement = document.getElementById('total-cost');
    const quantityError = document.getElementById('quantity-error');
    
    // Если элементы не найдены, выходим
    if (!productSelect || !quantityInput || !calculateBtn || !totalCostElement) {
        console.log('Элементы калькулятора не найдены');
        return;
    }
    
    // Регулярное выражение для проверки ввода (только цифры)
    const numbersRegex = /^\d+$/;
    
    // Обработчик события для кнопки расчета
    calculateBtn.addEventListener('click', calculateTotalCost);
    
    // Обработчик события для поля ввода количества (валидация в реальном времени)
    quantityInput.addEventListener('input', validateQuantityInput);
    
    function validateQuantityInput() {
        const quantityValue = quantityInput.value.trim();
        
        // Скрываем сообщение об ошибке при пустом поле
        if (quantityValue === '') {
            quantityError.classList.remove('show');
            quantityInput.style.borderColor = '#2f66b3';
            return;
        }
        
        // Проверяем ввод с помощью регулярного выражения
        if (!numbersRegex.test(quantityValue)) {
            quantityError.textContent = 'Пожалуйста, введите только цифры';
            quantityError.classList.add('show');
            quantityInput.style.borderColor = '#d32f2f';
        } else {
            quantityError.classList.remove('show');
            quantityInput.style.borderColor = '#2f66b3';
        }
    }
    
    function calculateTotalCost() {
        const selectedProduct = productSelect.value;
        const quantityValue = quantityInput.value.trim();
        
        // Проверяем, выбран ли товар
        if (selectedProduct === '') {
            alert('Пожалуйста, выберите товар');
            return;
        }
        
        // Проверяем, введено ли количество
        if (quantityValue === '') {
            alert('Пожалуйста, введите количество товара');
            quantityInput.focus();
            return;
        }
        
        // Проверяем корректность ввода количества
        if (!numbersRegex.test(quantityValue)) {
            alert('Пожалуйста, введите корректное количество (только цифры)');
            quantityInput.focus();
            return;
        }
        
        // Преобразуем в число и проверяем, что количество больше 0
        const quantity = parseInt(quantityValue, 10);
        if (quantity <= 0) {
            alert('Количество товара должно быть больше 0');
            quantityInput.focus();
            return;
        }
        
        // Получаем цену товара
        const price = parseInt(selectedProduct, 10);
        
        // Вычисляем общую стоимость
        const totalCost = price * quantity;
        
        // Отображаем результат
        totalCostElement.textContent = `${totalCost.toLocaleString('ru-RU')} руб.`;
        
        // Добавляем анимацию для визуального эффекта
        totalCostElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            totalCostElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Дополнительная функциональность: расчет при изменении значений
    productSelect.addEventListener('change', function() {
        if (quantityInput.value.trim() !== '') {
            calculateTotalCost();
        }
    });
    
    quantityInput.addEventListener('change', function() {
        if (productSelect.value !== '' && quantityInput.value.trim() !== '') {
            calculateTotalCost();
        }
    });
    
    console.log('Калькулятор стоимости заказа инициализирован');
}