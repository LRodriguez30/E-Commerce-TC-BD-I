import * as API from "../scripts/methods.js";
import * as CONFIG from "../scripts/config.js";
import * as HANDLER from "../scripts/fetch.js";

export default function index() {
  let keepLog = false; // BY DEFAULT CLEAR LOGS

  const keeptoggleLog = () => {
    keepLog = !keepLog;
    const btn = document.getElementById("toggle-log");
    CONFIG.toggleLog(btn);
  }

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
        req = API.postDB();
        if (!req) return;

      } else if (method === "PUT") {
        req = API.putDB();
        if (!req) return;
        
      } else if (method === "DELETE") {
        req = API.deleteDB();
        if (!req) return;
      }

      body = req;


      // RESPONSE OBJECT OBTAINED FROM MONGODB
      const res = HANDLER.fetchDB(method, API_KEY, body);

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
      <hr />

      <h2>Rutas api/users:</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => handleFetch("GET")}>GET</button>
        <button onClick={() => handleFetch("POST")}>POST</button>
        <button onClick={() => handleFetch("PUT")}>PUT</button>
        <button onClick={() => handleFetch("DELETE")}>DELETE</button>
        <button id="toggle-log" onClick={keeptoggleLog}>Mantener logs</button>
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
