// Mobile nav toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  function closeMenu() {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  toggle.addEventListener('click', function () {
    if (document.body.classList.contains('nav-open')) closeMenu();
    else openMenu();
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMenu();
  });
})();

// Highlight nav link for the section currently in view
(function () {
  const links = Array.from(document.querySelectorAll('.nav-links a:not(.nav-cta)'));
  const map = links
    .map(function (a) {
      const href = a.getAttribute('href') || '';
      const hash = href.indexOf('#') >= 0 ? href.split('#').pop() : '';
      if (!hash) return null;
      return { a: a, el: document.getElementById(hash) };
    })
    .filter(function (x) {
      return x && x.el;
    });

  function setActive() {
    const y = window.scrollY + 100;
    var current = map[0];
    for (var i = 0; i < map.length; i++) {
      if (map[i].el.offsetTop <= y) current = map[i];
    }
    links.forEach(function (l) {
      l.classList.remove('active');
    });
    if (current) current.a.classList.add('active');
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

// Contact form: package field details into an email
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submitBtn = document.getElementById('contact-submit');

  function showStatus(kind, text) {
    status.className = 'form-status is-visible ' + (kind === 'ok' ? 'is-ok' : 'is-err');
    status.textContent = text;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = (form.name.value || '').trim();
    var email = (form.email.value || '').trim();
    var interest = (form.interest.value || '').trim();
    var message = (form.message.value || '').trim();
    var to = (form.getAttribute('data-contact-email') || '').trim();

    if (!name || !email || !interest || !message) {
      showStatus('err', 'Please complete all fields so the full details can be sent.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('err', 'Please enter a valid email address.');
      return;
    }

    if (!to) {
      showStatus('err', 'Contact email is not configured on this form.');
      return;
    }

    var subject = '[Najoe Solutions] ' + interest + ' - ' + name;
    var body = [
      'New project inquiry from the portfolio site',
      '========================================',
      '',
      'Name:     ' + name,
      'Email:    ' + email,
      'Interest: ' + interest,
      '',
      'Project brief',
      '-------------',
      message,
      '',
      '========================================',
      'Sent from najoe portfolio contact form'
    ].join('\n');

    var mailto =
      'mailto:' + encodeURIComponent(to) +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    submitBtn.disabled = true;
    window.location.href = mailto;

    showStatus(
      'ok',
      'Details packaged. Your email app should open with the full message ready to send to ' + to + '.'
    );

    setTimeout(function () {
      submitBtn.disabled = false;
    }, 1500);
  });
})();
