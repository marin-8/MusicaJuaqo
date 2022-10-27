
class FrequencyChart
{
	static #X;

	static Setup ()
	{
		var trace =
		{
            name: "x",
            x: [0],
            y: [null],
            mode: 'markers',
			marker: {
			  color: 'rgb(0, 128, 255)',
			  size: 6
			}
        };
    
        var traces = [trace];

        var layout =
		{
			xaxis:
			{
                range: [ 0, 400 ]
            },
            yaxis:
			{
                range: [ 0.0, 1.0 ]
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

	static ExtendTraces (x)
	{
        Plotly.extendTraces(
            UI.Chart,
            {
				x: [[this.cnt]],
                y: [[x]]
            },
            [0]);

        this.cnt++;

        if (this.cnt > 400)
		{
            Plotly.relayout(
                UI.Chart,
                {
                    xaxis:
					{
                        range: [this.cnt-400, this.cnt]
                    }
                });
        }
    }
}