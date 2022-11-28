document.addEventListener('DOMContentLoaded', () => {

    // 1 задание Shop cart

    const shopCart = document.querySelector('.shop__cart');
    const shopCartDelete = shopCart.querySelector('.shop__cart-delete');
    const shopCartChange = shopCart.querySelector('.shop__cart-change');
    const shopCartSortUp = shopCart.querySelector('.shop__cart-sort-up');
    const shopCartSortDown = shopCart.querySelector('.shop__cart-sort-down');
    const shopCartInner = shopCart.querySelector('.shop__cart-inner');
    const shopProducts = [
        'God of war Ragnarok',
        'Atomic Heart',
        'The Callisto Protocol',
        'Dead Space Remake',
        'Sifu',
        'Ghostwire Tokyo',
        'Final Fantasy 16',
        'Cyberpunk 2077'
    ];
    // console.log(shopProducts);

    shopProducts.forEach(item => {
        let element = document.createElement('div');
        element.classList.add('shop__cart-item');
        element.textContent = item;
        shopCartInner.append(element);
    });

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Изменение одного из элементов на другой
    shopCartChange.addEventListener('click', () => {
        let newItem = shopProducts[getRandomInt(shopProducts.length)];
        // console.log(newItem);
        shopProducts[getRandomInt(shopProducts.length)] = newItem;
        let elements = document.querySelectorAll('.shop__cart-item');
        let cnt=0;
        elements.forEach(el =>{
            el.textContent=shopProducts[cnt];
            cnt+=1;
        });
        // console.log(shopProducts);
    });

    // Удаление первого элемента

    // shopCartDelete.addEventListener('click', () => {
    //     shopCart.querySelector('.shop__cart-item').remove();
    // });

    shopCartDelete.addEventListener('click', () => {
        if (shopProducts.length!=0){
            shopProducts.splice(0,1);
            shopCart.querySelector('.shop__cart-item').remove();
        }
        // console.log(shopProducts);
        let elements = document.querySelectorAll('.shop__cart-item');
        let cnt=0;
        elements.forEach(el =>{
            el.textContent=shopProducts[cnt];
            cnt+=1;
        });
    });


    // 2 Фильтр

    const arr = [20, 45, 32, 25, 7, 2, -1, 0, 10, 15, 1, 5, 8, 11, 13];

    function filterArray(arr, a, b) {
        let newArr = [];

        arr.forEach(item => {
            if (item >= a && item <= b) {
                newArr.push(item);
            }
        });

        return newArr;
    }

    console.log(filterArray(arr, 4, 20));
    console.log(filterArray(arr, 13, 40));
    console.log(filterArray(arr, -2, 3));



    // 3 Сортировка на сайте по алфавиту

    shopCartSortUp.addEventListener('click', () => {
        shopProducts.sort();
        let elements = document.querySelectorAll('.shop__cart-item');
        let cnt=0;
        elements.forEach(el =>{
            el.textContent=shopProducts[cnt];
            cnt+=1;
        });
    });

    shopCartSortDown.addEventListener('click', () => {
        shopProducts.sort();
        shopProducts.reverse();
        let elements = document.querySelectorAll('.shop__cart-item');
        let cnt=0;
        elements.forEach(el =>{
            el.textContent=shopProducts[cnt];
            cnt++;
        });
    });


    // 4 задание

    const notif = document.querySelector('.notifs');
    const notifBtn = notif.querySelector('.notif__btn');
    const notifInner = notif.querySelector('.notif__inner');
    const notifCounter = notif.querySelector('.notif__counter');
    const notifArr = [
        'Здраствуйте!',
        'Нужно сориентироваться?',
        'Служба поддержки ->',
        '-> +7812912382 - По России',
        '-> +79168123021 - По Москве',
        'Ждем и любим вас!',
    ];



    let numberNotif = 0;
    let counter = 0;

    function createNotif() {
        let element = document.createElement('div');
        element.classList.add('notif__item');

        if (numberNotif < notifArr.length) {
            element.textContent = notifArr[numberNotif];
            numberNotif++;
            counter++;
        } else {
            numberNotif = 0;
            element.textContent = notifArr[numberNotif];
            numberNotif++;
            counter++;
        }

        notifInner.append(element);

        notifCounter.textContent = counter;
    }

    let timerId = setInterval(createNotif, 3000);
    
    notifBtn.addEventListener('click', () => {
        clearInterval(timerId);
        setTimeout(function() {
            timerId = setInterval(createNotif, 3000);
        }, 10000);
    });
});
