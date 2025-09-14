const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Button click animation
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);

    if (button.classList.contains('clear')) {
      currentInput = '';
      display.value = '';
    } 
    else if (button.classList.contains('equal')) {
      try {
        // Replace × and ÷ with * and /
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        currentInput = eval(expression).toString();
        display.value = currentInput;
      } catch {
        display.value = "Error";
        currentInput = '';
      }
    } 
    else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});
