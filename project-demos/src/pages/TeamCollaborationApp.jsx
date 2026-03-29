import { useState } from "react";

const colsInit = {
  todo: [
    { id: "t1", title: "Design review" },
    { id: "t2", title: "Update copy" },
  ],
  doing: [{ id: "d1", title: "API integration" }],
  done: [{ id: "dn1", title: "Sprint planning" }],
};

export default function TeamCollaborationApp() {
  const [columns, setColumns] = useState(colsInit);
  const [title, setTitle] = useState("");
  const [col, setCol] = useState("todo");

  function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const id = crypto.randomUUID();
    setColumns((c) => ({
      ...c,
      [col]: [...c[col], { id, title: title.trim() }],
    }));
    setTitle("");
  }

  function moveTask(id, from, to) {
    if (from === to) return;
    setColumns((c) => {
      const task = c[from].find((x) => x.id === id);
      if (!task) return c;
      return {
        ...c,
        [from]: c[from].filter((x) => x.id !== id),
        [to]: [...c[to], task],
      };
    });
  }

  const colMeta = [
    { key: "todo", label: "To do" },
    { key: "doing", label: "In progress" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="page-team site-full">
      <header className="team-app-head">
        <div>
          <h1>Team collaboration</h1>
          <p>Add tasks and move them across To do, In progress, and Done.</p>
        </div>
      </header>
      <form className="team-add" onSubmit={addTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task…" />
        <select value={col} onChange={(e) => setCol(e.target.value)} aria-label="Column">
          {colMeta.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      <div className="team-board">
        {colMeta.map(({ key, label }) => (
          <section key={key} className="team-col">
            <h3>{label}</h3>
            <ul className="team-list">
              {columns[key].map((task) => (
                <li key={task.id} className="team-card">
                  <span>{task.title}</span>
                  <div className="team-moves">
                    {colMeta
                      .filter((m) => m.key !== key)
                      .map((m) => (
                        <button key={m.key} type="button" onClick={() => moveTask(task.id, key, m.key)}>
                          → {m.label}
                        </button>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
