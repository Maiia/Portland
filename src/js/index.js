import './../sass/styles.scss';
import _ from 'lodash';
import Swiper from 'swiper';




  // .then(function(response) { 
  //   return response;
  // }) 


var mySwiper = new Swiper ('.swiper-container', {
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
 
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  })

  

  const url = 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=5';
  // export let ProductsData = fetch(url).then(function(response) {
  //   return response.json();
  // });


  // import { counter } from './aside-menu.js';
  import { Data } from './data.js'

  // let data = new Data();
  import { asd } from './asd.js'
  



  