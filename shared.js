var backdrop = document.querySelector(".backdrop");
var modal = document.querySelector('.modal');

var selectPlanButtons = document.querySelectorAll(".plan button");
for (var i = 0; i < selectPlanButtons.length; i++) {
    selectPlanButtons[i].addEventListener('click', function () {
        backdrop.style.display = 'block';
        modal.style.display = 'block';
    });
}

var noButton = document.querySelector('.modal-action__negative');
noButton.addEventListener('click', function() {
    modal.style.display = 'none';
    backdrop.style.display = 'none';
});

var mobileNav = document.querySelector('.mobile-nav');
backdrop.addEventListener('click', function() {
    mobileNav.style.display = 'none';
    modal.style.display = 'none';
    backdrop.style.display = 'none';
});

var toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', openMobileNav)

function openMobileNav() {
    mobileNav.style.display = 'block';
    backdrop.style.display = 'block';
}

