                //// **** VARIABLES **** ////

    //// ~~~ DOM HTML ~~~ ////

var imagesObj = [
    'assets/images/vidph1.jpg',
    'assets/images/vidph2.jpg',
    'assets/images/vidph3.jpg',
    'assets/images/vidph4.jpg',
    'assets/images/vidph5.jpg',
    'assets/images/vidph6.jpg',
];

var randImg = imagesObj[Math.floor(Math.random() * imagesObj.length)];
$("#vidph-pic").attr("src", randImg);

    //// ~~~ SONGKICK ~~~ ////

// Input form - date picker month array
var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

// Input form - date picker from
function populatedropdownfrom(dayfield, monthfield, yearfield) {
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

// Input form - date picker to
function populatedropdownto(dayfield, monthfield, yearfield) {
    var today=new Date();
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
    console.log("to date is " + today);
}

// API key
var apiSongKickKey = "6pZngLm7sG0kGF4U";
var apiSongKickQuery;

// Location details
var locationCity;
var locationState = "";
var locationCountry;
var locationLat;
var locationLng;
var locationID;

// Events arrays
var eventsAllObj = [];
var eventsObj = [];


    //// ~~~ YOUTUBE ~~~ ////

// Single artist to input into YouTube API
var headlineArtist;

                //// **** LISTENERS **** ////

// On load, populate date field and run initial songkick
window.onload=function(){
    populatedropdownfrom("daydropdownfrom", "monthdropdownfrom", "yeardropdownfrom")
    populatedropdownto("daydropdownto", "monthdropdownto", "yeardropdownto")
    apiSongKickRun();
}

// Button to run SongKick API, using input City & Date
$(document).on("click", "#form-run-songkick", function() {
    apiSongKickRun();
});

// Button to load artist video of selected event
$(document).on("click", ".button-load-video", function(event) {
    event.preventDefault();
    headlineArtist = $(this).attr("data-artist");
    console.log("headline artist " + headlineArtist);
    console.log("running loadVideo()");
    loadVideo(headlineArtist);
});



                //// **** FUNCTIONS **** ////

    //// ~~~ SONGKICK ~~~ ////

// API FUNCTION - pull events based on location and date
function apiSongKickRun() {

    // Clear previous API search results
    eventsAllObj = [];
    eventsObj = [];
    $("#form-results-events").empty();

    // New location is from input field
    apiSongKickQuery = $("#form-location-field").val();
  
    // Query URL using location name (e.g. Denver)
    var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?query=" + apiSongKickQuery + "&apikey=" + apiSongKickKey;  // api query to identify location ID

    console.log("queryURL is " + queryURL);

    // Run 1st JSON request, using location name (e.g. Denver) to get location ID (e.g. 6404)
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {

        // Grab location details, including location ID (e.g. Denver is 6404), required for JSON search
        response.resultsPage.results.location[0];

        locationCity = response.resultsPage.results.location[0].metroArea.displayName;
        locationID = response.resultsPage.results.location[0].metroArea.id;
        locationCountry = response.resultsPage.results.location[0].metroArea.country.displayName;
        locationLat = response.resultsPage.results.location[0].metroArea.lat;
        locationLng = response.resultsPage.results.location[0].metroArea.lng;
        
        // Special steps required for state.  Non-US locations throw an error.
        var locationState = "";
        if (response.resultsPage.results.location[0].metroArea.state != undefined) {
            locationState = response.resultsPage.results.location[0].metroArea.state.displayName;
        }

        $("#form-results-location").html(locationCity + ", " + locationState + " " + locationCountry)


        // Query URL using location ID (e.g. 6404)
        var queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + locationID + "/calendar.json?apikey=" + apiSongKickKey;
        

        // Run 2nd JSON request, using location ID (e.g. 6404) to get events in area (array of events)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
    
        .then(function(response) {
            console.log(response);

            // For loop to store all upcoming events into eventsAllObj array
            for (i = 0; i < response.resultsPage.results.event.length; i++) {

// !!!!! THIS DATE LINE IS INCOMPLETE - MUST PULL DATE FROM INPUT !!!!!
// Also, can these IFs be combined into a neater code?
                // Check within date range
                if (response.resultsPage.results.event[i].start.date >= "2018-11-20" && response.resultsPage.results.event[i].start.date <= "2018-12-31") {
                    // Check event not ended
                    if (response.resultsPage.results.event[i].flaggedAsEnded == false) {
                        // Check event not cancelled
                        if (response.resultsPage.results.event[i].status != "cancelled") {
                            // Push events into eventsAllObj array
                            eventsAllObj.push({
                                num: "event" + (eventsAllObj.length + 1),
                                name: response.resultsPage.results.event[i].displayName,
                                venue:  response.resultsPage.results.event[i].venue.displayName,
                                venuelocation: response.resultsPage.results.event[i].location.city,
                                artist:  response.resultsPage.results.event[i].performance[0].artist.displayName,
                                startdate:  response.resultsPage.results.event[i].start.date,
                                starttime:  response.resultsPage.results.event[i].start.time,
                                url:  response.resultsPage.results.event[i].uri,
                            });
                        }
                    }
                }    
            }

            console.log(eventsAllObj);

            // Pull x number of events from local array of events (i.e. eventsAllObj array).
            // Deletes them from the array so they aren't shown again.
            // !!!!! IF THE SAME SEARCH IS RUN, PERHAPS CONTINUE TO READ AND REMOVE FROM REMAINING ARRAY.  THIS WILL AVOID DUPLICATES.
            for (var i = 0; i < 6; i++) {
                var x = Math.floor(Math.random()*eventsAllObj.length);
                eventsObj.push(eventsAllObj[x]);
                eventsAllObj.splice(x, 1);

                // Cut out extraneous text from event name (i.e. 'Beck at The Paramount (November 27)' becomes 'Beck')
                var eventName = eventsObj[i].name.substring(0, eventsObj[i].name.indexOf(' at '));

                // 
                $("#form-results-events").append('\
                    <div class="col-md-4 mb-4">\
                        <div class="card h-100">\
                            <div class="card-body">\
                                <h2 class="card-title event-name">' + eventName + '</h2>\
                                <p class="card-text event-details">Venue: ' + eventsObj[i].venue + '</p>\
                                <p class="card-text event-details">Start Date: ' + eventsObj[i].startdate + '</p>\
                            </div>\
                            <div class="card-footer">\
                                <a href="#" class="btn btn-primary button-load-video" data-artist="' + eventsObj[i].artist + '">Load Music Video</a>\
                            </div>\
                        </div>\
                    </div>\
                ');
            }

            // Prints all remaining events in eventsAllObj array
            // console.log(eventsAllObj);
            // Prints all events we've pushed to html
            // console.log(eventsObj);

        });

    });

}


    //// ~~~ YOUTUBE ~~~ ////

// API FUNCTION - Get video based on headline artist
function loadVideo(x) {
    console.log("x is " + x);
    
    // use variable 'headlineArtist' and Youtube API to get video and autoplay
}