/* 产生随机数的函数 */
function validateCode(n){
    //验证码中可能包含的字符
    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var ret = " ";  //保存生成的验证码
    //利用循环，随机产生验证码中的每个字符
    for(var i=0;i<n;i++){
        var index = Math.floor(Math.random() * 62); //随机产生一个0~62之间的数值
        //将随机产生的数值当作字符串的位置下标，在字符串s中取出该字符，并入ret中
        ret += s.charAt(index);
    }
    return ret; //返回产生的验证码
}

//显示随机数函数
function show(){
    //在id为msg的对象中显示验证码
    document.getElementById("msg").innerHTML = validateCode(4);
}
window.onload = show; //页面加载时执行函数show