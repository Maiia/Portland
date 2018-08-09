import { Data } from "./data";

const shortAmount = 3;
let menuCategories = document.getElementById('aside-categories');
let fullCategoriesList;

function getCategoriesPromice(amount = false) {
  return Data.getCategoriesListing(amount).then((arrItems) => {
    let arr = [...arrItems];
    createMenuItems(arr, menuCategories, amount);
    return arr;
  })  
}

function createMenuItems(arr, htmlElWrapper, amount = false) {
  let htmlStr = ``;
  
  arr.forEach(element => {
    htmlStr += `<li><span>${element}</span></li>`
  });

  htmlElWrapper.innerHTML = htmlStr;

  if(amount && amount < arr.length) {
    let itemLi = htmlElWrapper.querySelector('li:nth-last-child(1)');
    itemLi.innerHTML = `<span id="view-all" class="view-all">Show all</span>`;
    
    itemLi.querySelector('#view-all').addEventListener('click', () => {

      getCategoriesPromice()
        .then(() => {
          htmlElWrapper.insertAdjacentHTML('beforeend', `<li><span id="view-short" class="view-all">Show ${shortAmount}</span></li>`);
          htmlElWrapper.querySelector('#view-short').addEventListener('click', () => {
            getCategoriesPromice(shortAmount).then(() => reloadHeight(htmlElWrapper.parentNode))
          });
        })
        .then(() => reloadHeight(htmlElWrapper.parentNode))
    });
  }
}

// Accordion
function accordion() {
  let menuTriggerItems = document.querySelectorAll('#aside-menu > li');

  menuTriggerItems.forEach(item => {
    item.parentNode.querySelector('.aside-menu__inner').style.top = item.clientHeight + 'px';
    item.addEventListener('click', (e) => toggleMenuItem(e));
  })
}

function toggleMenuItem(e) {
  let evt = e;
  let currentParent = evt.target.closest('li');

  if(currentParent.querySelector('.aside-menu__inner')) {
      parseInt(currentParent.style.paddingBottom, 10) == 0 || currentParent.style.paddingBottom == 0 ?
        reloadHeight(currentParent) : currentParent.style.paddingBottom = 0;
  }
}

function reloadHeight(menuWrItem) {
  console.log(1, menuWrItem.querySelector('.aside-menu__inner').clientHeight);
  menuWrItem.style.paddingBottom = menuWrItem.querySelector('.aside-menu__inner').clientHeight + 'px';
  console.log(2, menuWrItem.querySelector('.aside-menu__inner').clientHeight);

}


getCategoriesPromice(shortAmount);

window.onload = function() {
  accordion();
}
