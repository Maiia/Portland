import { Data } from './data';
import { PaginationInst } from './pagination';

class Products {
    constructor() {
        this.result = [];
        this.productsWrapper = document.querySelector('.product-row');
        Data.getData().then((result) => {
            Object.assign(this.result, result);
            this.constructor.createProducts(this.result, true, true);
        })
    }

    filtering(filterName, filteredResult = {}, filterStateObj = {}) {
        function returnAll () {
            return filteredResult;
        }
        function getStoreOnline () {
            return filteredResult.filter(item => item.available.store && item.available.online);
        }
        function getStore () {
            return filteredResult.filter(item => item.available.store);
        }
        function getOnline () {
            return filteredResult.filter(item => item.available.online);
        }
        function getConcurrences() {
            let arr = [];
            filterStateObj[filterName].forEach(filterItem => {
                arr.push(...filteredResult.filter(item => item[filterName] === filterItem))
            });
            return arr;
        }
        function getTopCategory () {
            let arr = [];
            if(filterStateObj.topCategory.indexOf('view-all') > -1) {
                arr.push(...filteredResult.filter(item => item.sale > 0));
            } else {
                filterStateObj.topCategory.forEach(topCatName => {
                    arr.push(...filteredResult.filter(item => item.sale > 0 && item.category === topCatName))
                })
            }
            arr.sort(item => item.price - item.sale);
            return arr;
        }
        function getPrice () {
            let arr = [];
            if(filterStateObj.price.length) {
                filterStateObj.price.forEach(priceRange => {
                    let priceRangeArr = priceRange.split('-');

                    arr.push(...filteredResult.filter(item => item.price > priceRangeArr[0] && item.price < priceRangeArr[1]))
                });
                return arr;
            }
            return filteredResult;
        }
        function getSortBy () {
            let condition = filterStateObj['condition'];
            switch(condition) {
                case 'cheep' :
                    return filteredResult.sort((itemCurr, itemPrev) => itemCurr.price - itemPrev.price);
                case 'expensive' :
                    return filteredResult.sort((itemCurr, itemPrev) => itemPrev.price - itemCurr.price);
                case 'az' :
                    return filteredResult.sort((itemCurr,itemPrev) => {
                        return (itemCurr.name > itemPrev.name) ? 1
                            : ((itemPrev.name > itemCurr.name) ? -1
                                : 0);
                    });
                case 'za' :
                    return filteredResult.sort((itemCurr,itemPrev) => {
                        return (itemCurr.name < itemPrev.name) ? 1
                            : ((itemPrev.name < itemCurr.name) ? -1
                                : 0);
                    });
                default :
                    return filteredResult
            }
        }

        function getByKeywords() {
            return filteredResult.filter(item => {
                return item.name.indexOf(filterStateObj['keywords']) > -1
            })
        }

        function getByShipping() {
            return filteredResult.filter(item => {
                return filterStateObj.freeShipping ? item.shipping : true
            })
        }

        function getByColor() {
            return filteredResult.filter(item => {
                return filterStateObj.color ? item.color === filterStateObj['color'] : true;
            })
        }

        let filterType = {
            'all': returnAll,
            'home': returnAll,
            'store-online': getStoreOnline,
            'store': getStore,
            'online': getOnline,
            'brand': getConcurrences,

            'category': getConcurrences,
            'topCategory': getTopCategory,
            'price': getPrice,

            'condition': getSortBy,
            'keywords': getByKeywords,
            'freeShipping': getByShipping,
            'color': getByColor
        };

        return filterType[filterName]();
    }

    reloadActiveFilterClass(selector) {
        if(document.querySelector('.active-filter')) {
            document.querySelector('.active-filter').classList.remove('active-filter');
        }
        document.querySelector(`${selector}`).classList.add('active-filter');
    }

    // sorting panel
    static filterProductsSortingPanel(filterStateObj) {
        let filteredResult = ProductsInstance.result;

        for(let key in filterStateObj) {
            filteredResult = ProductsInstance.filtering(key, filteredResult, filterStateObj);
        }

        ProductsInstance.constructor.createProducts(filteredResult, true);

        ProductsInstance.reloadActiveFilterClass('#sorting-panel');
    }

    // aside filters
    static filterProductsAsideFiltering(filterStateObj){
        let filteredResult = ProductsInstance.filtering(filterStateObj.isAvailableIn, ProductsInstance.result);
        if(filterStateObj.brand.length > 0) filteredResult = ProductsInstance.filtering('brand', filteredResult, filterStateObj);

        ProductsInstance.constructor.createProducts(filteredResult, true);

        ProductsInstance.reloadActiveFilterClass('#aside-filtering');
    }

    // menu
    static filterProductsMenu(filterStateObj){
        filterStateObj[filterStateObj.activeParam] = [filterStateObj[filterStateObj.activeParam]];

        let filteredResult = ProductsInstance.filtering(filterStateObj.activeParam, ProductsInstance.result, filterStateObj);
        ProductsInstance.constructor.createProducts(filteredResult, true);

        ProductsInstance.reloadActiveFilterClass('.aside-menu');
    }

    // html creation
    static createProducts(result, resetPagination = false) {
        let filteredProductsPaginated = PaginationInst.getProducts(result, resetPagination);

        ProductsInstance.productsWrapper.style.cssText = 'top: -15px; transition-duration: 0; opacity: 0';
        ProductsInstance.productsWrapper.innerHTML = '';

        filteredProductsPaginated.forEach(element => {
            let div = document.createElement('div');

            div.setAttribute('class', 'col-lg-4 col-md-6 col-sm-6 col-xs-12');
            div.innerHTML = `<div class="product-item">
                <img src="${element.imageUrl}" class="product-img" alt="Product image">
                <p>${element.name}</p>
                <p>${element.color}</p>
                <p>$${element.price}</p>
                <p class="sale">${element.sale > 0 ? element.sale : ''}</p></div>`;

            ProductsInstance.productsWrapper.appendChild(div);
        });

        setTimeout(() => {
            ProductsInstance.productsWrapper.style.cssText = 'top: 0; transition-duration: 0.7s; opacity: 1';
        }, 200);
    }
}

let ProductsInstance = new Products();

export { Products };
