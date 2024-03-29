const   $container = document.getElementById('container'),     //Обращение к существующим полям    
    $headerContainer = document.getElementById('header-container'),
    $form = document.getElementById('word'),
    $inputWord = document.querySelector('.start-word__input'),
    $btnStart = document.getElementById('start'),
    $btnNewWord = document.querySelector('.start-word__btn'),
    $text = document.getElementById('text');

const $field = document.createElement('form'),                  //Объявление новых полей 
    $fieldContainer  =document.createElement('div'), 
    $fieldbox  =document.createElement('div'),              
    $btnSelectWord = document.createElement('button'),
    $btnCheckWord = document.createElement('button'),    
    $next = document.createElement('button');
let newWord = [];                                               //Массив для новых слов
let literaArr = [];                                             //Массив букв нового слова     
let wordplayer1 = [], wordplayer2 = [];
let player = 1;
//Отрисовка игрового поля с введенным словом
$form.addEventListener('submit', (event) => {
    event.preventDefault()
    let word = [], begin = ['', '', '', '', '', '', '', '', '', ''], end = ['', '', '', '', '', '', '', '', '', ''];
    
    word = $inputWord.value.split('');

    let wordBegin = [...begin, ...word, ...end];                  //Массив для заполнения ячеек

    if ($inputWord.value == '') 
        $text.textContent = 'Ведите слово'
    else {
        $text.textContent = 'Введите одну букву в любую свободную ячейку';
        $form.style.display = 'none';
        createdField(1, 2, wordBegin);
    };   
});

//Создание ячейки
function createdLitera(prop) {
    const $litera = document.createElement('input');

    $litera.value = prop;
    $litera.setAttribute('maxlength', 1);
    $litera.setAttribute('type', 'text');
    $litera.classList.remove('active');
    $litera.classList.add('litera');
    
    return $litera;
};

//Создание поля результат игрока
function rezultPlayer(prop, arr = []) {
    const $rezaltTable = document.createElement('div'),
        $rezaltTableTitle = document.createElement('h3'),
        $player = document.createElement('span'),
        $rezaltTableHeader = document.createElement('div'),
        $tableTitle = document.createElement('div'),
        $rezaltTableList = document.createElement('ul'), 
        $rezaltTablePoint = document.createElement('div');               

    const copyArr = arr;

    $rezaltTableTitle.classList.add('rezalt-table__title');
    $rezaltTableTitle.textContent = 'Игрок';
    $player.classList.add('player');
    $player.textContent = prop;
    $rezaltTableTitle.append($player);

    $rezaltTablePoint.classList.add('text');
    $rezaltTablePoint.textContent = 'Очки';
    $tableTitle.classList.add('table-title', 'text');
    $tableTitle.textContent = 'Слово';
    $rezaltTableHeader.classList.add('rezalt-table__header');
    $rezaltTableHeader.append($tableTitle, $rezaltTablePoint);
   
    $rezaltTableList.classList.add('rezalt-table__list');
    $rezaltTableList.setAttribute('data-player', prop);

    for (const item of copyArr) {    
        $rezaltTableList.append(tableRow(item));
    };

    $rezaltTable.classList.add('rezalt-table');
    $rezaltTable.append($rezaltTableTitle, $rezaltTableHeader, $rezaltTableList);

    return $rezaltTable;
};

//Создание строки таблицы результатов
function tableRow(word) {
   const $rezaltTableItem = document.createElement('li'),
   $itemWord = document.createElement('div'),
   $itemPoint = document.createElement('div');

    $itemWord.textContent = word;
    $itemPoint.textContent = '20';
    $rezaltTableItem.append($itemWord, $itemPoint);
    $itemWord.classList.add('item__word', 'text-table');
    $itemPoint.classList.add('item__point', 'text-table');    
    $rezaltTableItem.classList.add('rezalt-table__item'); 

    return $rezaltTableItem;
};

