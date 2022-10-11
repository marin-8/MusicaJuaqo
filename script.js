
let playing = false;
let intervalHandler;
let btn_playStop = document.getElementById("btn_playStop");
let time;
let r;
let x;
let minFrq;
let maxFrq;
let waveType;
let frecuencias;

function playStop()
{
    if (playing)
    {
        if (intervalHandler)
        {
            window.clearInterval(intervalHandler);
        }

        btn_playStop.innerHTML = "Play";
    }
    else
    {
        minFrq = parseInt(document.getElementById("minFrq").value);
        maxFrq = parseInt(document.getElementById("maxFrq").value);

        if (minFrq > maxFrq)
        {
            alert("Introduzca un rando de frecuencias válido.");
            return;
        }

        r = document.getElementById("R").value;
        x = document.getElementById("X0").value;

        let bpm = document.getElementById("BPM").value;
        time = 60000/bpm;
        waveType = document.getElementById("waveType").value;

        frecuencias = [];
        for (let i = 0; i < 11; i++) {
            let id = "i"+ (i < 10 ? "0" : "") + i.toString();
            let rawValue = document.getElementById(id).value / 100;
            let actualValue = (maxFrq - minFrq) * rawValue + minFrq;
            frecuencias.push(actualValue);
        }

        intervalHandler = setInterval(algoritmo, time);

        btn_playStop.innerHTML = "Stop";
    }

    playing = !playing;
}

function algoritmo ()
{
    let indiceMenor = parseInt(x*10);
    let frecuenciaMenor = Math.min(frecuencias[indiceMenor], frecuencias[indiceMenor+1]);
    let frecuenciaMayor = Math.max(frecuencias[indiceMenor], frecuencias[indiceMenor+1]);
    let frecuencia = parseInt((frecuenciaMayor - frecuenciaMenor) * (x*10-Math.floor(x*10)) + frecuenciaMenor);
    playTone(frecuencia, waveType, time/1000)
    x = r*x*(1-x);
}

function roundSpecific (number, decimals)
{
    let power = Math.pow(10,decimals);
    return Math.round(number * power) / power
}
