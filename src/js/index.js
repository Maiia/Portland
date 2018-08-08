import './../sass/styles.scss';
import _ from 'lodash';
import Swiper from 'swiper';
//import ListPagination from 'list.pagination.js';

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

  // Pagination

  var paginationTopOptions = {
    name: "paginationTop",
    paginationClass: "paginationTop",
    outerWindow: 2
  };
  var paginationBottomOptions = {
    name: "paginationBottom",
    paginationClass: "paginationBottom",
    innerWindow: 3,
    left: 2,
    right: 4
  };
  var listOptions = {
    valueNames: [ 'name', 'category' ],
    page: 3,
    plugins: [
        ListPagination(paginationTopOptions),
        ListPagination(paginationBottomOptions)
    ]
  };

  var listObj = new List('listId', listOptions);



  // import { counter } from './aside-menu.js';
  import { Data } from './data.js'

  // let data = new Data();
  import { asd } from './asd.js'
  import { aside } from './aside-menu.js'
  import { product } from './product';
  



  
