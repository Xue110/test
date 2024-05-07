const dlt = document.querySelector('.homepage .dlt');
const drt = document.querySelector('.homepage .drt');
const tlt = document.querySelector('.homepage .tlt');
const trt = document.querySelector('.homepage .trt');
const ilt = document.querySelector('.homepage .ilt');
const irt = document.querySelector('.homepage .irt');
const enterBtn = document.querySelector('.homepage .enterBtn');
const page2 = document.querySelector('.homepage .page2');
const eSheet = document.querySelector('.equipsheet');
const eImgs = document.querySelectorAll('.equipsheet .imgInfro');
const imgMeg = document.querySelectorAll('.homepage .equipMeg');
function openDoor() {
    console.log(tlt);
    //标题移动
    tlt.style.left = -846 + 'px';
    tlt.style.transition = 1 + 's';
    trt.style.left = 846 + 'px';
    trt.style.transition = 1 + 's';
    //内容移动
    ilt.style.left = -846 + 'px';
    ilt.style.transition = 1 + 's';
    ilt.style.transitionDelay = 0.2 + 's';
    irt.style.left = 846 + 'px';
    irt.style.transition = 1 + 's';
    irt.style.transitionDelay = 0.2 + 's';
    //门移动
    dlt.style.left = -846 + 'px';
    dlt.style.transition = 1 + 's';
    dlt.style.transitionDelay = 0.4 + 's';
    drt.style.left = 846 + 'px';
    drt.style.transition = 1 + 's';
    drt.style.transitionDelay = 0.4 + 's';
}

function enternow() {
    enterBtn.addEventListener('click', function (e) {
        this.style.display = 'none';
        openDoor();
        page2.style.zIndex = -1;
        page2.style.transitionDelay = 1.25 + 's';
        getSight();
        playPause();
        showSong();
        bgMove();
        for (let i = 0; i < len; i++) {
            eImgs[i].style.transform = "rotateY(" + i * Deg + "deg) translateZ(400px)";
            eImgs[i].style.transition = "1s" + (len - 1 - i) * 0.1 + "s";
        }
    });
}
enternow();
//让盒子子实行居中
function mTop() {
    //获取浏览器窗口可是区域的高度
    const douHeight = document.documentElement.clientHeight;
    eSheet.style.top = douHeight / 2 - 100 + 'px';
}
mTop();
window.onresize = mTop;
//获取图片个数
const len = eImgs.length;
//每张图片所占的角度
const Deg = 360 / len;
// 鼠标拖动
function getSight() {
    let lastX, nowX, midX, roY = 0;
    document.onmousedown = function (e) {
        clearInterval(timer);
        //获取鼠标坐标位置
        lastX = e.clientX;
        this.onmousemove = function (e) {
            //移动过程中鼠标的坐标位置
            nowX = e.clientX;
            //计算鼠标坐标的差值
            midX = nowX - lastX;
            //计算容器旋转的角度
            roY += midX * 0.2;
            //让容器跟随鼠标旋转
            eSheet.style.transform = "rotateY(" + roY + "deg)";
            lastX = nowX;
            console.log("roY" + roY);
        };
        this.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
            clearInterval(timer);
            autoRotate();
        };
        //阻止默认事件
        return false;
    };
    autoRotate();
}
//定时器函数，图片自动进行转动
let timer = 0;
let run = 0;
function autoRotate() {
    timer = setInterval(function () {
        run += 60;
        eSheet.style.transform = "rotateY(" + run + "deg)";
        if (run >= 360) {
            run = 0;
            eSheet.style.transform = "rotateY(0deg)";
        }
    }, 5000);
}
//点击图片显示相关文本内容
function wensb() {
    let flag = false;
    for (let i = 0; i < len; i++) {
        eImgs[i].addEventListener('click', function () {
            if (flag) {
                this.style.top = -65 + 'px';
                this.style.transition = 1 + 's';
                imgMeg[i].style.opacity = '1';
                clearInterval(timer);
                flag = false;
            } else {
                this.style.top = 0 + 'px';
                this.style.transition = 1 + 's';
                imgMeg[i].style.opacity = '0';
                clearInterval(timer);
                autoRotate();
                flag = true;
            }

        });
    }
}
wensb();
//背景音乐播放
const audioPlayer = document.querySelector('#audioPlayer')
const pre = document.querySelector('.pre')
const next = document.querySelector('.next')
const play = document.querySelector('.play')
const audio = document.querySelector('audio')
const name = document.querySelector('.name')
const songer = document.querySelector('.songer')
const source = document.querySelector('source')
const musicImg = document.querySelector('#img')
function playPause() {
    play.addEventListener('click', function () {   //播放||暂停
        if (audio.paused) {
            play.classList.add('icon-z') // 显示暂停图标
            audio.play();     // 播放
        } else {
            play.classList.remove('icon-z')
            play.classList.add('icon-p'); // 显示播放按钮
            audio.pause(); // 暂停

        }

    })
    let data = [
        {
            img: 'active1',
            src: 'song/J_Tajor - Crazy.flac',
            name: 'Crazy',
            songer: 'J_Tajor',
        },
        {
            img: 'active2',
            src: 'song/Ina Wroldsen - I Wanted You.ogg',
            name: 'I Wanted You',
            songer: 'Ina Wroldsen',
        },
        {
            img: 'active3',
            src: 'song/Shad - I Like You The Most.flac',
            name: 'I Like You The Most',
            songer: 'Shad',
        },
        {
            img: 'active4',
            src: 'song/Justin Bieber - Love Yourself.flac',
            name: 'Love Yourself',
            songer: 'Justin Bieber',
        },
        {
            img: 'active5',
            src: 'song/melo-D - Just Say Hello.flac',
            name: 'Just Say Hello',
            songer: 'melo-D',
        }
    ]

    let i = 0
    // console.log(data[0]);
    next.addEventListener('click', function () {
        const name = document.querySelector('.name')
        i++
        if (i > data.length - 1) {
            i = 0

        }
        musicImg.setAttribute('class', `${data[i].img}`)
        audio.src = data[i].src
        source.src = data[i].src
        name.innerHTML = data[i].name
        songer.innerHTML = data[i].songer
        play.classList.add('icon-z')
        audio.play()
    })
    pre.addEventListener('click', function () {
        const name = document.querySelector('.name')
        i--
        if (i < 0) {
            i = data.length - 1
        }
        musicImg.setAttribute('class', `${data[i].img}`)
        audio.src = data[i].src
        source.src = data[i].src
        name.innerHTML = data[i].name
        songer.innerHTML = data[i].songer
        play.classList.add('icon-z')
        audio.play();
    })
}
//显示歌曲的演唱者名称和歌曲名
const songName = document.querySelector('.muisc-information');
const player = document.querySelector('.player')
function showSong() {
    player.onmouseover = () => {
        songName.style.top = 10 + 'px'
    }
}
//播放器补丁，再没有点击开始键时，不能切歌
// function canChange(){
// }
const page1 = document.querySelector('.homepage .page1');
let backTime = 0;
let bgs = 0;
function bgMove() {
    backTime = setInterval(function(){
        bgs += 10;
        if(bgs > 100) {
            bgs = 0;
        }
        page1.style.backgroundSize =  100 + bgs + '%';
        page1.style.transition = 3 + 's';
    },2000);
}