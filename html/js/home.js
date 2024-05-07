window.onload = function () {    
    let isImage1 = true;
    let change = document.querySelector('.tu')
    change.onclick = function () {
        const image1 = document.getElementById('image1');
        const image2 = document.getElementById('image2');

        if (isImage1) {
            image1.style.display = 'none';
            image2.style.display = 'block';
            isImage1 = false;
        } else {
            image1.style.display = 'block';
            image2.style.display = 'none';
            isImage1 = true;
        }
    }

    let scrolling = false;


    // 获取需要操作的元素
    const list = document.getElementById('list');
    const displayImage = document.getElementById('displayImage');

    let activeLi = null; // 用于存储当前激活的li元素

    // 遍历li元素，为每个li元素添加鼠标悬停事件
    list.querySelectorAll('li').forEach(li => {
        li.addEventListener('mouseover', function () {
            const imagePath = this.getAttribute('data-image'); // 获取对应图片路径
            displayImage.src = imagePath; // 设置显示图片的src
            displayImage.style.display = 'block';

            // 只有在新的li元素激活时才更新样式
            if (activeLi !== this) {
                // 移除先前激活的项的"active"类
                if (activeLi) {
                    activeLi.classList.remove('active');
                }

                // 将当前项添加"active"类
                this.classList.add('active');

                // 更新当前激活的li元素
                activeLi = this;
            }
        });
    });

    //轮播图
    const carousel = document.querySelector('.carousel');
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');

    // Clone the slides to create a seamless loop
    const duplicatedSlides = [...slides].map(slide => slide.cloneNode(true));
    duplicatedSlides.forEach(slide => container.appendChild(slide));

    let counter = 0;
    const slideWidth = slides[0].getBoundingClientRect().width + 10; // Width of slide + margin

    function moveToSlide() {
        container.style.transform = `translateX(${-slideWidth * counter}px)`;
    }

    function moveLeft() {
        if (counter > 0) {
            counter--;
        } else {
            counter = slides.length - 1;
        }
        container.style.transition = 'transform 0.5s ease';
        moveToSlide();
    }

    function moveRight() {
        if (counter < duplicatedSlides.length - slides.length) {
            counter++;
        } else {
            counter = 0;
        }
        container.style.transition = 'transform 1s ease'; // 添加过渡效果
        moveToSlide();
    }

    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    leftArrow.addEventListener('click', moveLeft);
    rightArrow.addEventListener('click', moveRight);

    // 自动播放间隔时间（单位：毫秒）
    const autoplayInterval = 3000;
    let autoplayTimer;

    // 向右滚动函数
    function moveRight() {
        if (counter < slides.length * 2 - 4) {
            counter++;
        } else {
            counter = 0;
        }
        container.style.transition = 'transform 1s ease'; // 添加过渡效果
        moveToSlide();
    }

    // 开始自动播放
    function startAutoplay() {
        autoplayTimer = setInterval(moveRight, autoplayInterval);
    }

    // 停止自动播放
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    // 开始自动播放
    startAutoplay();

    // 鼠标悬停时停止自动播放
    carousel.addEventListener('mouseenter', function () {
        stopAutoplay();
    });

    // 鼠标离开时恢复自动播放
    carousel.addEventListener('mouseleave', function () {
        startAutoplay();
    });

    const admin = localStorage.getItem("admin")
    // 将获取到的用户名填充到输入框中
    document.getElementById("username").value = 123;
    document.getElementById("fontColor").value = "#ffffff";

    document.getElementById("fontColor").addEventListener('input', () => {
        document.getElementById("colorValue").value = document.getElementById("fontColor").value
    })
    document.getElementById("colorValue").addEventListener('input', () => {
        document.getElementById("fontColor").value = document.getElementById("colorValue").value
    })
    document.getElementById("textInput").addEventListener('input', () => {
        console.log(document.getElementById("textInput").value);
    })
}