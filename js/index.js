//function to get weather details and store them
function getWeather(measure, url,weather, wind, main){
    $.ajax({
      type: "GET",
      dataType: "json",
      url:url,
      success: function(json){
        weather = json.weather[0];
        wind = json.wind;
        main = json.main;
        console.log("success");
        console.log(weather);
        //set temperature
        var celciusTemp = Math.round(main.temp - 273.15);
        var farenheitTemp = Math.round(((main.temp - 273.15) * 9/5) + 32);
       if (measure === "Celsius"){
    $('#temp').html(celciusTemp + "°C");
        } else {
           $('#temp').html(farenheitTemp + "°F");
        };
        
      //set status
        $('#status').html(weather.description); 
       var icourl = "<img src='http://openweathermap.org/img/w/" + weather.icon +".png' alt= 'weathericon'></img>";
        console.log(icourl);
        $('#icon').html(icourl);
        //set status icon
        
          //setup wind
      var wSpeed = 0;
        var unit = "kmph";
        var direction = "N";
        //find wind direction
        if(wind.deg > 11.25 && wind.deg > 33.75){
          direction = "NNE";
        } else  if(wind.deg > 33.75 && wind.deg >= 56.25){
          direction = "NE";
        } else  if(wind.deg > 56.25 && wind.deg >= 78.75){
          direction = "ENE";
        } else if(wind.deg > 78.75 && wind.deg >= 101.25){
          direction = "E";
        } else  if(wind.deg > 101.25 && wind.deg >= 123.75){
          direction = "ESE";
        } else  if(wind.deg > 123.75 && wind.deg >= 146.25){
          direction = "SE";
        } else if(wind.deg > 146.25 && wind.deg >= 168.75){
          direction = "SSE";
        } else if(wind.deg > 168.75 && wind.deg >= 191.25){
          direction = "S";
        } else if(wind.deg > 191.25 && wind.deg >= 213.75){
          direction = "SSW";
        } else if(wind.deg > 213.75 && wind.deg >= 236.25){
          direction = "SW";
        } else if(wind.deg > 236.25 && wind.deg >= 258.75){
          direction = "WSW";
        } else if(wind.deg > 258.75 && wind.deg >= 281.25){
          direction = "W";
        } else if(wind.deg > 281.25 && wind.deg >= 303.75){
          direction = "WNW";
        } else if(wind.deg > 303.75 && wind.deg >= 326.25){
          direction = "NW";
        } else if(wind.deg > 326.25 && wind.deg >= 348.75){
          direction = "NNW";
        };
    //determine windspeed based on unit type and put wind info on page
        if(measure === "Celsius"){
          wSpeed = (wind.speed * 3.6);
          wSpeed = Math.round(wSpeed);
          console.log("metric");
          $('#wind').html(wSpeed + " " + unit +" " + direction);
        } else {
          wSpeed = (wind.speed * 2.236);
          wSpeed = Math.round(wSpeed);
          unit = "mph";
          console.log("imperial");
          $('#wind').html(wSpeed + " " + unit +" " + direction);
        };
      },
      error: function(error){
        console.log(error);
      }
    });
    }

//create a function to get geolocation and then send it to API for weather details,  then update the app with the response
function update(measure){
  //get geo and assemble API URL
  navigator.geolocation.getCurrentPosition(function(pos) {
    var lon = pos.coords.longitude;
    var lat = pos.coords.latitude;
    var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon="+ lon + "&appid=75720a47bdba80515148d6e55ef3a9a9";
    var weather = [];
    var wind = [];
    var main = [];
    //make API call and get weather object
    getWeather(measure, url, weather, wind, main);
    
  });
}//setup default unit.
var measure="Celsius";

$(document).ready(function() { 
  //initial setting for the measure button
      $("#measure").html(measure);
    //get location
  update(measure);
});

//update measure button and variable
$("#measure").click(function (){
  if (measure=="Celsius"){
    measure = "Farenheit";
     $("#measure").html(measure);
  } else {
    measure = "Celsius";
     $("#measure").html(measure);
  };
  update(measure);
  });
//perform the API call

//insert weather into predefined spots

//use if/then  to turn wind/rain/sun into icons (bootstrap icons?)