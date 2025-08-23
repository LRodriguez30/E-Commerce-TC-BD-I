export default function Home() {
  const handleFetch = async (method) => {
    try {
      let body = null;

      if (method === "POST") {
        const _name = prompt("Nombre de usuario.");
        if (!_name) return;

        const _correo = prompt("Correo del usuario.");
        if (!_correo) return;

        const id = prompt("ID del usuario a actualizar");
        body = JSON.stringify({ name: "Nuevo Usuario", email: "user@mail.com" });
      } else if (method === "PUT") {
        const id = prompt("ID del usuario a actualizar");
        if (!id) return;
        body = JSON.stringify({ _id: id, name: "Nombre Actualizado" });
      } else if (method === "DELETE") {
        const id = prompt("ID del usuario a eliminar");
        if (!id) return;
        body = JSON.stringify({ _id: id });
      }

      const res = await fetch("/api/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body
      });

      const data = await res.json();
      console.log(data);
      alert(`${method} ejecutado. Revisa la consola.`);
    } catch (err) {
      console.error(err);
      alert("Error al ejecutar la acción: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <h1>Hola Next.js 🚀</h1>
        <p>Este es mi primer proyecto con Next.</p>
      </div>

      <h1>Rutas de la API</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => handleFetch("GET")}>GET /api/users</button>
        <button onClick={() => handleFetch("POST")}>POST /api/users</button>
        <button onClick={() => handleFetch("PUT")}>PUT /api/users</button>
        <button onClick={() => handleFetch("DELETE")}>DELETE /api/users</button>
      </div>

      <p>Haz click en cada botón para ejecutar la ruta de la API. Los resultados se mostrarán en la consola del navegador.</p>
    </div>
  );
}