//Создание игрового поля
function createdField(player1 = 1, player2 = 2, arr) {
    let copyArr = arr;

    $fieldContainer.innerHTML = '';

    for (const i of copyArr) {           
        $field.append(createdLitera(i));        
    };

    $btnSelectWord.classList.add('select-word', 'disabled');
    $btnSelectWord.textContent = 'Выбрать слово';
    $btnSelectWord.setAttribute('type', 'submit');
    $btnSelectWord.disabled = true;

    $btnCheckWord.classList.add('check-word', 'disabled');
    $btnCheckWord.disabled = true;
    $btnCheckWord.textContent = 'Проверить слово';

    $next.classList.add('next', 'disabled');
    $next.disabled = true;
    $next.textContent = 'Следующая буква';

    $field.append($btnSelectWord);
    $field.classList.add('game-field');
    $fieldbox.append($field, $btnCheckWord, $next);
    $fieldbox.classList.add('field__box');
    $fieldContainer.classList.add('field__container');
    $fieldContainer.append(rezultPlayer(player1), $fieldbox,  rezultPlayer(player2));
    $container.append($fieldContainer);

    //return $field;
};

//Сделать недоступными все ячейки, кроме введенной
$field.addEventListener('input', (el) => {
    el.target.classList.add('new');

    document.querySelectorAll('.litera').forEach(e => {
        if (!e.classList.contains('new'))
                e.setAttribute("readonly", true);
        });
    $text.textContent = 'Нажмите на кнопку "Выбрать слово"';
    $btnSelectWord.disabled = false;
    $btnSelectWord.classList.remove('disabled');
});

//Кнопка выбрать слово
$field.addEventListener('submit', (e) => {
    e.preventDefault();
       newWord = '';

    if ($btnCheckWord) {
        $text.textContent = '';
    };       
    $text.textContent = 'Выделите слово. Буквы должны распологаться в соседних ячейках';   
    $btnCheckWord.classList.remove('disabled');
    $btnCheckWord.disabled = false;           

    //Выделение слова
    document.querySelectorAll('.litera').forEach(el => {        
        el.addEventListener('click', () => {            
            //el.classList.remove('active');
            el.classList.toggle('active'); 
            literaArr.push(el.value); 
            $text.textContent = 'Нажмите на кнопку "Проверить слово"';                      
        });  
    });      
});

//Кнопка Проверка слова
$btnCheckWord.addEventListener('click', () => {
    newWord = literaArr.join('')
    $text.textContent = '';
  
    document.querySelectorAll('.rezalt-table__list').forEach( e => {
        if (e.dataset.player == player) e.append(tableRow(newWord))
    })
    $text.textContent = 'Ход переходит к следующему игроку. Нажмите кнопку "Следующая буква"'; 
    $next.disabled = false;   
    $next.classList.remove('disabled');
    $btnSelectWord.disabled = true;
    $btnSelectWord.classList.add('disabled');
});

//Кнопка Следущая буква
$next.addEventListener('click', () => {
    let arr = [];
    
    document.querySelectorAll('.litera').forEach(elem => {
        arr.push(elem.value);
        $text.textContent = 'Введите одну букву в любую свободную ячейку';
    });
    $fieldContainer.remove()
    $fieldContainer.innerHTML = '';
    createdField(1, 2, arr);            
    document.querySelectorAll('.litera').forEach(elem => {
        e.setAttribute("readonly", false);        
    });

    if (player == 1) player +=1
    else player -=1
    //console.log('object', player);
});

function start() {
    const $splash = document.querySelector('.splash'),
        $splashWord = document.querySelectorAll('.splash__word');

    $splashWord.forEach(elem => {
        elem.classList.add('active');
        $btnStart.style.display = 'none';
        setTimeout(() =>{
            $headerContainer.classList.add('active');
            $splash.style.display = 'none';
            elem.style.display = 'none';                
        }, 300);            
    });
};

$btnStart.onclick = start;

