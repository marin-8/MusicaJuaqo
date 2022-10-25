
class AlgorithmPlayer
{
	static #R;
    static #X;
    static #WaveType;
    static #FrequencyMap;
    static #TimeoutMap;

	static Setup (r, x, waveType, frequencyMap, timeoutMap)
	{
		this.#R = r;
		this.#X = x;
		this.#WaveType = waveType;
		this.#FrequencyMap = frequencyMap;
		this.#TimeoutMap = timeoutMap;
	};

	static Method ()
	{
		const lowerIndex = parseInt(this.#X * 10);

        const lowerFrequency = Math.min(this.#FrequencyMap[lowerIndex], this.#FrequencyMap[lowerIndex + 1]);
        const upperFrequency = Math.max(this.#FrequencyMap[lowerIndex], this.#FrequencyMap[lowerIndex + 1]);
		
        const lowerTimeout = Math.min(this.#TimeoutMap[lowerIndex], this.#TimeoutMap[lowerIndex + 1]);
        const upperTimeout = Math.max(this.#TimeoutMap[lowerIndex], this.#TimeoutMap[lowerIndex + 1]);
		
        const frequency =
			parseInt(
				(upperFrequency - lowerFrequency)
				* (this.#X * 10 - Math.floor(this.#X * 10))
				+ lowerFrequency);
		
		const timeout =
			parseInt(
				(upperTimeout - lowerTimeout)
				* (this.#X * 10 - Math.floor(this.#X * 10))
				+ lowerTimeout);

        playTone(frequency, this.#WaveType, timeout/1000);

        const xBeforeAlgorithm = this.#X;

        this.#X = this.#R * this.#X * (1 - this.#X);

        return {
            x: xBeforeAlgorithm,
            frequency: frequency,
			timeout: timeout
        };
	};
}
