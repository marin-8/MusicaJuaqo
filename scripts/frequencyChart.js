
const frequencyChart = {
      
    cnt: null,

    setup: function () {
        this.cnt = 0;
        Plotly.newPlot(
            'myDiv',
            [
                {
                    y:[null],
                    type:'line'
                }
            ],
            {
                margin: {
                l: 28,
                r: 10,
                b: 24,
                t: 0,
                pad: 0
                }
            },
            {responsive: true});
    },

    extendTraces: function (frequency) {
        Plotly.extendTraces('myDiv',{ y:[[frequency]]}, [0]);
        this.cnt++;
        if(this.cnt > 50) {
            Plotly.relayout('myDiv',{
                xaxis: {
                    range: [this.cnt-50,this.cnt]
                }
            });
        }
    }
};
