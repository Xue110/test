

// 处理文件选择事件的函数
function handleFileSelect(event) {
   var file = event.target.files[0]; // 获取用户选择的文件
   var reader = new FileReader(); // 创建一个 FileReader 对象

   // 文件读取完成后的回调函数
   reader.onload = function (e) {
      let imgContainer = document.querySelector('.image-container'); // 获取图片容器元素
      var imgElement = document.createElement("img"); // 创建一个 img 元素
      imgElement.src = e.target.result; // 设置 img 元素的 src 属性为文件内容
      let imgCl = imgContainer.appendChild(imgElement); // 将 img 元素添加到图片容器中
      let file = document.querySelector('.file')
      let style = prompt('请输入照片风格（参考左边侧栏）')
      let pName = prompt('为你的照片取个满意的名字吧！(方便查找照片)')
      imgCl.setAttribute('data-search', `${pName}`)
      imgCl.setAttribute("data-cat", `${style}`); // 设置 img 元素的自定义属性 data-cat 为 "animal"
      imgCl.setAttribute("alt", `${file.value}`); // 设置 img 元素的 alt 属性为空字符串
      const arr = JSON.parse(localStorage.getItem('imageData')) || []; // 从本地存储中获取图片信息数组，如果为空则初始化为空数组
      const newObj = {
         src: imgCl.src,
         cat: imgCl.dataset.cat,
         search: imgCl.dataset.search,
         type: file.value
      };
      arr.push(newObj); // 将新的图片信息对象添加到数组中
      localStorage.setItem('imageData', JSON.stringify(arr)); // 将更新后的图片信息数组存储在本地存储中
      window.location.reload();
   };
   reader.readAsDataURL(file); // 以DataURL格式读取用户选择的文件
}
// 从本地存储中获取图片信息并显示在页面上
const arr = JSON.parse(localStorage.getItem('imageData')) || []; // 从本地存储中获取存储的图片信息，如果为空则初始化为空数组
let imgContainer = document.querySelector('.image-container'); // 获取用于显示图片的容器元素
const idea = document.querySelector('.idea')
if (arr.length >= 1) {
   idea.style.display = 'none'
}
else {
   idea.style.display = 'block'
}
// 遍历存储在本地存储中的图片信息数组，并逐个创建对应的 img 元素显示在页面上
arr.forEach(image => {
   const imgElement = document.createElement("img"); // 创建一个新的 img 元素
   imgElement.src = image.src // 设置 img 元素的 src 属性为图片的链接
   imgElement.cat = image.cat
   imgElement.search = image.search
   imgElement.type = image.type
   imgElement.setAttribute('data-search', `${imgElement.search}`)
   imgElement.setAttribute("data-cat", `${imgElement.cat}`);
   imgElement.setAttribute("alt", `${imgElement.type}`); // 设置 img 元素的 alt 属性为空字符串（可根据需要修改）
   imgContainer.appendChild(imgElement); // 将创建的 img 元素添加到图片容器中


});


let galleryImages = document.querySelectorAll('.image-container img');
let imagePop = document.querySelector('.image-popup');
galleryImages.forEach(img => {
   img.onclick = () => {
      let imageSrc = img.getAttribute('src');
      imagePop.style.display = 'flex';
      imagePop.querySelector('img').src = imageSrc;
   };
});
imagePop.onclick = () => {
   imagePop.style.display = 'none';
};
document.querySelector('#search-box').oninput = () => {
   var value = document.querySelector('#search-box').value.toLowerCase();
   galleryImages.forEach(img => {
      var filter = img.getAttribute('data-search').toLowerCase();
      if (filter.indexOf(value) > -1) {
         img.style.display = 'block';
      } else {
         img.style.display = 'none';
      };
   });
};

function addMore() {
   const add = document.querySelector('.add')
   let category = document.querySelector('.category')
   add.onclick = () => {
      let more = prompt('请输入你需要添加的风格！')
      let adds = document.createElement('div')
      let addStyle = category.appendChild(adds);
      addStyle.setAttribute('class', 'btn')
      addStyle.setAttribute('data-category', `${more}`)
      addStyle.innerHTML = `${more}`
      let arrMore = JSON.parse(localStorage.getItem('addData')) || []
      const obj = {
         data: addStyle.dataset.category
      }
      arrMore.push(obj)
      localStorage.setItem('addData', JSON.stringify(arrMore))
      window.location.reload();
   }
   let arrMore = JSON.parse(localStorage.getItem('addData')) || []
   arrMore.forEach(add => {
      let adds = document.createElement('div')
      adds.data = add.data
      adds.setAttribute('class', 'btn')
      adds.setAttribute('data-category', `${adds.data}`)
      adds.innerHTML = `${adds.data}`
      category.appendChild(adds)

   })

}
addMore()

