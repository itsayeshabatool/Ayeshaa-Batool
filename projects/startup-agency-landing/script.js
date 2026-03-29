(function () {
  function init() {
    var y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (!href || href.length < 2) return;
        var id = href.slice(1);
        var el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          try {
            el.scrollIntoView({ behavior: "smooth" });
          } catch (err) {
            el.scrollIntoView();
          }
        }
      });
    }

    var cta = document.querySelector(".cta");
    var toastTimer;
    if (cta) {
      cta.addEventListener("click", function () {
        var t = document.getElementById("demo-toast");
        if (!t) {
          t = document.createElement("div");
          t.id = "demo-toast";
          t.className = "demo-toast";
          document.body.appendChild(t);
        }
        t.textContent = "Let's talk. Add your email link in the script.";
        t.className = "demo-toast demo-toast--visible";
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          t.className = "demo-toast";
        }, 2200);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
