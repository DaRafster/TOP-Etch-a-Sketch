const container = document.querySelector(".container");
const sizeButton = document.querySelector(".size-btn");
const eraseButton = document.querySelector(".erase-btn");
const randColorButton = document.querySelector(".random-color-btn");
const clearButton = document.querySelector(".clear-btn");
const colorButton = document.querySelector(".color-btn");
const colorPicker = document.querySelector("#color-picker");
const blackButton = document.querySelector(".black-btn");

function createCanvas(numOfDivsPerSide) {
  if (
    numOfDivsPerSide > 100 ||
    numOfDivsPerSide < 1 ||
    isNaN(numOfDivsPerSide)
  ) {
    alert("Please enter a number between 1 to 100");
    return;
  }

  currentSize = numOfDivsPerSide;
  container.innerHTML = "";
  for (let i = 0; i < numOfDivsPerSide; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < numOfDivsPerSide; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.height = `${600 / numOfDivsPerSide - 1}px`;
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
  addEventListeners();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

sizeButton.addEventListener("click", () => {
  const numOfDivsPerSide = prompt(
    "Please enter the size of the grid within the range of 1 to 100 (ex. for a 30x30 grid, enter 30) "
  );
  createCanvas(numOfDivsPerSide);
});

randColorButton.addEventListener("click", () => {
  randColorButton.classList.toggle("active");
  eraseButton.classList.remove("active");
  colorButton.classList.remove("active");
});

eraseButton.addEventListener("click", () => {
  eraseButton.classList.toggle("active");
  randColorButton.classList.remove("active");
  colorButton.classList.remove("active");
});

clearButton.addEventListener("click", () => {
  randColorButton.classList.remove("active");
  eraseButton.classList.remove("active");
  colorButton.classList.remove("active");
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
});

colorPicker.addEventListener("click", () => {
  randColorButton.classList.remove("active");
  eraseButton.classList.remove("active");
  colorButton.classList.add("active");
});

colorButton.addEventListener("click", () => {
  randColorButton.classList.remove("active");
  eraseButton.classList.remove("active");
  colorButton.classList.toggle("active");
});

function addEventListeners() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      if (eraseButton.classList.contains("active"))
        cell.style.backgroundColor = "white";
      else if (colorButton.classList.contains("active")) {
        cell.style.backgroundColor = colorPicker.value;
      } else if (
        !randColorButton.classList.contains("active") &&
        !eraseButton.classList.contains("active") &&
        !colorButton.classList.contains("active")
      ) {
        cell.style.backgroundColor = "black";
      } else if (randColorButton.classList.contains("active")) {
        cell.style.backgroundColor = `rgb(${getRandomNumber(
          0,
          256
        )}, ${getRandomNumber(0, 256)}, ${getRandomNumber(0, 256)})`;
      }
    });
  });
}

createCanvas(16);
