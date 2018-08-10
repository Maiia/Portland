class DataClass {

  constructor() {
    this.DATA = null;
    this.getData();
  }

  getData(){
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

  getPropsListing(propName, amount = false){
    let arr = new Set();
    return this.getData().then(data => {
      for (let item of data) {
      arr.add(item[propName]);
        if(amount && arr.size === amount + 1){
          break;
        }
      }
      return arr;
    });
  }
}

let Data = new DataClass;

export { Data };
