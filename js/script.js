// Функция контроллера модальных окон
const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
    const buttonElems = document.querySelectorAll(btnOpen); // Кнопки для открытия модального окна
    const modalElem = document.querySelector(modal); // Модальное окно
  
    modalElem.style.cssText = `
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: opacity ${time}ms ease-in-out;
    `;
  
    // Функция закрытия модального окна
    const closeModal = event => {
      const target = event.target;
  
      if (
        target === modalElem || // Клик по самому модальному окну
        (btnClose && target.closest(btnClose)) || // Клик по кнопке закрытия
        event.code === 'Escape' // Нажатие клавиши "Escape"
      ) {
        modalElem.style.opacity = 0; // Установка прозрачности для плавного закрытия
  
        setTimeout(() => {
          modalElem.style.visibility = 'hidden'; // Скрытие окна после завершения анимации
          scrollController.enableScroll(); // Включение прокрутки страницы
        }, time);
  
        window.removeEventListener('keydown', closeModal); // Удаление обработчика события нажатия клавиши
      }
    }
  
    // Функция открытия модального окна
    const openModal = () => {
      modalElem.style.visibility = 'visible'; // Видимость окна
      modalElem.style.opacity = 1; // Непрозрачность для плавного открытия
      window.addEventListener('keydown', closeModal); // Добавление обработчика события нажатия клавиши для закрытия
      scrollController.disableScroll(); // Отключение прокрутки страницы
    };
  
    // Добавление обработчиков событий для кнопок открытия модального окна
    buttonElems.forEach(btn => {
      btn.addEventListener('click', openModal);
    });
  
    // Добавление обработчика события для закрытия модального окна при клике по нему
    modalElem.addEventListener('click', closeModal);
  };
  
  // Инициализация контроллера для всех модальных окон на странице
  modalController({
    modal: '.modal1',
    btnOpen: '.section__button1',
    btnClose: '.modal__close',
  });
  
  modalController({
    modal: '.modal2',
    btnOpen: '.section__button2',
    btnClose: '.modal__close',
  });