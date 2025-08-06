const gameElement = document.getElementById('gameContainer');


let leftWasPressed = false;
let rightWasPressed = false;
const leftTouches = new Set();
const rightTouches = new Set();
const keyMap = new Map();


function simulateKeyPress(left, pressed) {
    const keyCode = left ? 65 : 68;
    const event = new KeyboardEvent(pressed ? 'keydown' : 'keyup', {
        keyCode: keyCode,
        view: window,
        bubbles: true,
        cancelable: false
    });
    window.dispatchEvent(event);
}

function isMobileDevice() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    var isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    var isIOSStandalone = window.navigator.standalone === true;
    return isMobileUA || isIOSStandalone;
}

function updateResizeKeyboard() {
    var kbBtn = document.getElementById('keyboard-btn');
    if (kbBtn) {
        if (isMobileDevice()) {
        kbBtn.style.display = 'block';
        } else {
        kbBtn.style.display = 'none';
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    updateResizeKeyboard();
});
window.addEventListener('resize', function() {
    updateResizeKeyboard();
});

document.getElementById('keyboard-btn').addEventListener('click', function() {
    var input = document.getElementById('keyboard-input');
    
    input.style.opacity = '0.01';
    input.style.pointerEvents = 'auto';
    input.style.position = 'fixed';
    input.style.top = '50%';
    input.style.left = '50%';
    
    if (document.activeElement === input) {

        input.blur();
        setTimeout(function() {
        input.style.opacity = '0';
        input.style.pointerEvents = 'none';
        input.style.position = 'absolute';
        input.style.top = '';
        input.style.left = '';
        }, 100);
    } else {

        input.value = '';
        input.focus();

        setTimeout(function() {
        input.style.opacity = '0';
        input.style.pointerEvents = 'none';
        input.style.position = 'absolute';
        input.style.top = '';
        input.style.left = '';
        }, 500);
    }
});

function touchHandler(event) {
    let leftPressed = false;
    let rightPressed = false;
    let bounds = gameElement.getBoundingClientRect();
    
    for (const touch of event.touches) {
        
        let touchX = touch.clientX - bounds.left;
        if (touchX < bounds.width / 2) {
            leftPressed = true;
        } else {
            rightPressed = true;
        }
    }

    if (leftPressed) {
        simulateKeyPress(true, true);
    } else {
        simulateKeyPress(true, false);
    }

    if (rightPressed) {
        simulateKeyPress(false, true);
    } else {
        simulateKeyPress(false, false);
    }

    

}


gameElement.addEventListener('touchmove', (event) => {
    touchHandler(event);  
}, true);

gameElement.addEventListener('touchend', (event) => {
    touchHandler(event);  
}, true);






gameElement.addEventListener('touchstart', (event) => {

        
    
    touchHandler(event);  
    for (const touch of event.changedTouches) {

        
        const simulatedEvent = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: touch.clientX,
            clientY: touch.clientY,
            button: 0
        });

        touch.target.dispatchEvent(simulatedEvent);
        for (const touch of event.changedTouches) {
            const simulatedEvent = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: touch.clientX,
                clientY: touch.clientY,
                button: 0
            });
        
            touch.target.dispatchEvent(simulatedEvent);        
        }
        // Calculate X relative to the container's left edge
        

    }
    
    
    event.preventDefault();
    event.stopImmediatePropagation();


    
}, true);






        


        
        