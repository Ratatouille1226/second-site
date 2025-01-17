window.addEventListener('DOMContentLoaded', () => {
    //ТАБЫ
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    //Скрываем содержимое табов и показываем только 1 элемент
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
    //Удаляем класс активности чтобы потом сделать его адаптивным
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    hideTabContent();

    //Показываем первый элемент табов и добавляем класс кнопке активности
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };
    showTabContent();

    //Приводим функционал к работе, по клику на кнопки меняется содержимое таба
    tabsParent.addEventListener('click', (event) => {
    //Чтобы постоянно не прописывать "event.target"
        const target = event.target;
    //Проверяем что мы точно попали по кнопке
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
    const deadline = '2024-07-12';

    //Высчитываем время
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
    //Если акция закончилась выставляем везде нули чтобы таймер не считал в минус
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
              
    //Возвращаем объект
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    };

    //Устанавливаем время
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
    //Запускаем функию обновления времени потому что изначальное обновление идёт через секунду и пользователю видно захардкоженое время
    updateClock();
    //Обновление часов
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    //Останавливаем таймер если все значения равны нулю
            if (t.total <= 0) {
              clearInterval(timeInterval);
            }
        };
    //Ставим 0 перед числом если оно меньше 10
        function getZero(num){
            if (num >= 0 && num < 10) { 
                return '0' + num;
            } else {
                return num;
            }
        };

    };

    setClock('.timer', deadline);


    //МОДАЛЬНЫЕ ОКНА
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    //Переносим открытие модального окна в функцию чтобы не дублировать код     
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide'); 
        document.body.style.overflow = 'hidden'; 
    //Отменяем автоматическое открытие модального окна если пользователь уже его открывал
        clearInterval(modalTimerId);
    };

    //Показываем модальное окно по клику на кнопку и запрещаем пользователю скроллить сайт
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    //Переносим закрытие модального окна в функцию чтобы не дублировать код
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show'); 
        document.body.style.overflow = ''; 
    };

    //Cкрываем модальное окно по клику на кнопку
    modalCloseBtn.addEventListener('click', closeModal);

    //Скрываем модальное окно если пользователь нажал не на крестик а на экран вокруг окна
    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    //Cкрываем модальное окно по нажатию клавиши escape
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //Функция автоматического открытия модального окна через определенное время
    // const modalTimerId = setTimeout(openModal, 5000);

    //Открываем модальное окно если пользователь долистал до конца сайта
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };
    
    window.addEventListener('scroll', showModalByScroll);
    

    //ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ КАРТОЧЕК МЕНЮ
    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentSelector) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 89;
    //         this.changeToRub();
    //     }
    // //Конвертация цены в рубли
    //     changeToRub() {
    //         return this.price * this.transfer;
    //     }
    // //Динамически создаем карточки
    //     render(){
    //         const element = document.createElement('div');
    //         element.innerHTML = `
    //             <div class="menu__item">
    //                 <img src=${this.src} alt=${this.alt}>
    //                 <h3 class="menu__item-subtitle">${this.title}</h3>
    //                 <div class="menu__item-descr">${this.descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    //                 </div>
    //             </div>
    //         `;
    // //Помещаем элемент на страницу
    //         this.parent.append(element);
    //     };
    // }
    // //Заполнение карточки
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     229,
    //     '.menu.container'
    // ).render();


    //ОТПРАВКА ДАННЫХ НА СЕРВЕР
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


    //СЛАЙДЕР
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    //Текущее положение слайдера
    let slideIndex = 1;

    //Правильное отображение счётчика слайдов
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    
    showSlide(slideIndex);
    //Отображение слайдов
    function showSlide(n) {
    //Условия на показ слайдов если счётчик выше или меньше допустимых значений
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }
    //Скрываем все элементы и показываем один
        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

    //Правильное отображение счётчика слайдов
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slides.length;
        }
    };

    //Смена значений слайдера
    function plusSlides(n) {
        showSlide(slideIndex += n);
    }
    //Листаем слайд назад
    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
     //Листаем слайд вперёд
     next.addEventListener('click', () => {
        plusSlides(1);
   
    });



    //КАЛЬКУЛЯТОР
    const result = document.querySelector('.calculating__result span');
    //Сразу записал значение пола и рэтио чтобы изначально уже были привязаны какие-то значения для счёта (если у пользователя совпадают разделы и он не догадается нажать на них повторно)
    let sex = "female", 
        height, weight, age, 
        ratio = 1.375;

    function calcTotal() {
    //Проверяем на заполненность ячеек
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
    //Рачитываем норму калорий для женщин
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
    //Проверяем куда нажал пользователь раздел с полом или активностью и помещаем в переменную
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }
    //Удаляем класс активности и добавляем его по клику на определнный раздел
                elements.forEach(elem => elem.classList.remove(activeClass));
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    };
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
    //Проверяем ввёл ли пользователь буквы в инпут
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }
    //Проверяем в какую ячейку пользователь вводит данные и записываем их в переменную
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                        break;
                case 'weight':
                    weight = +input.value;
                        break;
                case 'age':
                    age = +input.value;
                        break
            };
            calcTotal();
        });
    };
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});