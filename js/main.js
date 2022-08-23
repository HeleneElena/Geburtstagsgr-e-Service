const btnMen = document.querySelector('.header__btn-gender_men'),
      btnWomen = document.querySelector('.header__btn-gender_women'),
      body = document.body;

const changeToMen = () => {
    body.classList.add('men');
    body.classList.remove('women');
};

const changeToWomen = () => {
    body.classList.add('women');
    body.classList.remove('men');
};

btnMen.addEventListener('click', changeToMen);

btnWomen.addEventListener('click', changeToWomen);