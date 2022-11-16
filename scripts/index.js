//#region global variables
const background = document.querySelector(".background");
const body = document.querySelector("body");
const file = document.querySelector("#file");
const reader = new FileReader();

const time = document.querySelector("#time");
const meridiem = document.querySelector("#meridiem");

const quote = document.querySelector("#quote-display p");
const quoteBtn = document.querySelector("#quote-btn");
const quoteDiv = document.querySelector("#quote-div");
const quoteInput = document.querySelector("#quote-input");
let quoteArray = [
  "Never gonna give you up",
  "Whatever you do, do it well",
  "Impossible is for the unwilling",
  "It always seems impossible until it's done",
  "There is no substitute for hard work",
];
let quoteInterval;
let quoteShuffleFlag;

const todoBtn = document.querySelector("#todo-btn");
const todoListDiv = document.querySelector("#todo-list-div");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-input");
let toDoArray = [];

const shuffle = document.querySelector("#shuffle");
const font = document.querySelector(".fa-font");
const clock = document.querySelector(".fa-clock");
const lightbulb = document.querySelector(".fa-lightbulb");
const idCard = document.querySelector(".fa-id-card");
const trash = document.querySelector(".fa-trash");
const fontSelect = [
  "Roboto",
  "Roboto Condensed",
  "Montserrat",
  "Oswald",
  "Ubuntu",
];
let fontIndex = 0;
let timeFlag = 1;
let dimFlag = 0;

const nameInput = document.querySelector("#name-input");
const focusInput = document.querySelector("#focus-input");
const nameInputDiv = document.querySelector("#name-input-div");
const focusInputDiv = document.querySelector("#focus-input-div");
const displayInputs = document.querySelector("#display-inputs");
const displayName = document.querySelector("#display-name");
const displayFocus = document.querySelector("#display-focus");
//let greeting;
let username;
let userfocus;
//#endregion
//#region functions
function getImage() {
  const storedImage = localStorage.getItem("image");
  if (storedImage !== null) {
    background.style.backgroundImage = `url(${storedImage})`;
  } else if (window.innerWidth > window.innerHeight) {
    background.style.backgroundImage = "url('https://picsum.photos/1920/1080')";
  } else {
    background.style.backgroundImage = "url('https://picsum.photos/1080/1920')";
  }
}
function getTime() {
  const storedFlag = localStorage.getItem("timeFlag");
  if (storedFlag !== null) timeFlag = parseInt(storedFlag);

  const date = new Date();
  const timeConverted = date.toLocaleString([], {
    hour12: timeFlag,
    hour: "2-digit",
    minute: "2-digit",
  });
  if (timeFlag) {
    let timeSplit = timeConverted.split(" ");
    time.textContent = timeSplit[0];
    meridiem.textContent = timeSplit[1];
  } else {
    time.textContent = timeConverted;
    meridiem.textContent = "";
  }
}
function greeting() {
  const hour = new Date().getHours();
  let message;
  if (hour >= 0 && hour <= 11) {
    message = "Good morning,";
  } else if (hour >= 12 && hour <= 17) {
    message = "Good afternoon,";
  } else {
    message = "Good evening,";
  }
  return message;
}
function getUser() {
  const storedUsername = localStorage.getItem("username");
  const storedUserfocus = localStorage.getItem("userfocus");
  if (storedUsername === null) {
    nameInputDiv.classList.remove("hidden");
  } else {
    nameInputDiv.classList.add("hidden");
    username = storedUsername;
    displayName.textContent = `${greeting()} ${username}!`;

    if (storedUserfocus === null) {
      displayInputs.classList.add("hidden");
      focusInputDiv.classList.remove("hidden");
    } else {
      userfocus = storedUserfocus;
      displayFocus.textContent = `'${userfocus}'`;
    }
  }
  if (storedUsername !== null && storedUserfocus !== null) {
    displayInputs.classList.remove("hidden");
  }
}
function getQuote() {
  const storedquoteArray = JSON.parse(localStorage.getItem("quoteArray"));
  if (storedquoteArray !== null) {
    quoteArray = [];
    quoteArray.push(...storedquoteArray);
    quote.textContent = '"' + quoteArray[quoteArray.length - 1] + '"';
  } else randomQuote();
}
function getToDo() {
  let storedToDoArray = JSON.parse(localStorage.getItem("toDoArray"));
  if (storedToDoArray !== null) {
    toDoArray.push(...storedToDoArray);
    for (const todo of toDoArray) createToDo(todo);
  }
}
function getFont() {
  let storedIndex = localStorage.getItem("fontIndex");
  if (storedIndex) fontIndex = parseInt(storedIndex);
  body.style.fontFamily = fontSelect[fontIndex];
}
function getBrightness() {
  let storedFlag = parseInt(localStorage.getItem("dimFlag"));
  if (storedFlag) {
    background.classList.add("dim");
    dimFlag = storedFlag;
  }
}

