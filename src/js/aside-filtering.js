import { Data } from "./data";
import { Products } from "./product";

const rootElAvailable = document.getElementById('aside-filter-available');
const rootElBrands = document.getElementById('aside-filter-brand');

class AsideFilter {
    constructor(){
        this._isAvailableIn = 'all';
        this._brand = [];
    }

    getSettings() {
        return (
            {
                isAvailableIn: this._isAvailableIn,
                brand: this._brand,
            }
        )
    }

    static setAllProp(propName, propArr) {
        let filterItem = AsideFiltersStatus;
        filterItem[propName] = [];
        if(propArr) {
            filterItem[propName] = propArr;
        }
    }

    static setProp(propName, propItem) {
        let filterItem = AsideFiltersStatus;
        let elIndex = filterItem[propName].indexOf(propItem);
        elIndex === -1 ?
            filterItem[propName].push(propItem)
            : filterItem[propName].splice(elIndex, 1);
    }
}


class AsideFilterAvailable {
    constructor(rootEl) {
        this.rootEl = rootEl;
        this.getAmountAvailable();
        this.rootEl.addEventListener('click', (e) => {
            if(e.target.name) {
                AsideFiltersStatus._isAvailableIn = e.target.id;
                Products.filterProductsAsideFiltering(AsideFiltersStatus.getSettings());
            }
        })
    }

    getAmountAvailable() {
        let obj = {
            'store': 0,
            'online': 0,
            'store-online': 0,
            'all': 0
        };
        return Data.getAmountAvailable(obj)
            .then((obj) => { this.writeAmount(obj); })
    }

    writeAmount(obj){
        for(let key in obj) {
            this.rootEl.querySelector(`#${key}`).parentElement.querySelector('.amount').innerHTML = obj[key];
        }
    }
}


class AsideFilterProp {
    constructor(rootEl, prop) {
        this.rootEl = rootEl;
        this.getProps(prop);

        this.rootEl.addEventListener('change', (e) => this.onCheckboxClick(e));
        this.rootEl.parentNode.querySelector('.view-all-link').addEventListener('click', () => this.onViewAllClick());

        this.check;
    }

    onCheckboxClick(e) {
        AsideFilter.setProp('_brand', e.target.name);
        Products.filterProductsAsideFiltering(AsideFiltersStatus.getSettings());
    }

    getProps(prop) {
        return Data.getPropsListing(prop)
            .then((arrItems) => {
                let objItems = {};
                arrItems.forEach(item => {
                    objItems[item] = 0;
                });
                return objItems;
            })
            .then(objItems => {
                return Data.getGoodsAmountByProps(objItems, prop)
                    .then(objItems => this.createPropItems(objItems, prop));
            })
    }

    createPropItems(objItems){
        let tmplProp = document.getElementById('aside-props-filter-item').content;
        let fragment = document.createDocumentFragment();

        for(let key in objItems) {
            let propItem = tmplProp.cloneNode(true);
            propItem.querySelector('.title').innerHTML = key;
            propItem.querySelector('input').setAttribute('name', key);
            propItem.querySelector('.amount').innerHTML = objItems[key];
            fragment.appendChild(propItem);
        }

        this.rootEl.querySelector('.block-bg__padding').appendChild(fragment);
    }

    onViewAllClick() {
        if (!this.check) {
            let arr = [];
            this.rootEl.querySelectorAll('input').forEach(item => {
                item.checked = true;
                arr.push(item.name);
            });
            AsideFilter.setAllProp('_brand', arr);
            this.check = true;
        } else {
            this.rootEl.querySelectorAll('input').forEach(item => {
                item.checked = false;
            });
            AsideFilter.setAllProp('_brand', false);
            this.check = false;
        }

        Products.filterProductsAsideFiltering(AsideFiltersStatus.getSettings());
    }
}

let AsideFiltersStatus = new AsideFilter();

let AvailableFilter = new AsideFilterAvailable(rootElAvailable);
let BrandsFilterState = new AsideFilterProp(rootElBrands, 'brand');

