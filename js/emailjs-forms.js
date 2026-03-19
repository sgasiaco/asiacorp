/* ============================================================
   ASIACORP – EmailJS form handler
   Credentials are embedded here; rotate them via the EmailJS
   dashboard if the site is ever moved to a public repo.
   ============================================================ */
(function () {
  var PUBLIC_KEY   = 'A-lsqYfLLmC3O5zHb';
  var SERVICE_ID   = 'service_ifhzfef';
  var TEMPLATE_ID  = 'template_m7vqt6m';

  emailjs.init(PUBLIC_KEY);

  /* Derive a readable page name from the <title> tag */
  var pageName = document.title.replace(/\s*[–-]\s*ASIACORP.*$/i, '').trim() || 'Website';

  /* ── Helpers ─────────────────────────────────────────── */
  function val(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : '';
  }

  function checkedValues(form, name) {
    var boxes = form.querySelectorAll('[name="' + name + '"]:checked');
    if (!boxes.length) return 'None specified';
    return Array.prototype.map.call(boxes, function (b) { return b.value; }).join(', ');
  }

  function setFeedback(el, type, text) {
    if (!el) return;
    el.textContent = text;
    el.className   = 'form-feedback form-feedback--' + type;
  }

  function setBtnState(btn, loading) {
    btn.disabled    = loading;
    btn.textContent = loading ? 'Sending…' : 'Send';
  }

  /* ── Attach handler to one form ──────────────────────── */
  function attachForm(form) {
    /* Insert a feedback paragraph right after the submit button */
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    var fb = document.createElement('p');
    fb.className = 'form-feedback';
    btn.insertAdjacentElement('afterend', fb);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Collect fields */
      var fromName  = val(form, 'name');
      var fromEmail = val(form, 'email');
      var fromPhone = val(form, 'phone');
      var message   = val(form, 'message');
      var interests = checkedValues(form, 'interest');

      /* Basic validation */
      if (!fromName) {
        setFeedback(fb, 'error', 'Please enter your name.');
        return;
      }
      if (!fromEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
        setFeedback(fb, 'error', 'Please enter a valid email address.');
        return;
      }

      /* Loading state */
      setFeedback(fb, '', '');
      setBtnState(btn, true);

      emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name:  fromName,
        from_email: fromEmail,
        from_phone: fromPhone,
        interests:  interests,
        message:    message,
        page:       pageName
      }).then(
        function () {
          setFeedback(fb, 'success', 'Thank you! Your message has been sent. We\'ll be in touch shortly.');
          form.reset();
          setBtnState(btn, false);
        },
        function () {
          setFeedback(fb, 'error', 'Something went wrong. Please try again or email us at support@asiacorp.sg.');
          setBtnState(btn, false);
        }
      );
    });
  }

  /* ── Init all forms on the page ──────────────────────── */
  document.querySelectorAll('form').forEach(attachForm);

})();
