const amount = 5;
const url = 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=' + amount;

fetch(url)
  .then(function(response) {
    return response.json();
   })

  .then(function(response) {
    let menu = document.getElementById('aside-menu');

    response.features.forEach(item => {
      let itemLi = document.createElement('li');
      let itemA = document.createElement('a');
      itemA.innerHTML = item.properties.title;
      menu.appendChild(itemLi).appendChild(itemA);
    })
  })