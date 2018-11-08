function updateClockv12 ()
{
//debugger;
//Get current time in IMC UTC
var currentIMC = new Date ();
// var currentIMC = new Date(currentIMC.getUTCFullYear(), currentIMC.getUTCMonth(), currentIMC.getUTCDate(),  currentIMC.getUTCHours(), currentIMC.getUTCMinutes(), currentIMC.getUTCSeconds());

// use the suntimes calc ?
var times = SunCalc.getTimes(new Date(), 40.0, -83.0);

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


//Display
document.write(displayString);
document.write(nightLengthString);

// :TODO Prepare to be displayed in html


}