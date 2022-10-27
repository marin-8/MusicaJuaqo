
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
		const r = parseFloat(UI.R.value);
		const x = parseFloat(UI.X0.value);

		const waveType = UI.WaveType.value;

		AlgorithmPlayer.Setup
		(
			r,
			x,
			waveType
		);

		FrequencyChart.Setup();

		this.#Playing = !this.#Playing;

		this.#PeriodicCall();

		UI.PlayStop.innerHTML = "Stop";
	}

	static #PeriodicCall ()
	{
		const xAndTimeout = AlgorithmPlayer.Method();

        FrequencyChart.ExtendTraces(xAndTimeout.x);

        if (this.#Playing)
		{
            setTimeout(
				function ()
				{
					Control.#PeriodicCall();
				},
            	xAndTimeout.timeout);
        }
	}
}
