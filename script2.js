'use strict';
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // NOTE: e.target is essentially where the event originated. So where the event first happened. So this is not the element on which the handler is actually attached

  // NOTE: The currentTarget is indeed, the element on which the event handler is attached.
  console.log('LINK', e.target, e.currentTarget);
  // NOTE: The currentTarget is exactly the same as the this keyword.
  console.log(e.currentTarget === this);
  // Stop propagation
  // NOTE: The two parent elements did not change their background colors, which means that the event never arrived at those elements. That's why they weren't handled there, that is because we stopped the propagation right here.
  // NOTE: Stopping the event propagation like this can sometimes fix problems in very complex applications with many handlers for the same events, but in general, it's not really a good idea to stop the propagation of events.
  e.stopPropagation();
});

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );
const h1 = document.querySelector('h1');

console.log(h1.parentNode); // div.header__title
console.log(h1.parentElement); // div.header__title
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
