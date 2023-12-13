const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let colorSwitcher;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
startBtn.addEventListener('click', () => {
    if (!startBtn.hasAttribute('disabled')) {
        colorSwitcher = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);

    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);
    };
});
stopBtn.addEventListener('click', () => {
    clearInterval(colorSwitcher);
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
});


