// 为login和logina类添加一个flag，指示它们是否应该影响text类的active类
let loginVisible = false;
let loginaVisible = false;

$('.zhu_button').on('click', function login() {
    // 如果.zhu_button_two按钮正在执行功能，则关闭它
    if ($('.zhu_button_two').hasClass("zhui2")) {
        $('.zhu_button_two').removeClass("zhui2");
        $('.logina').hide();
        loginaVisible = false;
    }
    $(".text").addClass("active");
    $('.login').toggle({
        duration: 1000,
        complete: function () {
            loginVisible = $('.login').is(':visible');
            updateTextActiveClass();
        }
    });
    $(this).toggleClass("zhui2");
});

$('.zhu_button_two').click(function () {
    // 如果.zhu_button按钮正在执行功能，则关闭它
    if ($('.zhu_button').hasClass("zhui2")) {
        $('.zhu_button').removeClass("zhui2");
        $('.login').hide();
        loginVisible = false;
    }
    $(".text").addClass("active");
    $('.logina').toggle({
        duration: 1000,
        complete: function () {
            loginaVisible = $('.logina').is(':visible');
            updateTextActiveClass();
        }
    });
    $(this).toggleClass("zhui2");
    document.getElementById("admin").value = null
    document.getElementById("passworda").value = null
    document.getElementById("passwordb").value = null
    document.getElementById("email").value = null
    document.getElementById("code").value = null
});

// 更新text类的active类
function updateTextActiveClass() {
    if (loginVisible || loginaVisible) {
        $(".text").addClass("active");
    } else {
        $(".text").removeClass("active");
    }
}

