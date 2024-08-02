// Функция контроллера модальных окон
const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {

    const buttonElems = document.querySelectorAll(btnOpen); 
    const modalElem = document.querySelector(modal); 
  
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
        target === modalElem ||
        (btnClose && target.closest(btnClose)) || 
        event.code === 'Escape' 
      ) {
        modalElem.style.opacity = 0; 
  
        setTimeout(() => {
          modalElem.style.visibility = 'hidden';
          scrollController.enableScroll(); // Включение прокрутки страницы
        }, time);
  
        window.removeEventListener('keydown', closeModal); 
      }
    }
  
    // Функция открытия модального окна
    const openModal = () => {
      modalElem.style.visibility = 'visible'; 
      modalElem.style.opacity = 1; 
      window.addEventListener('keydown', closeModal); 
      scrollController.disableScroll(); // Отключение прокрутки страницы
    };
  
    buttonElems.forEach(btn => {
      btn.addEventListener('click', openModal);
    });
  
    modalElem.addEventListener('click', closeModal);
  };
  
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


  // Функция контроллера прокрутки страницы
  const scrollController = {
    scrollPosition: 0,
  
    // Отключение прокрутки страницы и фиксация текущей позиции прокрутки
    disableScroll() {
      this.scrollPosition = window.scrollY;
      const paddingOffset = window.innerWidth - document.body.offsetWidth;
      document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${this.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${paddingOffset}px;
      `;
      document.documentElement.style.scrollBehavior = 'unset';
    },
  
    // Включение прокрутки страницы и возврат к сохранённой позиции
    enableScroll() {
      document.body.style.cssText = '';
      window.scrollTo({ top: this.scrollPosition });
      document.documentElement.style.scrollBehavior = '';
    },
  }