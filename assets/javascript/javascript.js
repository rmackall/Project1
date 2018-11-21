var apiSongKickKey = "6pZngLm7sG0kGF4U";
var apiSongKickQuery;

var locationCity;
var locationState = "";
var locationCountry;
var locationLat;
var locationLng;
var locationID;

var eventsAllObj = [];
var eventsObj = [];

// Initial SongKick form - Date Picker
var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

function populatedropdown(dayfield, monthfield, yearfield) {
    var today=new Date()
    var dayfield=document.getElementById(dayfield)
    var monthfield=document.getElementById(monthfield)
    var yearfield=document.getElementById(yearfield)
    for (var i=0; i<31; i++) {
        dayfield.options[i]=new Option(i, i+1)
        dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true) //select today's day
    }
    for (var m=0; m<12; m++) {
        monthfield.options[m]=new Option(monthtext[m], monthtext[m])
        monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true) //select today's month
    }
    var thisyear=today.getFullYear()
    for (var y=0; y<20; y++){
        yearfield.options[y]=new Option(thisyear, thisyear)
        thisyear+=1
    }
    yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true) //select today's year
}

//populatedropdown(id_of_day_select, id_of_month_select, id_of_year_select)
window.onload=function(){
    populatedropdown("daydropdown", "monthdropdown", "yeardropdown")
}




// Location Field
// $("#form-location-use-current-btn").click(function () {
//     if (apiSongKickQuery != "clientip") {
//         apiSongKickQuery = "clientip";
//         $("#form-location-field").val("Using Current Location");
//     }
//     else {
//         apiSongKickQuery = "";
//         $("#form-location-field").val("");
//         $("#form-location-field").attr("placeholder", "Enter A Location");
//     }
// });

$(document).on("click", "#form-run-songkick", function() {
    if (apiSongKickQuery != "clientip") {
        apiSongKickQuery = $("#form-location-field").val();
    }
    console.log(apiSongKickQuery);
});

$(document).on("click", "#form-run-songkick", function() {
    apiSongKickRun();
});

// SONGKICK API REQUEST - pulls event details and pushes into eventsAllObj array
function apiSongKickRun() {

    // var apiSongKickEnteredLocation = 
  
    var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?query=" + apiSongKickQuery + "&apikey=" + apiSongKickKey;  // api query to identify location ID

    // var queryURL = "https://api.songkick.com/api/3.0/metro_areas/6404/calendar.json?apikey=" + apiSongKickKey;

    console.log("queryURL is " + queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(response) {

            response.resultsPage.results.location[0];
            console.log(response);
            console.log(response.resultsPage.results.location[0].metroArea)
            locationCity = response.resultsPage.results.location[0].metroArea.displayName;
            var locationState = "";
            if (response.resultsPage.results.location[0].metroArea.state != undefined) {
                locationState = response.resultsPage.results.location[0].metroArea.state.displayName;
            }
            locationCountry = response.resultsPage.results.location[0].metroArea.country.displayName;
            $("#form-results-location").html(locationCity + ", " + locationState + " " + locationCountry)
            locationLat = response.resultsPage.results.location[0].metroArea.lat;
            console.log("locationLat is " + locationLat);
            locationLng = response.resultsPage.results.location[0].metroArea.lng;
            console.log("locationLong is " + locationLng);
            locationID = response.resultsPage.results.location[0].metroArea.id;

            var queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + locationID + "/calendar.json?apikey=" + apiSongKickKey;  // api query using location ID

            console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            })
        
                .then(function(response) {
                    console.log(response);
                    for (i = 0; i < response.resultsPage.results.event.length; i++) { // for loop to process all upcoming events into eventsAllObj
                        if (response.resultsPage.results.event[i].start.date >= "2018-11-20" && response.resultsPage.results.event[i].start.date <= "2018-12-31") {  // specify date range
                            if (response.resultsPage.results.event[i].flaggedAsEnded == false) {  // check event not ended
                                console.log(response.resultsPage.results.event[i]);
                                eventsAllObj.push({  // push event details to eventsAllObj array for easier access
                                    num: "event" + (eventsAllObj.length + 1),
                                    name: response.resultsPage.results.event[i].displayName,
                                    venue:  response.resultsPage.results.event[i].venue.displayName,
                                    artist:  response.resultsPage.results.event[i].performance[0].artist.displayName,
                                    startdate:  response.resultsPage.results.event[i].start.date,
                                    starttime:  response.resultsPage.results.event[i].start.time,
                                    url:  response.resultsPage.results.event[i].uri,
                                });
                                console.log(eventsAllObj);
                            }
                        }    
                    }

                    for (var i = 0; i < 5; i++) {
                        var x = Math.floor(Math.random()*eventsAllObj.length);
                        console.log("x is " + x);
                        eventsObj.push(eventsAllObj[x]);
                        eventsAllObj.splice(x, 1);
                    }
                    console.log(eventsAllObj);
                    console.log(eventsObj);

                });

     

        });
    


}


function eventsChoices() {

}