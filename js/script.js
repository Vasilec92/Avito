'use strict';
const dateBase = [];
const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');

    
//стрелочная функция
const closeModal = (event) => {
    const target = event.target;
    if (target.closest('.modal__close') ||
        target === modalAdd || 
        target === modalItem ) {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();  
    }
};


addAd.addEventListener('click', ()=>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true ;
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);


catalog.addEventListener('click', (event)=>{
    const target = event.target;
    console.log(target);
    if (target.closest('.card')){
        modalItem.classList.remove('hide');
    };   
});

/*document.addEventListener('keydown', event => {
    console.log(event);
    if (event.code === 'Escape'){
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
    };   
}) */

modalSubmit.addEventListener('input', () =>{
    const validForm = elementsModalSubmit.every( elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '' ;   
});

modalSubmit.addEventListener('submit', event =>{
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;       
    }   
    dateBase.push(itemObj);
    modalSubmit.reset();
    console.log(dateBase);   
});