(function () {
  function findTask(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return arr[i];
    }
    return null;
  }

  function removeTask(arr, id) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id !== id) out.push(arr[i]);
    }
    return out;
  }

  var cols = {
    todo: [
      { id: "t1", title: "Design review" },
      { id: "t2", title: "Update copy" },
    ],
    doing: [{ id: "d1", title: "API integration" }],
    done: [{ id: "dn1", title: "Sprint planning" }],
  };

  var meta = [
    { key: "todo", label: "To do" },
    { key: "doing", label: "In progress" },
    { key: "done", label: "Done" },
  ];

  function esc(t) {
    var d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }

  function init() {
    var board = document.getElementById("board");
    var addForm = document.getElementById("add-form");
    if (!board || !addForm) return;

    function render() {
      var html = "";
      for (var m = 0; m < meta.length; m++) {
        var mk = meta[m].key;
        var list = cols[mk];
        var cardsHtml = "";
        for (var t = 0; t < list.length; t++) {
          var task = list[t];
          var movesHtml = "";
          for (var x = 0; x < meta.length; x++) {
            if (meta[x].key === mk) continue;
            movesHtml +=
              '<button type="button" class="move" data-id="' +
              esc(task.id) +
              '" data-from="' +
              mk +
              '" data-to="' +
              meta[x].key +
              '">→ ' +
              esc(meta[x].label) +
              "</button>";
          }
          cardsHtml +=
            '<div class="card"><span>' +
            esc(task.title) +
            '</span><div class="moves">' +
            movesHtml +
            "</div></div>";
        }
        html +=
          '<section class="col"><h2>' +
          esc(meta[m].label) +
          '</h2><div class="cards">' +
          cardsHtml +
          "</div></section>";
      }
      board.innerHTML = html;

      var btns = board.querySelectorAll(".move");
      for (var b = 0; b < btns.length; b++) {
        (function (btn) {
          btn.addEventListener("click", function () {
            var id = btn.getAttribute("data-id");
            var from = btn.getAttribute("data-from");
            var to = btn.getAttribute("data-to");
            var task = findTask(cols[from], id);
            if (!task) return;
            cols[from] = removeTask(cols[from], id);
            cols[to].push(task);
            render();
          });
        })(btns[b]);
      }
    }

    addForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var titleEl = document.getElementById("task-title");
      var colEl = document.getElementById("task-col");
      if (!titleEl || !colEl) return;
      var title = titleEl.value.trim();
      var col = colEl.value;
      if (!title) return;
      cols[col].unshift({ id: "n" + String(Date.now()), title: title });
      titleEl.value = "";
      render();
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
