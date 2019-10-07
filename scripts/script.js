const alert = document.getElementById("alert");
const trafficCanvas = document.getElementById('traffic-chart');
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const alertBell = document.getElementById("badge1");

const toggleSwitchOne = document.querySelectorAll('input[type="checkbox"]')[0];
const toggleSwitchTwo = document.querySelectorAll('input[type="checkbox"]')[1];

const timezoneInput = document.getElementById('timezone');
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
        label: '# of Hits',
        data: [700, 750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
        2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataDaily = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataHourly= {
    labels: ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00","7:00", "8:00",
    "9:00","10:00","11:00", "12:00","13:00","14:00", "15:00", "16:00", "17:00","18:00",
    "19:00", "20:00", "21:00","22:00", "23:00"
    ],
    datasets: [{
        label: '# of Hits',
        data: [30, 40, 70, 100, 120, 140, 150, 120, 60, 80, 90, 100, 110, 120,
            130, 200, 90, 150, 90, 100, 120, 130, 70, 120
        ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataMonthly= {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug"
        ,"Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [{
        label: '# of Hits',
        data: [
            "20000", "30000", "50000", "10000", "20000", "30000","10000", "20000",
            "30000", "40000", "50000","30000"
        ],
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
send.addEventListener('click', (e) => {
    // ensure user and message fields are filled out
    if (user.value === "" && message.value === "") {
        window.alert("Please fill out user and message fields before sending");
    } else if (user.value === "" ) {
        window.alert("Please fill out user field before sending");
    } else if (message.value === "" ) {
        window.alert("Please fill out message field before sending");
    } else {
        window.alert(`Message successfully sent to: ${user.value}`);
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
        }else if($(e.target).text() === 'Hourly'){
            new Chart(trafficCanvas, {
                type: 'line',
                data: trafficDataHourly,
                options: trafficOptions
            });
        }else{
            new Chart(trafficCanvas, {
                type: 'line',
                data: trafficDataMonthly,
                options: trafficOptions
            });
        }
        
    });
})


//add drop down menu for the alert bell portion
//inspired from https://stackoverflow.com/questions/17788990/access-the-css-after-selector-with-jquery

$('#badge1').click(() => {
    $('#notification').toggle();
    //$("#badge1").attr("data-badge", "");
    $("#badge1").addClass("changed");
})



//autocomplete
//https://github.com/pawelczak/EasyAutocomplete
const options = {
	data: [ "Victoria Chambers",
    "Dale Byrd", 
   "Dawn Wood", 
   "Dan Oliver"],
	list: {
		match: {
			enabled: true
		}
	}
};
$('#userField').easyAutocomplete(options);

if(JSON.parse(localStorage.getItem('toggleSwitchOne')) === true){
    toggleSwitchOne.checked = true;
}else{
    toggleSwitchOne.checked = false;
}

if(JSON.parse(localStorage.getItem("toggleSwitchTwo")) === true){
    toggleSwitchTwo.checked = true;
}else{
    toggleSwitchTwo.checked = false;
}

toggleSwitchOne.addEventListener('change', () => {
    if(this.checked){
        console.log(toggleSwitchOne.checked);
        localStorage.setItem("toggleSwitchOne",toggleSwitchOne.checked);
    }else{
        console.log(toggleSwitchOne.checked);
        localStorage.setItem("toggleSwitchOne",toggleSwitchOne.checked);
    }
})

toggleSwitchTwo.addEventListener('change', () => {
    if(this.checked){
        localStorage.setItem("toggleSwitchTwo",toggleSwitchTwo.checked);
    }else{
        localStorage.setItem("toggleSwitchTwo",toggleSwitchTwo.checked);
    }
})


if(localStorage.getItem('timezone')){
    timezoneInput.value = localStorage.getItem('timezone');
}

//local storage for the timezone
timezoneInput.addEventListener('change', () => {
    localStorage.setItem('timezone',timezoneInput.value);
})