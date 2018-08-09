import { Data } from "./data";

const shortAmount = 10;
const rootEl = document.getElementById('aside-menu');


// TODO add 

// Factory
class MenuProp {
  constructor(propName) {
    this.listItems;
    this.title = propName;
    this.elWrapper = `aside-${propName}`;
  }

  getProps(amount = false) {
    return Data.getPropsListing(this.title, amount).then((arrItems) => {
      this.listItems = [...arrItems];
  
      this.createMenuItems();
      this.addViewBtn(amount);
      return this.listItems;
    })
  }
  
  createMenuItems() {
    let htmlStr = ``;
  
    this.listItems.forEach(element => {
      htmlStr += `<li><span>${element}</span></li>`
    });
  
    rootEl.querySelector(`#${this.elWrapper}`).innerHTML = htmlStr;
  }
  
  addViewBtn(amount) {
    if(amount && amount < this.listItems.length) {
      let itemLi = rootEl.querySelector(`#${this.elWrapper}`).querySelector('li:nth-last-child(1)');
      itemLi.innerHTML = `<span id="view-all" class="view-all">Show all</span>`;
      
      itemLi.querySelector('#view-all').addEventListener('click', () => {
        this.onViewAllClick()
      })
    }
  }
  
  onViewAllClick() {
    return this.getProps()
      .then (
        () => {
          rootEl.querySelector(`#${this.elWrapper}`).insertAdjacentHTML('beforeend', `<li><span id="view-short" class="view-all">Show ${shortAmount}</span></li>`);
          rootEl.querySelector(`#${this.elWrapper}`).querySelector('#view-short').addEventListener('click', () => {
            return this.getProps(shortAmount)
              .then((items) => reloadHeight(rootEl.querySelector(`#${this.elWrapper}`).parentNode))
          });
        }
      ).then(
        () => reloadHeight(rootEl.querySelector(`#${this.elWrapper}`).parentNode)
      )
  }
}

let CategoriesObj = new MenuProp('category');
let BrandsObj = new MenuProp('brand');






// Accordion
class Accordion {
  constructor() {}
}
function accordion() {
  let id = rootEl.getAttribute('id');
  let menuTriggerItems = rootEl.querySelectorAll(`#${id} > li`);

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
  menuWrItem.style.paddingBottom = menuWrItem.querySelector('.aside-menu__inner').clientHeight + 'px';
}



// init
CategoriesObj.getProps(shortAmount);
BrandsObj.getProps(shortAmount);

window.onload = function() {
  accordion();
}
