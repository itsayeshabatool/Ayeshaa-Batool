import { useCallback, useState } from "react";

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressorTool() {
  const [quality, setQuality] = useState(0.82);
  const [maxW, setMaxW] = useState(1280);
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) {
        setError("Please choose an image file.");
        return;
      }
      setOriginal((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url);
        return null;
      });
      setCompressed((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url);
        return null;
      });
      setError("");
      setBusy(true);

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          if (w > maxW) {
            h = Math.round((maxW / w) * h);
            w = maxW;
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(
            (blob) => {
              setBusy(false);
              if (!blob) {
                setError("Could not compress image.");
                return;
              }
              const url = URL.createObjectURL(blob);
              setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name });
              setCompressed({ url, size: blob.size });
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = () => {
          setBusy(false);
          setError("Failed to load image.");
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },
    [maxW, quality]
  );

  return (
    <div className="page-compress site-full">
      <header className="compress-page-head">
        <h1>Image compressor</h1>
        <p>Resize and export JPEG in the browser — demo tool for your portfolio.</p>
      </header>
      <div className="compress-panel">
        <label className="compress-file">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
          <span>{busy ? "Processing…" : "Choose image (JPEG / PNG / WebP)"}</span>
        </label>
        <div className="compress-controls">
          <label>
            Quality ({Math.round(quality * 100)}%)
            <input type="range" min={0.4} max={0.95} step={0.01} value={quality} onChange={(e) => setQuality(+e.target.value)} />
          </label>
          <label>
            Max width (px)
            <input type="number" min={320} max={4096} step={80} value={maxW} onChange={(e) => setMaxW(+e.target.value || 1280)} />
          </label>
        </div>
        {error ? <p className="compress-error">{error}</p> : null}
        {original && compressed ? (
          <div className="compress-result">
            <div>
              <h4>Original</h4>
              <p className="compress-meta">
                {original.name} · {formatBytes(original.size)}
              </p>
              <img src={original.url} alt="Original" className="compress-preview" />
            </div>
            <div>
              <h4>Compressed (JPEG)</h4>
              <p className="compress-meta">{formatBytes(compressed.size)}</p>
              <img src={compressed.url} alt="Compressed" className="compress-preview" />
              <a className="compress-download" href={compressed.url} download={`compressed-${original.name.replace(/\.\w+$/, "")}.jpg`}>
                Download JPEG
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
