
let playing = false;
let intervalHandler;
let btn_playStop = document.getElementById("btn_playStop");
let time;
let r;
let x;
let minFrq;
let maxFrq;
let waveType;

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
        intervalHandler = setInterval(algoritmo, time);

        btn_playStop.innerHTML = "Stop";
    }

    playing = !playing;
}

function algoritmo()
{
    playTone(x*(maxFrq-minFrq)+minFrq, waveType, time/1000)
    x = r*x*(1-x);
}
