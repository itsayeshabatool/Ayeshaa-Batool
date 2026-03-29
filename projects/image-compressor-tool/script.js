(function () {
  var urls = { o: null, c: null };

  function revoke() {
    if (urls.o) URL.revokeObjectURL(urls.o);
    if (urls.c) URL.revokeObjectURL(urls.c);
    urls.o = urls.c = null;
  }

  function fmt(n) {
    if (n < 1024) return n + " B";
    if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
    return (n / 1048576).toFixed(2) + " MB";
  }

  function isImageFile(file) {
    var t = file.type || "";
    return t.indexOf("image/") === 0;
  }

  function init() {
    var fileInput = document.getElementById("file");
    var q = document.getElementById("quality");
    var maxw = document.getElementById("maxw");
    var err = document.getElementById("err");
    var result = document.getElementById("result");
    var dropLabel = document.getElementById("drop-label");
    var qVal = document.getElementById("q-val");
    if (!fileInput || !q || !maxw || !err || !result || !dropLabel || !qVal) return;

    q.addEventListener("input", function () {
      qVal.textContent = q.value;
    });

    function compress() {
      var file = fileInput.files && fileInput.files[0];
      if (!file || !isImageFile(file)) {
        err.hidden = false;
        err.textContent = "Please choose an image.";
        return;
      }
      revoke();
      err.hidden = true;
      result.classList.add("hidden");
      dropLabel.textContent = "Processing…";

      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var w = img.width;
          var h = img.height;
          var mw = parseInt(maxw.value, 10) || 1280;
          if (w > mw) {
            h = Math.round((mw / w) * h);
            w = mw;
          }
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext("2d");
          if (!ctx) {
            dropLabel.textContent = "Choose image (JPEG / PNG / WebP)";
            err.hidden = false;
            err.textContent = "Canvas not supported.";
            return;
          }
          ctx.drawImage(img, 0, 0, w, h);
          var qual = parseInt(q.value, 10) / 100;
          canvas.toBlob(
            function (blob) {
              dropLabel.textContent = "Choose image (JPEG / PNG / WebP)";
              if (!blob) {
                err.hidden = false;
                err.textContent = "Could not compress.";
                return;
              }
              urls.o = URL.createObjectURL(file);
              urls.c = URL.createObjectURL(blob);
              var metaO = document.getElementById("meta-o");
              var metaC = document.getElementById("meta-c");
              var imgO = document.getElementById("img-o");
              var imgC = document.getElementById("img-c");
              var dl = document.getElementById("dl");
              if (metaO) metaO.textContent = file.name + " · " + fmt(file.size);
              if (metaC) metaC.textContent = fmt(blob.size);
              if (imgO) imgO.src = urls.o;
              if (imgC) imgC.src = urls.c;
              if (dl) {
                dl.href = urls.c;
                dl.download = "compressed-" + file.name.replace(/\.[^.]+$/, "") + ".jpg";
              }
              result.classList.remove("hidden");
            },
            "image/jpeg",
            qual
          );
        };
        img.onerror = function () {
          dropLabel.textContent = "Choose image (JPEG / PNG / WebP)";
          err.hidden = false;
          err.textContent = "Failed to load image.";
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }

    fileInput.addEventListener("change", compress);
    function canRecompress() {
      return (
        fileInput.files &&
        fileInput.files[0] &&
        result.classList &&
        !result.classList.contains("hidden")
      );
    }

    q.addEventListener("change", function () {
      if (canRecompress()) compress();
    });
    maxw.addEventListener("change", function () {
      if (canRecompress()) compress();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
