
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
