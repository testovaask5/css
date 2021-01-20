const runButton = document.getElementById('run')
const confirmButton = document.getElementById('confirm-button')
const confirmSection = document.getElementById('confirm')
const section1 = document.getElementById('section1')

runButton.onclick = function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    })
}

confirmButton.addEventListener('click', () => {
    confirmSection.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
})

document.onwheel = function() {
    if (section1.getBoundingClientRect().top < window.innerHeight) {
        section1.classList.add('show')
    }
}

const mainMenu = document.querySelector('.main-menu')
const hamburger = document.querySelector('.hamburger-checkbox')
hamburger.onclick = function() {
    if (hamburger.checked) {
        mainMenu.classList.add('show')
    } else {
        mainMenu.classList.remove('show')
    }
}
