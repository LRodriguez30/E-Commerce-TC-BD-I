async function fetchDB(method, API_KEY, body) {
    return await fetch("/api/users", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY },
        body: body ? JSON.stringify(body) : null
    });
}

export { fetchDB }