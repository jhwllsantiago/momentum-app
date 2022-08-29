const background = document.querySelector(".background");
const body = document.querySelector("body");
const file = document.querySelector("#file");
const reader = new FileReader();

const time = document.querySelector("#time");
const meridiem = document.querySelector("#meridiem");
let timeHour;
let timeMinute;

const quote = document.querySelector("#quote-display p");
const quoteBtn = document.querySelector("#quote-btn");
const quoteDiv = document.querySelector("#quote-div");
const quoteInput = document.querySelector("#quote-input");
let quoteArray = [
  "Never gonna give you up",
  "Whatever you do, do it well",
  "Impossible is for the unwilling",
  "Never gonna let you down",
  "It always seems impossible until it's done",
  "There is no substitute for hard work",
  "Never gonna run around and desert you",
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
let whichFont;
let timeFlag;
let isDim = "no";

const nameInput = document.querySelector("#name-input");
const focusInput = document.querySelector("#focus-input");
const nameInputDiv = document.querySelector("#name-input-div");
const focusInputDiv = document.querySelector("#focus-input-div");
const displayInputs = document.querySelector("#display-inputs");
const displayName = document.querySelector("#display-name");
const displayFocus = document.querySelector("#display-focus");
let greeting;
let username;
let userfocus;

//functions
{
  function checkLocalStorage() {
    let storedImage = localStorage.getItem("image");
    let storedUsername = localStorage.getItem("username");
    let storedUserfocus = localStorage.getItem("userfocus");
    let storedquoteArray = JSON.parse(localStorage.getItem("quoteArray"));
    let storedToDoArray = JSON.parse(localStorage.getItem("toDoArray"));
    let storedFont = localStorage.getItem("font");
    let storedTimeFlag = localStorage.getItem("timeFlag");
    let storedIsDim = localStorage.getItem("isDim");

    //image
    if (storedImage != null) {
      background.style.backgroundImage = `url(${storedImage})`;
    } else if (window.innerWidth > window.innerHeight) {
      background.style.backgroundImage =
        "url('https://picsum.photos/1920/1080')";
    } else {
      background.style.backgroundImage =
        "url('https://picsum.photos/1080/1920')";
    }

    //user info
    if (storedUsername === null) {
      nameInputDiv.classList.remove("hidden");
    } else {
      nameInputDiv.classList.add("hidden");
      checkGreeting();
      username = storedUsername;
      displayName.textContent = `${greeting} ${username}!`;

      if (storedUserfocus === null) {
        displayInputs.classList.add("hidden");
        focusInputDiv.classList.remove("hidden");
      } else {
        userfocus = storedUserfocus;
        displayFocus.textContent = `'${userfocus}'`;
      }
    }
    if (storedUsername != null && storedUserfocus != null) {
      displayInputs.classList.remove("hidden");
    }

    //quotes
    if (storedquoteArray != null) {
      quoteArray = [];
      quoteArray.push(...storedquoteArray);
      quote.textContent = '"' + quoteArray[quoteArray.length - 1] + '"';
    } else {
      randomQuote();
    }

    //todo
    if (storedToDoArray != null) {
      toDoArray.push(...storedToDoArray);
      for (let i = 0; i < toDoArray.length; i++) {
        createNewEntry(toDoArray[i]);
      }
    }

    //font
    if (storedFont === null) {
      whichFont = 1;
      localStorage.setItem("font", whichFont);
    } else {
      whichFont = parseInt(storedFont);
    }

    //time
    if (storedTimeFlag === null) {
      timeFlag = 1;
      localStorage.setItem("timeFlag", 1);
    } else {
      timeFlag = parseInt(storedTimeFlag);
    }

    //dim
    if (storedIsDim != null) {
      isDim = storedIsDim;
      if (isDim === "yes") {
        background.classList.add("dim");
      }
    }
  }

  function displayTime() {
    timeHour = new Date().getHours();
    timeMinute = new Date().getMinutes();

    if (timeHour < 10 && timeHour > 0) {
      timeHour = "0" + timeHour;
    }
    if (timeMinute < 10) {
      timeMinute = "0" + timeMinute;
    }

    if (!timeFlag) {
      if (timeHour === 0) {
        timeHour = "0" + timeHour;
      }
      time.textContent = timeHour + ":" + timeMinute;
      meridiem.textContent = "";
    } else if (timeFlag && timeHour > 21) {
      timeHour -= 12;
      time.textContent = timeHour + ":" + timeMinute;
      meridiem.textContent = "PM";
    } else if (timeFlag && timeHour <= 21 && timeHour > 12) {
      timeHour -= 12;
      time.textContent = "0" + timeHour + ":" + timeMinute;
      meridiem.textContent = "PM";
    } else if (timeFlag && timeHour === 12) {
      time.textContent = timeHour + ":" + timeMinute;
      meridiem.textContent = "PM";
    } else if (timeFlag && timeHour < 12 && timeHour > 0) {
      time.textContent = timeHour + ":" + timeMinute;
      meridiem.textContent = "AM";
    } else if (timeFlag && timeHour === 0) {
      timeHour += 12;
      time.textContent = timeHour + ":" + timeMinute;
      meridiem.textContent = "AM";
    }
  }

  function randomQuote() {
    let x = Math.floor(Math.random() * quoteArray.length);
    quote.textContent = '"' + quoteArray[x] + '"';
  }

  function createNewEntry(string) {
    let newLi = document.createElement("li");
    newLi.classList.add("li");

    let newP = document.createElement("p");
    newP.textContent = string;
    newP.classList.add("p");

    let newBtn = document.createElement("button");
    newBtn.textContent = "X";
    newBtn.classList.add("button");

    newLi.append(newP);
    newLi.append(newBtn);
    todoList.append(newLi);

    newLi.addEventListener("click", () => {
      newP.classList.toggle("line-through");
    });
    newBtn.addEventListener("click", () => {
      todoList.removeChild(newLi);

      let leftover = document.querySelectorAll(".p");
      let array = [];
      for (let i = 0; i < leftover.length; i++) {
        array.push(leftover[i].textContent);
      }
      toDoArray = [];
      toDoArray.push(...array);
      localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
    });
  }

  function checkGreeting() {
    timeHour = new Date().getHours();

    if (timeHour > 4 && timeHour < 12) {
      greeting = "Good morning,";
    } else if (timeHour >= 12 && timeHour < 18) {
      greeting = "Good afternoon,";
    } else if (timeHour >= 18 && timeHour <= 23) {
      greeting = "Good evening,";
    } else {
      greeting = "Time to sleep,";
    }
  }

  function loadFont() {
    body.removeAttribute("class");
    if (whichFont === 1) {
      body.classList.add("roboto");
      localStorage.setItem("font", whichFont);
      whichFont++;
    } else if (whichFont === 2) {
      body.classList.add("roboto-cond");
      localStorage.setItem("font", whichFont);
      whichFont++;
    } else if (whichFont === 3) {
      body.classList.add("montserrat");
      localStorage.setItem("font", whichFont);
      whichFont++;
    } else if (whichFont === 4) {
      body.classList.add("oswald");
      localStorage.setItem("font", whichFont);
      whichFont++;
    } else if (whichFont === 5) {
      body.classList.add("ubuntu");
      localStorage.setItem("font", whichFont);
      whichFont = 1;
    }
  }
}

checkLocalStorage();
loadFont();
displayTime();
setInterval(displayTime, 1000);
setInterval(checkGreeting, 1000);

//Event Listeners
{
  //main
  nameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      nameInputDiv.classList.add("hidden");

      username = nameInput.value;
      localStorage.setItem("username", username);

      checkGreeting();
      displayName.textContent = `${greeting} ${username}!`;

      focusInputDiv.classList.remove("hidden");
    }
  });
  focusInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      focusInputDiv.classList.add("hidden");

      userfocus = focusInput.value;
      localStorage.setItem("userfocus", userfocus);
      displayFocus.textContent = `'${userfocus}'`;

      displayInputs.classList.remove("hidden");
    }
  });

  //background
  file.addEventListener("change", function () {
    const image = this.files[0];
    if (image) {
      reader.readAsDataURL(image);
    }
  });
  reader.addEventListener("load", () => {
    background.style.backgroundImage = `url(${reader.result})`;
    localStorage.setItem("image", reader.result);
  });

  //icon bar
  font.addEventListener("click", () => {
    loadFont();
  });
  clock.addEventListener("click", () => {
    if (timeFlag) {
      timeFlag = 0;
      localStorage.setItem("timeFlag", 0);
    } else {
      timeFlag = 1;
      localStorage.setItem("timeFlag", 1);
    }
    displayTime();
  });
  lightbulb.addEventListener("click", () => {
    if (isDim === "no") {
      background.classList.add("dim");
      isDim = "yes";
      localStorage.setItem("isDim", "yes");
    } else if (isDim === "yes") {
      background.classList.remove("dim");
      isDim = "no";
      localStorage.setItem("isDim", "no");
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

  //quote
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
      let newQuote = quoteInput.value;
      if (newQuote != null && newQuote != "" && newQuote != " ") {
        quoteArray.push(newQuote);
        quote.textContent = '"' + quoteArray[quoteArray.length - 1] + '"';
        quoteShuffleFlag = 0;
        clearInterval(quoteInterval);
        shuffle.classList.remove("fa-pause");
        shuffle.classList.add("fa-shuffle");
        localStorage.setItem("quoteArray", JSON.stringify(quoteArray));
        quoteInput.value = "";
      }
    }
  });

  //todo
  todoBtn.addEventListener("click", () => {
    todoListDiv.classList.toggle("hidden");
    quoteDiv.classList.add("hidden");
  });
  todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      createNewEntry(todoInput.value);

      let buffer = [];
      buffer.push(todoInput.value);
      toDoArray.push(...buffer);
      localStorage.setItem("toDoArray", JSON.stringify(toDoArray));

      todoInput.value = "";
    }
  });
}
