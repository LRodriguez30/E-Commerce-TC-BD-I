export default function Home() {

  const handleFetch = async (method) => {
    try {
      let body = null;

      if (method === "POST") {
        const name = prompt("Nombre de usuario:");
        if (!name) return;
        const email = prompt("Correo del usuario:");
        if (!email) return;
        body = JSON.stringify({ name, email });
      } else if (method === "PUT") {
        const id = prompt("ID del usuario a actualizar:");
        if (!id) return;
        const newName = prompt("Nuevo nombre del usuario:");
        if (!newName) return;
        body = JSON.stringify({ _id: id, name: newName });
      } else if (method === "DELETE") {
        const id = prompt("ID del usuario a eliminar:");
        if (!id) return;
        body = JSON.stringify({ _id: id });
      }

      const res = await fetch("/api/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body
      });

      const result = await res.json();

      // Aquí agregamos el resultado al contenedor usando DOM puro
      const container = document.getElementById("api-output");
      const newDiv = document.createElement("div");
      newDiv.style.borderBottom = "1px solid #ccc";
      newDiv.style.padding = "0.5rem 0";
      newDiv.textContent = `${method} => ${JSON.stringify(result)}`;
      container.innerHTML = "";
      container.appendChild(newDiv);

    } catch (err) {
      const container = document.getElementById("api-output");
      const newDiv = document.createElement("div");
      newDiv.style.color = "red";
      newDiv.style.padding = "0.5rem 0";
      newDiv.textContent = `Error ${method}: ${err.message}`;
      container.appendChild(newDiv);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hola Next.js 🚀</h1>
      <p>Este es mi primer proyecto con Next.</p>

      <h2>Acciones de la API</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => handleFetch("GET")}>GET /api/users</button>
        <button onClick={() => handleFetch("POST")}>POST /api/users</button>
        <button onClick={() => handleFetch("PUT")}>PUT /api/users</button>
        <button onClick={() => handleFetch("DELETE")}>DELETE /api/users</button>
      </div>

      <h2>Resultado:</h2>
      <div
        id="api-output"
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          minHeight: "100px",
          backgroundColor: "#f9f9f9",
          overflowY: "auto"
        }}
      >
        {/* Aquí se irán agregando los resultados */}
      </div>
    </div>
  );
}