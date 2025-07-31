let leftKey = localStorage.getItem('leftKey') || 'a';
let rightKey = localStorage.getItem('rightKey') || 'd';

function updateKeyButtons() {
  document.getElementById('leftKeyValue').textContent = leftKey.toUpperCase();
  document.getElementById('rightKeyValue').textContent = rightKey.toUpperCase();
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
  document.getElementById('leftKeyValue').textContent = '...';
  waitingFor = 'left';
};
document.getElementById('rightKeyBtn').onclick = function() {
  document.getElementById('rightKeyValue').textContent = '...';
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
    updateKeyButtons();
});