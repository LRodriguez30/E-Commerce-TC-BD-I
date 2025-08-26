// LOG CONFIG - CLEAR - HOLD
const toggleLog = (btnLog) => {
    btnLog.textContent = keepLog ? "Limpiar automáticamente" : "Mantener logs";
};

export { toggleLog }