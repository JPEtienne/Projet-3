var Navbar = {
    mqPhone: window.matchMedia("(max-width: 810px)"),
    tripleLineButton: document.getElementById('triple-line-menu'),
    navMenu: document.getElementsByClassName('nav')[0],
    closeButton: document.querySelector('.nav div i'),
    htmlSelector: document.querySelector('html'),
    greyBackground: window.getComputedStyle(
        document.querySelector('html'), ':before'
    ),
    addStyle: document.createElement("style"),
    // Opens the nav menu on phone
    openNav: function () {
        if (this.mqPhone.matches) {
            this.navMenu.style.right = '0%';
            this.htmlSelector.appendChild(Navbar.addStyle).innerHTML = "html::before {display: block;}"
            this.htmlSelector.style.overflowY = "hidden";
        }
    },
    // closes the nav menu on phone
    closeNav: function () {
        if (this.mqPhone.matches) {
            this.navMenu.style.right = '-2000px';
            this.htmlSelector.appendChild(Navbar.addStyle).innerHTML = "html::before {display: none;}"
            this.htmlSelector.style.overflowY = "scroll";
        }
    }
};
// On burger menu button click
Navbar.tripleLineButton.addEventListener('click', function () {
    Navbar.openNav();
});
// On X button click
Navbar.closeButton.addEventListener('click', function () {
    Navbar.closeNav();
});
