const fom = document.querySelector('.fom')
const sub = document.querySelector('[type="submit"]')

sub.addEventListener('submit', function () {
    fom.reset()
})