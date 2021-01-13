const next = document.getElementById('next')
const prev = document.getElementById('prev')

const slider = document.querySelector('.slider')
createSlider(slider, 1)

/**
 * 
 * @param {Element} slider 
 * @param {number} sliderNum 
 */
function createSlider(slider, sliderNum) {
    const sliderLength = slider.children.length
    let stepCounter = Math.ceil(sliderNum / 2)
    initTails()
    const step = initElemWidth()
    transform()
    setInterval(() => {
        nextFunc()
    }, 3000);

    next.addEventListener('click', nextFunc)

    function nextFunc() {
        if (stepCounter < sliderLength + 1) {
            stepCounter++;
            transform(true)
        }
        if (stepCounter == sliderLength + 1) {
            setTimeout(() => {
                stepCounter = 1
                transform()
            }, 300)
        }
    }

    prev.addEventListener('click', () => {
        if (stepCounter > 0) {
            stepCounter--;
            transform(true)
        }
        if (stepCounter == 0) {
            setTimeout(() => {
                stepCounter = sliderLength
                transform()
            }, 300)
        }
    })

    function initTails() {
        const tailStart = [...slider.children]
            .slice(-stepCounter)
            .map(el => el.outerHTML)
        const tailEnd = [...slider.children]
            .slice(0, stepCounter)
            .map(el => el.outerHTML)
        slider.insertAdjacentHTML('afterbegin', tailStart.join(''))
        slider.insertAdjacentHTML('beforeend', tailEnd.join(''))
    }

    function initElemWidth() {
        const elem = slider.firstElementChild
        const elemML = parseInt(getComputedStyle(elem).marginLeft);
        const elemMR = parseInt(getComputedStyle(elem).marginRight);
        const sliderWidth = parseInt(getComputedStyle(slider).width);
        const elemWidth = (sliderWidth - sliderNum * elemML - sliderNum * elemMR) / sliderNum;
        [...slider.children].forEach(el => el.style.width = elemWidth + 'px')
        return Math.ceil(elemWidth + elemML + elemMR)
    }

    function transform(transition = false) {
        if (transition) slider.style.transition = "transform .3s"
        else slider.removeAttribute('style')
        slider.style.transform = `translateX(-${step * stepCounter}px)`
    }
}