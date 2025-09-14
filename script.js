const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

function isOperator(char) {
  return ["+", "−", "×", "÷", "/","*"].includes(char);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "AC") {
      currentInput = "";
      display.value = "";
    } 
    else if (value === "DE") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } 
    else if (value === "=") {
      try {
        let expression = currentInput
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");
        currentInput = eval(expression).toString();
        display.value = currentInput;
      } catch {
        display.value = "Error";
        currentInput = "";
      }
    } 
    else {
      // Prevent starting with an operator (except minus)
      if (currentInput === "" && isOperator(value) && value !== "−") {
        return;
      }

      // Replace last operator if pressing another operator
      if (isOperator(value) && isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
      
      display.value = currentInput;
    }
  });
});
/.........................................................../ 
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    currentInput += e.key;
  } 
  else if (["+", "-", "*", "/", "×", "÷"].includes(e.key)) {
    if (currentInput === "" && e.key !== "-") return;
    if (isOperator(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1) + e.key;
    } else {
      currentInput += e.key;
    }
  } 
  else if (e.key === "Enter") {
    calculate(); // Calls your existing calculation function
    return;
  } 
  else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } 
  else if (e.key === "Escape") {
    currentInput = "";
  } 
  else if (e.key === ".") {
    currentInput += ".";
  }
  updateDisplay(); // Updates the calculator display
});
document.addEventListener("keydown", (e) => {
  // Numbers 0-9
  if (e.key >= "0" && e.key <= "9") {
    currentInput += e.key;
  } 
  // Decimal point
  else if (e.key === ".") {
    currentInput += ".";
  }
  
  updateDisplay(); // Show typed numbers on calculator
});
