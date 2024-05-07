


const works = document.querySelectorAll('.work')
function worksGg(){
    works.forEach(work =>{
        work.onclick = (e) =>{
            works.forEach(remove => remove.classList.remove('jello-horizontal') )
            works.forEach(remove => remove.classList.remove('puff-out-center'));
            work.classList.add('puff-out-center')
            setTimeout(function(){
                window.location.href=`${work.dataset.src}`
            },450)
        }
    })
}
worksGg()
function workJump(){
    works.forEach(work => {
        work.onmouseover = () =>{
            works.forEach(remove => remove.classList.remove('jello-horizontal') )
            work.classList.add('jello-horizontal')
        }
        work.onmouseout = () => {
            works.forEach(remove => remove.classList.remove('jello-horizontal') )
        }
    })
    
}
workJump()


const btns = document.querySelectorAll('.btn')
btns.forEach(btn => {
    btn.onclick = () =>{
        btns.forEach(remove => remove.classList.remove('vibrate-1'))
        btns.forEach(remove => remove.classList.remove('active'))
        let datawork = btn.getAttribute('data-work')
        works.forEach(work => {
            let workType = work.getAttribute('data-type')
            if(datawork == 'all'){
                work.style.display = 'block'
            }
            else if (datawork == workType){
                work.style.display = 'block'
            }else{
                work.style.display = 'none'
            }
        })
        btn.classList.add('vibrate-1')
        btn.classList.add('active')
    }

})




