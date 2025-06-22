// You can add more JS as needed. Example: gallery lightbox, contact form validation, etc.
document.addEventListener('DOMContentLoaded', () => {
  // Example: Confirm form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      alert('Thank you for your message!');
    });
  }

  const WORKER_URL = 'https://worker1.chrishasicloud.workers.dev';

  // BLOG PAGE: Fetch and display blog posts
  if (document.body.contains(document.querySelector('main.container > h1')) && document.querySelector('main.container > h1').textContent === 'Blog') {
    const main = document.querySelector('main.container');
    fetch(`${WORKER_URL}/api/blog-posts`)
      .then(res => res.json())
      .then(files => {
        // Remove static articles
        main.querySelectorAll('article.post').forEach(e => e.remove());
        if (files.length === 0) {
          main.insertAdjacentHTML('beforeend', '<p>No blog posts found.</p>');
        } else {
          files.forEach(filename => {
            fetch(`${WORKER_URL}/api/blog-posts/${filename}`)
              .then(res => res.text())
              .then(content => {
                const title = filename.replace(/\.[^/.]+$/, '');
                const article = document.createElement('article');
                article.className = 'post';
                article.innerHTML = `<h2>${title}</h2><pre>${content}</pre>`;
                main.appendChild(article);
              });
          });
        }
      });
  }

  // GALLERY PAGE: Fetch and display images
  if (document.getElementById('gallery')) {
    const gallery = document.getElementById('gallery');
    fetch(`${WORKER_URL}/api/images`)
      .then(res => res.json())
      .then(images => {
        gallery.innerHTML = '';
        if (images.length === 0) {
          gallery.innerHTML = '<p>No images found.</p>';
        } else {
          images.forEach(img => {
            const imgElem = document.createElement('img');
            imgElem.src = `${WORKER_URL}/images/${img}`;
            imgElem.alt = img;
            imgElem.style.width = '180px';
            imgElem.style.margin = '10px';
            gallery.appendChild(imgElem);
          });
        }
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