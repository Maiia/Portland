import './../sass/styles.scss';
import _ from 'lodash';
import Swiper from 'swiper';


// Slider

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


  import { aside } from './aside-menu.js';
  import { AsideFilter } from './aside-filtering';
  import { SortingPanelFilter } from './sorting-panel-filtering';
  import { product } from './product';




  
