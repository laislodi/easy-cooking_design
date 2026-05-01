var backdrop = document.querySelector(".backdrop");
var modal = document.querySelector(".modal");
var modal_title = document.querySelector(".modal-title");

var  selectPlanSections = document.querySelectorAll("section");
for (var i = 0; i < selectPlanSections.length; i++) {
  selectPlanSections[i].addEventListener('click', function () {
    backdrop.classList.add('open');
    modal.classList.add('open');
  });
}
