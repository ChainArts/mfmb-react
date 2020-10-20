
chartit();

async function chartit() {
const data = await getData();
const ctx = document.getElementById('chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Companies',
            data: data.ys,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}


async function getData() {

    const xs = [];
    const ys = [];

    const response = await fetch('http://127.0.0.1:5500/data.json');
    const data = await response.json();
    data.forEach(company => {
        xs.push(company.name);
        ys.push(company.displaytime);
    });
    return { xs, ys };
}