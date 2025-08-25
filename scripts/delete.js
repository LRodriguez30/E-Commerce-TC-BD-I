async function deleteDB() {
    const id = prompt("ID del usuario a eliminar:");
    if (!id) return false;

    return JSON.stringify({ _id: id })
}

export { deleteDB }