const next = document.getElementById('next')
const prev = document.getElementById('prev')

const elems = document.querySelectorAll('.el')
let counter = 0

next.addEventListener('click', () => {
    elems[counter % elems.length].classList.remove('show')
    counter++
    elems[counter % elems.length].classList.add('show')
})

prev.addEventListener('click', () => {
    if (counter == 0) counter = elems.length
    elems[counter % elems.length].classList.remove('show')
    counter--
    elems[counter % elems.length].classList.add('show')
})