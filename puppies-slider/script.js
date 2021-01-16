const next = document.getElementById('next')
const prev = document.getElementById('prev')

const slider = document.querySelector('.slider')

const mediaBreakpoints = ['(max-width: 575px)',
'(min-width: 576px) and (max-width: 767px)',
'(min-width: 768px) and (max-width: 991px)',
'(min-width: 992px) and (max-width: 1199px)',
'(min-width: 1200px) and (max-width: 1399px)',
'(min-width: 1400px)'];

initSlider(slider, mediaBreakpoints)

/**
 * @param {Element} slider 
 */
function initSlider(slider, mediaBreakpoints = []) {
    const initialSlider = slider.innerHTML
    createSlider(slider)

    function createSlider() {
        if (initialSlider !== slider.innerHTML) slider.innerHTML = initialSlider;
        const sliderNum = getComputedStyle(slider).getPropertyValue('--slider-cols');
        const sliderLength = slider.children.length
        let stepCounter = Math.ceil(sliderNum / 2)
        initTails()
        initElemWidth()
        transform()

        // setInterval(() => {
        //     nextFunc()
        // }, 3000);

        next.onclick = nextFunc
        prev.onclick = prevFunc

        slider.parentElement.ontouchstart = touchStart
        slider.parentElement.ontouchmove = touchMove
        slider.parentElement.ontouchend = touchEnd

        let touchStartX = 0
        let touchCurX = 0

        /**
         * @param {TouchEvent} event 
         */
        function touchStart(event) {
            console.log('touchStart')
            touchStartX = event.touches[0].clientX
        }

        /**
         * @param {TouchEvent} event 
         */
        function touchMove(event) {
            touchCurX = event.touches[0].clientX
        }

        /**
         * @param {TouchEvent} event 
         */
        function touchEnd(event) {
            if (event.target.nodeName === 'BUTTON') {
                if ((touchCurX === 0) || (Math.abs(touchCurX - touchStartX) < event.target.offsetWidth)) {
                    return
                }
            }
            if (touchCurX - touchStartX > 0) prevFunc()
            else nextFunc()
            touchStartX = 0
            touchCurX = 0
        }

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

        function prevFunc() {
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
        }

        function initTails() {
            const tailStart = [...slider.children]
                .slice(-stepCounter)
                .map(el => el.outerHTML)
            const tailEndIndex = (sliderNum % 2) ? stepCounter : stepCounter + 1
            const tailEnd = [...slider.children]
                .slice(0, tailEndIndex)
                .map(el => el.outerHTML)
            slider.insertAdjacentHTML('afterbegin', tailStart.join(''))
            slider.insertAdjacentHTML('beforeend', tailEnd.join(''))
        }

        function initElemWidth() {
            const elem = slider.firstElementChild
            const elemML = getComputedStyle(elem).marginLeft;
            const elemMR = getComputedStyle(elem).marginRight;
            const elemWidth = `calc(100% / ${sliderNum} - ${elemML} - ${elemMR})`;
            [...slider.children].forEach(el => el.style.width = elemWidth)
        }

        function transform(transition = false) {
            if (transition) slider.style.transition = "transform .3s"
            else slider.removeAttribute('style')
            const transform = `translateX(calc((-100% / ${sliderNum}) * ${stepCounter}))`
            slider.style.transform = transform
        }
    }

    mediaBreakpoints.forEach(mediaBreak => {
        const mql = window.matchMedia(mediaBreak);
        mql.onchange = screenTest;
    })

    function screenTest(e) {
        if (e.matches) {
            createSlider(slider)
        }
    }
}