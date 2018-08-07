class DataClass {

  constructor(DATA) {
       this.DATA = DATA;
 }

 getData() {
      return fetch('https://jullienfall.github.io/data/db.json')
        .then(item => item.json())
        .then(item => this.DATA = item);
    }

  getCategory(catName){
    return this.getData().then(data => {
      return data.filter(item => item.category === catName);
    });
  }
}
let Data = new DataClass();

export { Data };
