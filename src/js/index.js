import './../sass/styles.scss';
import _ from 'lodash';
import Swiper from 'swiper';


var mySwiper = new Swiper ('.swiper-container', {
    speed: 400,
    spaceBetween: 100,

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