
const loadButton = document.getElementById("loadButton");
const loadInput = document.getElementById("loadInput");

loadButton.addEventListener("click", (e) => {
  if (loadInput) {
    loadInput.click();
  }
}, false);

const ui = {
    r: document.getElementById("r"),
    x0: document.getElementById("x0"),
    minFrq: document.getElementById("minFrq"),
    maxFrq: document.getElementById("maxFrq"),
    bpm: document.getElementById("bpm"),
    waveType: document.getElementById("waveType"),
    frequencyMapSliders: [
        document.getElementById("frequency_00"),
        document.getElementById("frequency_01"),
        document.getElementById("frequency_02"),
        document.getElementById("frequency_03"),
        document.getElementById("frequency_04"),
        document.getElementById("frequency_05"),
        document.getElementById("frequency_06"),
        document.getElementById("frequency_07"),
        document.getElementById("frequency_08"),
        document.getElementById("frequency_09"),
        document.getElementById("frequency_10"),
    ],
    playStop: document.getElementById("playStop"),
    loadInput: document.getElementById("loadInput"),
};

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

    deserializeAndMapState: function (stateSerialized) {
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

    downloadState: function () {
        const stateSerialized = control.serializeState();
        download(stateSerialized, "parámetros ecuación logística", "application/json");
    },

    loadState: async function () {
        const file = ui.loadInput.files[0];
        const fileContentsSerialized = await getContentsFromFile(file);
        if (fileContentsSerialized == null) {
            alert("Error intentando leer los contenidos del archivo");
            return;
        }
        control.deserializeAndMapState(fileContentsSerialized);
    }
};

window.onunload = function() {
    const stateSerialized = control.serializeState();
    localStorage.setItem("state", stateSerialized);
}

window.onload = function() {
    const stateSerialized = localStorage.getItem("state");
    if (stateSerialized == null) return;
    control.deserializeAndMapState(stateSerialized);
}

loadInput.addEventListener("change", () => control.loadState(), false);

const algorithm = {

    r: null,
    x: null,
    time: null,
    frequencyMap: null,
    waveType: null,

    method: function () {
        const a = algorithm;
        const lowerIndex = parseInt(a.x*10);
        const lowerFrequency = Math.min(a.frequencyMap[lowerIndex], a.frequencyMap[lowerIndex+1]);
        const upperFrequency = Math.max(a.frequencyMap[lowerIndex], a.frequencyMap[lowerIndex+1]);
        const frequency = parseInt((upperFrequency - lowerFrequency) * (a.x*10-Math.floor(a.x*10)) + lowerFrequency);

        playTone(frequency, a.waveType, a.time/1000);

        a.x = a.r * a.x * (1 - a.x);
    }
};
