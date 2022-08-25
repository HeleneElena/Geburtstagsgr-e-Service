const btnMen = document.querySelector('.header__btn-gender_men'),
      btnWomen = document.querySelector('.header__btn-gender_women'),
      body = document.body,
      cardImg = document.querySelector('.card__image'),
      cardText = document.querySelector('.card__text'),
      btnText = document.querySelector('.header__btn-change_text'),
      btnImage = document.querySelector('.header__btn-change_image'),
      download = document.querySelector('.download'),
      cardWrapper = document.querySelector('.card-wrapper');

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

const changeСongratulations = () => {
    if (state.photo.includes('black')) {
            cardText.style.color = 'white';
        } else {
            cardText.style.color = '';
        }
        cardImg.src = `image/${state.photo}`;
        cardText.innerHTML = state.text.replaceAll('\n', '<br>');
}

const getDataToCard = () => {
     getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeСongratulations();
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

// по нажатию кнопки меняем текст
const changeText = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        changeСongratulations();
    });
};

// по нажатию кнопки меняем image
const changeImage = () => {
    getData().then(data => {
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeСongratulations();
    });
};

btnMen.addEventListener('click', changeToMen);
btnWomen.addEventListener('click', changeToWomen);
btnText.addEventListener('click', changeText);
btnImage.addEventListener('click', changeImage);
getDataToCard();

download.addEventListener('click', () => {
    const newWindow = window.open(
        '', 
        '', 
        `width=840,height=520,
        top=${screen.height / 2 - 520 / 2},
        left=${screen.width / 2 - 840 / 2}`);

    html2canvas(cardWrapper).then((canvas) => {
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        newWindow.document.body.append(canvas);
    });
});