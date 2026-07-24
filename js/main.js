/* Ad Meliora — interactions */
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Lead-magnet email gate (Resources page)
  var leadModal = document.getElementById('leadModal');
  if (leadModal) {
    var leadForm = document.getElementById('leadForm');
    var leadFormWrap = document.getElementById('leadFormWrap');
    var leadThanks = document.getElementById('leadThanks');
    var leadTitle = document.getElementById('leadModalTitle');
    var leadThanksMsg = document.getElementById('leadThanksMsg');
    var leadDownload = document.getElementById('leadDownload');
    var leadName = document.getElementById('leadName');
    var lastTrigger = null;

    var openLead = function (trigger) {
      lastTrigger = trigger;
      leadTitle.textContent = trigger.getAttribute('data-title') || 'Get the guide';
      leadDownload.setAttribute('href', trigger.getAttribute('data-download'));
      leadThanks.hidden = true;
      leadFormWrap.hidden = false;
      leadForm.reset();
      leadModal.hidden = false;
      document.body.classList.add('lead-open');
      setTimeout(function () { leadName.focus(); }, 30);
    };

    var closeLead = function () {
      leadModal.hidden = true;
      document.body.classList.remove('lead-open');
      if (lastTrigger) { lastTrigger.focus(); }
    };

    document.querySelectorAll('[data-download]').forEach(function (btn) {
      btn.addEventListener('click', function () { openLead(btn); });
    });
    leadModal.querySelectorAll('[data-lead-close]').forEach(function (el) {
      el.addEventListener('click', closeLead);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !leadModal.hidden) { closeLead(); }
    });

    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName.value, email: document.getElementById('leadEmail').value })
      }).catch(function () { /* download still unlocks even if the Kit call fails */ });
      var noun = (lastTrigger && lastTrigger.getAttribute('data-noun')) || 'download';
      leadThanksMsg.textContent = 'Your ' + noun + ' is ready. Click below and it opens in a new tab.';
      leadFormWrap.hidden = true;
      leadThanks.hidden = false;
      setTimeout(function () { leadDownload.focus(); }, 30);
    });
  }
})();
