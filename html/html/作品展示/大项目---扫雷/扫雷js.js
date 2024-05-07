const goin = {
    easy: {
        row: 10,
        col: 10,
        minnum: 10
    },
    normal: {
        row: 15,
        col: 15,
        minnum: 50
    },
    hard: {
        row: 20,
        col: 20,
        minnum: 100
    },
    abyss: {
        row: 25,
        col: 30,
        minnum: 200
    }
}

let curl = goin.easy;

const gameArea = document.querySelector('.gameArea')

let goarray = null

let tabledata = []

const Mine = document.querySelectorAll("td>div.mine");

let flagNum = document.querySelector('.qizhi');

let mineSum = document.querySelector(".minesum");

const grade = document.querySelector(".grade");

const btns = document.querySelectorAll(".grade button");

let rightflag = document.querySelector(".rightflag");

//阻止鼠标右键点击雷区时，鼠标菜单的弹出
gameArea.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

//显示正确的插旗数
function rightNum(){
    //正确旗数
    let rn = 0;
    for(let i = 0 ; i < flagArray.length ; i++ ){
        if (flagArray[i].classList.contains('mine')){
            rn++;
        }
    }
    rightflag.innerHTML = `正确旗数: ${rn}`;
}

console.log(Mine);
function showAnswer() {
    //显示出全部没有插旗的地雷
    let all = true

    for (let i = 0; i < Mine.length; i++) {
        Mine[i].style.opacity = '1';
    }
    for (let i = 0; i < flagArray.length; i++) {
        if (flagArray[i].classList.contains('mine')) {
            //插对旗了
            flagArray[i].classList.add('right')

        } else {
            flagArray[i].classList.add('error')
            all = false
        }
    }

    if (!all || flagArray.length !== curl.minnum) {
        gaemover(false)
    }

    //取消事件
    gameArea.removeEventListener('mousedown', get)
}

//cell 是用户点击的DOM元素，单元格
//区域搜索函数，分析点击的是否是雷，是雷结束游戏，
function searchArea(cell) {
    //进入此判断，说明是雷，结束游戏，并显示其他雷所在的位置
    if (cell.classList.contains("mine")) {
        // alert('游戏失败)');
        cell.classList.add("error");
        showAnswer();
        rightNum();
        return;
    }

};

//搜索该单元格周围九宫格区域,雷达函数
function checkAround(cell) {

    if (!cell.classList.contains('flag')) {

        //去掉边框
        cell.parentNode.style.borderColor = 'transparent';
        //去掉可以插旗的类名标记
        cell.classList.remove("canFlag");
        //获取点击cell对应的数组坐标
        let tableItem = getTableItem(cell);
        // console.log(tableItem);
        //如果点击的是td ，即格子的边框，或者雷区外，则返回
        if (!tableItem) {
            return;
        }
        //代表当前格子已经呗检验过了，避免多次检验
        tableItem.checked = true;
        //不是雷，则分析周围是否有雷
        //有雷，则显示雷的个数
        //若周围没有雷，则继续分析周围有几个雷，依次扩散开来
        let mineNum = findMineNum(tableItem);
        // console.log(mineNum);
        if (!mineNum) {
            //进入此if，说明周围没有雷
            //需要继续搜索
            //再次调用边界函数
            let { rowUp, rowDown, colLeft, colRight } = getBound(tableItem);
            for (let i = rowUp; i <= rowDown; i++) {
                for (let j = colLeft; j <= colRight; j++) {
                    //调用雷达函数，回调函数
                    //使用getDom()函数将 tableData[i][j] 转化为Dom对象
                    if (!tabledata[i][j].checked) {
                        //如果该格子没有被检验，则可以进行此操作
                        //及继续检验周围格子是否有雷
                        checkAround(getDom(tabledata[i][j]));
                    }
                }
            }
        } else {
            //说明周围有雷，则当前格子里面需要显示雷的个数
            //给显示雷个数的数字增加颜色
            //设置数字颜色的数组
            let mineNumColor = [
                "zero",
                "one",
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
            ];
            //数字与周围雷的个数对等
            cell.classList.add(mineNumColor[mineNum]);
            //显示雷的个数
            if (!cell.classList.contains('mine')) {
                cell.innerHTML = mineNum;
            }

        }
    }
}

//根据 tabledata 中的 js 对象返回对应的下标的div
function getDom(obj) {
    let divArray = document.querySelectorAll("td div");
    return divArray[obj.index];
}

//对边界进行判断，判断周围是否有格子
//会返回该对象对应的四周的边界
function getBound(obj) {
    //确定边界
    //设置上下边界
    //上边界判断
    let rowUp = obj.row - 1 < 0 ? 0 : obj.row - 1;
    //下边界判断
    let rowDown = obj.row + 1 === curl.row ? curl.row - 1 : obj.row + 1;
    //左边界判断
    let colLeft = obj.col - 1 < 0 ? 0 : obj.col - 1;
    //右边界判断
    let colRight = obj.col + 1 === curl.col ? curl.col - 1 : obj.col + 1;
    //返回边界值
    return {
        rowUp,
        rowDown,
        colLeft,
        colRight,
    };
}

//返回周围一圈雷的数量
// obj 是格子对应的js对象
function findMineNum(obj) {
    let { rowUp, rowDown, colLeft, colRight } = getBound(obj);
    // let i = getBound(obj);
    // console.log(i);
    // console.log(getBound(obj));
    // //计数，表示周围雷的数量
    let count = 0;
    //遍历所点击的格子周围的九宫格
    for (let i = rowUp; i <= rowDown; i++) {
        for (let j = colLeft; j <= colRight; j++) {
            if (tabledata[i][j].type === 'mine') {
                // 判断 tabledata[i][j].type 是否为 mine ，如果是，则count计数增加
                count++;
            }
        }
    }
    return count;
}

