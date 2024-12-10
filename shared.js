var backdrop = document.querySelector(".backdrop");
var modal = document.querySelector('.modal');

// console.dir(backdrop.style['background-color']);
// console.dir(backdrop.style.backgroundColor);

var selectPlanButtons = document.querySelectorAll(".plan button");
for (var i = 0; i < selectPlanButtons.length; i++) {
    selectPlanButtons[i].addEventListener('click', function () {
        // backdrop.style.display = 'block';
        // modal.style.display = 'block';
        backdrop.classList.add('open');
        modal.classList.add('open');
    });
}

var noButton = document.querySelector('.modal-action__negative');
noButton.addEventListener('click', function() {
    // modal.style.display = 'none';
    // backdrop.style.display = 'none';
    modal.classList.remove('open');
    backdrop.classList.remove('open');
});

var mobileNav = document.querySelector('.mobile-nav');
backdrop.addEventListener('click', function() {
    // mobileNav.style.display = 'none';
    // modal.style.display = 'none';
    // backdrop.style.display = 'none';
    mobileNav.classList.remove('open');
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    
});

var toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', openMobileNav)

function openMobileNav() {
    // mobileNav.style.display = 'block';
    // backdrop.style.display = 'block';
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
}

