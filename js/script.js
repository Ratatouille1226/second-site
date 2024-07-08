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
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
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

});