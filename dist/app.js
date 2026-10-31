// Progressive enhancement only: the page is fully readable without this file.
(() => {
  const navToggle = document.querySelector('.nav-toggle')
  const nav = document.getElementById('site-nav')

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open')
      navToggle.setAttribute('aria-expanded', String(open))
    })
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('open')
        navToggle.setAttribute('aria-expanded', 'false')
      }
    })
  }

  // Show the build stamp from build.json; failure is non-fatal.
  fetch('build.json')
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (data?.build) document.getElementById('build-stamp').textContent = data.build
    })
    .catch(() => {})

  // Signal to capture tooling that the page hydrated without errors.
  document.documentElement.dataset.appReady = 'true'
})()
