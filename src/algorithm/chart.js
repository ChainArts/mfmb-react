
chartit();

async function chartit() {
const data = await getData();
const ctx = document.getElementById('chart').getContext('2d');
var gradientStroke1 = ctx.createLinearGradient(1000, 0, 100, 0);
gradientStroke1.addColorStop(0.5, "#e20080");
gradientStroke1.addColorStop(1, "#9a249c");
var gradientStroke2 = ctx.createLinearGradient(1000, 0, 100, 0);
gradientStroke2.addColorStop(0, "#8c8c8c");
gradientStroke2.addColorStop(1, "#525252");
const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        datasets: [
        {
            label: 'Counted Time',
            maxBarThickness: 8,
            data: data.ys,
            backgroundColor: gradientStroke1,
            padding: {top: 0, bottom: 0},
            borderRadius: 1,
        },
        {
            label: 'Displayed Time',
            maxBarThickness: 8,
            data: data.ys_2,
            backgroundColor: gradientStroke2,
            padding: {top: 0, bottom:0},
        }
    ],
    labels: data.xs
    },
    options: {
        scales: { 
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontColor: '#eee',
                },
                gridLines:{
                    color: '#ddd'
                    
                } 
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontColor: '#eee',
                    
                },
                gridLines:{
                    display: false
                }
                
            }]
        },
        legend: {
            labels: {
                fontFamily: 'Poppins',
                fontSize: 18,
                fontColor: '#eee'
            }
        },
    }
});
}


async function getData() {

    const xs = [];
    const ys = [];
    const ys_2 = [];

    const response = await fetch('http://127.0.0.1:5500/data.json');
    const data = await response.json();
    data.forEach(company => {
        xs.push(company.name);
        ys.push(company.countedtime);
        ys_2.push(company.displaytime);
    });
    return { xs, ys, ys_2 };
}