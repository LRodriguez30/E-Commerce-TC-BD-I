export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
        <div>
            <h1>Hola Next.js 🚀</h1>
            <p>Este es mi primer proyecto con Next.</p>
        </div>
      <h1>Rutas de la API</h1>
      <ul>
        <li>
          <a href="/api/users" target="_blank">GET /api/users</a>
        </li>
        <li>
          <a href="/api/users" target="_blank" onClick={(e) => {
            e.preventDefault();
            fetch("/api/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: "Nuevo Usuario", email: "user@mail.com" })
            }).then(res => res.json()).then(console.log);
          }}>
            POST /api/users
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            const id = prompt("ID del usuario a actualizar");
            fetch("/api/users", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ _id: id, name: "Nombre Actualizado" })
            }).then(res => res.json()).then(console.log);
          }}>
            PUT /api/users
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            const id = prompt("ID del usuario a eliminar");
            fetch("/api/users", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ _id: id })
            }).then(res => res.json()).then(console.log);
          }}>
            DELETE /api/users
          </a>
        </li>
      </ul>
      <p>Haz click en cada enlace para ejecutar la ruta de la API. Los resultados se mostrarán en la consola del navegador.</p>
    </div>
  );
}
