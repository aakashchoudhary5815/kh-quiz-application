import data from "../data/data.js";
import state from "./state.js";
import { evaluateAnswers } from "./reportCard.js";
const span = document.querySelector("span");
var continueBtn =""
var backBtn =""
const typeMapping = {
  button1: "music",
  button2: "modern-art",
  button3: "coding",
};

const type = typeMapping[localStorage.getItem("type")];
console.log(type);

const createQuestion = (obj) => {
  span.innerHTML = "";
  let newQuestion = document.createElement("div");
  newQuestion.setAttribute("name", obj["id"]);
  newQuestion.setAttribute("class", 'question-section')
  newQuestion.setAttribute("value", obj["question"]);
  newQuestion.setAttribute("id", obj["question"]);
  newQuestion.innerHTML = obj["question"];
  span.appendChild(newQuestion);
  let errorMessage= document.createElement("p")
  errorMessage.setAttribute('id','error-message')
  errorMessage.innerHTML="You need to select an option"
  span.prepend(errorMessage);
  hideError();
};

const showError =() =>{
  let errorMessage= document.getElementById('error-message');
  errorMessage.classList.remove("hidden");
}

const hideError =() =>{
  let errorMessage= document.getElementById('error-message');
  errorMessage.setAttribute('class', 'hidden')
}

const createOptions = (obj) => {
  console.log(obj["selected"]);
  let answers = document.createElement("div");
  answers.setAttribute("class", 'answer-section')
  let options = "";
  for (let i = 0; i < obj["options"].length; i++) {
    options += `<div class='options'><input type="radio" id="${i}" name="${obj["options"]}" value=${obj["options"][i]}>`;
    options += `<label for=${i}> ${obj["options"][i]} </label></div><br>`;
  }
  answers.innerHTML = options;
  span.append(answers);

  if (obj.hasOwnProperty("selected")) {
    document
      .querySelector(`input[id="${obj["selected"]}"]`)
      .setAttribute("checked", "checked");
    document
      .querySelector(`label[for="${obj["selected"]}"]`)
      .setAttribute("class", "selected");
    disableRadioButtons();
  }
};

const createButtons = (id) => {
  let buttons = `<button  value="continue" id=${id}>Continue</button><button value="back" id=${id}>Back</button>`;
  span.innerHTML += buttons;
   continueBtn = document.querySelector("button[value='continue']");
   backBtn = document.querySelector("button[value='back']");
  continueBtn.addEventListener("click", onClickFunction);
  if (id === 0) {
    backBtn.style.display = "none";
  }
 else {
    backBtn.addEventListener("click", onBackFunction);
  }
};

const disableRadioButtons = () => {
  const inputElements = document.querySelectorAll("input[type=radio]");
  inputElements.forEach((element) => {
    element.disabled = true;
  });
};

const createQandA = (type, id) => {
  state.page = id;
  const obj = data[type][id];
  createQuestion(obj);
  createOptions(obj);
  createButtons(id);
  console.log('page', state.page );
};

const startReport = (data, type) => {
  continueBtn.display="none"
  backBtn.style.display = "none"; 
  span.innerHTML="";
  span.setAttribute('class', 'score')

  let score = `<p  class='score-statement'>Your score is ${evaluateAnswers(
    data,
    type
  )} out of 10</p>`;
  span.innerHTML += score;
  let reportCard = document.createElement("div");
  reportCard.setAttribute("class", "reportCard");
  span.appendChild(reportCard);
  let array1 = data[type];
  array1.forEach(renderReport);

  span.innerHTML+= "<button id='back-to-quiz'> Go back to Quiz </button>";
  document.getElementById("back-to-quiz").addEventListener('click', toStartFunction);

};

const onClickFunction = (e) => {
  hideError();
  event.preventDefault();
  if (document.querySelector("input[type=radio]:checked") !== null) {
    let selected = document.querySelector("input[type=radio]:checked");
    data[type][state.page]["selected"] = selected.getAttribute("id");
    state.page + 1 < totalQuestions
      ? createQandA(type, state.page + 1)
      : startReport(data, type);
  } else {
    showError();
  }
};

const onBackFunction = (e) => {
  event.preventDefault();
  createQandA(type, state.page - 1);
};

const toStartFunction = (e) => {
  event.preventDefault();
  let url = "../"+"index"+".html"
  localStorage.setItem(type,'done');
  window.location.href = url;
  }


const totalQuestions = data[type].length;
createQandA(type, state.page);

const renderReport = (obj) => {
  let reportCardDiv= document.querySelector("div[class='reportCard']");
  let newQuestion = document.createElement("div");
  newQuestion.setAttribute("name", obj["id"]);
  newQuestion.setAttribute("class", 'score-question');
  newQuestion.setAttribute("value", obj["question"]);
  newQuestion.setAttribute("id", obj["question"]);
  newQuestion.innerHTML = `Q. ${obj["id"]} ${obj["question"]}`;
  reportCardDiv.appendChild(newQuestion);

  let answers = document.createElement("div");
  answers.setAttribute("class", 'score-answers')
  let options = "";
  for (let i = 0; i < obj["options"].length; i++) {
    if (obj["options"][i] === obj["answer"]) {
     // options += `<div class='options'><input class="correct" type="radio">`;
      options += `<label class="correct" > ${obj["options"][i]} </label></div><br>`;
    } else if (i === Number(obj["selected"])) {
     // options += `<div class='options'><input class="selected" type="radio">`;
      options += `<label class="selected"> ${obj["options"][i]} </label></div><br>`;
    } else {
    //  options += `<div class='options'><input class="report-options" type="radio">`;
      options += `<label> ${obj["options"][i]} </label></div><br>`;
    }
  }
  answers.innerHTML = options;
  reportCardDiv.appendChild(answers);
};

