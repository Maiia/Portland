class DataClass {

  constructor() {
    this.DATA = null;
    this.getData();
  }

  getData(){
    // return fetch('https://jullienfall.github.io/data/db.json')
    return fetch('https://maiia.github.io/Portland/src/db.json')
      .then(item => item.json())
      .then((item) => {
        this.DATA = item;
        console.log("FIX!!!");
        return this.DATA
      })
  }

  getCategory(catName){
    // if(this.DATA.length > 0) {
    //   return this.DATA.filter(item => item.category === catName);
    // } else {
    return this.getData().then(data => {
      return data.filter(item => item.category === catName);
    });
  // }
  }

  getCollectionsListing(amount = false) {
    let arrWithCats = new Set();
    return this.getData().then(data => {
      for (let item of data) {
        arrWithCats.add(item.category); 
        if(amount && arrWithCats.size == amount + 1){
          break;
        }
      }
      return arrWithCats;
    });
  }

  getBrandsListing(amount) {
    let arrWithBrands = new Set();
    return this.getData().then(data => {
      for (let item of data) {
        if(arrWithBrands.size == amount || arrWithBrands.size == data.length){
          break;
        }
        arrWithBrands.add(item.brand);
      }
      return arrWithBrands;
    });
  }
}

let Data = new DataClass;

export { Data };
