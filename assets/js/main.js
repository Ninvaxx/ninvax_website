// You can add more JS as needed. Example: gallery lightbox, contact form validation, etc.
document.addEventListener('DOMContentLoaded', () => {
  // Example: Confirm form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      alert('Thank you for your message!');
    });
  }
});

;(function() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const defaultTheme = stored || 'ninvax';
  root.setAttribute('data-theme', defaultTheme);

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'ninvax' ? 'nina' : 'ninvax';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();