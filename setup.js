

	UI.LoadExternalStorage_button.addEventListener("click", (e) => {
		if (UI.LoadExternalStorage_input) {
			UI.LoadExternalStorage_input.click();
		}
	}, false);


	UI.LoadExternalStorage_input.addEventListener("change", () => State.LoadStateFromFile(), false);


	window.onload = function() {
		const stateSerialized = localStorage.getItem(State.PrefixForCurrentState + "state");
		if (stateSerialized == null) return;
		State.DeserializeAndSetState(stateSerialized);

		for (var key in localStorage) {
			if (key.startsWith(State.PrefixForUserSavedStates)){
				var newOption = document.createElement("option");
				newOption.value = key;
				newOption.innerHTML = key.substring(State.PrefixForUserSavedStates.length);
				UI.LocalStorageSaves.appendChild(newOption);
			}
		}
	}


	window.onunload = function() {
		const stateSerialized = State.SerializeState();
		localStorage.setItem(State.PrefixForCurrentState + "state", stateSerialized);
	}  

