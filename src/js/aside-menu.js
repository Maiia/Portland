import { Data } from "./data";
import Accordion from "./accordion";

const shortAmount = 10;
const rootEl = document.getElementById('aside-menu');


// Factory
class MenuProp {
  constructor(rootEl, propName) {
    this.listItems = [];
    this.title = propName;
    this.rootEl = rootEl;
    this.elWrapper = `aside-${propName}`;
  }

  getProps(amount = false, withAll = false) {
    return Data.getPropsListing(this.title, amount).then((arrItems) => {
      this.listItems = arrItems;
  
      this.createMenuItems(withAll);
      this.addViewBtn(amount, withAll);
      return this.listItems;
    })
  }
  
  createMenuItems(withAll) {
    let htmlStr = withAll ? `<li><span class="el-modified">View all products</span></li>` : ``;

    this.listItems.forEach(element => {
      htmlStr += `<li><span>${element}</span></li>`
    });
  
    this.rootEl.querySelector(`#${this.elWrapper}`).innerHTML = htmlStr;

  }
  
  addViewBtn(amount, withAll) {
    if(amount && amount < this.listItems.length) {
      let itemLi = this.rootEl.querySelector(`#${this.elWrapper}`).querySelector('li:nth-last-child(1)');
      itemLi.innerHTML = `<span id="view-all" class="el-modified">Show all</span>`;
      
      itemLi.querySelector('#view-all').addEventListener('click', () => {
        this.onViewAllClick(withAll)
      })
    }
  }
  
  onViewAllClick(withAll) {
    return this.getProps(false, withAll)
      .then (
        () => {
          this.rootEl.querySelector(`#${this.elWrapper}`).insertAdjacentHTML('beforeend', `<li><span id="view-short" class="el-modified">Show ${shortAmount}</span></li>`);
          this.rootEl.querySelector(`#${this.elWrapper}`).querySelector('#view-short').addEventListener('click', () => {
            return this.getProps(shortAmount, withAll)
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


class RangesMenuProp extends MenuProp {
  constructor(rootEl, propName) {
    super(rootEl, propName);
  }

  getRanges(amount) {
    return Data.getRangesListing(amount).then((arrItems) => {
      for(let value of arrItems.values()) {
        this.listItems.push(value);
      }

      this.createMenuItems();
      this.addViewBtn(amount);
      return this.listItems;
    })
  }
}


class TopCategoriesMenuProp extends MenuProp {
  constructor(rootEl, propName) {
    super(rootEl, propName);

    this.elWrapper = `aside-top-${propName}`;
  }
}

let CategoriesObj = new MenuProp(rootEl, 'category');
let BrandsObj = new MenuProp(rootEl, 'brand');
let RangesObj = new RangesMenuProp(rootEl, 'price');
let TopCategoriesObj = new TopCategoriesMenuProp(rootEl, 'category');

CategoriesObj.getProps(shortAmount);
BrandsObj.getProps(shortAmount);
RangesObj.getRanges(shortAmount);
TopCategoriesObj.getProps(shortAmount, true);
