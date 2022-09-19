import card from './template/card.hbs';
import fetchApi from './js/apiService.js';
const debounce = require('lodash.debounce');
import { scrollIntoView } from 'scroll-js';

const body = document.querySelector('body');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const classImg = new fetchApi();
const button = document.createElement('button');
let indexLi = 12;
input.addEventListener('input', debounce(valueArrImg, 1000));

async function valueArrImg(e){
    classImg.searchQuery = e.target.value;     
    await invokeAPI();
    buttonLodeMore();

    button.addEventListener('click', loadMore);
    
}

function marcup(gallery) {
    const marcup = card(gallery);
    ul.insertAdjacentHTML('beforeend',marcup);
}

function buttonLodeMore() {
    button.textContent = 'LOAD MORE';
    body.append(button);
}

async function loadMore() {
    classImg.increment();
    await invokeAPI();
    scrollElement();    
}

async function invokeAPI() {
    const promiseApi = await classImg.fetchApiUrl();
    const result = await promiseApi;
    marcup(result.hits);
}

function scrollElement() {
    const myElement = document.body.getElementsByTagName('li');            
    scrollIntoView(myElement[indexLi], document.body, { behavior: 'smooth' });
    indexLi += 12;
} 