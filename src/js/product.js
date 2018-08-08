import { Data } from './data';

Data.getData().then((item) => {
    let product = document.querySelector('.product-row');

    item.forEach(element => {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-lg-4 col-md-6 col-sm-6 col-xs-12');
        div.innerHTML = `<div class="product-item">
        <img src="${element.imageUrl}" class="product-img" alt="Product image">
        <p>${element.name}</p>
        <p>${element.color}</p>
        <p>$ ${element.price}</p></div>`;
        product.appendChild(div);
    });
    
});