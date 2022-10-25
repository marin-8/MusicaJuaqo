
class Control
{
	static #Playing = false;

	static PlayStop ()
	{
		if (this.#Playing)
		{
			// Stop
            this.#Playing = !this.#Playing;
            UI.PlayStop.innerHTML = "Play";
        }
		else
		{
			this.#Play();
		}
	}

	static #Play ()
	{
		const minFrq = parseInt(UI.MinHz.value);
		const maxFrq = parseInt(UI.MaxHz.value);

		if (minFrq > maxFrq)
		{
			alert("Introduzca un rango de frecuencias válido.");
			return;
		}

		const minBPM = parseInt(UI.MinBPM.value);
		const maxBPM = parseInt(UI.MaxBPM.value);

		if (minBPM > maxBPM)
		{
			alert("Introduzca un rango de bpm válido.");
			return;
		}

		const r = parseFloat(UI.R.value);
		const x = parseFloat(UI.X0.value);

		const waveType = UI.WaveType.value;

		const frequencyMap =
			UI.HzSliders.map(
				function (fms)
				{
					const sliderValue = parseInt(fms.value);
					const percentageValue = sliderValue / 100;
					const actualValue = (maxFrq - minFrq) * percentageValue + minFrq;
					return actualValue;
				});

		const timeoutMap =
			UI.BPMSliders.map(
				function (bpms)
				{
					const sliderValue = parseInt(bpms.value);
					const percentageValue = sliderValue / 100;
					const actualBPMValue = (maxBPM - minBPM) * percentageValue + minBPM;
					const actualTimeoutValue = 60000 / actualBPMValue;
					return actualTimeoutValue;
				});

		AlgorithmPlayer.Setup
		(
			r,
			x,
			waveType,
			frequencyMap,
			timeoutMap
		);

		FrequencyChart.Setup(minFrq, maxFrq);

		this.#Playing = !this.#Playing;

		this.#PeriodicCall();

		UI.PlayStop.innerHTML = "Stop";
	}

	static #PeriodicCall ()
	{
		const xAndFrequencyAndTimeout = AlgorithmPlayer.Method();

        FrequencyChart.ExtendTraces(
            xAndFrequencyAndTimeout.x,
            xAndFrequencyAndTimeout.frequency);

        if (this.#Playing)
		{
            setTimeout(
				function ()
				{
					Control.#PeriodicCall();
				},
            	xAndFrequencyAndTimeout.timeout);
        }
	}
}
