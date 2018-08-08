class DataClass {

  constructor() {
    this.DATA = null;
    this.getData();
  }

  getData(){
    return fetch('https://jullienfall.github.io/data/db.json')
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

  getCategoriesListing(amount = false) {
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
    let arrWithCats = new Set(); 
    return this.getData().then(data => {
      for (let item of data) {
        if(arrWithCats.size == amount || arrWithCats.size == data.length){
          break;
        }
        arrWithCats.add(item.category);
      }
      return arrWithCats;
    });
  }
}

<<<<<<< HEAD
let Data = new DataClass();
=======
let Data = new DataClass;
>>>>>>> 921aa977afc5c795ae0e6e68ff2ee05aa6d057c5

export { Data };
