/* ===============================
   CharDent — interactions
   =============================== */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("mainNav");
  var toggle = document.getElementById("navToggle");

  /* ---- Sticky header shadow ---- */
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  var closeNav = function () {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  var openNav = function () {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  };
  toggle.addEventListener("click", function () {
    if (nav.classList.contains("open")) closeNav();
    else openNav();
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) closeNav();
  });

  /* ---- Active link on scroll ---- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (l) {
      var id = l.getAttribute("href");
      return id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle(
              "active",
              l.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .card, .step, .quote, .about-media, .about-copy, .hero-copy, .hero-media, .gallery figure, .booking-form, .contact-info"
  );
  Array.prototype.forEach.call(revealTargets, function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    Array.prototype.forEach.call(revealTargets, function (el) {
      revealObserver.observe(el);
    });
  } else {
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add("in");
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Booking form (client-side only) ---- */
  var form = document.getElementById("bookingForm");
  var note = document.getElementById("formNote");

  var setNote = function (msg, type) {
    note.textContent = msg;
    note.className = "form-note " + (type || "");
  };

  var isEmail = function (v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var firstInvalid = null;

      [name, email].forEach(function (field) {
        var invalid =
          field === email
            ? !isEmail(field.value.trim())
            : field.value.trim() === "";
        field.setAttribute("aria-invalid", invalid ? "true" : "false");
        if (invalid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setNote("Please add your name and a valid email so we can reach you.", "err");
        firstInvalid.focus();
        return;
      }

      var service = form.elements.service.value;
      setNote(
        "Thanks, " +
          name.value.trim().split(" ")[0] +
          "! Your request for “" +
          service +
          "” has been received — we'll confirm within one working day.",
        "ok"
      );
      form.reset();
      name.setAttribute("aria-invalid", "false");
      email.setAttribute("aria-invalid", "false");
    });
  }
})();
