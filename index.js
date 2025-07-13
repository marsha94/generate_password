let lengthSlider = document.querySelector("#length-slider");
lengthSlider.oninput = () => {
  let value = lengthSlider.value;
  document.querySelector("#length-output").textContent = value;
};

let numberSlider = document.querySelector("#number-slider");
numberSlider.oninput = () => {
  let value = numberSlider.value;
  document.querySelector("#number-output").textContent = value;
};

let symbolSlider = document.querySelector("#symbol-slider");
symbolSlider.oninput = () => {
  let value = symbolSlider.value;
  document.querySelector("#symbol-output").textContent = value;
};

let pw1 = document.querySelector("#pw-1");
let pw2 = document.querySelector("#pw-2");
let toggleLightDark = document.querySelector("#toggle");
let toggleOn = true;

toggleLightDark.addEventListener("click", () => {
  document.querySelector("html").toggleAttribute("data-dark-mode");
  if (toggleOn) {
    toggleLightDark.textContent = "Light Mode";
  } else {
    toggleLightDark.textContent = "Dark Mode";
  }
  toggleOn = !toggleOn;
});

let pwButtons = document.querySelectorAll(".password-text");
pwButtons.forEach((button) => button.addEventListener("click", copy));

function copy(event) {
  let copyPw = event.target.textContent;
  navigator.clipboard.writeText(copyPw);
  alert("Password Copied");
}

let randGen = {
  lower: () => {
    return Math.floor(Math.random() * 26) + 97;
  },
  upper: () => {
    return Math.floor(Math.random() * 26) + 65;
  },
  numbers: () => {
    return Math.floor(Math.random() * 10) + 48;
  },
  symbols: () => {
    return Math.floor(Math.random() * 4) + 35;
  },
};

let genPwBtn = document.querySelector("#gen-pw-btn");

genPwBtn.addEventListener("click", () => {
  pw1.textContent = genRandomPassword();
  pw2.textContent = genRandomPassword();
});

function genRandomPassword() {
  let pwTempArr = [];
  let numReq = numberSlider.value;
  let symbolReq = symbolSlider.value;
  let pwLength = lengthSlider.value;
  let remainingPwCount = pwLength - numReq - symbolReq;

  let initialPwArr = [
    String.fromCharCode(randGen.lower()),
    String.fromCharCode(randGen.upper()),
  ];

  for (let i = 0; i < numReq; i++) {
    pwTempArr.push(String.fromCharCode(randGen.numbers()));
  }

  for (let i = 0; i < symbolReq; i++) {
    pwTempArr.push(String.fromCharCode(randGen.symbols()));
  }

  for (let i = 0; i < remainingPwCount; i++) {
    if (i % 2) {
      pwTempArr.push(String.fromCharCode(randGen.lower()));
    } else {
      pwTempArr.push(String.fromCharCode(randGen.upper()));
    }
  }

  let shufflePw = shuffleArr(pwTempArr);
  let finalPw = [...initialPwArr, ...shufflePw].join("");
  console.log(finalPw);

  return finalPw;
}

function shuffleArr(array) {
  for (let i = 0; i < array.length; i++) {
    const random = Math.floor(Math.random() * (1 + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
  return array;
}
