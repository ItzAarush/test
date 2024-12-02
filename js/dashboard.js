document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const burgerBtn = document.getElementById("burger-btn");
    const sidebar_Profile = document.getElementById("sidebar-Profile");

    burgerBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            // Toggle sidebar visibility for small screens
            sidebar.classList.toggle("open");
        } else {
            // Toggle sidebar shrink for larger screens
            sidebar.classList.toggle("shrinked");
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', function () {
    var sidebar = document.querySelector('.sidebar');
    if (window.innerWidth < 768) {
        sidebar.classList.add('shrinked');
    } else {
        sidebar.classList.remove('shrinked');
    }
});

// Initial check in case the page is already smaller than 768px on load
if (window.innerWidth < 768) {
    document.querySelector('.sidebar').classList.add('shrinked');
}
////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('refresh-Icon').addEventListener('click', function () {
    const icon = this;

    // Add the 'rotate' class to trigger the animation
    icon.classList.add('rotate');

    // Remove the 'rotate' class after the animation ends to allow re-triggering
    icon.addEventListener('animationend', function () {
        icon.classList.remove('rotate');
    }, { once: true }); // Use `{ once: true }` to ensure this listener is removed automatically
});

document.getElementById('bell-icon').addEventListener('click', function () {
    const bell = this;

    bell.classList.add('shake');

    bell.addEventListener('animationend', function () {
        bell.classList.remove('shake');
    }

        , {
            once: true
        });
})

document.getElementById('setting-Icon').addEventListener('click', function () {
    const icon = this;

    // Add the 'rotate' class to trigger the animation
    icon.classList.add('rotate');

    // Remove the 'rotate' class after the animation ends to allow re-triggering
    icon.addEventListener('animationend', function () {
        icon.classList.remove('rotate');
    }, { once: true }); // Use `{ once: true }` to ensure this listener is removed automatically
});

//////////////////////////////////////////////////////////////////////////////////////////

const ctxLine = document.getElementById('lineChart').getContext('2d');
const ctxBar = document.getElementById('barChart').getContext('2d');

const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Indian Index',
            data: [10, 20, 15, 25, 30, 45, 40, 50, 60, 55, 70, 65],
            borderColor: '#FFAF65',
            borderWidth: 3,
            fill: false,
            tension: 0.4
        }, {
            label: 'US Index',
            data: [15, 25, 20, 30, 35, 50, 45, 55, 65, 60, 75, 70],
            borderColor: '#4441DE',
            borderWidth: 3,
            fill: false,
            tension: 0.4
        }, {
            label: 'Ethereum',
            data: [5, 15, 10, 20, 25, 40, 35, 45, 55, 50, 65, 60],
            borderColor: '#60C695',
            borderWidth: 3,
            fill: false,
            tension: 0.4
        }, {
            label: 'Acepatrons Return',
            data: [20, 30, 25, 35, 40, 55, 50, 60, 70, 65, 80, 75],
            borderColor: '#F34F80',
            borderWidth: 3,
            fill: false,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333'
                },
                title: {
                    display: true,
                    text: 'Comparison with Other Markets'
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
});

let barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'ROI',
            data: [],
            backgroundColor: function (context) {
                return context.dataset.data.map(() => '#2258BF');
            },
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 1,
            borderRadius: 1000
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333'
                },
                title: {
                    display: true,
                    text: 'ROI'
                }
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                },
                beginAtZero: true,
                max: 50
            }
        }
    }
});

const timeFilterData = {
    week: { labels: ['01', '02', '03', '04', '05', '06', '07'], data: [50, 50, 50, 50, 50, 50, 50].map((_, i) => i % 2 === 0 ? 25 : 50) },
    twoWeeks: { labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'], data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50].map((_, i) => i % 2 === 0 ? 25 : 50) },
    month: { labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, '0')), data: Array.from({ length: 30 }, (_, i) => i % 2 === 0 ? 25 : 50) },
    threeMonths: { labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`), data: Array.from({ length: 12 }, (_, i) => i % 2 === 0 ? 25 : 50) },
    sixMonths: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: Array.from({ length: 6 }, (_, i) => i % 2 === 0 ? 25 : 50) },
    year: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: Array.from({ length: 12 }, (_, i) => i % 2 === 0 ? 25 : 50) },
    threeYears: { labels: ['Jun24', 'Dec24', 'Jun25', 'Dec25', 'Jun26', 'Dec26', 'Jun27'], data: Array.from({ length: 7 }, (_, i) => i % 2 === 0 ? 25 : 50) }
};

function updateBarChart() {
    const filter = document.getElementById('timeFilter').value;
    const data = timeFilterData[filter];
    barChart.data.labels = data.labels;
    barChart.data.datasets[0].data = data.data;
    barChart.update();
}

updateBarChart(); // Initialize the bar chart with default filter

