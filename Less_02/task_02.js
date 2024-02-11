"use strict";
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const btn = document.querySelector('.btn');
btn.addEventListener('click', validation);

const comments = document.querySelector('#comments');
const input = document.querySelector('#input');

function validation() {
    try {
        if (input.value.length < 50 || input.value.length > 500) {
            throw new Error('Комментарий должен содержать от 50 до 500 символов');
        }
        let comment = document.createElement('p');
        comment.textContent = input.value;
        comments.appendChild(comment);
        input.value = '';
    }

    catch (error) {
        alert(error.message);
    }
}
