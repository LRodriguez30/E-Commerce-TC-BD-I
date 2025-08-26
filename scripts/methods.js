async function postDB() {
    const name = prompt("Nombre de usuario:");
    if (!name) return false;
        
    const email = prompt("Correo del usuario:");
    if (!email) return false;

    return JSON.stringify({ name, email });
}

async function putDB() {
    const id = prompt("ID del usuario a actualizar:");
    if (!id) return false;

    const newName = prompt("Nuevo nombre del usuario:");
    if (!newName) return false;

    return JSON.stringify({ _id: id, name: newName });
}

async function deleteDB() {
    const id = prompt("ID del usuario a eliminar:");
    if (!id) return false;

    return JSON.stringify({ _id: id })
}

export { postDB, putDB, deleteDB }