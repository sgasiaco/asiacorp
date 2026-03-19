// Mobile navigation toggle
function toggleNav() {
  var menu = document.getElementById('navMenu');
  menu.classList.toggle('open');
}

// Close nav when a link is clicked (mobile)
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('.nav-menu a');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      document.getElementById('navMenu').classList.remove('open');
    });
  });
});
