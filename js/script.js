window.addEventListener('DOMContentLoaded', () => {

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
});