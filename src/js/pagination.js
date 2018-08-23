import { Products } from "./product";

const rootElPagination = document.querySelector('.product-pagination');

class Pagination {
    constructor(rootEl){
        this.pageCurrent = 1;
        this.amount = 6;
        this.rootEl = rootEl;
        this.resultDump;
        this.pagesAmount;
    }

    createPagItems(amount){
        if(amount <= this.amount){
            this.rootEl.style.display = 'none';
            return;
        } else {
            this.rootEl.style.display = 'flex';
        }
        let strHTML = ``;
        this.pagesAmount = Math.ceil(amount/this.amount);
        for(let i = 1; i <= Math.ceil(amount/this.amount); i++) {
            strHTML += `<li><span>${i}</span></li>`;
        }
        strHTML += `<span class="prev"></span><span class="next"></span>`;
        this.rootEl.innerHTML = strHTML;
        this.rootEl.querySelector('li').classList.add('active');
        this.rootEl.addEventListener('click', (e) => this.onPaginationClick(e));
    }

    getProducts(products, resetPagination = false) {
        if (resetPagination) {
            console.log(1);
            this.pageCurrent = 1;
            this.createPagItems(products.length);
        }
        this.resultDump = products;
        let res = [];
        Object.assign(res, this.resultDump);
        return res.splice(this.pageCurrent * this.amount - this.amount, this.amount);
    }

    onPaginationClick(evt) {
        debugger;
        if(evt.target.classList.contains('prev') && this.pageCurrent === 1
            || evt.target.classList.contains('next') && this.pageCurrent === this.pagesAmount) {
            return;
        }

        if(evt.target.innerText) {
            this.pageCurrent = evt.target.innerText;
        } else if (evt.target.classList.contains('prev') || evt.target.classList.contains('next')) {
            if(evt.target.classList.contains('prev') && this.pageCurrent > 1) {
                this.pageCurrent--;
            } else if (evt.target.classList.contains('next') && this.pageCurrent < this.pagesAmount) {
                this.pageCurrent++;
            }
        }

        Products.createProducts(this.resultDump);
        this.rootEl.querySelector('li.active').classList.remove('active');
        this.rootEl.querySelector(`li:nth-child(${this.pageCurrent})`).classList.add('active');
    }
}

let PaginationInst = new Pagination(rootElPagination);

export { PaginationInst };
