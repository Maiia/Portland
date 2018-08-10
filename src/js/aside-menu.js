import { Data } from "./data";
import Accordion from "./accordion";

const shortAmount = 10;
const rootEl = document.getElementById('aside-menu');
const rootEl2 = document.getElementById('aside-menu1');


// Factory
class MenuProp {
  constructor(rootEl, propName) {
    this.listItems;
    this.title = propName;
    this.rootEl = rootEl;
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
  
    this.rootEl.querySelector(`#${this.elWrapper}`).innerHTML = htmlStr;
  }
  
  addViewBtn(amount) {
    if(amount && amount < this.listItems.length) {
      let itemLi = this.rootEl.querySelector(`#${this.elWrapper}`).querySelector('li:nth-last-child(1)');
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
          this.rootEl.querySelector(`#${this.elWrapper}`).insertAdjacentHTML('beforeend', `<li><span id="view-short" class="view-all">Show ${shortAmount}</span></li>`);
          this.rootEl.querySelector(`#${this.elWrapper}`).querySelector('#view-short').addEventListener('click', () => {
            return this.getProps(shortAmount)
              .then(() => Accordion.reloadHeight(this.rootEl.querySelector(`#${this.elWrapper}`).parentNode))
          });
        }
      ).then(
        () => {
          Accordion.reloadHeight(this.rootEl.querySelector(`#${this.elWrapper}`).parentNode)
        }
      )
  }
}

let CategoriesObj = new MenuProp(rootEl, 'category');
let BrandsObj = new MenuProp(rootEl, 'brand');
CategoriesObj.getProps(shortAmount);
BrandsObj.getProps(shortAmount);
