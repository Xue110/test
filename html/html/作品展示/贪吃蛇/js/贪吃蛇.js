// 需求 : 控制器功能优化:  
// - 贪食蛇的所有数据全部升级成对象形式 ; 

// 1. 贪食蛇数组 : 
let tss_arr = [
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 }
];
// 注意 : tss_arr 最后一项数据代表蛇头的left; 
let tss_doms = document.querySelectorAll(".tss-wrap div")
let tss_head_dom = document.querySelector(".tss-head")
let tss_wrap_dom = document.querySelector(".tss-wrap")
let score_dom = document.querySelector(".score-text")
let min_dom = document.querySelector(".min")
let sec_dom = document.querySelector(".sec")
let box1 = document.querySelector(".box1")
let box2 = document.querySelector(".box2")
// box1.addEventListener('click',function(){gameOver()})
// box2.addEventListener('click',function(){
//     gameOver()
//     t = setInterval(move, 100)
//     tm = setInterval( timeMeter , 1000 )
// })

// console.log( tss_doms , tss_arr );
// 解决方案 : 把 tss_arr 倒序! 
// 注意 : 为了避免数组使用存在隐患 , 我们克隆一个新数组然后再进行倒序! 
// arr.slice() 
// let tss_reverse = tss_arr.slice().reverse();

// 2. 蛇头的left值; 
// 升级 : 蛇头的位置对象 
// let left = 0;
let tss_head = {
    left: 0,
    top: 0
}
// 贪食蛇运动方向变量 
// 默认向右运动 : 
let tss_turn = 39;
// 定义好运动方向的对象 : 
// 对象的key值变成tss_turn的数据: 
let tss_control = {
    // 左: left += -20
    37: {
        left: -20,
        top: 0,
        class: "left"
    },
    // 上: top  += -20 
    38: {
        left: 0,
        top: -20,
        class: "top"
    },
    // 右: left += 20
    39: {
        left: 20,
        top: 0,
        class: "right"
    },
    // 下: top  += 20
    40: {
        left: 0,
        top: 20,
        class: "bottom"
    }
}

// 1. 贪食蛇咬尾巴逻辑; 
//  - 蛇头; 
//  - 蛇身体; 
//  判定的逻辑 : 蛇头的位置和社身体的位置完全重合; 
// 2. 贪食蛇蛇头撞墙逻辑; 

// 贪食蛇运动函数 : 
function move() {
    eggDetection(tss_head)
    // 3. left 值自增 : 
    // 升级 : 贪食蛇蛇头位置改变; 
    // 升级 : 要根据 tss_control 和 tss_turn 取出的数据来完成蛇头位置的改变; 
    tss_head.left += tss_control[tss_turn].left
    tss_head.top += tss_control[tss_turn].top

    // 添加蛇头类名改变蛇头朝向!
    tss_head_dom.classList.remove("left", "right", "top", "bottom")
    tss_head_dom.classList.add(tss_control[tss_turn].class)
    // 4. 给蛇头进行赋值 : 
    // - 数组最后一项的下标 : arr.length - 1
    // 升级 : 原本的left变量名升级为 tss_head 
    tss_arr[tss_arr.length - 1] = tss_head;
    // 倒序数组: 
    let tss_reverse = tss_arr.slice().reverse()
    // tss_resverse : 
    // - 蛇头 : tss_reverse[0];
    // - 蛇身体 : tss_reverse.slice(1) : [ 1,2,3,4,5,6,8 ];
    // - 比对 : 蛇头和每个蛇身体进行比对, 如果位置完全相同那么我们就终止游戏! 
    // 碰撞检测 : 
    if (auto) {
        autoPlay()
    } else {
        collisionDetection(tss_reverse)

    }
    // 给dom对象进行赋值 : 
    // 升级 : 我们操作dom对象的left值和top值; 
    for (let i = 0; i < tss_doms.length; i++) {
        tss_doms[i].style.left = tss_reverse[i].left + "px"
        tss_doms[i].style.top = tss_reverse[i].top + "px"
    }
    // 5. 编写跟随循环 : 
    // 注意 : 因为数组的最后一项已经完成赋值了， 所以我们忽略最后一项的遍历! 通过 tss_arr.length - 1 来完成的;
    // 升级 : 之前数组项是数字, 现在的数组项是对象，我们不能直接赋值了， 我们要分别对left值属性和top值属性进行赋值! 
    for (let i = 0; i < tss_arr.length - 1; i++) {
        // 当前数组项等于后面的数组值!
        tss_arr[i].left = tss_arr[i + 1].left
        tss_arr[i].top = tss_arr[i + 1].top
    }
}
let sec = 200
let t = setInterval(move, sec)
// 碰撞检测函数 : 
function collisionDetection(arr) {
    // 蛇头信息: 
    let tss_head = arr[0]
    // 蛇身体信息 : 
    let tss_bodys = arr.slice(1)

    // 比对 : 
    for (let i = 0; i < tss_bodys.length; i++) {
        // 贪食蛇蛇头的位置信息和每个贪食蛇身体进行比对; 
        if (tss_head.left === tss_bodys[i].left && tss_head.top === tss_bodys[i].top) {
            // 咬着身体了 
            console.log("游戏结束");
            // 终止定时器贪食蛇就停止运动了! 
            gameOver()
        }
    }
    // 撞墙逻辑其实是边界检测逻辑 : 
    // left最小值是 0 , 最大值是800;
    // top 最小值是 0 , 最大值是600;

    if (tss_head.left < 0 || tss_head.left > 800 || tss_head.top < 0 || tss_head.top > 600) {
        console.log("游戏结束")
        // 终止定时器贪食蛇就停止运动了! 
        gameOver()
    }
}

