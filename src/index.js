import card from './template/card.hbs';
import fetchApi from './js/apiService.js';
const debounce = require('lodash.debounce');
import { scrollIntoView } from 'scroll-js';
import * as basicLightbox from 'basiclightbox';

const classImg = new fetchApi();
const body = document.querySelector('body');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const button = document.createElement('button');
let indexLi = 12;
let images = [];

input.addEventListener('input', debounce(valueArrImg, 1000));

async function valueArrImg(e) {
    classImg.searchQuery = e.target.value;
    cleanMarcup();
    const promiseApi = await invokeAPI();
    images = [...promiseApi.hits];
    marcup(images);
    ul.addEventListener('click', clickImg); 
    buttonLoadMore(); 
}

async function clickImg(e) {  
    images.map(value => {
      if (e.target.src === value.webformatURL) {
        const modalSrc = value.largeImageURL;
        modalWindow(modalSrc);
      }
    })
}

async function loadMore() { 
    classImg.increment();
    const promiseApi = await invokeAPI();
    images = [...images, ...promiseApi.hits];
    ul.innerHTML = '';
    marcup(images);
    scrollElement();
}

function scrollElement() {
    const myElement = document.body.getElementsByTagName('li');
    scrollIntoView(myElement[indexLi], document.body, { behavior: 'smooth' }); 
    indexLi += 12; 
} 

async function marcup(gallery) {
    const marcup = card(gallery);
    ul.insertAdjacentHTML('beforeend',marcup);
}

function buttonLoadMore() {
    button.textContent = 'LOAD MORE';
    body.append(button);
    button.addEventListener('click',loadMore );
}

async function invokeAPI() {
    const promiseApi = await classImg.fetchApiUrl();
    const result = await promiseApi;
    return result;
}

function modalWindow(src) {
    const instance = basicLightbox.create(`
    <div class="modal">
        <img src=${src}>
    </div>
    `)
instance.show();
}

function cleanMarcup() {
    classImg.reset();
    ul.innerHTML = '';
    button.remove();
    indexLi = 12;
    images = [];
}
