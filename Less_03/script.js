"use strict";
// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

const url = './products.json';
const products = document.querySelector('#products');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
let inputName = modal.querySelector('.modal__input[id="name"]');
const inputText = modal.querySelector('.modal__input[id="comment"]');
const modalBtn = modal.querySelector('.modal__btn');

function getProducts(url) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            const data = json;
            if (!data || Math.random() < 0.2) {
                throw new Error('Ошибка базы данных');
            }
            generateItemElements(data);
        }).catch((error) => alert(error.message));
}

function generateItemElements(data) {
    for (let i = 0; i < data.length; i++) {
        const product = Object.values(data)[i];
        products.insertAdjacentHTML('beforeend',
            `<li class="products__item">
            <div class="product__img-box">
                <img src="${product.image}" alt="product image" class="product__img">
            </div>
            <div class="product__descr">
                <p class="product__text">${product.title}</p>
                <button class="btn feedback_added">Оставить отзыв</button>
            </div>
        </li>
        `);
    }
    const itemsProduct = products.querySelectorAll('.products__item');
    addBtnEvent(itemsProduct);
}

function addBtnEvent(itemsProduct) {
    itemsProduct.forEach(item => {
        const btn = item.querySelector('.feedback_added');
        btn.addEventListener('click', (e) => {
            const eventItem = e.target.parentNode.parentNode;
            const productName = eventItem.querySelector('.product__text');
            overlay.style.display = 'block';
            modal.style.display = 'flex';
            inputName.value = productName.innerText;
        });
    });
}

modalBtn.addEventListener('click', () => {
    try {
        if (!inputName.value || !inputText.value) {
            throw new Error('Заполните все поля!');
        }
        if (localStorage.length === 0) {
            const feedbackArray = [];
            feedbackArray.push(inputText.value);
            localStorage.setItem(inputName.value, JSON.stringify(feedbackArray));
        } else {
            let res = false;

            for (const key in localStorage) {
                if (key === inputName.value) {
                    res = true;
                    const feedbackArray = JSON.parse(localStorage.getItem(inputName.value));
                    feedbackArray.push(inputText.value);
                    localStorage.setItem(inputName.value, JSON.stringify(feedbackArray));
                }
            }

            if (res === false) {
                const feedbackArray = [];
                feedbackArray.push(inputText.value);
                localStorage.setItem(inputName.value, JSON.stringify(feedbackArray));
            }

        }
        overlay.style.display = "none";
        modal.style.display = "none";
    } catch (error) {
        alert(error.message);
    }
});

const btn = document.querySelector('.feedback_link');
btn.addEventListener('click', () => {
    window.location.href = './feedback.html'
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
});

getProducts(url);