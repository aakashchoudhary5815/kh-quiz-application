import data from '../data/data.js'

const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const button3 = document.getElementById("button3")
const button4 = document.getElementById("button4")

button1.innerHTML='Music';
button2.innerHTML='Modern Art';
button3.innerHTML='Coding';
button4.innerHTML='Reset';
button4.setAttribute('class','reset');

const clickEventFunction = (e) => {
  localStorage.setItem("type", e.target.id);
  let url = "../"+"quiz"+".html"
  window.location.href = url;
}

const resetFunction =(e) =>{
  localStorage.clear();
  button1.disabled=false;
  button2.disabled=false;
  button3.disabled=false;
}

button1.addEventListener('click', clickEventFunction)
button2.addEventListener('click', clickEventFunction)
button3.addEventListener('click', clickEventFunction)
button4.addEventListener('click', resetFunction)

localStorage.getItem(Object.keys(data)[0]) === 'done' ? button1.disabled=true: true;
localStorage.getItem(Object.keys(data)[1]) === 'done' ? button2.disabled=true: true;
localStorage.getItem(Object.keys(data)[2]) === 'done' ? button3.disabled=true: true;

