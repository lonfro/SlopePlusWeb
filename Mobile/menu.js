let leftKey = localStorage.getItem('leftKey') || 'a';
let rightKey = localStorage.getItem('rightKey') || 'd';
let hideKey = localStorage.getItem('hideKey') || '\\'; 

let waitHideKeyPressed = false;

function updateKeyButtons() {
  document.getElementById('leftKeyBtn').textContent = `Left: ${leftKey.toUpperCase()}`;
  document.getElementById('rightKeyBtn').textContent = `Right: ${rightKey.toUpperCase()}`;
  document.getElementById('hideKeyBtn').textContent = `Hide keybind: ${hideKey.toUpperCase()}`;
}


function openKeybindMenu() {
  document.getElementById('keybindMenu').classList.remove('hidden');
}
function closeKeybindMenu() {
  document.getElementById('keybindMenu').classList.add('hidden');
}
function isMenuOpen() {
  return !document.getElementById('keybindMenu').classList.contains('hidden');
}

let waitingFor = null;
document.getElementById('leftKeyBtn').onclick = function() {
  this.textContent = 'Press key...';
  waitingFor = 'left';
};
document.getElementById('rightKeyBtn').onclick = function() {
  this.textContent = 'Press key...';
  waitingFor = 'right';
};
document.getElementById('hideKeyBtn').onclick = function() {
  this.textContent = 'Press key...';
  waitingFor = 'hide';
};

document.getElementById('closeMenuBtn').onclick = closeKeybindMenu;

window.addEventListener('keydown', function(e) {
  if (waitingFor) {
    if (waitingFor === 'left') {
      leftKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      localStorage.setItem('leftKey', leftKey);
    } else if (waitingFor === 'right') {
      rightKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      localStorage.setItem('rightKey', rightKey);
    } else if (waitingFor === 'hide') {
      hideKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      localStorage.setItem('hideKey', hideKey);
    }
    waitingFor = null;
    updateKeyButtons();
    e.preventDefault();
    return;
  }
  // Toggle menu with Right Shift
  if (e.code === 'ShiftRight') {
    if (isMenuOpen()) {
      closeKeybindMenu();
    } else {
      openKeybindMenu();
    }
  }
});

updateKeyButtons();

window.addEventListener('storage', function() {
    leftKey = localStorage.getItem('leftKey') || 'a';
    rightKey = localStorage.getItem('rightKey') || 'd';
    hideKey = localStorage.getItem('hideKey') || '`';
});

window.addEventListener('keydown', function(e) {
    // Support both custom key and 'a' for left
    if (e.key.toLowerCase() === leftKey || e.key.toLowerCase() === 'a') {
        simulateKeyPress(true, true);
    }
    // Support both custom key and 'd' for right
    if (e.key.toLowerCase() === rightKey || e.key.toLowerCase() === 'd') {
        simulateKeyPress(false, true);
    }
    if ((e.key.toLowerCase() === hideKey) && !waitHideKeyPressed) {
        waitHideKeyPressed = true;
        const hider = document.querySelector('.hider');
        const isHiding = hider.style.display === 'none';

        if (isHiding) {
            hider.style.display = 'block';
            document.title = '';
            document.querySelector('link[rel="icon"]').href = 'data:,';
            document.querySelector('link[rel="shortcut icon"]').href = 'data:,';
        } else {
            
            hider.style.display = 'none';
            document.title = 'Slope Plus';
            document.querySelector('link[rel="icon"]').href = 'home/icon.png';
            document.querySelector('link[rel="shortcut icon"]').href = 'TemplateData/favicon.ico';
        }
    }
    
});
window.addEventListener('keyup', function(e) {
    waitHideKeyPressed = false;
    if (e.key.toLowerCase() === leftKey || e.key.toLowerCase() === 'a') {
        simulateKeyPress(true, false);
    }
    if (e.key.toLowerCase() === rightKey || e.key.toLowerCase() === 'd') {
        simulateKeyPress(false, false);
    }
});