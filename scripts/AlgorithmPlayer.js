
class AlgorithmPlayer
{
	static #R;
    static #X;
    static #WaveType;

	static Setup (r, x, waveType)
	{
		this.#R = r;
		this.#X = x;
		this.#WaveType = waveType;
	};

	static FrequencyMap = this.#GenerateFrequecyMap();

	static #GenerateFrequecyMap ()
	{
		let frequecyMap = [];

		for (let o = 0; o < 8; o++)
		{
			let octave = [];

			for (let n = 0; n < 12; n++)
			{
				const frequency = this.#CalculateFrequencyFromOctaveAndNote(o,n);
				octave.push(frequency);
			}

			frequecyMap.push(octave);
		}

		return frequecyMap;
	}

	static #CalculateFrequencyFromOctaveAndNote (octave, note)
	{
		const adjustedOctave = octave-4;
		const adjustedNote = note+3;

		const pianoKey = adjustedOctave * 12 + adjustedNote;
		const power = pianoKey / 12;
		const powerResult = Math.pow(2, power);

		return 440 * powerResult;
	}

	static Method ()
	{
		const index = Math.trunc(this.#X * 10);

		const octave = parseInt(UI.OutputConfig[index].Octave.value);
		const note = parseInt(UI.OutputConfig[index].Note.value);
		const frequency	= this.FrequencyMap[octave][note];
		const timeout = parseInt(UI.OutputConfig[index].Ms.value);

        playTone(frequency, this.#WaveType, timeout/1000);

        const xBeforeAlgorithm = this.#X;

        this.#X = this.#R * this.#X * (1 - this.#X);

        return {
            x: xBeforeAlgorithm,
			timeout: timeout
        };
	};
}
