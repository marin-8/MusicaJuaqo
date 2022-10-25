
class State
{
    static PrefixForCurrentState = "==(!@#?]==";
    static PrefixForUserSavedStates = "==[¿#@¡)==";

	static SerializeState ()
	{
        const state =
		{
            R: UI.R.value,
            X0: UI.X0.value,
            MinHz: UI.MinHz.value,
            MaxHz: UI.MaxHz.value,
            MinBPM: UI.MinBPM.value,
            MaxBPM: UI.MaxBPM.value,
            WaveType: UI.WaveType.value,
            HzPerXMap: UI.HzSliders.map(s => s.value),
            BPMPerXMap: UI.BPMSliders.map(s => s.value),
        };

        return JSON.stringify(state);
    };

    static DeserializeAndSetState (stateSerialized)
	{
        let fileContentsDeserialized;

        try
		{
            fileContentsDeserialized = JSON.parse(stateSerialized);
        }
		catch(e)
		{
            alert("Error intentando deserializar los contenidos del archivo");
            return;
        }

        try
		{
            UI.R.value = fileContentsDeserialized.R;
            UI.X0.value = fileContentsDeserialized.X0;
            UI.MinHz.value = fileContentsDeserialized.MinHz;
            UI.MaxHz.value = fileContentsDeserialized.MaxHz;
            UI.MinBPM.value = fileContentsDeserialized.MinBPM;
            UI.MaxBPM.value = fileContentsDeserialized.MaxBPM;
            UI.WaveType.value = fileContentsDeserialized.WaveType;
            UI.HzSliders.forEach(function (item, index)
			{
                item.value = fileContentsDeserialized.HzPerXMap[index];
            });
            UI.BPMSliders.forEach(function (item, index)
			{
                item.value = fileContentsDeserialized.BPMPerXMap[index];
            });
        }
		catch(e)
		{
            alert("Error intentando mapear el contenido deserializado del archivo");
            return;
        }
    };

    static SaveStateAsToLocalStorage ()
	{
        let nameForSave = prompt("Introduce un nombre para el guardado.\n\n(Máximo 40 caracteres).\n(Los caracteres adicionales serán ignorados).\n");

        if (nameForSave === null)
		{
            return;
        }

        nameForSave = nameForSave.trim();

        if (nameForSave.length === 0)
		{
            alert("No se ha introducido un nombre correcto. Inténtalo de nuevo.");
            return;
        }

        nameForSave = nameForSave.substring(0, 40);
        const nameForLocalStorage = this.PrefixForUserSavedStates + nameForSave;

        let overwrite = false;

        if (localStorage.getItem(nameForLocalStorage) !== null)
		{
            overwrite = confirm("Ya existe un guardado con el mismo nombre.\n\n¿Quieres sobrescribirlo?");

            if (!overwrite)
			{
                return;
            }
        }

        const stateSerialized = this.SerializeState();
        localStorage.setItem(nameForLocalStorage, stateSerialized);

        if (!overwrite)
		{
            var newOption = document.createElement("option");
            newOption.value = nameForLocalStorage;
            newOption.innerHTML = nameForSave;
            UI.LocalStorageSaves.appendChild(newOption);
        }

        UI.LocalStorageSaves.value = nameForLocalStorage;
    };

    static LoadStateFromLocalStorage ()
	{
        if (UI.LocalStorageSaves.value == null
            || UI.LocalStorageSaves.value == undefined
            || UI.LocalStorageSaves.value == "")
		{
            return;
        }

        const stateSerialized = localStorage.getItem(UI.LocalStorageSaves.value);
        this.DeserializeAndSetState(stateSerialized);
    };

    static DeleteStateFromLocalStorage ()
	{
        if (UI.LocalStorageSaves.value == "")
		{
            return;
        }

        const confirmDelete = confirm("¿Seguro que quieres eliminarlo?");

        if (!confirmDelete)
		{
            return;
        }

        localStorage.removeItem(UI.LocalStorageSaves.value);
        UI.LocalStorageSaves.remove(UI.LocalStorageSaves.selectedIndex);

        const changeEvent = new Event('change');
        UI.LocalStorageSaves.dispatchEvent(changeEvent);
    };

    static SaveStateToFile ()
	{
        const stateSerialized = this.SerializeState();
        Helpers.Download(stateSerialized, "parámetros ecuación logística", "application/json");
    };

    static async LoadStateFromFile ()
	{
        const file = UI.LoadExternalStorage_input.files[0];
        const fileContentsSerialized = await Helpers.GetContentsFromFile(file);

        if (fileContentsSerialized == null)
		{
            alert("Error intentando leer los contenidos del archivo");
            return;
        }

        this.DeserializeAndSetState(fileContentsSerialized);
    }
}
