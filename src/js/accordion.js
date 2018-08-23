// Accordion
export default class Accordion {
    constructor() {
        this.accordion = document.querySelector('.accordion');
        const menuTriggerItems = this.accordion.querySelectorAll(`.level-1`);

        menuTriggerItems.forEach(item => {
            if (item.parentNode.querySelector('.aside-menu__inner')) {
                item.parentNode.querySelector('.aside-menu__inner').style.top = item.clientHeight + 'px';
            }
            item.addEventListener('click', (e) => this.toggleMenuItem(e));
        })
    }

    toggleMenuItem(evt) {
      let currentParent = evt.target.closest('li');
      currentParent.classList.add('active');

      let allItems = this.accordion.querySelectorAll('.accordion > li');
      for(let item of allItems) {
          if(item != currentParent){
              item.classList.remove('active');
              item.style.paddingBottom = 0
          }
      }

      if(currentParent.querySelector('.aside-menu__inner')) {
          parseInt(currentParent.style.paddingBottom, 10) == 0 || currentParent.style.paddingBottom == 0 ?
              this.constructor.reloadHeight(currentParent) : currentParent.style.paddingBottom = '0';
      }
    }

    static reloadHeight(menuWrItem) {
        menuWrItem.style.paddingBottom = menuWrItem.querySelector('.aside-menu__inner').clientHeight + 'px';
    }
}

new Accordion();

