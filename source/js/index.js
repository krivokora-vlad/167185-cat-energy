var mainMenu = document.querySelector('.main-menu');
var buttonMenu = document.querySelector('.page-header__btn-menu');
var mapIframe = document.querySelector('.map__iframe');
var mapImg = document.querySelector('.map__img');

buttonMenu.classList.remove('page-header__btn-menu--no-js');
mainMenu.classList.add('main-menu--close');
mapIframe.classList.add('map__iframe--show');
mapImg.classList.add('map__img--hide');

buttonMenu.addEventListener('click', function(e) {
  e.preventDefault;
  this.classList.toggle('page-header__btn-menu--close');
  mainMenu.classList.toggle('main-menu--close');
})
