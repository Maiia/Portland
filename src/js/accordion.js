// Accordion
export default class Accordion {
  constructor() {
    this.accordion = document.querySelector('.accordion');
    const menuTriggerItems = this.accordion.parentNode.parentNode.querySelectorAll(`.accordion > li`);

    menuTriggerItems.forEach(item => {
      item.parentNode.querySelector('.aside-menu__inner').style.top = item.clientHeight + 'px';
      item.addEventListener('click', (e) => this.toggleMenuItem(e));
    })
  }

  toggleMenuItem(e) {
    let evt = e;
    let currentParent = evt.target.closest('li');
  
    if(currentParent.querySelector('.aside-menu__inner')) {
        parseInt(currentParent.style.paddingBottom, 10) == 0 || currentParent.style.paddingBottom == 0 ?
          this.constructor.reloadHeight(currentParent) : currentParent.style.paddingBottom = 0;
    }
  }

  static reloadHeight(menuWrItem) {
    menuWrItem.style.paddingBottom = menuWrItem.querySelector('.aside-menu__inner').clientHeight + 'px';
  }
}

// init
// window.onload = function() {
  // accordion();
new Accordion();
// }

