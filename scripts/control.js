
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
			alert("Introduzca un rando de frecuencias válido.");
			return;
		}

		const r = parseFloat(UI.R.value);
		const x = parseFloat(UI.X0.value);

		const bpm = parseInt(UI.BPM.value);
		const timeout = 60000/bpm;

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

		AlgorithmPlayer.Setup
		(
			r,
			x,
			timeout,
			waveType,
			frequencyMap
		);

		FrequencyChart.Setup(minFrq, maxFrq);

		this.#Playing = !this.#Playing;

		this.#PeriodicCall(timeout);

		UI.PlayStop.innerHTML = "Stop";
	}

	static #PeriodicCall (timeout)
	{
		const xAndFrequency = AlgorithmPlayer.Method();

        FrequencyChart.ExtendTraces(
            xAndFrequency.x,
            xAndFrequency.frequency);

        if (this.#Playing)
		{
            setTimeout(
				function ()
				{
					Control.#PeriodicCall(timeout);
				},
            	timeout);
        }
	}
}
