import React, { useEffect, useState } from "react";

const API_URL = "https://umb-web-taller-hpv6.onrender.com/api";

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    fetchTareas();
  }, []);

  const fetchTareas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTareas(data);
    } catch (err) {
      console.error("Error al cargar tareas", err);
    }
  };

  // Crear nueva tarea
  const crear = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo }),
      });
      setTitulo("");
      fetchTareas();
    } catch (err) {
      console.error("Error al crear tarea", err);
    }
  };

  // Marcar tarea como completada / pendiente
  const toggleCompletada = async (id, completada) => {
    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completada: !completada }),
      });
      fetchTareas();
    } catch (err) {
      console.error("Error al actualizar tarea", err);
    }
  };

  // Borrar tarea
  const borrar = async (id) => {
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchTareas();
    } catch (err) {
      console.error("Error al borrar tarea", err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Mi Lista de Tareas</h1>

      <form onSubmit={crear} style={{ marginBottom: 20 }}>
        <input
          placeholder="Nueva tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: 8, width: "70%" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: 8 }}>
          Añadir
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareas.map((t) => (
          <li
            key={t.id}
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={t.completada === true || t.completada === "t"}
              onChange={() => toggleCompletada(t.id, t.completada)}
            />
            <span
              style={{
                marginLeft: 8,
                textDecoration:
                  t.completada === true || t.completada === "t"
                    ? "line-through"
                    : "none",
                flexGrow: 1,
              }}
            >
              {t.titulo}
            </span>
            <button
              onClick={() => borrar(t.id)}
              style={{ marginLeft: 8, padding: "4px 8px" }}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
