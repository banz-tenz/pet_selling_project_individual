let currentSlide = 0;
const slides = document.querySelectorAll('.heroSlide');
const dotsContainer = document.querySelector('.hero-dots');

slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.hero-dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
}

document.querySelector('.heroNext')?.addEventListener('click', nextSlide);
document.querySelector('.heroPrev')?.addEventListener('click', prevSlide);

let slideInterval = setInterval(nextSlide, 5000);

document.querySelector('.hero')?.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.hero')?.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

const bestSellersContainer = document.getElementById('bestSellers');
if (bestSellersContainer) {
    const bestsellers = getBestsellers();
    bestSellersContainer.innerHTML = bestsellers.map(product => createProductCard(product)).join('');
}

const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        window.location.href = `menu.html?category=${category}`;
    });
});

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        const notification = document.createElement('div');
        notification.textContent = 'Thank you for subscribing!';
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #2ecc71;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);
        newsletterForm.reset();

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    });
}
