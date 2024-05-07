
const carousel = document.querySelector('.custom-carousel');
const slides = document.querySelectorAll('.custom-slide');
const dots = document.querySelectorAll('.custom-dot');
let currentSlide = 0;

function showSlide(n) {
  carousel.style.transform = `translateX(-${n * 100 / 3}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[n].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % Math.ceil(slides.length / 3);
  showSlide(currentSlide);
}

dots.forEach((dot, index) => {
  dot.addEventListener('mouseover', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

setInterval(nextSlide, 3000); // 每隔3秒切换一次轮播图
