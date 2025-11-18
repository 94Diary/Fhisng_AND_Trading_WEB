import { useState, useEffect } from "react";
import CodeProps from "./CodeProps";

const CreateCode = () => {
  const [codes, setCodes] = useState<{ id: number; title: string; checkedBy: string[]; author: string }[]>(() => {
    const stored = localStorage.getItem("codes");
    return stored ? JSON.parse(stored) : [];
  });
  const [title, setTitle] = useState("");
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("codes", JSON.stringify(codes));
  }, [codes]);

  const addCode = () => {
    if (!user || user.role !== "admin" || !title.trim()) return;
    const newCode = { id: Date.now(), title, checkedBy: [], author: user.username };
    setCodes(prev => [newCode, ...prev]);
    setTitle("");
  };

  const toggleCheck = (id: number) => {
    if (!user) return;
    setCodes(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              checkedBy: c.checkedBy.includes(user.username)
                ? c.checkedBy.filter(u => u !== user.username)
                : [...c.checkedBy, user.username],
            }
          : c
      )
    );
  };

  const deleteCode = (id: number) => {
    if (!user) return;
    setCodes(prev =>
      prev.filter(c => !(user.role === "admin" && c.id === id))
    );
  };

  return (
    <div className="bg-gray-900 p-4 rounded-3xl">
      {/* Admin Create */}
      {user?.role === "admin" && (
        <div className="mb-4 flex gap-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter code title..."
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={addCode}
            className="px-4 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-700"
          >
            Create
          </button>
        </div>
      )}

      {/* Code List */}
      <div className="max-h-80 overflow-y-auto space-y-2">
        {codes.map(code => (
          <div key={code.id} className="relative">
            <CodeProps
              title={code.title}
              checkedBy={code.checkedBy}
              username={user?.username || null}
              onToggle={() => toggleCheck(code.id)}
            />
            {user?.role === "admin" && (
              <button
                onClick={() => deleteCode(code.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCode;
