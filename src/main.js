// console.log('Northern California Family Tourney website loaded');
// main.js version: 20220920.1

const kMenuItemClass = 'menu-item';
const kVisibleContainerClass = 'visible-container';
const kHiddenContainerClass = 'hidden-container';
const kActiveMenuItem = 'active-menu-item';

const kHomeLocationId = 'home-location';

const kBodyHomeClass = 'body-home-location';
const kBodyContentClass = 'body-content-location';

function createGalleryTagButton(parent, text, fnHandler) {
  const yearButton = document.createElement('button');
  yearButton.setAttribute('content', text);
  yearButton.setAttribute('class', 'yearButton');
  yearButton.textContent = text;
  yearButton.addEventListener('click', fnHandler);
  parent.appendChild(yearButton);
}

const menusToLocations = {
  "home": "home-location",
  "info": "information-location",
  "gallery": "gallery-location",
  "results": "result-entry-tee-times-location"
}

function getMenuItems() {
  const menuItems = document.getElementsByClassName(kMenuItemClass);
  return menuItems;
}

function menuItemClicked(event) {
  let eventTargetElementId = "";
  if (typeof event === "string") {
    eventTargetElementId = menusToLocations[event];
  } 
  if (!eventTargetElementId || !eventTargetElementId.length) {
    eventTargetElementId = event.target.getAttribute('data-target') || 
                           event.target.parentElement.getAttribute('data-target'); // in case it's an href to an image
  }
  const menuItems = getMenuItems();
  for (const element of menuItems) {
    const menuTargetElementId = element.getAttribute('data-target');
    const menuTargetElement = document.getElementById(menuTargetElementId);
  
    if (menuTargetElementId === eventTargetElementId) {
      menuTargetElement.classList.add(kVisibleContainerClass);
      menuTargetElement.classList.remove(kHiddenContainerClass);
      if (element.parentElement.tagName === 'LI')
        element.parentElement.classList.add(kActiveMenuItem);
    } else {
      menuTargetElement.classList.add(kHiddenContainerClass);
      menuTargetElement.classList.remove(kVisibleContainerClass);
      if (element.parentElement.tagName === 'LI')
        element.parentElement.classList.remove(kActiveMenuItem);
    }

    if (eventTargetElementId === kHomeLocationId) {
      document.body.classList.remove(kBodyContentClass);
      document.body.classList.add(kBodyHomeClass);
    } else {
      document.body.classList.remove(kBodyHomeClass);
      document.body.classList.add(kBodyContentClass);
    }
  };
}

function initApp() {
  const menuItems = getMenuItems();
  for (const element of menuItems) {
    element.addEventListener('click', menuItemClicked, false);
  };
  const hashLoc = window.location.hash.substring(1);
  if (hashLoc.length > 0) {
    menuItemClicked(hashLoc);
  }
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});