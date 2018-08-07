class DataClass {

  constructor() {
    if (!this.DATA) {
      this.DATA = [];
      console.log("HRENASE");
    }
  }

  getData(){
    // console.log(this.DATA, this.DATA.length);
    return "" + this.DATA.length ?
      fetch('https://jullienfall.github.io/data/db.json')
      .then(item => item.json())
      .then((item) => {
        console.log('getData', this.DATA.length);
        this.DATA.push(...item);
        return this.DATA})
    :
      console.log("BBBBBB", !Object.is(this.DATA, null))
      // console.log('this.DATA');

      this.DATA
    }

  getCategory(catName){
    return this.getData().then(data => {
      return data.filter(item => item.category === catName);
    });
  }
}
let Data = new DataClass();


export { Data };
