var mainMenu = document.querySelector('.main-menu');
var buttonMenu = document.querySelector('.page-header__btn-menu');

buttonMenu.classList.remove('page-header__btn-menu--no-js');
mainMenu.classList.add('main-menu--close');

buttonMenu.addEventListener('click', function(e) {
  e.preventDefault;
  this.classList.toggle('page-header__btn-menu--close');
  mainMenu.classList.toggle('main-menu--close');
})
