const rangeChar = document.getElementById("range-char");
const numberChar = document.getElementById("number-char");
const formContainer = document.getElementById("password-form");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const upperCaseEl = document.querySelector("#uppercase");
const passDisplay = document.querySelector("#password-display");

window.onload = () => {
  formContainer.reset();
};

const lowerCaseCharCodes = arrayLowToHigh(97, 122);
const numberCharCodes = arrayLowToHigh(48, 57);
const symbolCharCodes = arrayLowToHigh(33, 47)
  .concat(58, 64)
  .concat(91, 96)
  .concat(123, 126);
const upperCaseCharCodes = arrayLowToHigh(65, 90);

// Synchronize Range and Number Inputs
rangeChar.addEventListener("input", syncCharAmount);
numberChar.addEventListener("input", syncCharAmount);

function syncCharAmount(e) {
  const valueAmount = e.target.value;
  rangeChar.value = valueAmount;
  numberChar.value = valueAmount;
}

// Generating the password when the form is submitted
formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const charAmount = numberChar.value;
  const includeNumbers = numbersEl.checked;
  const includeUppercase = upperCaseEl.checked;
  const includeSymbols = symbolsEl.checked;
  const password = generatePassword(
    charAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  passDisplay.innerText = password;
});

function generatePassword(
  charAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = lowerCaseCharCodes;
  if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);
  if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);
  if (includeUppercase) charCodes = charCodes.concat(upperCaseCharCodes);

  const passwordChar = [];
  for (let h = 0; h < charAmount; h++) {
    let characterCodes =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordChar.push(String.fromCharCode(characterCodes));
  }
  return passwordChar.join("");
}

// Character Codes Loop
function arrayLowToHigh(low, high) {
  let array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