// 问题 : 通过事件控制贪食蛇运动方向 ; 
document.onkeydown = function (e) {
    // 事件对象 : 
    // console.log( e.keyCode );
    // 37 左 38 上 39 右 40 下
    // console.log("键盘事件触发");
    // 编写控制器逻辑 : 
    // - 1. 当前贪食蛇的朝向;     tss_turn 
    // - 2. 贪食蛇即将改变的朝向;  e.keyCode

    // 逻辑判断 : 
    // 如果当前的方向是向左的，我们要改变的朝向是向右的我们就要终止程序执行; 
    // 终止程序执行 : return 
    if (tss_turn === 37 && e.keyCode === 39) {
        return
    }
    if (tss_turn === 38 && e.keyCode === 40) {
        return
    }
    if (tss_turn === 39 && e.keyCode === 37) {
        return
    }
    if (tss_turn === 40 && e.keyCode === 38) {
        return
    }
    if (e.keyCode === 32) {
        box1.click()
    }
    if (e.keyCode === 86) {
        box2.click()
    }
    if (e.keyCode === 66) {
        location.reload()
    }


    if (e.keyCode >= 37 && e.keyCode <= 40) {
        tss_turn = e.keyCode
        // 修改蛇头样式 : 
        // dom + 类名修改工具; 

        // dom类名修改工具 : 
        // classList : 这个工具可以方便的帮我们实现dom对象的类名删增; 
        // tss_head_dom.classList.remove("left" ,"right" ,"top" , "bottom");
        // tss_head_dom.classList.add( tss_control[tss_turn].class )
    }
}

// 创建蛇蛋 : 
// 1. 创建蛇蛋数据解构 ; 
// 2. 创建dom结构; 
// 3. 写入蛇蛋结构数据; 
let egg = {
    left: 0,
    top: 0,
    class: "tss-egg",
    // document.createElement( 标签类型 )
    dom: document.createElement("span")
}

function createEgg() {
    // 创建贪食蛇随机位置 : 
    egg.left = parseInt(Math.random() * 40) * 20;
    egg.top = parseInt(Math.random() * 30) * 20;

    // 我们的所有数据都要作用在dom结构之上!
    egg.dom.style.left = egg.left + "px"
    egg.dom.style.top = egg.top + "px"

    egg.dom.classList.add(egg.class)

    // 把dom结构放入到页面之中; 
    // dom.appendChild() 工具来完成; 
    tss_wrap_dom.appendChild(egg.dom)

    // for (let i = 0; i < tss_arr.length; i++) {
    // if (tss_bodys[i].left === egg.left && tss_bodys[i].top === egg.top) {
    //     createEgg()
    // }                                                                                                                                                                                                                                                                                             
    // }
}

createEgg();
// 
// 吃蛋检测 :                        
function eggDetection(head) {
    // 如果蛇头和蛇蛋重合了，那么我们就判定当前吃蛋了! 
    if (head.left === egg.left && head.top === egg.top) {
        console.log("吃蛋了")
        // 1. 蛇蛋重新随机位置; 
        // 2. 让贪食蛇的尾巴变长;
        eatEgg()
        recordScore()
    }
}

function eatEgg() {
    createEgg()
    createBody()
}

function createBody() {
    // 1. 创建蛇身体dom结构; 
    // 2. 我们把数据放入tss_arr 数组之中; 
    let body = document.createElement("div")
    body.classList.add("tss-body")

    body.style.display = "none"
    setTimeout(function () {
        body.style.display = "block"
    }, 100)

    tss_wrap_dom.appendChild(body);
    // 更新一下新增的dom结构，放到 tss_doms 元素组之中; 
    tss_doms = document.querySelectorAll(".tss-wrap div")
    // 把新增的贪食蛇身体放入到tss_arr 之中; 
    tss_arr.unshift({
        left: 0,
        top: 0
    })
}

