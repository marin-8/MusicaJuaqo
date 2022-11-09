
class FrequencyChart
{
	static #MaxWidth;

	static #CNT;

	static #Chart;

	static Setup (maxWidth)
	{
		this.#MaxWidth = maxWidth;

        this.#CNT = 0;
		
		this.#Chart =
			new Chart
			(
				UI.ChartContext,
				{
					type: 'line',
					data: {
						labels: [...Array(this.#MaxWidth).keys()].map(i => i + 1),
						datasets: [
						{
							data: [],
							pointBackgroundColor: 'rgb(0, 128, 255)',
							pointRadius: 3,
							fill: false,
							showLine: false
						}]
					},
					options:
					{
						responsive: true,
						maintainAspectRatio: false,
						scales:
						{
							x:
							{
								min: 1,
								max: this.#MaxWidth,
								display: false
							},
							y:
							{
								min: 0,
								max: 1,
								beginAtZero: true,
							}
						},
						animation: {
							duration: 0
						},
						spanGaps: true,
						plugins:
						{
							legend:
							{
								display: false
							}
						}
					}
				}
			);
	}

	static ExtendTraces (x)
	{
		FrequencyChart.#CNT++;

		this.#Chart.data.datasets[0].data.push(x);

		if (FrequencyChart.#CNT > this.#MaxWidth)
		{
			this.#Chart.data.datasets[0].data.shift();

			this.#Chart.data.labels.push(FrequencyChart.#CNT);
			this.#Chart.data.labels.shift();

			this.#Chart.options.scales.x.min = FrequencyChart.#CNT-this.#MaxWidth+1;
			this.#Chart.options.scales.x.max = FrequencyChart.#CNT;
		}

		this.#Chart.update();
    }

	static Reset ()
	{
		this.#Chart.destroy();
	}
}