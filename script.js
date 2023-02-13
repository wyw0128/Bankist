'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  // NOTE: On the link when we have this hash here as the hyperlink. So as href, then that will make the page jump to the top because it seems like a id but it cannot find anyone so it will jump to the top. That's the default behavior. But if you put '' as the href, the page will reload. So it is better to put # as the href with the eventDefault.
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// NOTE: A nodeList also has forEach method. Because nodeList is iterable.

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// console.log(btnsOpenModal);

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////////////////////
// TOPIC: IMPLEMENTING SMOOTH SCROLLING

// NOTE: getBoundingClientRect will return a DOM rectangle, it has all of these properties so, the X position, which is measured from the left side, the Y position, which is measured from the top, and then the width of the element to height, and then a lot of other properties.

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // NOTE: e.target is essentially the element that was clicked.
  console.log(e.target.getBoundingClientRect());

  // NOTE: The current scroll x and y represents how many distance we scroll in horizontal and vertically. So basically this Y coordinate here is the distance between the current position here of the view port, and at the top of the page.
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // NOTE: The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present). clientHeight can be calculated as: CSS height + CSS padding - height of horizontal scrollbar (if present).
  // NOTE: When clientHeight is used on the root element (the <html> element), (or on <body> if the document is in quirks mode), the viewport's height (excluding any scrollbar) is returned. This is a special case of clientHeight.

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Scrolling

  // Old way
  // NOTE: scrollTo is a global function that's available on the window object and here, the first argument is the left position. And the second is the top.
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // NOTE: New way: The Element interface's scrollIntoView() method scrolls the element's parent container such that the element on which scrollIntoView() is called is visible to the user.

  section1.scrollIntoView({ behavior: 'smooth' });
});
/////////////////////////////////////////

// TOPIC: EVENT DELEGATION: IMPLEMENTING PAGE NAVIGATION

// Page navigation
// NOTE: The href here is like a selector. This is a pretty common technique that we use for implementing a navigation like this. So we put the ID of the elements that we want to scroll to in the href attribute, so that then in the JavaScript, we can read that, so we can read that href, and then we can select the element that we want to scroll to.

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation
// NOTE: It is not a better solution because if we have 10000 elements, we need to copy this call back function for 10000 times and it will impact the efficiency. So the better solution is the event delegation.

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// Self code:
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   if (e.target.className === 'nav__link') {
//     const id = e.target.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// TOPIC: BUILDING A TABBED COMPONENT
//////////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  // NOTE: Closest will return itself or the matching ancestor or null.
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  // NOTE: Guard clause is basically an if statement which will return early if some condition is matched.
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // NOTE: The dataset read-only property of the HTMLElement interface provides read/write access to custom data attributes (data-*) on elements. It exposes a map of strings (DOMStringMap) with an entry for each data-* attribute.
  // console.log(clicked.dataset.tab); // 1 or 2 or 3
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///////////////////////////////////////
// TOPIC: PASSING ARGUMENTS TO EVENT HANDLERS
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    console.log(siblings);
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
// NOTE: Mouseover is actually similar to mouseenter, with the big difference that mouseenter does not bubble.
// NOTE: The opposite of mouseenter is mouseleave, and the opposite of this mouseover is mouseout.

// NOTE: It is impossible to pass another argument into an eventHandler function because any handler function like this one can only ever have one real argument, that is the event. But we can use bind method to pass an 'argument', that is this keyword into a handler function. Bind method returns a function, not a value, so it can be used to addEventListener.

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// TOPIC: IMPLEMENTING A STICKY NAVIGATION: THE SCROLL EVENT

// NOTE: Using the scroll event for performing a certain action at a certain position of the page is really not the way to go. And again, that's because the scroll event here fires all the time, no matter how small the change is here in the scroll. And so that makes for a pretty bad performance and especially on mobile.

// TOPIC: A BETTER WAY: THE INTERSECTION OBSERVER API

// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

// NOTE: This callback function here will get called each time that the observed element, so our target element here, is intersecting the root element at the threshold that we defined

const stickyNav = function (entries) {
  console.log(entries);
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// NOTE: This object needs first a root property. And this root is the element that the target is intersecting. We could now here select an element or as an alternative, we can write null, and then we will be able to observe our target element intersecting the entire viewport. Then second, we can define a threshold, and this is basically the percentage of intersection at which the observer callback will be called. Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // NOTE: rootMargin is a box of * pixels that will be applied outside of our target element.
  rootMargin: `-${navHeight}px`,
  // rootMargin: '-90px',
});
// NOTE: IntersectionObserver.observe(): Tells the IntersectionObserver a target element to observe.
headerObserver.observe(header);

