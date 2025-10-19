import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // ... существующий код калькулятора без изменений ...
    const initCalculator = () => {
      const serviceTypeRadios = document.querySelectorAll('input[name="service-type"]');
      const quantityInput = document.getElementById('quantity');
      const optionsGroup = document.getElementById('options-group');
      const serviceOption = document.getElementById('service-option');
      const propertiesGroup = document.getElementById('properties-group');
      const serviceProperty = document.getElementById('service-property');
      const totalCostElement = document.getElementById('total-cost');
      const quantityError = document.getElementById('quantity-error');

      if (!serviceTypeRadios.length || !quantityInput || !totalCostElement) {
        console.log('Элементы калькулятора не найдены');
        return;
      }

      const basePrices = {
        basic: 1000,
        premium: 2000,
        custom: 1500
      };

      const optionModifiers = {
        standard: 0,
        advanced: 500,
        professional: 1000
      };

      const propertyModifier = 300;

// calculator.js - исправленная функция updateDynamicFields

function updateDynamicFields() {
    const selectedServiceType = getSelectedServiceType();
    
    // Сбрасываем значения
    if (serviceOption) serviceOption.value = 'standard';
    if (serviceProperty) serviceProperty.checked = false;
    
    // Сначала скрываем все динамические поля
    if (optionsGroup) optionsGroup.style.display = 'none';
    if (propertiesGroup) propertiesGroup.style.display = 'none';
    
    // Показываем/скрываем поля в зависимости от типа услуги
    switch(selectedServiceType) {
        case 'basic':
            // Базовый тип - нет дополнительных опций и свойств
            // Оба поля уже скрыты
            break;
        case 'premium':
            // Премиум тип - только опции (селект)
            if (optionsGroup) optionsGroup.style.display = 'block';
            break;
        case 'custom':
            // Кастомный тип - только свойство (чекбокс)
            if (propertiesGroup) propertiesGroup.style.display = 'block';
            break;
    }
}

      const getSelectedServiceType = () => {
        const selectedRadio = Array.from(serviceTypeRadios).find(radio => radio.checked);
        return selectedRadio ? selectedRadio.value : 'basic';
      };

      const validateQuantityInput = () => {
        const quantityValue = quantityInput.value.trim();
        
        if (quantityValue === '') {
          if (quantityError) {
            quantityError.classList.remove('show');
          }
          quantityInput.style.borderColor = '#2f66b3';
          return;
        }
        
        const quantity = parseInt(quantityValue, 10);
        if (isNaN(quantity) || quantity <= 0 || quantity > 1000) {
          if (quantityError) {
            quantityError.textContent = 'Введите число от 1 до 1000';
            quantityError.classList.add('show');
          }
          quantityInput.style.borderColor = '#d32f2f';
        } else {
          if (quantityError) {
            quantityError.classList.remove('show');
          }
          quantityInput.style.borderColor = '#2f66b3';
        }
      };

      const calculateTotalCost = () => {
        const selectedServiceType = getSelectedServiceType();
        const quantityValue = quantityInput.value.trim();
        
        if (quantityValue === '' || isNaN(parseInt(quantityValue, 10)) || parseInt(quantityValue, 10) <= 0) {
          totalCostElement.textContent = '0 руб.';
          return;
        }
        
        const quantity = parseInt(quantityValue, 10);
        let totalCost = basePrices[selectedServiceType] * quantity;
        
        if (selectedServiceType === 'premium' && serviceOption) {
          const optionValue = serviceOption.value;
          totalCost += optionModifiers[optionValue] * quantity;
        }
        
        if (selectedServiceType === 'custom' && serviceProperty && serviceProperty.checked) {
          totalCost += propertyModifier * quantity;
        }
        
        totalCostElement.textContent = `${totalCost.toLocaleString('ru-RU')} руб.`;
        totalCostElement.classList.add('pulse');
        setTimeout(() => {
          totalCostElement.classList.remove('pulse');
        }, 300);
      };

      // Инициализация
      updateDynamicFields();
      calculateTotalCost();

      // Обработчики событий
      serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          updateDynamicFields();
          calculateTotalCost();
        });
      });

      quantityInput.addEventListener('input', function() {
        validateQuantityInput();
        calculateTotalCost();
      });

      if (serviceOption) {
        serviceOption.addEventListener('change', calculateTotalCost);
      }

      if (serviceProperty) {
        serviceProperty.addEventListener('change', calculateTotalCost);
      }

      console.log('Калькулятор стоимости услуги инициализирован');
    };

    const timer = setTimeout(initCalculator, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {/* ... существующий код header, main, других секций ... */}
      
      {/* ОБНОВЛЕННАЯ СЕКЦИЯ КАЛЬКУЛЯТОРА */}
      <section id="calculator">
        <h2>Калькулятор стоимости услуги</h2>
        <div id="calculator-container">
          <form id="service-form" className="calculator-form">
            <div className="form-group">
              <label className="form-label">Тип услуги:</label>
              <div className="radio-group-cards">
                <label className="radio-card">
                  <input type="radio" name="service-type" value="basic" defaultChecked />
                  <div className="radio-content">
                    <div className="radio-text">
                      <div className="radio-title">Базовая услуга</div>
                      <div className="radio-price">1000 руб./шт</div>
                    </div>
                    <div className="radio-check">
                      <div className="check-icon"></div>
                    </div>
                  </div>
                </label>
                <label className="radio-card">
                  <input type="radio" name="service-type" value="premium" />
                  <div className="radio-content">
                    <div className="radio-text">
                      <div className="radio-title">Премиум услуга</div>
                      <div className="radio-price">2000 руб./шт</div>
                    </div>
                    <div className="radio-check">
                      <div className="check-icon"></div>
                    </div>
                  </div>
                </label>
                <label className="radio-card">
                  <input type="radio" name="service-type" value="custom" />
                  <div className="radio-content">
                    <div className="radio-text">
                      <div className="radio-title">Кастомная услуга</div>
                      <div className="radio-price">1500 руб./шт</div>
                    </div>
                    <div className="radio-check">
                      <div className="check-icon"></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Количество:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                max="1000"
                defaultValue="1"
                className="form-input"
                required
              />
              <div id="quantity-error" className="error-message"></div>
            </div>
            
            <div className="form-group dynamic-field" id="options-group" style={{display: 'none'}}>
              <label htmlFor="service-option" className="form-label">Опция услуги:</label>
              <select id="service-option" name="service-option" className="form-select">
                <option value="standard">Стандартная опция (+0 руб.)</option>
                <option value="advanced">Продвинутая опция (+500 руб.)</option>
                <option value="professional">Профессиональная опция (+1000 руб.)</option>
              </select>
            </div>
            
            <div className="form-group dynamic-field" id="properties-group" style={{display: 'none'}}>
              <label className="checkbox-card">
                <input type="checkbox" id="service-property" name="service-property" />
                <span className="checkbox-custom"></span>
                <div className="checkbox-content">
                  <div className="checkbox-title">Дополнительное свойство</div>
                  <div className="checkbox-price">+300 руб. к заказу</div>
                </div>
              </label>
            </div>
            
            <div className="form-group total-group">
              <label className="form-label">Общая стоимость:</label>
              <div id="total-cost" className="total-cost-display">0 руб.</div>
            </div>
          </form>
        </div>
      </section>

      {/* ... остальной существующий код ... */}
    </div>
  );
}

export default App;