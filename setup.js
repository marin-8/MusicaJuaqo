
const loadButton = document.getElementById("loadButton");
const loadInput = document.getElementById("loadInput");

loadButton.addEventListener("click", (e) => {
  if (loadInput) {
    loadInput.click();
  }
}, false);

loadInput.addEventListener("change", () => control.loadStateFromFile(), false);

window.onload = function() {
  const stateSerialized = localStorage.getItem(control.prefixForCurrentState + "state");
  if (stateSerialized == null) return;
  control.deserializeAndSetState(stateSerialized);

  for (var key in localStorage) {
    if (key.startsWith(control.prefixForUserSavedStates)){
      var newOption = document.createElement("option");
      newOption.value = key;
      newOption.innerHTML = key.substring(control.prefixForUserSavedStates.length);
      ui.localStorage.appendChild(newOption);
    }
  }
}

window.onunload = function() {
    const stateSerialized = control.serializeState();
    localStorage.setItem(control.prefixForCurrentState + "state", stateSerialized);
}  