let categoryBtn = document.querySelectorAll('.category .btn');
categoryBtn.forEach(btn => {
   btn.onclick = () => {
      categoryBtn.forEach(remove => remove.classList.remove('active'));
      categoryBtn.forEach(remove => remove.classList.remove('vibrate-1'));
      let dataCategory = btn.getAttribute('data-category');
      galleryImages.forEach(img => {
         var imgCat = img.getAttribute('data-cat');
         if (dataCategory == 'all') {
            img.style.display = 'block';
         } else if (dataCategory == imgCat) {
            img.style.display = 'block';
         } else {
            img.style.display = 'none';
         }
      });
      btn.classList.add('active');
      btn.classList.add('vibrate-1');
   };
});
let typeBtn = document.querySelectorAll('.type .btn');
typeBtn.forEach(btn => {
   btn.onclick = () => {
      typeBtn.forEach(remove => remove.classList.remove('active'));
      typeBtn.forEach(remove => remove.classList.remove('vibrate-1'));
      let datatype = btn.getAttribute('data-type');
      galleryImages.forEach(img => {
         var imgtype = img.getAttribute('alt').split('.').pop();
         if (datatype == 'all') {
            img.style.display = 'block';
         } else if (datatype == imgtype) {
            img.style.display = 'block';
         } else {
            img.style.display = 'none';
         }
      });
      btn.classList.add('active');
      btn.classList.add('vibrate-1');
   };
});
document.querySelector('.reset-btn .btn').onclick = () => {
   window.location.reload();
};
const images = document.querySelectorAll('img');

// 为每个<img>元素添加鼠标移动和鼠标离开的事件监听器
images.forEach((img) => {
   img.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
         moveImage(e, img);
      });
   });

   img.addEventListener('mouseleave', (e) => {
      window.requestAnimationFrame(() => {
         resetImageTransform(img);
      });
   });
});

// 修改moveImage函数，让它接受事件对象和当前操作的img元素作为参数
function moveImage(e, img) {
   const box = img.getBoundingClientRect();
   const speed = 6.5; // 速度因子，可以根据需要调整
   const calcX = (e.clientY - box.y - (box.height / 2)) / speed;
   const calcY = (e.clientX - box.x - (box.width / 2)) / speed * -1;
   img.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
   img.style.transition = 'transform 0.1s'; // 平滑变换效果
}

// 添加一个新函数来重置图片的变换效果
function resetImageTransform(img) {
   img.style.transform = 'rotateX(0) rotateY(0)';
}

function muiseMore() {
   const player = document.querySelector('.player')
   const muisc_information = document.querySelector('.muisc-information')
   player.addEventListener('mouseenter', function () {
      muisc_information.style.top = '0px'
   })

}
muiseMore()

const audioPlayer = document.querySelector('#audioPlayer')
const pre = document.querySelector('.pre')
const next = document.querySelector('.next')
const play = document.querySelector('.play')
const audio = document.querySelector('audio')
const name = document.querySelector('.name')
const songer = document.querySelector('.songer')
const source = document.querySelector('source')
const musicImg = document.querySelector('#img')
console.log(source);
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
         src: 'song/Trash Beats - ｃｏｚｙ.mp3',
         name: 'ｃｏｚｙ',
         songer: 'Trash Beats',
      },
      {
         img: 'active2',
         src: 'song/bert - daydreamz.mp3',
         name: 'daydreamz',
         songer: 'bert ',
      },
      {
         img: 'active3',
         src: 'song/crwsox - mall rats.mp3',
         name: 'mall rats',
         songer: 'crwsox ',
      },
      {
         img: 'active4',
         src: 'song/Nacyan - 落日.mp3',
         name: ' 落日',
         songer: 'Nacyan',
      },
      {
         img: 'active5',
         src: 'song/a l e x - B&.mp3',
         name: ' B&',
         songer: 'a l e x',
      }
   ]

   let i = 0
   console.log(data[0]);
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
      audio.play()
   })
}

playPause()