function randomQuote() {
  let x = Math.floor(Math.random() * quoteArray.length);
  quote.textContent = '"' + quoteArray[x] + '"';
}

function createToDo(string) {
  let newLi = document.createElement("li");
  newLi.classList.add("li");

  let newP = document.createElement("p");
  newP.textContent = string;
  newP.classList.add("p");

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("button");
  deleteBtn.classList.add("fa-solid");
  deleteBtn.classList.add("fa-delete-left");

  newLi.append(newP);
  newLi.append(deleteBtn);
  todoList.append(newLi);

  newLi.addEventListener("click", () => {
    newP.classList.toggle("line-through");
  });
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(newLi);

    let leftovers = document.querySelectorAll(".p");
    let array = [];
    for (const leftover of leftovers) array.push(leftover.textContent);
    toDoArray = [];
    toDoArray.push(...array);
    localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
  });
}
//#endregion

//event listeners
//#region main
nameInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    username = nameInput.value.trim();
    if (username) {
      nameInputDiv.classList.add("hidden");
      localStorage.setItem("username", username);
      displayName.textContent = `${greeting()} ${username}!`;
      focusInputDiv.classList.remove("hidden");
    }
  }
});
focusInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    userfocus = focusInput.value.trim();
    if (userfocus) {
      focusInputDiv.classList.add("hidden");
      localStorage.setItem("userfocus", userfocus);
      displayFocus.textContent = `'${userfocus}'`;
      displayInputs.classList.remove("hidden");
    }
  }
});
//#endregion
//#region background
file.addEventListener("change", function () {
  const image = this.files[0];
  if (image) reader.readAsDataURL(image);
});
reader.addEventListener("load", () => {
  background.style.backgroundImage = `url(${reader.result})`;
  localStorage.setItem("image", reader.result);
});
//#endregion
//#region icon bar
font.addEventListener("click", () => {
  if (fontIndex >= fontSelect.length - 1) fontIndex = 0;
  else fontIndex++;
  body.style.fontFamily = fontSelect[fontIndex];
  localStorage.setItem("fontIndex", fontIndex);
});
clock.addEventListener("click", () => {
  if (timeFlag) localStorage.setItem("timeFlag", 0);
  else localStorage.setItem("timeFlag", 1);
  getTime();
});
lightbulb.addEventListener("click", () => {
  if (!dimFlag) {
    background.classList.add("dim");
    dimFlag = 1;
    localStorage.setItem("dimFlag", 1);
  } else {
    background.classList.remove("dim");
    dimFlag = 0;
    localStorage.setItem("dimFlag", 0);
  }
});
idCard.addEventListener("click", () => {
  nameInputDiv.classList.remove("hidden");
  focusInputDiv.classList.add("hidden");
  displayInputs.classList.add("hidden");
  localStorage.removeItem("username");
  localStorage.removeItem("userfocus");
});
trash.addEventListener("click", () => {
  localStorage.removeItem("toDoArray");
  localStorage.removeItem("quoteArray");
  localStorage.removeItem("image");
  window.location.reload();
});
//#endregion
//#region quote
shuffle.addEventListener("click", () => {
  if (quoteShuffleFlag) {
    quoteShuffleFlag = 0;
    clearInterval(quoteInterval);
    shuffle.classList.remove("fa-pause");
    shuffle.classList.add("fa-shuffle");
  } else {
    quoteShuffleFlag = 1;
    randomQuote();
    quoteInterval = setInterval(randomQuote, 5000);
    shuffle.classList.add("fa-pause");
    shuffle.classList.remove("fa-shuffle");
  }
});
quoteBtn.addEventListener("click", () => {
  quoteDiv.classList.toggle("hidden");
  todoListDiv.classList.add("hidden");
});
quoteInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    quoteDiv.classList.toggle("hidden");
    let newQuote = quoteInput.value.trim();
    if (newQuote !== null && newQuote !== "" && newQuote !== " ") {
      quoteArray.push(newQuote);
      quote.textContent = '"' + newQuote + '"';
      quoteShuffleFlag = 0;
      clearInterval(quoteInterval);
      shuffle.classList.remove("fa-pause");
      shuffle.classList.add("fa-shuffle");
      localStorage.setItem("quoteArray", JSON.stringify(quoteArray));
      quoteInput.value = "";
    }
  }
});
//#endregion
//#region todo
todoBtn.addEventListener("click", () => {
  todoListDiv.classList.toggle("hidden");
  quoteDiv.classList.add("hidden");
});
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    let newToDo = todoInput.value.trim();
    if (newToDo) {
      createToDo(newToDo);
      let buffer = [];
      buffer.push(newToDo);
      toDoArray.push(...buffer);
      localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
      todoInput.value = "";
    }
  }
});
//#endregion

getImage();
getTime();
getUser();
getQuote();
getToDo();
getFont();
getBrightness();
setInterval(getTime, 1000);
