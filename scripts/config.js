let keepLog = false; // BY DEFAULT CLEAR LOGS

// LOG CONFIG - CLEAR - HOLD
const toggleLog = () => {
    keepLog = !keepLog;
    const btn = document.getElementById("toggle-log");
    btn.textContent = keepLog ? "Limpiar automáticamente" : "Mantener logs";
};

export { toggleLog }