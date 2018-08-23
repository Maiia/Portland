import { Data } from "./data";
import Accordion from "./accordion";
import { Products } from "./product";

const shortAmount = 10;
const rootEl = document.getElementById('aside-menu');


class MenuFilter {
    constructor(){
      this.activeParam = 'home';
      this.topCategory = '';
      this.category = '';
      this.brand = '';
      this.price = '';

      rootEl.querySelector('#aside-reset').addEventListener('click', (e) => {
          MenuFilter.setProp('home', 'activeParam');
          Products.filterProductsMenu(MenuFilterInstance.getSettings());
      })
    }

    getSettings() {
        return (
            {
                activeParam: this.activeParam,
                topCategory: this.topCategory,
                category: this.category,
                brand: this.brand,
                price: this.price
            }
        )
    }

    static setProp(propValue, propKey) {
        let filterItem = MenuFilterInstance;
        filterItem[propKey] = propValue;
    }
}

let MenuFilterInstance = new MenuFilter();


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

      this.rootEl.querySelectorAll(`#${this.elWrapper} > li`)
        .forEach(item => item.addEventListener('click', (e) => {
          if(e.target.dataset.attr) {
            this.onMenuLinkClick(e);
          }
        }
      ));

      this.addViewBtn(amount, withAll);
      return this.listItems;
    })
  }


  onMenuLinkClick(e) {
    let key = e.target.closest('.aside-menu__inner').getAttribute('id').replace('aside-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    let value = e.target.dataset.attr;
    MenuFilter.setProp(value, key);
    MenuFilter.setProp(key, 'activeParam');
    Products.filterProductsMenu(MenuFilterInstance.getSettings());
  }
  
  createMenuItems(withAll) {
    let htmlStr = withAll ? `<li><span data-attr="view-all" class="el-modified">View all products</span></li>` : ``;

    this.listItems.forEach(element => {
      htmlStr += `<li><span data-attr="${element}">${element}</span></li>`;
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

      this.rootEl.querySelectorAll(`#${this.elWrapper} > li`).forEach(item => item.addEventListener('click', (e) => this.onMenuLinkClick(e)));
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
