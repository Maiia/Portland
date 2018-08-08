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

  getCategoriesListing(amount) {
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

let Data = new DataClass;

export { Data };