// TOPIC: REVEALING ELEMENTS ON SCROLL
///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // NOTE: We can use unobserve to cancel the observe. Each time we reveal the section we unobserve it.

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// TOPIC: LAZY LOADING IMAGES
///////////////////////////////////////
// Lazy loading images

// NOTE: This one really impacts how your site works and especially for your users who might have a slow internet connection or a low data plan or a slow cell phone.

// NOTE: So we select all the images which have the property of data-src.
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src

  // NOTE: It is best to then only remove that blurry filter once the load is done.

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// TOPIC: BUILDING A SLIDER COMPONENT: PART 1
///////////////////////////////////////
// Slider
// NOTE: So here in the slider, we can turn off this overflow property which is set to hidden and then you can actually see the next slide already waiting there.
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions

  // NOTE: The data attribute here holds some data that we need in order to make the functionality work.
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend', // beforeend is basically adding it as the last child always
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // remove all the active class first
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // add active class to the target one
    // NOTE: We can use the brackets to select four images with a certain attribute and even check if they have a certain value.
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // NOTE: The transform CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0%, 100%, 200%, 300%
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      // curSlide = 0: 0%, 100%, 200%
      // curSlide = 1: -100%, 0%, 100%
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();
  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // TOPIC: BUILDING A SLIDER COMPONENT: PART 2
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // console.log(e.target.dataset); // {slide: '1'}
      // NOTE: dataset will return a DOMStringMap with object structure, so we can use destructing.
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////////////////////////////////////////
/*
// TOPIC: SELECTING, CREATING AND DELETING ELEMENTS
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const section1 = document.getElementById('section--1'); // document.querySelector('#section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// NOTE:  getElementsByTagName method actually returns an HTMLCollection. So that's different from a NodeList because an HTMLCollection is actually a so-called live collection. And that means that if the DOM changes then this collection is also immediately updated automatically.

// NOTE: Doesn't need a selector, and also returns a live HTMLCollection.
document.getElementsByClassName('btn');

// Creating and inserting elements

// .insertAdjacentHTML();

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it!</button>';

// NOTE: Prepend basically adds the element as the first child of this element, but we can also edit as the last child. And so that is a append.

// NOTE: Because a DOM element is unique. So it can always only exist at one place at a time.
// header.prepend(message);
header.append(message);

// NOTE: If we really want to insert multiple copies of the same element, we would have to first copy the first element.
// header.append(message.cloneNode(true));

// header.before(message); // insert the message before the header element, so also as a sibling.
// header.after(message); // insert the message after the header element, so also as a sibling.

// Delete element
// NOTE: Remove is a new method and we used to select the parent element first and delete the child element from it before remove method.
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// TOPIC: STYLES. ATTRIBUTES AND CLASSES
// Styles
// NOTE: What we set here is called inline styles.
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// NOTE: We can get the backgroundColor because it is an inline style, so a style that we set manually ourselves, but we cannot get a style that is hidden inside of a class or maybe that doesn't even exist.
console.log(message.style.height);
console.log(message.style.backgroundColor);

// NOTE: We can also get the styles by using getComputedStyle, and it can be very useful.
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// TODO: Document.documentElement returns the Element that is the root element of the document (for example, the <html> element for HTML documents).

document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(document.documentElement);

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.className); // nav__logo

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer); // Undefined
console.log(logo.getAttribute('designer')); // Jonas
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png  -> relative address

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/# -> absolute URL
console.log(link.getAttribute('href')); // #

// Data attributes
console.log(logo.dataset.versionNumber); // versionNumber should be camelCase

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.className = 'Jonas';

// TOPIC: TYPES OF EVENTS AND EVENT HANDLERS

// NOTE: An event is basically a signal that is generated by a certain DOM node and a signal means that something has happened, for example, a click somewhere or the mouse moving, or the user triggering the full screen mode and really anything of importance, that happens on our webpage, generates an event.

const h1 = document.querySelector('h1');

// NOTE: To remove the eventListener, we need to export the function and save it into a variable. So it makes that we can only listen for the event once.

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

// NOTE: The mouseenter event here, is a little bit like the hover event in CSS. So, it fires whenever a mouse enters a certain element.
// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/Element#mouse_events
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Old way doing so
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
// NOTE: There are two ways why addEventListener is better. And 1. it allows us to add multiple event listeners to the same event. So, we could do this here again, and simply change the function on 'onmouseenter'. But if we did the same with 'onmouseenter' property, then the second function would basically simply override the first one. And 2. even more important is that we can actually remove an event handler in case we don't need it anymore.

// TOPIC: EVENT PROPAGATION: BUBBLING AND CAPTURING
// TOPIC: EVENT PROPAGATION IN PRACTICE
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // NOTE: e.target is essentially where the event originated. So where the event first happened. So this is not the element on which the handler is actually attached

  // NOTE: The currentTarget is indeed, the element on which the event handler is attached.
  console.log('LINK', e.target, e.currentTarget);
  // NOTE: The currentTarget is exactly the same as the this keyword.
  console.log(e.currentTarget === this);
  // Stop propagation
  // NOTE: The two parent elements did not change their background colors, which means that the event never arrived at those elements. That's why they weren't handled there, that is because we stopped the propagation right here.
  // NOTE: Stopping the event propagation like this can sometimes fix problems in very complex applications with many handlers for the same events, but in general, it's not really a good idea to stop the propagation of events.
  // e.stopPropagation();
});

// NOTE: Event listener is only listening for events in the bubbling phase, but not in the capturing phase. So that is the default behavior of the addEventListener method, and the reason for that is that the capturing phase is usually irrelevant for us. On the other hand, the bubbling phase can be very useful for something called event delegation.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// NOTE: However, if we really do want to catch events during the capturing phase, we can define a third parameter in the addEventListener function. So in this case where this used capture parameter is set to true, the event handler will no longer listen to bubbling events, but instead, to capturing events.

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true
);

// TOPIC: DOM TRAVERSING

// NOTE: Dom traversing is basically walking through the Dom. Which means that we can select an element based on another element.
const h1 = document.querySelector('h1');

// Going downwards: child

// NOTE: This here indeed selects all the elements with the highlight class that are children of the h1 element. and that would work no matter how deep these child elements would be inside of the h1 element.

console.log(h1.querySelectorAll('.highlight')); // nodeList with 2 span highlights
console.log(h1.childNodes); // nodeList:[text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection: [span.highlight, br, span.highlight] (only work for direct children)
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode); // div.header__title
console.log(h1.parentElement); // div.header__title

// NOTE: The closest() method traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor. If no such element exists, it returns null.

h1.closest('.header').style.background = 'var(--gradient-secondary)';

// NOTE: So if we're looking for the closest h1, then that's gonna be exactly the element itself.

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings

// NOTE: The difference between this previousSibling and previousElementSibling, is that previousSibling returns the previous sibling node as an element node, a text node or a comment node, while previousElementSibling returns the previous sibling node as an element node (ignores text and comment nodes).

console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // h4

console.log(h1.previousSibling); // #text
console.log(h1.nextSibling); // #text

console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

// TOPIC: LIFECYCLE DOM EVENTS
// NOTE: When we say lifecycle, we mean right from the moment that the page is first accessed, until the user leaves it.
// Lifecycle DOM Events
// NOTE: DOM content loaded: this event is fired by the document as soon as the HTML is completely parsed, which means that the HTML has been downloaded and been converted to the DOM tree.Also, all scripts must be downloaded and executed before the DOM content loaded event can happen.

// NOTE: So when we have to script tag here at the end of the HTML, then we do not need to listen for the DOMContentLoaded event.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
// NOTE: This event here is created immediately before a user is about to leave a page. For example, after clicking this close button here in the browser tab,
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
*/
