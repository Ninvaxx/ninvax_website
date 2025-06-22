document.addEventListener('DOMContentLoaded', () => {
  const load = (selector, url) => {
    fetch(url)
      .then(resp => resp.text())
      .then(html => { document.querySelector(selector).innerHTML = html; })
      .catch(err => console.error(`Failed to load ${url}`, err));
  };
  load('#header-container', 'partials/header.html');
  load('#footer-container', 'partials/footer.html');
});
