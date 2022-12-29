
document.addEventListener('DOMContentLoaded', () => {

    // Pract 13

    //Задание 1, подтверждение перехода по ссылке
    let href_quest = document.getElementById("hr_question");

    //Событие при нажатии
    href_quest.onclick = function(event) {

        // Ф-я вызова подтверждения
        function handleLink(href) {
          let isLeaving = confirm(`Перейти по ссылке ${href}?`);
          if (!isLeaving) return false;
        }
        
        // Ищем элемент a
        let target = event.target.closest('a');
        
        // Если находим и если он в нашем контейнере, запускаем подтверждение
        if (target && href_quest.contains(target)) {
          return handleLink(target.getAttribute('href'));
        }
      };


    // Задание 2 Галерея с изменением размера
    let gallery_list = document.getElementById("gallery_list");

    // При нажатии на список
    gallery_list.onclick = function(event) {

        // Получаем элемент на который нажали
        let our_image = event.target.closest('img');
        if (!our_image) return;

        // Меняем местами ссылки на картинки у элементов
        buff_src = main_image.src;
        main_image.src = our_image.src;
        our_image.src = buff_src;
      }
    
    //Задание 3 выбор списка

    // Обрабатываем нажатие на элемент списка
    for_select.onclick = function(event) {
        if (event.target.tagName != "LI") return;
        
        // Если нажимаем с контролом, просто добавляем
        if (event.ctrlKey || event.metaKey) {
            event.target.classList.toggle('selected');
        } 
        // Если без него, убираем выделение у других
        else {
            let selected = for_select.querySelectorAll('.selected');
            for(let elem of selected) {
              elem.classList.remove('selected');
            }
            // Добавляем текущему выделение
            event.target.classList.add('selected');
        }
      } 
      // Убираем выделение стандартное
      for_select.onmousedown = function() {
        return false;
      };


    // Задание 4 слайдер
    let thumb = slider.querySelector('.thumb');

    // Отключаем встроенный drag-n-drop браузера, чтобы не было раздвоения
    thumb.ondragstart = function() {
        return false;
    };
    thumb.onmousedown = function(event) {
        // отменяем выделение браузера
        event.preventDefault();

        // Запоминаем расстояние от курсора до левого края, чтоб всегда держалось
        let shiftX = event.clientX - thumb.getBoundingClientRect().left;
        
        //Добавляем обработчики событий
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        // Ф-я движения
        function onMouseMove(event) {
        
            // Вычисляем новые координаты
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

            // Если курсор вышел из слайдера  оставить ползунок в его границах.
            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = slider.offsetWidth - thumb.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            // Задаем полученную позицию ползунку
            thumb.style.left = newLeft + 'px';
        }
        // Убираем мышь и удаляем наши обработчики
        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };

    //Задание 5 корзина 
    var DragManager = new function() {
        var dragObject = {};
      
        var self = this;
            
        //Ф-я,получаем элемент
        function onMouseDown(e) {      
            // если клик правой кнопкой мыши, то он не запускает перенос
          if (e.which != 1) return;
          var elem = e.target.closest('.draggable');
          // не нашли, клик вне draggable-объекта
          if (!elem) return;
          // запомнить переносимый объект
          dragObject.elem = elem;
          // запомним, что элемент нажат на текущих координатах pageX/pageY
          dragObject.downX = e.pageX;
          dragObject.downY = e.pageY;
      
          return false;
        }
      
        function onMouseMove(e) {
          if (!dragObject.elem) return; // элемент не зажат
      
          if (!dragObject.avatar) {
      
            // начинаем перенос
            dragObject.avatar = createAvatar(e); // создать аватар
            if (!dragObject.avatar) {
              dragObject = {};
              return;
            }
            var coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;
      
            startDrag(e);
          }
      
          // отобразить перенос объекта при каждом движении мыши
          dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
          dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
      
          return false;
        }
      
        function onMouseUp(e) {
          if (dragObject.avatar) { // если перенос идет
            finishDrag(e);
          }
      
          dragObject = {};
        }
      
        function finishDrag(e) {
          var dropElem = findDroppable(e);
      
          if (!dropElem) {
            self.onDragCancel(dragObject);
          } else {
            self.onDragEnd(dragObject, dropElem);
          }
        }
      
        function createAvatar(e) {
      
          var avatar = dragObject.elem;
         avatar.parentNode.insertBefore(avatar.cloneNode(true), avatar.nextSibling);

          // функция для отмены переноса
          avatar.rollback = function() {
            avatar.remove();
          };
      
          return avatar;
        }
      
        function startDrag(e) {
          var avatar = dragObject.avatar;
      
          // инициировать начало переноса
          document.body.appendChild(avatar);
          avatar.style.zIndex = 1000;
          avatar.style.position = 'absolute';
        }
      
        function findDroppable(event) {
          // спрячем переносимый элемент
          dragObject.avatar.hidden = true;
      
          // получить самый вложенный элемент под курсором мыши
          var elem = document.elementFromPoint(event.clientX, event.clientY);
      
          // показать переносимый элемент обратно
          dragObject.avatar.hidden = false;
      
          if (elem == null) {
            // такое возможно, если курсор мыши "вылетел" за границу окна
            return null;
          }
      
          return elem.closest('.droppable');
        }
      
        document.onmousemove = onMouseMove;
        document.onmouseup = onMouseUp;
        document.onmousedown = onMouseDown;
      
        this.onDragEnd = function(dragObject, dropElem) {};
        this.onDragCancel = function(dragObject) {};
      
      };
      
      let cart_count = document.getElementById('cart_count');
      let cart_c = "";
      let cart_str;
      let final_count = 0;
      
      function getCoords(elem) {
        var box = elem.getBoundingClientRect();
      
        return {
          top: box.top + scrollY,
          left: box.left + scrollX
        };
      }
      DragManager.onDragCancel = function(dragObject) {
        dragObject.avatar.rollback();
      };
      DragManager.onDragEnd = function(dragObject, dropElem) {
        cart_c = dragObject.elem.innerHTML;
        cart_str = cart_c.split(" ");
        final_count += Number(cart_str[cart_str.length - 1]);

        dragObject.elem.remove();

        cart_count.innerHTML = final_count;
      };

          train.onclick = function() {
            let start = Date.now();

            let timer = setInterval(function() {
              let timePassed = Date.now() - start;

              train.style.left = timePassed / 5 + 'px';

              if (timePassed > 2000) clearInterval(timer);

            }, 20);
          }

});

