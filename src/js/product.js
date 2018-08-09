import { Data } from './data';

Data.getData().then((items) => {
    let products = document.querySelector('.product-row');
    let n = 6;
    let itemsCount = items.length;
    let pageCount = Math.ceil(itemsCount/n);
    let result = items.slice(0, parseFloat(n));
    let arr = [];
    openPage(result);

    for (let i = 0; i < pageCount; i++){
        arr.push(i+1);
    }

    arr.forEach(p => {
        let pagin = document.querySelector('.product-pagination');
        let button = document.createElement('button');
        button.innerHTML = `${p}`;
        button.addEventListener('click', function() {
            let start = parseFloat(p-1)*parseFloat(n);
            let end = parseFloat(p)*parseFloat(n);
            let newResult = items.slice(start, end);
            openPage(newResult);
        });
        pagin.appendChild(button);  
    });

    function openPage(res){
        products.innerHTML = '';
        res.forEach(element => {
            let div = document.createElement('div');
            div.setAttribute('class', 'col-lg-4 col-md-6 col-sm-6 col-xs-12');
            div.innerHTML = `<div class="product-item">
            <img src="${element.imageUrl}" class="product-img" alt="Product image">
            <p>${element.name}</p>
            <p>${element.color}</p>
            <p>$ ${element.price}</p></div>`;
            products.appendChild(div);
        });
    };

});

