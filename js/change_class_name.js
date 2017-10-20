'use strict'
function changeClassName(id, name){
   let elem = document.getElementById(id);
   elem.className = name;
   console.log(id);
}

function hideDropedElement(){
    let elem = document.querySelector('[class*="c-checkout-menu__sub-menu"]');
    if (elem) {
        elem.className = "l-drop-menu-js__sub-menu_invisible";
    }
}