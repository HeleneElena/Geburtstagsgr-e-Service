const btnMen = document.querySelector('.header__btn-gender_men'),
      btnWomen = document.querySelector('.header__btn-gender_women'),
      body = document.body,
      cardImg = document.querySelector('.card__image'),
      cardText = document.querySelector('.card__text');

// меняем фон с женского на мужской и обратно
const state = {
    gender: body.classList.contains('women') ? 'women' : 'men',
};

const getRandomForArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
};

// функция для получения данных
const getData = () => fetch('db.json').then((response) => response.json());

const getDataToCard = () => {
     getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        state.photo = getRandomForArr(data.photo[state.gender]);
        cardImg.src = `image/${state.photo}`;
        cardText.innerHTML = state.text.replaceAll('\n', '<br>');
     });
};

const changeToMen = () => {
    if (state.gender !== 'men') {
        body.classList.add('men');
        body.classList.remove('women');
        state.gender = 'men';
        getDataToCard();
    }
    
};

const changeToWomen = () => {
    if (state.gender !== 'women') {
        body.classList.add('women');
        body.classList.remove('men');
        state.gender = 'women';
        getDataToCard();
    }   
};

btnMen.addEventListener('click', changeToMen);
btnWomen.addEventListener('click', changeToWomen);
getDataToCard();