document.querySelector("#like_button").onclick = function() {
    if (like_button.style.backgroundColor == 'white') {
        like_button.style.backgroundColor = 'red';
        like_button.style.color = 'white';

        const heart = document.querySelector(".love");
        heart.addEventListener("mousemove", (event) => {
            const xPos = event.offsetX;
            const yPos = event.offsetY;
            const spanEl = document.createElement("span");
            spanEl.style.left = xPos + "px";
            spanEl.style.top = yPos + "px";
            heart.appendChild(spanEl);

            if (like_button.style.backgroundColor == 'red') {
                spanEl.style.visibility = "visible";
            } else {
                spanEl.style.visibility = "hidden";
            }
        });

    } else {
        like_button.style.backgroundColor = 'white';
        like_button.style.color = 'black';
    }
};

let result = prompt('Желаете пройти регистрацию на сайте?');

if (result == 'Да') {
    alert("Круто!");
    let login = prompt('Введите свой логин в поле ниже');

    if (login == 'Админ') {
        let pass = prompt('Введите пароль!');

        if (pass == "Я главный") {
            alert("Здравствуйте!");
        } else if (pass == '' || pass == null) {
            alert("Отменено!");
        } else {
            alert("Неверный пароль!");
        }
    } else if (login == '' || login == null) {
        alert("Отменено!");
    } else {
        alert("Я вас не знаю!");
    }
} else {
    alert("Попробуй ещё раз!");
}