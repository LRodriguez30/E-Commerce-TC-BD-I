async function fetchDB(API_KEY) {
    return await fetch("/api/users", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY },
        body
    });
}

export { fetchDB }