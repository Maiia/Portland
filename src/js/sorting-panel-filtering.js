import { Data } from "./data";
import { Products } from "./product";

const rootEl = document.getElementById('sorting-panel');
const rootElSortBy = rootEl.querySelector('#sort-by');
const rootElKeywords = rootEl.querySelector('#sort-keywords');
const rootElPrice = rootEl.querySelector('.sort-by-price');
const rootElShipping = rootEl.querySelector('#sort-free-shipping');
const rootElColor = rootEl.querySelector('#sort-color');

class SortingPanelFilter {
    constructor(){
        this._condition = 'none';
        this._keywords = [];
        this._price = [];
        this._freeShipping = false;
        this._color = '';
    }

    getSettings() {
        return (
            {
                condition: this._condition,
                keywords: this._keywords,
                price: this._price,
                freeShipping: this._freeShipping,
                color: this._color
            }
        )
    }

    static setProp(propKey, propValue) {
        let filterItem = sortingPanelFilter;
        filterItem[propKey] = propValue;

    }
}

let sortingPanelFilter = new SortingPanelFilter();

class SortBy {
    constructor(rootEl) {
        this.rootEl = rootEl;
        rootEl.addEventListener('change', () => this.onSortByChange())
    }
    onSortByChange() {
        SortingPanelFilter.setProp('_condition', this.rootEl.value);
        Products.filterProductsSortingPanel(sortingPanelFilter.getSettings());
    }
}

class SortKeywords {
    constructor(rootEl) {
        this.rootEl = rootEl;
        rootEl.addEventListener('input', () => this.onKeywordsInput())
    }
    onKeywordsInput() {
        let set = new Set(this.rootEl.value.replace(/ /g, ',').split(','));
        SortingPanelFilter.setProp('_keywords', [...set]);
        Products.filterProductsSortingPanel(sortingPanelFilter.getSettings());
    }
}

class SortPrice {
    constructor(rootEl) {
        this.rootEl = rootEl;
        this.from = '';
        this.to = '';
        this.fromEl = rootEl.querySelector('.from');
        this.toEl = rootEl.querySelector('.to');

        this.fromEl.addEventListener('change', () => this.onSortPriceFromInput());
        this.toEl.addEventListener('change', () => this.to = rootEl.querySelector('.to').value);
        rootEl.querySelector('.btn').addEventListener('click', () => this.onButtonClick());
    }

    onSortPriceFromInput() {
        this.from = rootEl.querySelector('.from').value;
        rootEl.querySelector('.to').setAttribute('min', this.from);
    }

    onButtonClick() {
        let priceRange = [`${this.from}-${this.to}`];
        SortingPanelFilter.setProp('_price', priceRange);
        Products.filterProductsSortingPanel(sortingPanelFilter.getSettings());
    }
}

class SortShipping {
    constructor(rootEl) {
        rootEl.addEventListener('change', () => {
            SortingPanelFilter.setProp('_freeShipping', rootEl.checked);
            Products.filterProductsSortingPanel(sortingPanelFilter.getSettings());
        })
    }
}

class SortColor {
    constructor(rootEl) {
        Data.getPropsListing('color').then((result) => {
            let innerHtml = `<option value="">None</option>`;
            result.forEach(item => innerHtml += `<option value="${item}">${item}</option>`);
            rootEl.innerHTML = innerHtml;
        });

        rootEl.addEventListener('change', () => {
            SortingPanelFilter.setProp('_color', rootEl.value);
            Products.filterProductsSortingPanel(sortingPanelFilter.getSettings());
        })
    }
}

let FilterSortBy = new SortBy(rootElSortBy);
let FilterKeywords = new SortKeywords(rootElKeywords);
let FilterSortPrice = new SortPrice(rootElPrice);
let FilterSortShipping = new SortShipping(rootElShipping);
let FilterSortColor = new SortColor(rootElColor);



