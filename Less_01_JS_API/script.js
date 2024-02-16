"use strict";

const url = './timetable.json';
const tableEl = document.querySelector('#timetable');

function generateTable() {
    if (localStorage.length === 0) {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    const employment = Object.values(json)[i];
                    localStorage.setItem(employment.id, generateItemElements(employment));
                }
        });
    }

    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            tableEl.insertAdjacentHTML('beforeend', localStorage.getItem(key));
        }
    }
    
    const items = tableEl.querySelectorAll('.employment__item');
    addBtnEvent(items);
}

function generateItemElements(el) {

    return `<tr id="${el.id}" class="employment__item">
        <th class="name">${el.name}</th>
        <th class="time">${el.time}</th>
        <th class="max">${el.maxParticipants}</th>
        <th class="current">${el.currentParticipants}</th>
        <th><button class="btn btn__record">Записаться</button></th>
        <th><button disabled class="btn btn__cancel">Отменить запись</button></th>
    </tr>`
}

function addBtnEvent(items) {

    items.forEach(item => {
        const thMaxEl = item.querySelector('.max');
        const thCurrentEl = item.querySelector('.current');
        const btnRecordEl = item.querySelector('.btn__record');
        const btnCanscelEl = item.querySelector('.btn__cancel');

        if (Number(thMaxEl.textContent) <= Number(thCurrentEl.textContent)) {
            btnRecordEl.setAttribute('disabled', 'disabled');
        }

        btnRecordEl.addEventListener('click', (e) => {
            thCurrentEl.textContent = Number(thCurrentEl.textContent) + 1;           
            btnRecordEl.setAttribute('disabled', 'disabled');
            btnCanscelEl.removeAttribute('disabled');
            localStorage.setItem(item.id, item.outerHTML);
        });

        btnCanscelEl.addEventListener('click', (e) => {
            thCurrentEl.textContent = Number(thCurrentEl.textContent) - 1;           
            btnCanscelEl.setAttribute('disabled', 'disabled');
            btnRecordEl.removeAttribute('disabled');
            localStorage.setItem(item.id, item.outerHTML);
        });
    });
}

generateTable();