//获得cell在数组中的值,及对应的js对象
function getTableItem(cell) {
    let index = cell.dataset.id;
    // console.log(index);
    //将二维数组改成一维数组  flat();
    let flatTableData = tabledata.flat();
    //filter()是一个数组
    return flatTableData.filter(item => item.index == index)[0];
    // let nb = flatTableData.filter(item => item.index == index);
    // console.log(nb);
}

// 存储用户插旗的dom元素
let flagArray = []
function iswin() {
    for (let i = 0; i < flagArray.length; i++) {

        if (!flagArray[i].classList.contains('mine')) {
            return false
        }
    }
    return true
}

function gaemover(iswin) {
    let mess = ''
    if (iswin) {
        mess = '真牛掰，你找出了所有的雷'
    } else {
        mess = '你干嘛~，哎呦~ (游戏失败)'
    }
    setTimeout(function () {
        alert(mess)
    }, 0)
}

//插旗操作，点击右键插旗或者取消插旗
function setFlag(cell) {
    if (cell.classList.contains('canFlag')) {
        if (!flagArray.includes(cell)) {
            flagArray.push(cell)
            cell.classList.add('flag')

            //判断插旗数
            if (flagArray.length === curl.minnum) {
                if (iswin()) {

                    gaemover(true)
                }
                //无论是什么都要显示答案
                showAnswer()

            }

        } else {
            //取消旗子
            let set = flagArray.indexOf(cell)
            flagArray.splice(set, 1)
            cell.classList.remove('flag')
        }
        flagNum.innerHTML = flagArray.length;
        //     let flagKey = false;
        //     if(flagKey){ 
        //         if(cell.classList.contains("flag")){
        //             cell.classList.remove("flag");
        //         }
        //         else{
        //             cell.classList.add("flag");
        //         }
        //         flagKey = true;
        //    }
        //     else
        //     {
        //         if(cell.classList.contains("flag")){
        //             cell.classList.remove("flag");
        //         }
        //         else{
        //             cell.classList.add("flag");
        //         }
        //         flagKey = false;
    }
};

//随机生成对应配置的地雷
function intat() {
    const array = new Array(curl.row * curl.col)

    for (let i = 0; i < array.length; i++) {
        array[i] = i
    }

    array.sort(() => Math.random() - 0.5) //方法()
    // array.sort(function () { return 0.5 - Math.random() }) //方法()

    return array.slice(0, curl.minnum)
}

//场景重置
function clearScene() {
    //清空之前的雷区，防止重复出现
    gameArea.innerHTML = "";
    //清空插旗的数组
    flagArray = [];
    //清空插旗的计数
    flagNum.innerHTML = 0;
    //将总雷数改成 curl.minnum 里面储存的数
    mineSum.innerHTML = curl.minnum;
    //清空正确旗数
    rightflag.innerHTML = "正确旗数: 0";
}

//设置初始函数
function inte() {
    //清空场景，或者重置场景
    clearScene();

    //生成地雷
    goarray = intat();

    //生成表格
    const table = document.createElement('table')

    //初始化格子下标
    let index = 0

    for (let i = 0; i < curl.row; i++) {
        const tr = document.createElement('tr')
        tabledata[i] = []
        for (let j = 0; j < curl.col; j++) {
            const td = document.createElement('td')
            const div = document.createElement('div')

            tabledata[i][j] = {
                row: i, //行
                col: j, //列
                type: 'number', //属性  number和mine
                value: 0,  //行
                index,
                checked: false   //检测
            }

            div.dataset.id = index
            //标记可插旗的div
            div.classList.add('canFlag')
            //  td.innerHTML = 0

            if (goarray.includes(tabledata[i][j].index)) {
                tabledata[i][j].type = 'mine'
                div.classList.add('mine')
            }
            tr.appendChild(td)
            td.appendChild(div)

            index++
        }

        table.appendChild(tr)
    }
    gameArea.appendChild(table)
    // console.log(table.innerHTML);
    //初始化时重新绑定事件
    gameArea.addEventListener("mousedown", get)
}

//鼠标左右键点击事件
function get(e) {
    // console.log(e.button);  检查鼠标左右键点击时的值，左键是0，右键是2
    if (e.button === 0) {
        //说明用户点击的是鼠标左键，进行区域搜索操作
        if(!e.target.classList.contains('flag')){
             searchArea(e.target);
             checkAround(e.target); 
        }
    }
    if (e.button === 2) {
        //说明用户点击的是鼠标右键，进行插旗操作
        setFlag(e.target);
    }
}

//绑定事件
function bindEvent() {
    //阻止鼠标右键点击雷区时，鼠标菜单的弹出
    gameArea.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });
    const btns = document.querySelectorAll(".grade button");
    //设置游戏难度
    grade.addEventListener("click", function (e) {
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("nowGrade");
        }
        e.target.classList.add("nowGrade");
        switch (e.target.innerHTML) {
            case "新手": {
                curl = goin.easy;
                break;
            }
            case "普通": {
                curl = goin.normal;
                break;
            }
            case "高玩": {
                curl = goin.hard;
                break;
            }
            case "炼狱": {
                curl = goin.abyss;
                break;
            }
        }
        //重新初始化
        inte();
    })
}

//扫雷游戏启动函数
function mains() {
    //游戏初始化
    inte();
    //绑定事件
    bindEvent();
}

mains();