async function putDB() {
    const id = prompt("ID del usuario a actualizar:");
    if (!id) return false;

    const newName = prompt("Nuevo nombre del usuario:");
    if (!newName) return false;

    return JSON.stringify({ _id: id, name: newName });
}

export { putDB }