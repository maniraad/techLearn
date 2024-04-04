import { getAdminInfos } from "./func/utils.js";
import { getRecentlyUser, showMainData } from "./func/shared.js";

window.addEventListener('load', () => {
    // Select Element From Dom
    const adminWelcomeElem = document.querySelector('.admin-welcome-name');
    const pieChart = document.getElementById('pie-chart');
    const linearChart = document.getElementById('linear-chart');

    getRecentlyUser();
    showMainData();

    // Admin Info
    getAdminInfos().then(admin => {
        console.log(admin);
        // Show Admin Name
        adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`

    });

    // Chart 
    new Chart(pieChart, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Doughnut Chart'
                }
            }
        },
    });

    new Chart(linearChart, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }, {
                label: '# of Votes',
                data: [2, 29, 5, 1, 8, 3],
                borderWidth: 1
            },
            ],

        },
        options: {
            animations: {
                radius: {
                    duration: 400,
                    easing: 'linear',
                    loop: (context) => context.active
                }
            },
            hoverRadius: 12,
            hoverBackgroundColor: 'yellow',
            interaction: {
                mode: 'nearest',
                intersect: false,
                axis: 'x'
            },
            plugins: {
                tooltip: {
                    enabled: false
                }
            }
        },
    });
});