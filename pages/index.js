import { postDB, putDB, deleteDB } from "./scripts";

export default function Home() {
  let keepLog = false; // false: limpiar automáticamente, true: mantener logs

  // LOG CONFIG - CLEAR - HOLD
  const toggleLog = () => {
    keepLog = !keepLog;
    const btn = document.getElementById("toggle-log");
    btn.textContent = keepLog ? "Limpiar automáticamente" : "Mantener logs";
  };

  const handleFetch = async (method) => {
    try {
      // FETCH
      let body = null;
      let req = null;
      
      // SECURITY
      const API_KEY = prompt("API KEY:")

      if (!API_KEY) {
        return;
      }

      // METHODS
      if (method === "POST") {
        req = postDB();
        if (!req) return;

      } else if (method === "PUT") {
        req = putDB();
        if (!req) return;
        
      } else if (method === "DELETE") {
        req = deleteDB();
        if (!req) return;
      }

      body = req;


      // RESPONSE OBJECT OBTAINED FROM MONGODB
      const res = fetchDB(API_KEY);

      // DATA PARSED FROM THE OBJECT
      const result = await res.json();

      // HANDLE CONFIG OF PANEL
      const container = document.getElementById("api-output");
      if (!keepLog) container.innerHTML = "";

      // CREATING LOG
      const newDiv = document.createElement("div");
      newDiv.style.borderBottom = "1px solid #ccc";
      newDiv.style.padding = "0.5rem 0";
      newDiv.textContent = `${method} => ${JSON.stringify(result)}`;
      container.appendChild(newDiv);

    } catch (err) {
      // VERIFY CONFIG IN SPITE OF ERRORS
      const container = document.getElementById("api-output");
      if (!keepLog) container.innerHTML = "";

      // CREATING ERROR LOG
      const newDiv = document.createElement("div");
      newDiv.style.color = "red";
      newDiv.style.padding = "0.5rem 0";
      newDiv.textContent = `Error ${method}: ${err.message}`;
      container.appendChild(newDiv);
    }
  };

  // HOMEPAGE
  return (
    <div style={{ padding: "2rem" }}>
      <h1>E-Commerce API 🚀</h1>
      <hr>/api/users</hr>

      <h2>Rutas:</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => handleFetch("GET")}>GET</button>
        <button onClick={() => handleFetch("POST")}>POST</button>
        <button onClick={() => handleFetch("PUT")}>PUT</button>
        <button onClick={() => handleFetch("DELETE")}>DELETE</button>
        <button id="toggle-log" onClick={toggleLog}>Mantener logs</button>
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
        {/* RESULT BODY */}
      </div>
    </div>
  );
}
