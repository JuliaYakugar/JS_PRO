// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.

const apiKey = 'V-TZ-bRYVlwUi-6DbrVbfIa3K03nHCDE7KFgIXbnrao';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}`;

const app = document.getElementById('app');
const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('likeButton');
const likeCounter = document.getElementById('likeCounter');

let history = JSON.parse(localStorage.getItem('photoHistory')) || [];

async function getRandomPhoto() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const photoUrl = data.urls.regular;
        const photographerName = data.user.name;

        const savedPhoto = history.find((item) => item.photoUrl === photoUrl);

        if (!savedPhoto) {
            history.push({ photoUrl, likes: 0, liked: false });
        }

        photoElement.src = photoUrl;
        photographerElement.textContent = `Фотограф: ${photographerName}`;

        updateLikeCounter();
    } catch (error) {
        console.error('Ошибка fetch:', error);
    }
}

function toggleLike() {
    const currentPhoto = history.find((item) => item.photoUrl === photoElement.src);

    if (currentPhoto) {
        currentPhoto.likes += currentPhoto.liked ? -1 : 1;
        currentPhoto.liked = !currentPhoto.liked;

        localStorage.setItem('photoHistory', JSON.stringify(history));
        updateLikeCounter();
    }
}

function updateLikeCounter() {
    const currentPhoto = history.find((item) => item.photoUrl === photoElement.src);

    if (currentPhoto) {
        likeCounter.textContent = `Лайки: ${currentPhoto.likes}`;
    }
}

function showPrevious() {
    if (history.length > 0) {
        const previousPhoto = history.pop();
        localStorage.setItem('photoHistory', JSON.stringify(history));
        photoElement.src = previousPhoto.photoUrl;
        updateLikeCounter();
    } else {
        alert('Нет предыдущего');
    }
}

getRandomPhoto();