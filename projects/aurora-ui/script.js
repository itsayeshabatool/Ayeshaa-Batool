(function () {
  function init() {
    var root = document.documentElement;
    var thA = document.getElementById("th-aurora");
    var thD = document.getElementById("th-dusk");
    if (!thA || !thD) return;

    thA.addEventListener("click", function () {
      root.setAttribute("data-theme", "light");
      thA.classList.add("on");
      thD.classList.remove("on");
    });
    thD.addEventListener("click", function () {
      root.setAttribute("data-theme", "dark");
      thD.classList.add("on");
      thA.classList.remove("on");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
