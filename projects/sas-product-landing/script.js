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

  function init() {
    var y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    var sw = document.getElementById("billing-switch");
    var monthly = document.getElementById("lbl-monthly");
    var annual = document.getElementById("lbl-annual");
    var pStarter = document.getElementById("price-starter");
    var pPro = document.getElementById("price-pro");
    if (!sw || !monthly || !annual || !pStarter || !pPro) return;

    function setAnnual(isAnnual) {
      if (isAnnual) {
        sw.classList.add("on");
      } else {
        sw.classList.remove("on");
      }
      sw.setAttribute("aria-pressed", isAnnual ? "true" : "false");
      if (isAnnual) {
        monthly.classList.remove("active");
        annual.classList.add("active");
        pStarter.textContent = "$19 / mo";
        pPro.textContent = "$49 / mo";
      } else {
        monthly.classList.add("active");
        annual.classList.remove("active");
        pStarter.textContent = "$24 / mo";
        pPro.textContent = "$62 / mo";
      }
    }

    sw.addEventListener("click", function () {
      setAnnual(!sw.classList.contains("on"));
    });

    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (!href || href.length < 2) return;
        var id = href.slice(1);
        var el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          if (el.scrollIntoView) {
            try {
              el.scrollIntoView({ behavior: "smooth" });
            } catch (err) {
              el.scrollIntoView();
            }
          }
        }
      });
    }

    var allBtns = document.querySelectorAll(".site button");
    for (var c = 0; c < allBtns.length; c++) {
      if (allBtns[c].id === "billing-switch") continue;
      allBtns[c].addEventListener("click", function () {
        showToast("Button clicked · Demo site");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
