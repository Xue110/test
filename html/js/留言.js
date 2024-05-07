const messageForm = document.getElementById('messageForm');
const usernameInput = document.getElementById('username');
const messageTextInput = document.getElementById('messageText');
const fontStyleInput = document.getElementById('textInput');
const fontColorInput = document.getElementById('fontColor');
const closee = document.querySelector(".close");
const leaveMessage = document.getElementById('leaveMessage');
const messagePopup = document.getElementById('messagePopup');
const submitt = document.querySelector(".submit");
const canvas = document.getElementById('messageCanvas');
const ctx = canvas.getContext('2d');
let messages = [];
let messagePositions = [];


leaveMessage.addEventListener('click', function () {
    messagePopup.style.display = 'block';
});

closee.onclick = function () {
    messagePopup.style.display = 'none';
};
// 封装获取留言的函数
function fetchMessages() {
    return fetch('http://localhost:8080/messages')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// 封装发送消息的函数
function sendMessage(data) {
    return fetch('http://localhost:8080/sendmessages', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

const defaultFont = '微软雅黑';
const defaultFontSize = '25px'; // 设置默认的文字大小为 20px

function drawMessages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    messages.forEach((message, i) => {
        const [username, messageText, fontName, fontColor] = message; // 移除对 fontSize 的解构
        let messagePosition = messagePositions[i];
        if (!messagePosition) {
            messagePosition = {
                x: canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 2 + 1
            };
            messagePositions[i] = messagePosition;
        }
        const font = `${defaultFontSize} ${fontName || defaultFont}`;
        ctx.fillStyle = fontColor || 'white';
        ctx.font = font;
        ctx.fillText(`${username}: ${messageText}`, messagePosition.x, messagePosition.y);
        messagePosition.x -= messagePosition.speed;
        if (messagePosition.x < -ctx.measureText(`${username}: ${messageText}`).width) {
            messagePosition.x = canvas.width;
            messagePosition.speed = Math.random() * 2 + 1;
        }
    });
    if (messages.length > 0) {
        requestAnimationFrame(drawMessages);
    }
}

// 提交按钮点击事件处理函数
document.querySelector('.submit').addEventListener('click', function () {
    const username = usernameInput.value.trim();
    const messageText = messageTextInput.value.trim();
    const fontStyle = fontStyleInput.value.trim();
    const fontColor = fontColorInput.value.trim();

    if (!username || !messageText) {
        alert('请输入用户名和留言内容！');
        return;
    }

    if (!/^#[0-9A-F]{6}$/i.test(fontColor)) {
        alert('请输入正确的十六进制颜色代码！');
        return;
    }

    const data = { username, messageText, fontStyle, fontColor };
    console.log(data);
    sendMessage(data)
        .then(data => {
            const { username, messageText, fontStyle, fontColor } = data;
            messages.push([username, messageText,fontStyle, fontColor]);
            messagePositions.push({ x: canvas.width, y: 50 + messages.length * 50, speed: messages[messages.length - 1][2] });
            messageTextInput.value = '';
            fontStyleInput.value = '';
            fontColorInput.value = '';
            drawMessages();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('发送消息时出错！');
        });
});

// 页面加载完毕后获取留言并绘制
document.addEventListener("DOMContentLoaded", function() {
    fetchMessages()
        .then(data => {
            messages = data.map(messages => [messages.username, messages.messageText, messages.fontStyle, messages.fontColor]);
            messagePositions = messages.map(() => ({ x: canvas.width, y: Math.random() * canvas.height, speed: Math.random() * 2 + 1 }));
            drawMessages();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('获取留言时出错！');
        });
});


// // 弹幕
// const canvas = document.getElementById('messageCanvas');
// const ctx = canvas.getContext('2d');

// // 模拟留言数据，格式为 [昵称, 留言内容, 速度]
// const messages = [
//     ['续江畔', '这网页做得真好'],
//     ['薛佶曜', '我做的就是好看'],
//     ['车宇轩', '一般般吧.....'],
//     ['卢文婷', '呜呼~'],
//     ['夏雅慧', '途径本地，留下姓名'],
//     ['刘新鸽', '哈喽啊~'],
//     ['马静', '呦，这是啥子'],
//     ['文宇航', '啊哈哈'],
//     ['苗茁', '艾玛'],
//     ['龙江', '噔噔噔噔噔'],
//     ['任秋颐', '哦吼~'],
//     ['郭益瑞', '不错诶！'],
//     ['杨嘉伟', '这是学长学姐做的嘛！'],
//     ['杨一名', '来了！'],
//     ['勾方虎', '哈哈哈'],
//     ['李玉杰', '我来看看'],
//     ['周佳慧', '可以可以'],
//     ['陈萌', '哇哦'],
// ];

// let messagePositions = [];

// for (let i = 0; i < messages.length; i++) {
//     messagePositions.push({
//         x: canvas.width,
//         y: Math.random() * (canvas.height - 30) + 30, // 随机位置
//         speed: Math.random() * 2 + 1, // 随机速度
//         message: messages[i]
//     });
// }

// function drawMessages() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.font = '23px Pacifico, cursive';
//     ctx.fillStyle = 'white'; // 设置文本颜色为白色

//     for (let i = 0; i < messagePositions.length; i++) {
//         const message = messagePositions[i].message[0] + ': ' + messagePositions[i].message[1];
//         ctx.fillText(message, messagePositions[i].x, messagePositions[i].y);

//         messagePositions[i].x -= messagePositions[i].speed;

//         if (messagePositions[i].x < -ctx.measureText(message).width) {
//             messagePositions[i].x = canvas.width;
//             messagePositions[i].y = Math.random() * (canvas.height - 30) + 30; // 重新设置随机位置
//             messagePositions[i].speed = Math.random() * 2 + 1; // 重新设置随机速度
//         }
//     }

//     requestAnimationFrame(drawMessages);
// }

// drawMessages();
