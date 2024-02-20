// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.getElementById('dots-container');

function showSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
}

function nextSlide() {
    currentSlide < totalSlides - 1 ? currentSlide++ : currentSlide = 0;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide > 0 ? currentSlide-- : currentSlide = totalSlides - 1;
    showSlide(currentSlide);
}

function updateDots() {
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        if (i === currentSlide) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
    }
}

updateDots();
