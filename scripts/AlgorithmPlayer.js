
class AlgorithmPlayer
{
	static #R;
    static #X;
    static #Timeout;
    static #FrequencyMap;
    static #WaveType;

	static Setup (r, x, timeout, waveType, frequencyMap)
	{
		this.#R = r;
		this.#X = x;
		this.#Timeout = timeout;
		this.#WaveType = waveType;
		this.#FrequencyMap = frequencyMap;
	};

	static Method ()
	{
		const lowerIndex = parseInt(this.#X * 10);
        const lowerFrequency = Math.min(this.#FrequencyMap[lowerIndex], this.#FrequencyMap[lowerIndex + 1]);
        const upperFrequency = Math.max(this.#FrequencyMap[lowerIndex], this.#FrequencyMap[lowerIndex + 1]);
		
        const frequency =
			parseInt(
				(upperFrequency - lowerFrequency)
				* (this.#X * 10 - Math.floor(this.#X * 10))
				+ lowerFrequency);

        playTone(frequency, this.#WaveType, this.#Timeout/1000);

        const xBeforeAlgorithm = this.#X;

        this.#X = this.#R * this.#X * (1 - this.#X);

        return {
            x: xBeforeAlgorithm,
            frequency: frequency
        };
	};
}
