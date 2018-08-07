import { Data } from "./data";
  
Data.getCategoriesListing('5').then((arrItems) => {
    let menu = document.getElementById('aside-categories');
    let arr = [...arrItems];
    console.log(arr);
    arr.forEach(element => {
        let itemLi = document.createElement('li');
        let itemA = document.createElement('a');
        itemA.innerHTML = element;
        menu.appendChild(itemLi).appendChild(itemA);
    });
})