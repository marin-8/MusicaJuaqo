
// TODO: cambiar nombre clase por this dentro (?)
// TODO: estandarizar uso de let/var/const

const control = {

    playing: false,
    intervalHandler: null,

    prefixForCurrentState: "==(!@#?]==",
    prefixForUserSavedStates: "==[¿#@¡)==",

    playStop: function () {
        if (control.playing) {
            ui.playStop.innerHTML = "Play";
            control.playing = !control.playing;
        }
        else {
            const minFrq = parseInt(ui.minFrq.value);
            const maxFrq = parseInt(ui.maxFrq.value);

            if (minFrq > maxFrq) {
                alert("Introduzca un rando de frecuencias válido.");
                return;
            }
    
            algorithm.r = parseFloat(ui.r.value);
            algorithm.x = parseFloat(ui.x0.value);
    
            const bpm = parseInt(ui.bpm.value);
            algorithm.time = 60000/bpm;
            algorithm.waveType = ui.waveType.value;

            algorithm.frequencyMap =
                ui.frequencyMapSliders.map(function (fms) {
                    const sliderValue = parseInt(fms.value);
                    const percentageValue = sliderValue / 100;
                    const actualValue = (maxFrq - minFrq) * percentageValue + minFrq;
                    return actualValue;
                });

            frequencyChart.setup(minFrq, maxFrq);
    
            control.playing = !control.playing;

            control.periodicall(algorithm.time);
    
            ui.playStop.innerHTML = "Stop";
        }
    },

    periodicall: function(time) {
        let xAndFrequency = algorithm.method();

        frequencyChart.extendTraces(
            xAndFrequency.x,
            xAndFrequency.frequency);

        if (control.playing) {
            setTimeout(function () {
                control.periodicall(time);
            },
            time);
        }
    },

    serializeState: function () {
        const state = {
            r: ui.r.value,
            x0: ui.x0.value,
            minFrq: ui.minFrq.value,
            maxFrq: ui.maxFrq.value,
            bpm: ui.bpm.value,
            waveType: ui.waveType.value,
            frequencyMap: ui.frequencyMapSliders.map(fs => fs.value)
        };
        return JSON.stringify(state);
    },

    deserializeAndSetState: function (stateSerialized) {
        let fileContentsDeserialized = null;
        try {
            fileContentsDeserialized = JSON.parse(stateSerialized);
        } catch(e) {
            alert("Error intentando deserializar los contenidos del archivo");
            return;
        }
        try {
            ui.r.value = fileContentsDeserialized.r;
            ui.x0.value = fileContentsDeserialized.x0;
            ui.minFrq.value = fileContentsDeserialized.minFrq;
            ui.maxFrq.value = fileContentsDeserialized.maxFrq;
            ui.bpm.value = fileContentsDeserialized.bpm;
            ui.waveType.value = fileContentsDeserialized.waveType;
            ui.frequencyMapSliders.forEach(function (item, index) {
                item.value = fileContentsDeserialized.frequencyMap[index];
            });
        } catch(e) {
            alert("Error intentando mapear el contenido deserializado del archivo");
            return;
        }
    },

    saveStateAsToLocalStorage: function () {
        let nameForSave = prompt("Introduce un nombre para el guardado.\n\n(Máximo 40 caracteres).\n(Los caracteres adicionales serán ignorados).\n");

        if (nameForSave === null) {
            return;
        }

        nameForSave = nameForSave.trim();

        if (nameForSave.length === 0){
            alert("No se ha introducido un nombre correcto. Inténtalo de nuevo.");
            return;
        }

        nameForSave = nameForSave.substring(0, 40);

        let nameForLocalStorage = control.prefixForUserSavedStates + nameForSave;

        let sobrescribir = false;
        if (localStorage.getItem(nameForLocalStorage) !== null){
            sobrescribir = confirm("Ya existe un guardado con el mismo nombre.\n\n¿Quieres sobrescribirlo?");
            if (!sobrescribir){
                return;
            }
        }

        let stateSerialized = control.serializeState();
        localStorage.setItem(nameForLocalStorage, stateSerialized);

        if (!sobrescribir) {
            var newOption = document.createElement("option");
            newOption.value = nameForLocalStorage;
            newOption.innerHTML = nameForSave;
            ui.localStorage.appendChild(newOption);
        }

        ui.localStorage.value = nameForLocalStorage;
    },

    loadStateFromLocalStorage: function () {
        if (ui.localStorage.value == null
            || ui.localStorage.value == undefined
            || ui.localStorage.value == "") {
            return;
        }
        const stateSerialized = localStorage.getItem(ui.localStorage.value);
        control.deserializeAndSetState(stateSerialized);
    },

    deleteStateFromLocalStorage: function () {
        if (ui.localStorage.value == "") {
            return;
        }

        let confirmDelete = confirm("¿Seguro que quieres eliminarlo?");

        if (!confirmDelete) {
            return;
        }

        localStorage.removeItem(ui.localStorage.value);
        ui.localStorage.remove(ui.localStorage.selectedIndex);

        let changeEvent = new Event('change');
        ui.localStorage.dispatchEvent(changeEvent);
    },

    saveStateToFile: function () {
        const stateSerialized = control.serializeState();
        download(stateSerialized, "parámetros ecuación logística", "application/json");
    },

    loadStateFromFile: async function () {
        const file = ui.loadInput.files[0];
        const fileContentsSerialized = await getContentsFromFile(file);
        if (fileContentsSerialized == null) {
            alert("Error intentando leer los contenidos del archivo");
            return;
        }
        control.deserializeAndSetState(fileContentsSerialized);
    }
};
