
const control = {

    playing: false,
    intervalHandler: null,

    playStop: function () {
        if (control.playing) {
            if (control.intervalHandler) {
                window.clearInterval(control.intervalHandler);
            }
            ui.playStop.innerHTML = "Play";
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
    
            control.intervalHandler = setInterval(algorithm.method, algorithm.time);
    
            ui.playStop.innerHTML = "Stop";
        }
    
        control.playing = !control.playing;
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
