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
      return [...arr];
    });
  }

    getRangesListing(amount){
    return this.getData().then(data => {
      let arr = [];
      for (let item of data) {
        arr.push(item['price']);
      }

      let min = parseInt((Math.min(...arr)/100), 10)*100;
      let max = parseInt(1 + (Math.max(...arr)/100), 10) * 100;

      let rangeStep = (max - min) / amount;
      let arrRanges = new Map();
      var prev = min;
      for (let i = 0; i < amount; i++){
        arrRanges.set(prev, `${prev}-${prev + rangeStep - 1}`);
        prev = prev + rangeStep;
      }
      return arrRanges;
    });
  }
}

let Data = new DataClass;

export { Data };
