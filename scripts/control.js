
class Control
{
	static #Playing = false;
	static #Stopped = true;

	static PlayPause ()
	{
		if (!this.#Playing)
		{
            if (this.#Stopped)
			{
				this.#Play();
			}
			else
			{
				this.#Resume();
			}
			
			UI.PlayPause.innerHTML = "Pause";
        }
		else
		{
			this.#Pause();

            UI.PlayPause.innerHTML = "Play";
		}
	}

	static Reset ()
	{
		if (!this.#Stopped)
		{
			if (!this.#Playing)
				FrequencyChart.Reset();

			this.#Playing = false;
			this.#Stopped = true;

			UI.PlayPause.innerHTML = "Play";
		}
	}

	static #Play ()
	{
		const r = parseFloat(UI.R.value);
		const x = parseFloat(UI.X0.value);

		const waveType = UI.WaveType.value;

		const maxWidth = parseFloat(UI.VisiblePoints.value)

		AlgorithmPlayer.Setup
		(
			r,
			x,
			waveType
		);

		FrequencyChart.Setup(maxWidth);

		this.#Playing = true;
		this.#Stopped = false;

		this.#PeriodicCall();
	}

	static #Resume ()
	{
		this.#Playing = true;

		this.#PeriodicCall();
	}

	static #Pause ()
	{
		this.#Playing = false;
	}

	static #PeriodicCall ()
	{
		if (this.#Stopped)
			FrequencyChart.Reset();

		if (!this.#Playing)
			return;

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