// 在另一个事件句柄中删除text类的active类
$('.some_other_button').click(function () {
    $(".text").removeClass("active");
});
function loginUser() {
    localStorage.clear()
    var username = document.getElementById("username").value.trim(); // 使用 trim() 去除首尾空格
    var password = document.getElementById("password").value.trim();
    var regex = /^[a-zA-Z0-9]+$/;

    // 检查用户名和密码是否为空
    if (!username || !password) {
        alert("用户名和密码不能为空");
        return;
    }

    // 检查用户名格式是否正确
    if (!regex.test(username)) {
        // 用户名包含了其他字符
        document.querySelector(".nameTest").style.display = "block";
        console.log("用户名格式错误，只能包含字母和数字");
        return;
    } else {
        document.querySelector(".nameTest").style.display = "none";
    }
    localStorage.setItem("admin", username)
    if (document.querySelector(".aui-checkbox").checked) {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
    }
    var data = {
        username: username,
        password: password
    };
    console.log(data);
    // 构建查询参数字符串
    const queryParams = new URLSearchParams(data).toString();

    // 发送 GET 请求
    axios.get(`http://localhost:8080/login?${queryParams}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (response) {
            // 检查响应中是否包含 JWT 令牌
            if (response.data && response.data.code === 200 && response.data.info) {
                // 存储 JWT 令牌到本地存储
                localStorage.setItem('token', response.data.info);
                console.log(response.data);
                // 登录成功后跳转到首页
                window.location.href = './html/home.html';
            } else {
                // 登录失败，显示错误信息或执行其他操作
                throw new Error("登录失败，请重试");
            }
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("用户名或密码错误");
                } else {
                    alert("服务器响应错误，请稍后重试");
                }
                console.error('登录失败', error.response.status, error.response.statusText);
                console.error('服务器响应:', error.response.data);
            } else if (error.request) {
                alert("请求失败，请检查网络连接");
                console.error('请求失败:', error.request);
            } else {
                alert("发生错误，请稍后重试");
                console.error('发生错误:', error.message);
            }
        });

}

function registerUser() {
    var username = document.getElementById("admin").value;
    var password = document.getElementById("passworda").value;
    var repassword = document.getElementById("passwordb").value;
    var email = document.getElementById("email").value
    var code = document.getElementById("code").value
    var msg = document.getElementById("msg").innerText
    var regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(username)) {
        // 用户名只包含字母和数字
        document.querySelector(".renameTest").style.display = "none"
    } else {
        // 用户名包含了其他字符
        document.querySelector(".renameTest").style.display = "block"
        console.log("用户名格式错误，只能包含字母和数字");
        return
    }
    if (password !== repassword) {
        document.querySelector('.passwordMismatch').style.display = 'block';
        return;
    }
    // 清除密码不一致警告
    document.querySelector('.passwordMismatch').style.display = 'none';
    if (code !== msg) {
        document.querySelector('.codeMismatch').style.display = 'block';
        return;
    }
    // 清除验证码不一致警告
    document.querySelector('.codeMismatch').style.display = 'none';

    // 构造请求参数
    const userdata = {
        username: username,
        password: password,
        email: email,
    };
    console.log(userdata);
    axios.post("http://localhost:8080/register", userdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.data.code === 200) {
                // 隐藏注册框，显示登录框
                $('.zhu_button').toggleClass("zhui2");
                $('.zhu_button_two').toggleClass("zhui2");
                $('.logina').hide();
                loginaVisible = false;
                $('.login').show();
                loginVisible = true;
                updateTextActiveClass(); // 更新text类的active类
                document.getElementById("username").value = username;
                document.getElementById("password").value = password;
            }
            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("注册失败");
                } else {
                    alert("服务器相应错误，请稍后重试");
                }
                console.error('登录失败', error.response.status, error.response.statusText);
                console.error('服务器响应:', error.response.data);
            } else if (error.request) {
                alert("请求失败，请检查网络连接");
                console.error('请求失败:', error.request);
            } else {
                alert("发生错误，请稍后重试");
                console.error('发生错误:', error.message);
            }
        });
}

/* 产生随机数的函数 */
function validateCode(n) {
    //验证码中可能包含的字符
    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var ret = " ";  //保存生成的验证码
    //利用循环，随机产生验证码中的每个字符
    for (var i = 0; i < n; i++) {
        var index = Math.floor(Math.random() * 62); //随机产生一个0~62之间的数值
        //将随机产生的数值当作字符串的位置下标，在字符串s中取出该字符，并入ret中
        ret += s.charAt(index);
    }
    return ret; //返回产生的验证码
}

//显示随机数函数
function show() {
    //在id为msg的对象中显示验证码
    document.getElementById("msg").innerHTML = validateCode(4);
}
window.onload = show; //页面加载时执行函数show

if (document.getElementById("password").value !== "") {
    document.getElementById("eye-hide").style.display = "inline";
} else {
    document.getElementById("eye-hide").style.display = "none";
}
document.getElementById("password").addEventListener('input', function () {
    if (document.getElementById("password").value !== "") {
        document.getElementById("eye-hide").style.display = "inline";
    } else {
        document.getElementById("eye-hide").style.display = "none";
    }
});
document.getElementById("passworda").addEventListener('input', function () {
    if (document.getElementById("passworda").value !== "") {
        document.getElementById("zc-eye-hide").style.display = "inline";
    } else {
        document.getElementById("zc-eye-hide").style.display = "none";
    }
});

document.getElementById("passwordb").addEventListener('input', function () {
    if (document.getElementById("passwordb").value !== "") {
        document.getElementById("rzc-eye-hide").style.display = "inline";
    } else {
        document.getElementById("rzc-eye-hide").style.display = "none";
    }
});

//切换登录密码显示
function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var eyeShow = document.getElementById("eye-show");
    var eyeHide = document.getElementById("eye-hide");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeShow.style.display = "inline";
        eyeHide.style.display = "none";
    } else {
        passwordInput.type = "password";
        eyeShow.style.display = "none";
        eyeHide.style.display = "inline";
    }
}
//切换注册密码显示{
function zcTogglePasswordVisibility() {
    var passwordInput = document.getElementById("passworda");
    var eyeShow = document.getElementById("zc-eye-show");
    var eyeHide = document.getElementById("zc-eye-hide");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeShow.style.display = "inline";
        eyeHide.style.display = "none";
    } else {
        passwordInput.type = "password";
        eyeShow.style.display = "none";
        eyeHide.style.display = "inline";
    }
}
//切换注册再次密码显示{
function rzcTogglePasswordVisibility() {
    var passwordInput = document.getElementById("passwordb");
    var eyeShow = document.getElementById("rzc-eye-show");
    var eyeHide = document.getElementById("rzc-eye-hide");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeShow.style.display = "inline";
        eyeHide.style.display = "none";
    } else {
        passwordInput.type = "password";
        eyeShow.style.display = "none";
        eyeHide.style.display = "inline";
    }
}