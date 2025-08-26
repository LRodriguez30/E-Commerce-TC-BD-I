// LOG CONFIG - CLEAR - HOLD
const toggleLog = (callback) => {
    callback();
    const btn = document.getElementById("toggle-log");
    btn.textContent = keepLog ? "Limpiar automáticamente" : "Mantener logs";
};

export { toggleLog }