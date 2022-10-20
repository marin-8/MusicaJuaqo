
class FrequencyChart
{
	static #X;

	static Setup (minFrq, maxFrq)
	{
		var trace1 =
		{
            name: "x",
            x: [0],
            y: [null],
            mode: 'line'
        };
    
        var trace2 =
		{
            name: "frequency",
            x: [0],
            y: [null],
            yaxis: 'y2',
            mode: 'line'
        };
    
        var traces = [trace1, trace2];

        var layout =
		{
            yaxis:
			{
                range: [ 0.0, 1.0 ]
            },
            yaxis2:
			{
                range: [ minFrq, maxFrq ],
                side: 'right',
                overlaying: 'y'
            },
            margin:
			{
                l: 30,
                r: 40,
                b: 24,
                t: 20,
                pad: 0
            },
            hovermode: 'closest',
            legend:
			{
                x: 1.05,
                y: 0.5
            }
        };

        var config =
		{
            responsive: true,
            displayModeBar: false
        };

        this.cnt = 0;

        Plotly.newPlot(
            UI.Chart,
            traces,
            layout,
            config);
	}

	static ExtendTraces (x, frequency)
	{
        Plotly.extendTraces(
            UI.Chart,
            {
                x: [[this.cnt], [this.cnt]],
                y: [[x], [frequency]]
            },
            [0, 1]);

        this.cnt++;

        if (this.cnt > 25)
		{
            Plotly.relayout(
                UI.Chart,
                {
                    xaxis:
					{
                        range: [this.cnt-25, this.cnt]
                    }
                });
        }
    }
}