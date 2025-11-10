import React, { useEffect } from "react";
import Gallery from "./Gallery";
import "./App.css";
function App() {
  useEffect(() => {
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

      const updateDynamicFields = () => {
  const selectedServiceType = getSelectedServiceType();
  
  if (serviceOption) serviceOption.value = 'standard';
  if (serviceProperty) serviceProperty.checked = false;
  
  if (optionsGroup) optionsGroup.style.display = 'none';
  if (propertiesGroup) propertiesGroup.style.display = 'none';
  
  switch(selectedServiceType) {
    case 'basic':
      break;
    case 'premium':
      if (optionsGroup) optionsGroup.style.display = 'block';
      break;
    case 'custom':
      if (propertiesGroup) propertiesGroup.style.display = 'block';
      break;
  }
  
  updateServiceDescriptions();
};

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

      const updateServiceDescriptions = () => {
        const selectedServiceType = getSelectedServiceType();
        const descriptions = {
          basic: 'Базовая услуга включает минимальный набор функций без дополнительных опций',
          premium: 'Премиум услуга предоставляет расширенные возможности с выбором опций',
          custom: 'Кастомная услуга позволяет настроить дополнительные свойства под ваши нужды'
        };
        
        const descriptionElement = document.getElementById('service-description');
        if (descriptionElement) {
          descriptionElement.textContent = descriptions[selectedServiceType];
        }
      };

      const initServiceDescriptions = () => {
        const descriptionHtml = `
          <div class="service-description" id="service-description">
            Базовая услуга включает минимальный набор функций без дополнительных опций
          </div>
        `;
        const radioGroup = document.querySelector('.radio-group');
        if (radioGroup && !document.getElementById('service-description')) {
          radioGroup.insertAdjacentHTML('afterend', descriptionHtml);
        }
      };

      initServiceDescriptions();
      updateDynamicFields();
      calculateTotalCost();

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
      <header id="site-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/ru/a/a2/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%9A%D1%83%D0%B1%D0%93%D0%A3.png"
                alt="Логотип КубГУ"
                width="60"
                height="60"
              />
            </div>
            <h1 className="site-name">Кубанский государственный университет</h1>
          </div>
          <nav className="main-menu">
            <ul>
              <li><a href="#gallery">Галерея</a></li>
              <li><a href="#table-section">Таблица</a></li>
              <li><a href="#forma">Форма</a></li>
              <li><a href="#calculator">Калькулятор</a></li>
              <li><a href="#main">Главная</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container" id="main">
         <section id="gallery">
          <h2>Галерея изображений</h2>
          <Gallery />
        </section>
        <section id="hyperlinks">
          <h2>Маркированный список гиперссылок</h2>
          <ul>
            <li><a href="http://kubsu.ru/">КубГУ (http)</a></li>
            <li><a href="https://kubsu.ru/">КубГУ (https)</a></li>
            <li>
              <a href="https://kubsu.ru/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/ru/a/a2/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%9A%D1%83%D0%B1%D0%93%D0%A3.png"
                  alt="Логотип КубГУ"
                  width="100"
                  height="100"
                />
              </a>
            </li>
            <li><a href="#forma">На внутреннюю страницу (форма регистрации)</a></li>
            <li><a href="#main">На главную страницу</a></li>
            <li><a href="#forma">На фрагмент текущей страницы (форма регистрации)</a></li>
            <li><a href="https://www.google.com/search?q=КубГУ&num=1&hl=ru">С тремя параметрами</a></li>
            <li><a href="https://www.kubsu.ru/ru/user/74030">С параметром id (Создатель сайта)</a></li>
            <li><a href="otnos.html">Относительная ссылка</a></li>
            <li><a href="about/about.html">Относительная на страницу в каталоге about</a></li>
            <li><a href="../higher.html">Относительная на главную страницу уровнем выше</a></li>
            <li><a href="../../higher2.html">Относительная двумя уровнями выше</a></li>
          </ul>
          <p>
            Кубанский государственный университет является одним из ведущих вузов Юга России. Более подробную информацию можно найти на{" "}
            <a href="https://kubsu.ru/ru/university" target="_blank" rel="noopener noreferrer">
              официальной странице университета
            </a>.
          </p>
          <p>
            Также рекомендуем ознакомиться с{" "}
            <a href="https://kubsu.ru/ru/education" target="_blank" rel="noopener noreferrer">
              образовательными программами
            </a>{" "}
            и{" "}
            <a href="https://kubsu.ru/ru/abiturient" target="_blank" rel="noopener noreferrer">
              информацией для абитуриентов
            </a>.
          </p>
          <ul>
            <li><a href="https://github.com/Youminava">На фрагмент стороннего сайта</a></li>
            <li>
              ссылки из областей картинки (map):<br />
              <img
                src="/map.svg"
                alt="карта изображения"
                width="320"
                height="160"
                useMap="#m"
              />
              <map name="m">
                <area shape="rect" coords="20,20,140,80" href="https://kubsu.ru" alt="Переход на kubsu.ru" />
                <area shape="circle" coords="230,80,36" href="https://developer.mozilla.org/" alt="Переход на MDN" />
              </map>
            </li>
            <li><a href="">Пустая ссылка</a></li>
            <li>Ссылка без href</li>
            <li><a href="https://kubsu.ru/" rel="nofollow">КубГУ (запрещен переход поисковикам)</a></li>
          </ul>

          <h3>Нумерованный список ссылок</h3>
          <ol>
            <li><a href="http://kubsu.ru/" title="Официальный сайт КубГУ по протоколу HTTP">КубГУ (http)</a></li>
            <li><a href="https://kubsu.ru/" title="Официальный сайт КубГУ по защищенному протоколу HTTPS">КубГУ (https)</a></li>
            <li><a href="#forma" title="Переход к форме регистрации на этой странице">На внутреннюю страницу (форма регистрации)</a></li>
            <li><a href="#main" title="Вернуться к началу главной страницы">На главную страницу</a></li>
            <li><a href="#forma" title="Переход к форме регистрации в пределах текущей страницы">На фрагмент текущей страницы (форма регистрации)</a></li>
            <li><a href="https://www.google.com/search?q=КубГУ&num=1&hl=ru" title="Поиск информации о КубГУ в Google с ограничением результатов">С тремя параметрами</a></li>
            <li><a href="https://www.kubsu.ru/ru/user/74030" title="Профиль создателя сайта на платформе КубГУ">С параметром id (Создатель сайта)</a></li>
          </ol>
          <li>
            <a href="ftp://username:password@ftp.example.com/path/to/file.txt">
              Ссылка на файл на FTP сервере
            </a>
          </li>
        </section>

        <section id="table-section">
          <h2>Таблица с информацией</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Факультет</th>
                <th>Количество студентов</th>
                <th>Количество преподавателей</th>
                <th>Год основания</th>
                <th>Декан</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Математики и компьютерных наук</td><td>850</td><td>65</td><td>1970</td><td>Иванов А.А.</td></tr>
              <tr><td>Филологический</td><td>720</td><td>58</td><td>1965</td><td>Петрова И.С.</td></tr>
              <tr><td>Исторический</td><td>610</td><td>45</td><td>1972</td><td>Сидоров П.В.</td></tr>
              <tr><td>Экономический</td><td>1100</td><td>75</td><td>1980</td><td>Козлова М.И.</td></tr>
              <tr><td>Юридический</td><td>890</td><td>62</td><td>1978</td><td>Николаев С.П.</td></tr>
              <tr><td colSpan="2">Общее количество студентов</td><td colSpan="3">4170</td></tr>
            </tbody>
          </table>
        </section>

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
                      <div className="radio-title">Базовая услуга</div>
                      <div className="radio-price">1000 руб./шт</div>
                    </div>
                  </label>
                  <label className="radio-card">
                    <input type="radio" name="service-type" value="premium" />
                    <div className="radio-content">
                      <div className="radio-title">Премиум услуга</div>
                      <div className="radio-price">2000 руб./шт</div>
                    </div>
                  </label>
                  <label className="radio-card">
                    <input type="radio" name="service-type" value="custom" />
                    <div className="radio-content">
                      <div className="radio-title">Кастомная услуга</div>
                      <div className="radio-price">1500 руб./шт</div>
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

        <section id="forma">
          <h2>Форма регистрации</h2>
          <form>
            <label>
              Введите ваше ФИО:<br />
              <input name="field-name-1" placeholder="Фамилия Имя Отчество" />
            </label><br />
            <label>
              Ваш номер телефона:<br />
              <input name="field-phone" placeholder="+7(___)___ " />
            </label><br />
            <label>
              Ваш email:<br />
              <input name="field-email" type="email" placeholder="example@gmail.com" />
            </label><br />
            <label>
              Ваша дата рождения:<br />
              <input name="field-date" defaultValue="2000-01-01" type="date" />
            </label><br />
            Ваш пол:<br />
            <label>
              <input type="radio" name="radio-group-1" value="Мужской" defaultChecked /> Мужской
            </label>
            <label>
              <input type="radio" name="radio-group-1" value="Женский" /> Женский
            </label><br />
            <label>
              Ваш любимый язык программирования:<br />
              <select name="field-name-4[]" multiple>
                <option value="Pascal">Pascal</option>
                <option value="C" selected>C</option>
                <option value="C++" selected>C++</option>
                <option value="C#" selected>C#</option>
                <option value="JavaScript" selected>JavaScript</option>
                <option value="PHP" selected>PHP</option>
                <option value="Python" selected>Python</option>
                <option value="Java" selected>Java</option>
                <option value="Haskel" selected>Haskel</option>
                <option value="Prolog" selected>Prolog</option>
                <option value="Scala" selected>Scala</option>
                <option value="Go" selected>Go</option>
                <option value="Rust" selected>Rust</option>
              </select>
            </label><br />
            <label>
              Ваша биография:<br />
              <textarea name="field-name-2"></textarea>
            </label><br />
            Контракт:<br />
            <label>
              <input type="checkbox" name="check-1" defaultChecked /> С контрактом ознакомлен(a)
            </label><br />
            <input type="submit" value="Сохранить" />
          </form>
        </section>
      </main>

      <footer id="site-footer">
        <div className="container">
          <p>© Ущаповский Кирилл</p>
        </div>
      </footer>
    </div>
  );
}

export default App;