const alert = document.getElementById("alert");
const trafficCanvas = document.getElementById('traffic-chart');
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

// create the html for the banner
alert.innerHTML =
    `
    <div class="alert-banner">
        <p class="alert-banner-message"><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
        to complete</p>
        <p class="alert-banner-close">x</p>
    </div>
    `

alert.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
    alert.style.display = "none"
    }
});

let trafficDataWeekly = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
    "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [700, 750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
        2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataDaily = {
    labels: ["16", "17", "18", "19", "20", "21", "22"],
    datasets: [{
        data: [400, 700, 600, 800, 1000, 300, 1500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataHourly= {
    labels: ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00","7:00", "8:00",
    "9:00","10:00","11:00", "12:00"
    ],
    datasets: [{
        data: [400, 700, 600, 800, 1000, 300, 1500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};
let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficDataWeekly,
    options: trafficOptions
});




// data for daily traffic bar chart
const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
}

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

//mobile view canvas
const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const mobileOptions = {
    legend: {
        position: 'right',
        labels: {
            boxWidth: 20,
            fontStyle: 'bold'
        }
    }
}

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

//message section
send.addEventListener('click', () => {
    // ensure user and message fields are filled out
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
    } else if (user.value === "" ) {
        alert("Please fill out user field before sending");
    } else if (message.value === "" ) {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});

//message textarea cursor configure

$('textarea').prop('selectionEnd', 1)

//navbar link active 

$('a').each((index, element) => {
    $(element).click(() => {
        $('a').removeClass('active');
        $(element).addClass('active');
    });
})


//add interaction for the chart clicking options

$('li').each((index, element) => {
    $(element).click((e) => {
        $('li').removeClass('active');
        $(element).addClass('active');
        if($(e.target).text() === 'Daily'){
            new Chart(trafficCanvas, {
                type: 'line',
                data: trafficDataDaily,
                options: trafficOptions
            });
        }else if($(e.target).text() === 'Weekly'){
            new Chart(trafficCanvas, {
                type: 'line',
                data: trafficDataWeekly,
                options: trafficOptions
            });
        }
        
    });
})