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

function closeWarning() {
    const gameDiv = document.getElementById('gameContainer');
    if (!gameDiv) return;
    const button = gameDiv.querySelector('button');
    if (button) {
        button.click();
        return true;
    }
    return false;
}

window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');

    void popup.offsetWidth;

    setTimeout(() => {
      popup.classList.add('hidden');
    }, 2000);

    const interval = setInterval(() => {
        if (closeWarning()) {
            clearInterval(interval); // Stop once clicked
        }
    }, 500);
});

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






        


        
        