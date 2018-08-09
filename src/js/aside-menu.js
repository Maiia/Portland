import { Data } from "./data";

const shortAmount = 3;
let menuCollections = document.getElementById('aside-categories');

// TODO add 

// GET COLLECTIONS
let fullCollectionsList;

function getCollectionsPromice(amount = false) {
  return Data.getCollectionsListing(amount).then((arrItems) => {
    let arr = [...arrItems];
    createMenuItems(arr, menuCollections, amount, getCollectionsPromice);
    return arr;
  })
}

// GET BRANDS

function getBrandsPromice(amount = false) {
  return Data.getBrandsListing(amount).then((arrItems) => {
    console.log(arrItems);
  //   let arr = [...arrItems];
  //   createMenuItems(arr, menuCollections, amount, getBrandsPromice);
  //   return arr;
  })  
}


function createMenuItems(arr, htmlElWrapper, amount = false, getDataFPromice) {
  let htmlStr = ``;
  
  arr.forEach(element => {
    htmlStr += `<li><span>${element}</span></li>`
  });

  htmlElWrapper.innerHTML = htmlStr;

  if(amount && amount < arr.length) {
    let itemLi = htmlElWrapper.querySelector('li:nth-last-child(1)');
    itemLi.innerHTML = `<span id="view-all" class="view-all">Show all</span>`;
    
    itemLi.querySelector('#view-all').addEventListener('click', () => onViewAllClick(htmlElWrapper, getDataFPromice))
  }
}

function onViewAllClick(htmlElWrapper, getDataFPromice) {
  return getDataFPromice()
  .then(() => {
    htmlElWrapper.insertAdjacentHTML('beforeend', `<li><span id="view-short" class="view-all">Show ${shortAmount}</span></li>`);
    htmlElWrapper.querySelector('#view-short').addEventListener('click', () => {
      getDataFPromice(shortAmount).then(() => reloadHeight(htmlElWrapper.parentNode))
    });
  })
  .then(() => reloadHeight(htmlElWrapper.parentNode))
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



// init
getCollectionsPromice(shortAmount);
getBrandsPromice(shortAmount);

window.onload = function() {
  accordion();
}
