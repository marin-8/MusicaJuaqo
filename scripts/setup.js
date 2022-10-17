
const loadButton = document.getElementById("loadButton");
const loadInput = document.getElementById("loadInput");

loadButton.addEventListener("click", (e) => {
  if (loadInput) {
    loadInput.click();
  }
}, false);

window.onunload = function() {
    const stateSerialized = control.serializeState();
    localStorage.setItem("state", stateSerialized);
}

window.onload = function() {
    const stateSerialized = localStorage.getItem("state");
    if (stateSerialized == null) return;
    control.deserializeAndSetState(stateSerialized);
}

loadInput.addEventListener("change", () => control.loadStateFromFile(), false);
