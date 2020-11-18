
chartit();

async function chartit() {
const data = await getData();
const ctx = document.getElementById('chart').getContext('2d');
var gradientStroke1 = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke1.addColorStop(0, "#dedede");
gradientStroke1.addColorStop(1, "#999999");
var gradientStroke2 = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke2.addColorStop(0, "#8c8c8c");
gradientStroke2.addColorStop(1, "#525252");
const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        datasets: [
        {
            label: 'Counted Time',
            data: data.ys,
            backgroundColor: gradientStroke1,
        },
        {
            label: 'Displayed Time',
            data: data.ys_2,
            backgroundColor: gradientStroke2,
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
                    fontColor: 'white'
                }
                
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontColor: 'white'
                }
                
            }]
        },
        legend: {
            labels: {
                fontFamily: 'Poppins',
                fontSize: 18,
                fontColor: 'white'
            }
        }
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