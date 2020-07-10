'use strict';
// получаем данные из локалстораж в массив
//const dateBase = [];
// из стоки в обект
// данные из локал стораж или  если их нет то пустой массив для push
const dateBase = JSON.parse(localStorage.getItem('awito') ) || [] ; 
//const dateBase = localStorage.getItem('awito'); 

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

const modalFileBtn = document.querySelector('.modal__file-btn'); // кнопка спан для фото чтобы сменить надпись на имя файла
const modalImageAdd = document.querySelector('.modal__image-add');

const textFileBtn = modalFileBtn.textContent;
const textSrc = modalImageAdd.src;

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');

// лкальная база в  браузере
const saveDB = () => localStorage.setItem('awito', JSON.stringify(dateBase)); //нужно перевести обект в строку 
// localStorage.clear(); очистка
console.log(dateBase);

// работа для картинки

const  infoPhoto = {};
const modalFileInput = document.querySelector('.modal__file-input');


modalFileInput.addEventListener('change', event => {
    const target = event.target;
    // обект для работы с файлом
    const reader = new FileReader();
    const file  = target.files[0];
    infoPhoto.fileName = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener('load', event => {
        if (infoPhoto.size<200000){
            modalFileBtn.textContent = infoPhoto.fileName;
            // конвертирует картинку в строку
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = " размер файла не должен превышать 20 кб";
            modalFileInput.value = '';
            checkForm();
        }
    });
});

// создание карточек из базы данных
 const renderCard = () => {
     catalog.textContent = '';
     dateBase.forEach((item, i) => {
         catalog.insertAdjacentHTML('beforeend', `
         	<li class="card" data-id="${i}">
				<img class="card__image" src="data:image/jpeg;base64, ${item.photo}" alt="test">
					<div class="card__description">
						<h3 class="card__header">${item.nameItem}</h3>
						<div class="card__price">${item.costItem} ₽</div>
					</div>
		</li>`);
    });
};


    //проверяем если форма заполнена перебираем все елементы в форме и проверяем что они заполнени
const checkForm = () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : ''; 
}    

// закрытие модальных окон
const closeModal = event => {
    const target = event.target;
    if (target.closest('.modal__close') || 
    target.classList.contains('modal') ||
    event.code === 'Escape'){
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        document.removeEventListener('keydown', closeModal );
        modalSubmit.reset();
        modalImageAdd.src = textSrc;
        modalFileBtn.textContent = textFileBtn;
        checkForm();
    }

};

// показывает модальное окно
addAd.addEventListener('click', ()=>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true ;
    document.addEventListener('keydown', closeModal);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

// когда открывается окно при клике на карточку товара
catalog.addEventListener('click', (event)=>{
    const target = event.target;
    console.log(target);
    if (target.closest('.card')){
        modalItem.classList.remove('hide'); // тольпри нажатии на карочку
        document.addEventListener('keydown', closeModal); // закрытие при нажатии на esc
    };   
});

/*document.addEventListener('keydown', event => {
    console.log(event);
    if (event.code === 'Escape'){
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
    };   
}) */


modalSubmit.addEventListener('input', modalSubmit.addEventListener('input', checkForm));

// форма не перезвгружать страницу при submite 
modalSubmit.addEventListener('submit', event =>{
    event.preventDefault();
    const itemObj = {}; // создаем пустой обект
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;   //перебираем все елементы модального окна берем имя и значениие     
    }
    // добавляем фото в обект
    itemObj.photo = infoPhoto.base64;
    // добавляем обект в массив
    dateBase.push(itemObj); 
    // сщздаем обект и в него передаем modalAdd
    closeModal({target : modalAdd}) ;  // закруваем форму передаем сам елемент и от него таргет потом смотрим
    //console.log(dateBase);
    saveDB(); 
    renderCard();
    
});



renderCard();