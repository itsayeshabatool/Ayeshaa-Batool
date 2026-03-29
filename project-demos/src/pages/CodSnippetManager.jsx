import { useMemo, useState } from "react";

const initial = [
  { id: "1", title: "Fetch JSON", tag: "js", code: "const res = await fetch(url);\nconst data = await res.json();" },
  {
    id: "2",
    title: "useEffect cleanup",
    tag: "react",
    code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);",
  },
  { id: "3", title: "Flex center", tag: "css", code: ".wrap {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}" },
];

export default function CodSnippetManager() {
  const [snippets, setSnippets] = useState(initial);
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("js");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return snippets;
    return snippets.filter(
      (x) => x.title.toLowerCase().includes(s) || x.tag.includes(s) || x.code.toLowerCase().includes(s)
    );
  }, [snippets, q]);

  function addSnippet(e) {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    setSnippets((prev) => [{ id: crypto.randomUUID(), title: title.trim(), tag, code: code.trim() }, ...prev]);
    setTitle("");
    setCode("");
  }

  async function copySnippet(id, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="page-cod site-full">
      <header className="cod-app-bar">
        <strong>COD Snippet Manager</strong>
        <span className="cod-app-tag">Local-first demo</span>
      </header>
      <div className="cod-layout">
        <aside className="cod-side">
          <h3>New snippet</h3>
          <form onSubmit={addSnippet} className="cod-form">
            <label>
              Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My utility" />
            </label>
            <label>
              Tag
              <select value={tag} onChange={(e) => setTag(e.target.value)}>
                <option value="js">javascript</option>
                <option value="react">react</option>
                <option value="css">css</option>
                <option value="html">html</option>
              </select>
            </label>
            <label>
              Code
              <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={6} placeholder="// paste code" />
            </label>
            <button type="submit" className="cod-submit">
              Add snippet
            </button>
          </form>
        </aside>
        <div className="cod-main">
          <div className="cod-search">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, tag, or code..."
              aria-label="Search snippets"
            />
          </div>
          <ul className="cod-list">
            {filtered.map((sn) => (
              <li key={sn.id} className="cod-item">
                <div className="cod-item-head">
                  <strong>{sn.title}</strong>
                  <span className="cod-tag">{sn.tag}</span>
                  <button type="button" className="cod-copy" onClick={() => copySnippet(sn.id, sn.code)}>
                    {copied === sn.id ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="cod-pre">
                  <code>{sn.code}</code>
                </pre>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