// 记录得分 : 
let score = 0;
function recordScore() {
    // 1. 让得分自增; 
    score++;
    // 2. 修改dom内容; 
    // dom.innerHTML = 数据; 
    score_dom.innerHTML = score;
}

// 计时功能 : 
// 游戏开始的时间! 单位是秒; 
let s = 0;
function timeMeter() {
    s++;
    // 拆分时间 : 
    // 给时间进行补零! 
    // 1. 拆分分钟; 
    let min = parseInt(s / 60)
    if (min < 10) {
        min = "0" + min
    }
    // 2. 剩余秒钟; 
    // % : 取余运算; 
    let sec = s % 60
    if (sec < 10) {
        sec = "0" + sec
    }
    min_dom.innerHTML = min
    sec_dom.innerHTML = sec
}

let tm = setInterval(timeMeter, 1000)

function gameOver() {
    clearInterval(t)
    clearInterval(tm)
    //创建一个保存函数
    let save = function (arr) {
        -
            arr.sort((a, b) => {
                return a - b
            })
        localStorage.my = JSON.stringify(arr)
    }
    //创建一个读取函数
    let load = function () {
        let arr = JSON.parse(localStorage.my)
        return arr
    }
    //保存数组
    let myarr = [] //这个就是数组
    if (localStorage.my != null) {
        myarr = load()
    }//如果my不是空的 那就把数组传给myarr
    myarr.push(score_dom.innerHTML)//将数据添加到数组中
    save(myarr)//保存
    location.reload()
    console.log(score_dom.innerHTML)
    alert("菜就多练")
}

let aa = localStorage.getItem("my")
let oo = JSON.parse(aa)
console.log(oo);
if (oo != null) {
    document.getElementById("first").innerHTML = `第一：${oo[oo.length - 1]}`
    if (oo.length >= 2) {
        document.getElementById("second").innerHTML = `第二：${oo[oo.length - 2]}`
    }
    if (oo.length >= 3) {
        document.getElementById("third").innerHTML = `第三：${oo[oo.length - 3]}`
    }
}
clearInterval(t)
clearInterval(tm)
box1.addEventListener('click', function () {
    clearInterval(t)
    clearInterval(tm)
})
box2.addEventListener('click', function () {
    clearInterval(t)
    clearInterval(tm)
    t = setInterval(move, sec)
    tm = setInterval(timeMeter, 1000)
    let kk = setInterval(function () {
        sec -= 20
        clearInterval(t)
        t = setInterval(move, sec)
        if (sec <= 40) {
            clearInterval(kk)
        }
        console.log(sec);
    }, 6000)

    box1.addEventListener('click', function () {
        clearInterval(t)
        clearInterval(tm)
        clearInterval(kk)
    })

})
let clear = document.getElementById("clear")
clear.addEventListener('mousedown', function () {
    clear.style.boxShadow = "0px 0px 0px 0px #a6a6a6"
    localStorage.clear()
    document.getElementById("first").innerHTML = `第一：0`
    document.getElementById("second").innerHTML = `第二：0`
    document.getElementById("third").innerHTML = `第三：0`
})
clear.addEventListener('mouseup', function () {
    clear.style.boxShadow = "0px 7px 8px 0px #a6a6a6"
})
// document.onkeydown = function (e) {
//     if (e.keyCode === 32) {
//         clearInterval(t)
//         clearInterval(tm)
//     }
//     if (e.keyCode === 86) {
//         t = setInterval(move, 100)
//         tm = setInterval(timeMeter, 1000)
//     }
//     if (e.keyCode === 66) {

//     }
// }
// 自动游戏 : 
// 是否开启自动游戏功能;
let auto = false
function autoPlay() {
    // 1. 加速游戏! 
    clearInterval(t)
    t = setInterval(move, 30)

    // 判断贪食蛇的蛇头和蛇蛋的位置关系 : 
    if (tss_head.left !== egg.left && tss_head.left > egg.left) {
        // 更改贪食蛇的运动方向 : 
        tss_turn = 37
    }
    if (tss_head.left !== egg.left && tss_head.left < egg.left) {
        // 更改贪食蛇的运动方向 : 
        tss_turn = 39
    }

    if (tss_head.top !== egg.top && tss_head.top > egg.top) {
        // 更改贪食蛇的运动方向 : 
        tss_turn = 38
    }

    if (tss_head.top !== egg.top && tss_head.top < egg.top) {
        // 更改贪食蛇的运动方向 : 
        tss_turn = 40
    }
}


