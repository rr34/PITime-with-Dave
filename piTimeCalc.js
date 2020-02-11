function piTimeCalc (PITimeString,dayLengthString,nightLengthString,PITime,dayLength,nightLength)
{
//debugger;
//Get current time in IMC UTC
var currentIMC = new Date ();
// var currentIMC = new Date(currentIMC.getUTCFullYear(), currentIMC.getUTCMonth(), currentIMC.getUTCDate(),  currentIMC.getUTCHours(), currentIMC.getUTCMinutes(), currentIMC.getUTCSeconds());

// use the suntimes calc ?
//TODO: make this entire function callable so that you can pass it the coordinates and it returns the PI Time strings at location passed to it.
//Columbus, Ohio


var times = SunCalc.getTimes(new Date(), lat, lng);

//Sunrise in IMC UTC
var sunriseIMC = times.sunrise;

//Sunset in IMC UTC
var sunsetIMC = times.sunset;

//Find the day length.
	var dayLength = sunsetIMC - sunriseIMC;
	var dayMinutes = parseInt((dayLength/(1000*60))%60), dayHours = parseInt((dayLength/(1000*60*60))%24);
	dayMinutes = ( dayMinutes < 10 ? "0" : "" ) + dayMinutes;

//Find the night length.
var nightLength = 24*60*60*1000 - dayLength;

	var nightMinutes = parseInt((nightLength/(1000*60))%60), nightHours = parseInt((nightLength/(1000*60*60))%24);
	nightMinutes = ( nightMinutes < 10 ? "0" : "" ) + nightMinutes;
	nightLengthString = "\n Night length is " + nightHours + ":" + nightMinutes + ".";

//Build time to display

if (currentIMC < sunriseIMC) //before sunrise
{
	var TimeLength = sunriseIMC - currentIMC;
	var seconds = parseInt((TimeLength/1000)%60), minutes = parseInt((TimeLength/(1000*60))%60), hours = parseInt((TimeLength/(1000*60*60))%24);
	minutes = ( minutes < 10 ? "0" : "" ) + minutes;
	seconds = ( seconds < 10 ? "0" : "" ) + seconds;
	var displayString = "The time is now sunrise -" + hours + ":" + minutes + /* ":" + seconds + */ " . Tomorrow's length is " + dayHours + ":" + dayMinutes + ".";

}

else if ( currentIMC > sunriseIMC && currentIMC < sunsetIMC ) //after sunrise and before sunset
{
	var TimeLength = currentIMC - sunriseIMC;
	var seconds = parseInt((TimeLength/1000)%60), minutes = parseInt((TimeLength/(1000*60))%60), hours = parseInt((TimeLength/(1000*60*60))%24);
	minutes = ( minutes < 10 ? "0" : "" ) + minutes;
	seconds = ( seconds < 10 ? "0" : "" ) + seconds;
	var displayString = "The time is now sunrise +" + hours + ":" + minutes + /* ":" + seconds + */ " out of a " + dayHours + ":" + dayMinutes + " day.";
}
else //must be after sunset
{
	var TimeLength = (24*60*60*1000) - (currentIMC - sunriseIMC);
	var seconds = parseInt((TimeLength/1000)%60), minutes = parseInt((TimeLength/(1000*60))%60), hours = parseInt((TimeLength/(1000*60*60))%24);
	minutes = ( minutes < 10 ? "0" : "" ) + minutes;
	seconds = ( seconds < 10 ? "0" : "" ) + seconds;
	var displayString = "The time is now sunrise -" + hours + ":" + minutes + /* ":" + seconds + */ ". Tomorrow's length is " + dayHours + ":" + dayMinutes + ".";
}


//Display String Result

//debugger;
let wholeString = displayString + nightLengthString;

document.getElementById("displayLocation").innerHTML = "At location " + lat + " latitude, " + lng + " longitude:";
document.getElementById("displayResult").innerHTML = wholeString;

// :TODO Prepare to be displayed in html


}