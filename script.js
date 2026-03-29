/**
 * Portfolio site — interactions: theme, typing, scroll, form, filters
 */

(function () {
  "use strict";

  var THEME_KEY = "portfolio-theme";
  var root = document.documentElement;
  var body = document.body;

  /* ---------- Loading overlay ---------- */
  function initLoader() {
    var loader = document.getElementById("page-loader");
    if (!loader) return;

    window.addEventListener("load", function () {
      loader.classList.add("hidden");
      setTimeout(function () {
        loader.setAttribute("aria-hidden", "true");
      }, 600);
    });
  }

  /* ---------- Theme (localStorage) ---------- */
  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function initTheme() {
    var toggle = document.getElementById("theme-toggle");
    var stored = getStoredTheme();
    var prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
    } else if (prefersDark) {
      applyTheme("dark");
    }

    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      setStoredTheme(next);
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
    }

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      links.classList.add("is-open");
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) closeMenu();
      else openMenu();
    });

    links.querySelectorAll(".nav-link").forEach(function (a) {
      a.addEventListener("click", function () {
        closeMenu();
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ---------- Smooth scroll with header offset ---------- */
  function initSmoothScroll() {
    var header = document.querySelector(".site-header");
    var offset = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var id = anchor.getAttribute("href");
        if (!id || id === "#") return;

        var target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  /* ---------- Typing effect ---------- */
  function initTyping() {
    var el = document.getElementById("typed-text");
    if (!el) return;

    var phrases = [
      "Front-End Developer",
      "UI Engineer",
      "React Specialist",
      "Design Systems Nerd",
    ];

    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var typeSpeed = 90;
    var deleteSpeed = 55;
    var pauseEnd = 2000;
    var pauseStart = 400;

    function tick() {
      var phrase = phrases[phraseIndex];

      if (!deleting) {
        el.textContent = phrase.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === phrase.length) {
          deleting = true;
          return setTimeout(tick, pauseEnd);
        }
        return setTimeout(tick, typeSpeed);
      }

      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        return setTimeout(tick, pauseStart);
      }
      return setTimeout(tick, deleteSpeed);
    }

    tick();
  }

  /* ---------- Scroll reveal + skill bars ---------- */
  function initReveal() {
    var reveals = document.querySelectorAll("[data-reveal]");
    if (!reveals.length) return;

    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
      document.querySelectorAll(".skill-bar").forEach(function (bar) {
        var w = bar.getAttribute("data-width");
        bar.style.setProperty("--target-width", (w || 80) + "%");
        bar.classList.add("is-animated");
      });
      return;
    }

    var skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var bar = entry.target;
          var w = bar.getAttribute("data-width");
          bar.style.setProperty("--target-width", (w || 80) + "%");
          bar.classList.add("is-animated");
          skillObserver.unobserve(bar);
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll(".skill-bar").forEach(function (bar) {
      skillObserver.observe(bar);
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Project filtering ---------- */
  function initProjectFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".project-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter") || "all";

        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });

        cards.forEach(function (card) {
          var cat = card.getAttribute("data-category");
          var show = filter === "all" || cat === filter;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------- Contact form → inbox (FormSubmit.co, no server required) ---------- */
  var FORMSUBMIT_INBOX = "itsayeshabatool@gmail.com";

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");
    var nameErr = document.getElementById("name-error");
    var emailErr = document.getElementById("email-error");
    var messageErr = document.getElementById("message-error");
    var success = document.getElementById("form-success");
    var submitBtn = document.getElementById("contact-submit");
    var gotcha = document.getElementById("form-gotcha");

    function clearErrors() {
      [nameErr, emailErr, messageErr].forEach(function (el) {
        if (el) el.textContent = "";
      });
      [nameInput, emailInput, messageInput].forEach(function (input) {
        if (input) input.classList.remove("invalid");
      });
      if (success) {
        success.hidden = true;
        success.textContent = "";
        success.classList.remove("is-error");
      }
    }

    function validateName(value) {
      var v = (value || "").trim();
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      return "";
    }

    function validateEmail(value) {
      var v = (value || "").trim();
      if (!v) return "Please enter your email.";
      /* pragmatic email pattern */
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(v)) return "Please enter a valid email address.";
      return "";
    }

    function validateMessage(value) {
      var v = (value || "").trim();
      if (!v) return "Please enter a message.";
      if (v.length < 10) return "Message should be at least 10 characters.";
      return "";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      var nErr = validateName(nameInput.value);
      var eErr = validateEmail(emailInput.value);
      var mErr = validateMessage(messageInput.value);

      if (nErr && nameErr) nameErr.textContent = nErr;
      if (eErr && emailErr) emailErr.textContent = eErr;
      if (mErr && messageErr) messageErr.textContent = mErr;

      if (nErr) nameInput.classList.add("invalid");
      if (eErr) emailInput.classList.add("invalid");
      if (mErr) messageInput.classList.add("invalid");

      if (nErr || eErr || mErr) return;

      if (gotcha && gotcha.value && String(gotcha.value).trim() !== "") {
        return;
      }

      var nameVal = nameInput.value.trim();
      var emailVal = emailInput.value.trim();
      var msgVal = messageInput.value.trim();

      var endpoint =
        "https://formsubmit.co/ajax/" + encodeURIComponent(FORMSUBMIT_INBOX);
      var originalLabel = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      if (success) {
        success.classList.remove("is-error");
        success.hidden = true;
        success.textContent = "";
      }

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          message: msgVal,
          _subject: "Portfolio: message from " + nameVal,
          _replyto: emailVal,
          _gotcha: "",
        }),
      })
        .then(function (res) {
          return res.text().then(function (text) {
            try {
              return JSON.parse(text);
            } catch (err) {
              return { success: false, message: text || "" };
            }
          });
        })
        .then(function (data) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
          var ok = data && (data.success === true || data.ok === true);
          if (ok) {
            form.reset();
            if (success) {
              success.classList.remove("is-error");
              success.textContent =
                "Message sent. Thank you. I’ll get back to you soon.";
              success.hidden = false;
            }
          } else if (success) {
            success.classList.add("is-error");
            var raw =
              (data && data.message && String(data.message)) ||
              (data && data.error && String(data.error)) ||
              "";
            var needsActivation =
              /activat|activation link|needs activation|not activated|confirm your email|verify your email/i.test(
                raw
              );
            if (needsActivation) {
              success.textContent =
                "This form needs activation. We sent an email to " +
                FORMSUBMIT_INBOX +
                " with an activation link. Open it, click the link, and your form will be activated. Then try sending again.";
            } else {
              success.textContent =
                raw ||
                "Could not send. Please email " + FORMSUBMIT_INBOX + " directly.";
            }
            success.hidden = false;
          }
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
          if (success) {
            success.classList.add("is-error");
            success.textContent =
              "Could not send (offline or blocked). Email " +
              FORMSUBMIT_INBOX +
              " from your mail app.";
            success.hidden = false;
          }
        });
    });

    ["input", "blur"].forEach(function (evt) {
      if (nameInput) {
        nameInput.addEventListener(evt, function () {
          if (nameErr) nameErr.textContent = "";
          nameInput.classList.remove("invalid");
        });
      }
      if (emailInput) {
        emailInput.addEventListener(evt, function () {
          if (emailErr) emailErr.textContent = "";
          emailInput.classList.remove("invalid");
        });
      }
      if (messageInput) {
        messageInput.addEventListener(evt, function () {
          if (messageErr) messageErr.textContent = "";
          messageInput.classList.remove("invalid");
        });
      }
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;

    function toggle() {
      if (window.scrollY > 480) btn.classList.add("is-visible");
      else btn.classList.remove("is-visible");
    }

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- Boot ---------- */
  function init() {
    initLoader();
    initTheme();
    initNav();
    initSmoothScroll();
    initTyping();
    initReveal();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
