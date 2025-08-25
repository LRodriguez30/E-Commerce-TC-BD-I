async function postDB() {
    const name = prompt("Nombre de usuario:");
    if (!name) return false;
        
    const email = prompt("Correo del usuario:");
    if (!email) return false;

    return JSON.stringify({ name, email });
}

export { postDB }