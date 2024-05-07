const cvs = document.querySelector('#cvs')
const ctx = cvs.getContext('2d')
const { clientWidth: width, clientHeight: height } = document.documentElement
cvs.width = width
cvs.height = height
ctx.fillStyle = '#ffffff' //小点的颜色
//生成小点，400是小点的数量，map里面是小点的位置和运动速度
const bgColors = Array.from(new Array(400)).map(v => {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        step: Math.random() * 0.1 + 0.5
    }
})

//渲染函数
const render = () => {
    //清空一下
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    //让小点动起来的数据
    bgColors.forEach(v => {
        v.y = v.y > height ? 0 : (v.y + v.step)
        ctx.rect(v.x, v.y, 3, 3)
    })
    //把小点放到画布上
    ctx.fill()
    requestAnimationFrame(render)
}
render()

//禁止用户缩放浏览器
const keyCodeMap = {
    // 91: true, // command
    61: true,
    107: true, // 数字键盘 +
    109: true, // 数字键盘 -
    173: true, // 火狐 - 号
    187: true, // +
    189: true, // -
};
// 覆盖ctrl||command + ‘+’/‘-’
document.onkeydown = function (event) {
    const e = event || window.event;
    const ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && keyCodeMap[e.keyCode]) {
        e.preventDefault();
    } else if (e.detail) { // Firefox
        event.returnValue = false;
    }
};
// 覆盖鼠标滑动
document.body.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        if (e.deltaY < 0) {
            e.preventDefault();
            return false;
        }
        if (e.deltaY > 0) {
            e.preventDefault();
            return false;
        }
    }
}, { passive: false });

