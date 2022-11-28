let submitButton = document.getElementById("submit-button");
let activeButton = document.getElementById("active-button");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";
let text_2 = "";
let answer = 0;
let n1 = 0;
let n2 = 0;
let alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	 	'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
 	    	'0','1','2','3','4','5','6','7','8','9');
let j;



const textGenerator = () => {
    let generatedText = "";
    n1 = randomNumber(0,9);
    n2 = randomNumber(0,9);
    generatedText += n1.toString();
    generatedText += "+";
    generatedText += n2.toString();
    return generatedText;
};

const textGenerator_2 = () => {
    let generatedText_2 = "";
    for (j=0;j<6;j++){
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];
    }
    generatedText_2 = a + ' ' + b + ' '  + c + ' ' + d + ' ' + e + ' ' + f;
    text_2 = generatedText_2;
    return generatedText_2;
};

const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

function drawStringOnCanvas(string) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColor = "rgb(130,130,130)";
    const letterSpace = 150 / string.length;
    for (let i = 0; i < string.length; i++) {
        const xInitialSpace = 45;
        ctx.font = "20px Oswald";
        ctx.fillStyle = textColor;
        ctx.fillText(
            string[i],
            xInitialSpace + i * letterSpace,
            40,
            100
        );
    }
}


function triggerFunction() {
    userInput.value = "";
    text = textGenerator();
    console.log(text);
    drawStringOnCanvas(text);
}


function triggerFunction_2() {
    userInput.value = "";
    text_2 = textGenerator_2();
    console.log(text_2);
    drawStringOnCanvas(text_2);
}



reloadButton.addEventListener("click", triggerFunction);

window.onload = () => triggerFunction();


submitButton.addEventListener("click", () => {
    answer = n1 + n2;
    text = answer.toString();
    if (userInput.value === text) {
        alert("Правильно");
        activeButton.removeAttribute('disabled');
    } else {
        alert("Неправильно");
        triggerFunction_2();
        //if(text_2 == userInput.value){
        //    alert("Правильно");
        //}
        //else{
        //    alert("Ошибка");
        //}
    }
});

activeButton.addEventListener("click", () => {
    reloadButton.style.backgroundColor = 'greenyellow';
    userInput.style.border= '3px solid greenyellow';
    goButton.style.backgroundColor = 'greenyellow';
});



function Adder(startingValue) {
    this.value = startingValue;

    this.addInput = function() {
        this.value += +prompt('Введите число, которое хотите добавить', "0");
    };

    this.showValue = function() {
        alert(this.value);
    };
}

var adder = new Adder(0);
adder.addInput();
adder.addInput();
adder.addInput();
adder.showValue();

function truncate(str, n) {
    if (str.length > n) {
        return str.slice(0, n) + "...";
    }

    return str;
}

let sliceInput = document.getElementById("slice-input");
let storyText = document.getElementById("story");
let goButton = document.getElementById("go-button");

goButton.addEventListener("click", () => {
    storyText.textContent = truncate(storyText.textContent, answer);
});