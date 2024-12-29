const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function () {
  mobileNav.classList.toggle('hidden');
});