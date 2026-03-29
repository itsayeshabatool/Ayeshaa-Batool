/**
 * Smart Analytics — full interactivity (works in older browsers + file://)
 */
(function () {
  function showToast(msg) {
    var t = document.getElementById("demo-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "demo-toast";
      t.className = "demo-toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "demo-toast demo-toast--visible";
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      t.className = "demo-toast";
    }, 2200);
  }

  function setActiveNav(clicked) {
    var nav = document.querySelectorAll(".sidebar .nav a");
    for (var i = 0; i < nav.length; i++) {
      nav[i].classList.remove("active");
    }
    clicked.classList.add("active");
    var label = clicked.textContent || "Page";
    document.querySelector(".topbar-title h1").textContent = label;
    showToast('Section: "' + label + '" (demo)');
  }

  function init() {
    var d7 = document.getElementById("btn-7d");
    var d30 = document.getElementById("btn-30d");
    var rev = document.getElementById("kpi-rev");
    var sess = document.getElementById("kpi-sess");
    var bounce = document.getElementById("kpi-bounce");
    if (!d7 || !d30 || !rev || !sess || !bounce) return;

    function setRange(days) {
      var on7 = days === 7;
      if (on7) {
        d7.classList.add("on");
        d30.classList.remove("on");
        rev.textContent = "$112.4k";
        sess.textContent = "24.8k";
        bounce.textContent = "38.2%";
      } else {
        d30.classList.add("on");
        d7.classList.remove("on");
        rev.textContent = "$482.1k";
        sess.textContent = "102k";
        bounce.textContent = "41.0%";
      }
    }

    d7.addEventListener("click", function () {
      setRange(7);
    });
    d30.addEventListener("click", function () {
      setRange(30);
    });

    var navLinks = document.querySelectorAll(".sidebar .nav a");
    for (var n = 0; n < navLinks.length; n++) {
      navLinks[n].addEventListener("click", function (e) {
        e.preventDefault();
        setActiveNav(this);
      });
    }

    var ghostBtn = document.querySelector(".topbar-actions .btn-ghost");
    var primaryBtn = document.querySelector(".topbar-actions .btn-primary");
    if (ghostBtn) {
      ghostBtn.addEventListener("click", function () {
        showToast("Export queued (demo)");
      });
    }
    if (primaryBtn) {
      primaryBtn.addEventListener("click", function () {
        showToast("Share link copied (demo)");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
