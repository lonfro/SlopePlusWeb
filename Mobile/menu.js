let leftKey = localStorage.getItem('leftKey') || 'a';
let rightKey = localStorage.getItem('rightKey') || 'd';

function updateKeyButtons() {
  document.getElementById('leftKeyBtn').textContent = `Left: ${leftKey.toUpperCase()}`;
  document.getElementById('rightKeyBtn').textContent = `Right: ${rightKey.toUpperCase()}`;
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
document.getElementById('closeMenuBtn').onclick = closeKeybindMenu;

window.addEventListener('keydown', function(e) {
  if (waitingFor) {
    if (waitingFor === 'left') {
      leftKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      localStorage.setItem('leftKey', leftKey);
    } else if (waitingFor === 'right') {
      rightKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      localStorage.setItem('rightKey', rightKey);
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
});
window.addEventListener('keyup', function(e) {
    if (e.key.toLowerCase() === leftKey || e.key.toLowerCase() === 'a') {
        simulateKeyPress(true, false);
    }
    if (e.key.toLowerCase() === rightKey || e.key.toLowerCase() === 'd') {
        simulateKeyPress(false, false);
    }
});