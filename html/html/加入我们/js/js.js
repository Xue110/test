document.addEventListener("DOMContentLoaded", () => {
    const sub = document.getElementById("submit");

    sub.addEventListener("click", (event) => {
        const nameInput = document.getElementById("name");
        const classInput = document.getElementById("class");
        const addressInput = document.getElementById("address");
        const dateInput = document.getElementById("date");
        const phoneNumberInput = document.getElementById("phonenumber");
        const introductionInput = document.getElementById("text");

        const name = nameInput.value;
        const classroom = classInput.value;
        const address = addressInput.value;
        const date = dateInput.value;
        const phoneNumber = phoneNumberInput.value;
        const introduction = introductionInput.value;

        // 检查输入是否为空
        if (name === '' || classroom === '' || phoneNumber === '' || introduction === '') {
            alert('请填写所有信息。'); // 显示警告消息
            return;
        }

        // 检查手机号是否符合格式（例如：只包含数字且长度为11）
        const phonePattern = /^[0-9]{11}$/;
        if (!phonePattern.test(phoneNumber)) {
            alert('请输入有效的手机号（11位数字）。');
            return;
        }

        // 检查日期格式是否正确（例如：YYYY-MM-DD）
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(date)) {
            alert('请输入正确的日期格式（YYYY-MM-DD）。');
            return;
        }


        const sexInput = document.getElementById("sex");
        const sex = sexInput.value;

        const data = {
            name: name,
            sex: sex,
            classroom: classroom,
            address: address,
            date: date,
            phonenumber: phoneNumber,
            introduction: introduction
        };
        // 从本地存储中获取令牌
        const token = localStorage.getItem('token');

        // 构建请求头，包括令牌
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 添加令牌到请求头
        };

        return fetch('http://localhost:8080/join', {
            method: 'POST',
            headers: headers, // 使用包含令牌的请求头
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    console.log('报名成功');
                    // 清空输入框的值
                    nameInput.value = '';
                    classInput.value = '';
                    addressInput.value = '';
                    dateInput.value = '';
                    phoneNumberInput.value = '';
                    introductionInput.value = '';
                    // 显示成功消息
                    alert('报名成功！');
                } else {
                    console.error('报名失败');
                    // 显示失败消息
                    alert('报名失败，请稍后再试。');
                }
            })
            .catch(error => {
                console.error('网络错误:', error);
                // 显示网络错误消息
                alert('网络错误，请稍后再试。');
            });
    });
});
