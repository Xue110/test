const data = [
    { src: './img/老师-李红果.png', name: '李红果', time: '2004年', dn: '指导教师' },
    { src: './img/前端-续江畔.jpg', name: '续江畔', time: '2021年', dn: '经纬工作室-前端方向' },
    { src: './img/前端-薛佶曜.jpg', name: '薛佶曜', time: '2022年', dn: '经纬工作室-前端方向' },
    { src: './img/前端-车宇轩.jpg', name: '车宇轩', time: '2022年', dn: '经纬工作室-前端方向' },
    { src: './img/前端-卢文婷.jpg', name: '卢文婷', time: '2022年', dn: '经纬工作室-前端方向' },
    { src: './img/后端-夏雅慧.png', name: '夏雅慧', time: '2022年', dn: '经纬工作室-后端方向' },
    { src: './img/后端-刘新鸽.png', name: '刘新鸽', time: '2022年', dn: '经纬工作室-后端方向' },
    { src: './img/后端-马静.jpg', name: '马静', time: '2022年', dn: '经纬工作室-后端方向' },
    { src: './img/龙江.png', name: '龙江', time: '2023年', dn: '经纬工作室-前端方向' },
    { src: './img/刘禹卓.jpg', name: '刘禹卓', time: '2023年', dn: '经纬工作室-前端方向' },
    { src: './img/文宇航.jpg', name: '文宇航', time: '2023年', dn: '经纬工作室-前端方向' },
    { src: './img/杨嘉伟.jpg', name: '杨嘉伟', time: '2023年', dn: '经纬工作室-前端方向' },
    { src: './img/郭益瑞.png', name: '郭益瑞', time: '2023年', dn: '经纬工作室-后端方向' },
    { src: './img/苗茁.jpg', name: '苗茁', time: '2023年', dn: '经纬工作室-后端方向' },
    { src: './img/任秋颐.jpg', name: '任秋颐', time: '2023年', dn: '经纬工作室-后端方向' },
    { src: './img/UI-陈萌.jpg', name: '陈萌', time: '2023年', dn: 'UI工作室' },
    { src: './img/UI-勾方虎.jpg', name: '勾方虎', time: '2023年', dn: 'UI工作室' },
    { src: './img/UI-李玉杰.jpg', name: '李玉杰', time: '2023年', dn: 'UI工作室' },
    { src: './img/UI-周佳慧.jpg', name: '周佳慧', time: '2023年', dn: 'UI工作室' },
    { src: './img/UI-杨一名.jpg', name: '杨一名', time: '2023年', dn: 'UI工作室' },
]
for (let i = 0; i <= 19; i++) {
    const box = document.createElement('div')
    box.classList.add('box')
    document.querySelector('.container').appendChild(box)
    const img = document.createElement('img')
    box.appendChild(img)
    img.src = data[i].src
    const spa = document.createElement('span')
    box.appendChild(spa)
    spa.innerHTML = `加入时间：${data[i].time}`
    const pp = document.createElement('p')
    box.appendChild(pp)
    pp.innerHTML = `职位：${data[i].dn}`
    const ii = document.createElement('i')
    box.appendChild(ii)
    ii.innerHTML = data[i].name
}

let boxes = document.querySelectorAll('.box')
function scrollTrigger() {
    boxes.forEach(boxxx => {
        if (boxxx.offsetTop < window.scrollY) {
            boxxx.classList.add('active')
        }
        else {
            boxxx.classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollTrigger)
