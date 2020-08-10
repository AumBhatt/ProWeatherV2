var weatherData;
var slocation;


var locName, is_day;
var text, humidity, uv, wind_degree, wind_dir, sunrise, sunset, moonrise, moonset;
var temp_x, feelslike_x, maxtemp_x, mintemp_x, precip_x, pressure_x, vis_x, wind_x;

getLocation();
function getLocation(){
    fetch('https://freegeoip.app/json/')
    .then(res => res.json())
    .then((wD) => {
        console.log('Location: ', wD);
        slocation = wD.city;
    }).catch(err => console.error(err));
}


setTimeout(function(){
    fetchData(slocation);
}, 1000);
function fetchData(myloc){
    console.log('Fetching data...');
    fetch(' https://api.weatherapi.com/v1/forecast.json?key=37f1649bdc334177ba6215849202006&q=' + myloc)
    .then(res => res.json())
    .then((wD) => {
        console.log('Current: ', wD);
        weatherData = wD;
        assignVals();
    }).catch(function(err){
        console.error(err);
        alert('No such location available :(');
    });

}

function assignVals(){

/* ----- Location ----- */
    locName = weatherData.location.name + ', ' + weatherData.location.country;

/* ----- is_day ----- */
    is_day = weatherData.current.is_day;

/* ----- Weather Text ----- */
    text = weatherData.current.condition.text;
    loadIcon(text.toLowerCase(), is_day);

/* ----- Humidity ----- */
    humidity = weatherData.current.humidity + '%';

/* ----- Wind ----- */
    wind_degree = weatherData.current.wind_degree;
    wind_dir = windDirection(weatherData.current.wind_dir);
    console.log('Wind : ' + wind_dir);

    sunrise = weatherData.forecast.forecastday[0].astro.sunrise;
    sunset = weatherData.forecast.forecastday[0].astro.sunset;
    moonrise = weatherData.forecast.forecastday[0].astro.moonrise;
    moonset = weatherData.forecast.forecastday[0].astro.moonset;

/* ----- UV ----- */
    uv = weatherData.current.uv;

    if(localStorage.getItem('PWUnit') === null){
        localStorage.setItem('PWUnit', 'met');
        metric();
    }
    else if(localStorage.getItem('PWUnit') === 'met'){
        metric();
    }
    else if(localStorage.getItem('PWUnit') === 'imp'){
        imperial();
    }
}

function loadIcon(iconText, time){
    var name = 'images/icons/';

    if(time === 1){
        name += 'day/';
    }
    else if(time === 0){
        name += 'night/';
    }
    if(iconText.match(/rain/gi)){
        if(iconText.match(/thunder/gi)){
            name += 'rainandthunder.svg';
        }
        else{
            name += 'rainy.svg';
        }
    }
    else if(iconText.match(/thunder/gi)){
        name += 'thunderClouds.svg';
    }
    else if(iconText.match(/clear/gi) || iconText.match(/sunny/gi)){
        name += 'clear.svg';
    }
    else if(iconText.match(/cloud/gi)){
        name += "cloudy.svg";
    }
    else if(iconText.match(/haze/gi)){
        name += 'Haze.svg'
    }

    

    document.getElementById('iconImg').src = name;
}

function windDirection(dir){
    if(dir.length > 2){
        dir = dir.slice(1,3);
    }
    switch(dir){
        case 'N':
            return 'North';
        case 'S':
            return 'South';
        case 'W':
            return 'West';
        case 'E':
            return 'East';
        case 'NE':
            return 'Northeast';
        case 'NW':
            return 'Northwest';
        case 'SW':
            return 'Southwest';
        case 'SE':
            return 'Southeast';
    }
}

function metric(){
    console.log('Calling metric.....');
    /* ----- Temp ----- */
    temp_x = ~~weatherData.current.temp_c + '°C';

    feelslike_x = ~~weatherData.current.feelslike_c + '°C';

    
    maxtemp_x = ~~weatherData.forecast.forecastday[0].day.maxtemp_c + '°C';

    mintemp_x = ~~weatherData.forecast.forecastday[0].day.mintemp_c + '°C';

    /* ----- Precip ----- */
    precip_x = weatherData.current.precip_mm + 'mm';

    /* ----- Pressure ----- */
    pressure_x = weatherData.current.pressure_mb + 'mbar';

    /* ----- Vis -----*/
    vis_x = ~~weatherData.current.vis_km + 'km';

    /* ----- Wind -----*/
    wind_x = ~~weatherData.current.wind_kph + 'km/h';
    printer();
}

function imperial(){
    console.log('Calling imperial.....');
    /* ----- Temp ----- */
    temp_x = ~~weatherData.current.temp_f + '°F';

    feelslike_x = ~~weatherData.current.feelslike_f + '°F';

    maxtemp_x = ~~weatherData.forecast.forecastday[0].day.maxtemp_f + '°F';

    mintemp_x = ~~weatherData.forecast.forecastday[0].day.mintemp_f + '°F';

    /* ----- Precip ----- */
    precip_x = weatherData.current.precip_in + ' in';

    /* ----- Pressure ----- */
    pressure_x = weatherData.current.pressure_in + 'in';

    /* ----- Vis -----*/
    vis_x = ~~weatherData.current.vis_miles + 'miles';

    /* ----- Wind -----*/
    wind_x = ~~weatherData.current.wind_mph + 'mi/h';
    printer();
}


function printer(){
    animateMain();
    console.log('Printing....');
    if(is_day === 1){
        document.querySelector('body').className = 'light-mode';
    }
    else if(is_day === 0){
        document.querySelector('body').className = "dark-mode";
    }

    document.querySelector('.locationName').innerHTML = locName;

    document.querySelector('.temp_x').innerHTML = temp_x;
    document.querySelector('.feelslike_x').innerHTML ='Feels Like ' + feelslike_x;
    document.querySelector('.maxtemp_x').innerHTML ='Max : ' + maxtemp_x;
    document.querySelector('.mintemp_x').innerHTML = 'Min : ' + mintemp_x;

    document.querySelector('.precip_x').innerHTML = `Precipitation : ${precip_x}`;
    document.querySelector('.pressure_x').innerHTML = `Pressure : ${pressure_x}`;
    document.querySelector('.vis_x').innerHTML = `Visibility : ${vis_x}`;

    document.querySelector('.wind_x').innerHTML = wind_x;
    document.querySelector('.wind_degree').style.transform = `rotate(${wind_degree}deg)`;
    document.querySelector('.wind_dir').innerHTML = wind_dir;

    document.querySelector('.text').innerHTML = text;
    document.querySelector('.humidity').innerHTML ='Humidity : ' + humidity;
    document.querySelector('.uv').innerHTML ='UV Index : ' + uv;
    
    document.querySelector('.sunrise').innerHTML = sunrise;
    document.querySelector('.sunset').innerHTML = sunset;
    document.querySelector('.moonrise').innerHTML = moonrise;
    document.querySelector('.moonset').innerHTML = moonset;
}

