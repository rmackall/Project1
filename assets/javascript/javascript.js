                //// **** VARIABLES **** ////
                
    //// ~~~ SONGKICK ~~~ ////

// Input form - date picker
var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

// Input form - date picker
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

// On load, populate date field and run initial songkick
window.onload=function(){
    populatedropdown("daydropdown", "monthdropdown", "yeardropdown")
    // setTimeout(function() {
        apiSongKickRun();
        console.log("ran apiSongKickRun");
    // }, 2000);
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

// Listeners
$(document).on("click", "#form-run-songkick", function() {
// Events arrays
var eventsAllObj = [];
var eventsObj = [];


    //// ~~~ YOUTUBE ~~~ ////

// Single artist to input into YouTube API
var headlineArtist;




                //// **** LISTENERS **** ////

// On load, populate date field and run initial songkick
window.onload=function(){
    populatedropdown("daydropdown", "monthdropdown", "yeardropdown")
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
    console.log("headline artist " + headlineArtist)
    loadVideo();
});




                //// **** FUNCTIONS **** ////

    //// ~~~ SONGKICK ~~~ ////

// API FUNCTION - pull events based on location and date
function apiSongKickRun() {

    eventsAllObj = [];
    eventsObj = [];

    apiSongKickQuery = $("#form-location-field").val();
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

            // CONVERT INPUT LOCATION TO SONGKICK LOCATION ID
            response.resultsPage.results.location[0];
            // console.log(response);
            // console.log(response.resultsPage.results.location[0].metroArea)
            locationCity = response.resultsPage.results.location[0].metroArea.displayName;
            var locationState = "";
            if (response.resultsPage.results.location[0].metroArea.state != undefined) {
                locationState = response.resultsPage.results.location[0].metroArea.state.displayName;
            }
            locationCountry = response.resultsPage.results.location[0].metroArea.country.displayName;
            $("#form-results-location").html(locationCity + ", " + locationState + " " + locationCountry)
            locationLat = response.resultsPage.results.location[0].metroArea.lat;
            locationLng = response.resultsPage.results.location[0].metroArea.lng;
            locationID = response.resultsPage.results.location[0].metroArea.id;
            console.log("locationID is " + locationID);
        // Grab location details, including location ID (e.g. Denver is 6404), required for JSON search
        response.resultsPage.results.location[0];

            // RUN QUERY
            var queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + locationID + "/calendar.json?apikey=" + apiSongKickKey;  // api query using location ID
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
        
                .then(function(response) {
                    console.log(response);
                    for (i = 0; i < response.resultsPage.results.event.length; i++) { // for loop to process all upcoming events into eventsAllObj
                        if (response.resultsPage.results.event[i].start.date >= "2018-11-20" && response.resultsPage.results.event[i].start.date <= "2018-12-31") {  // specify date range
                            if (response.resultsPage.results.event[i].flaggedAsEnded == false) {  // check event not ended
                                if (response.resultsPage.results.event[i].status != "cancelled") {  // check event not cancelled
                                    // console.log(response.resultsPage.results.event[i]);
                                    eventsAllObj.push({  // push event details to eventsAllObj array for easier access
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

                    $("#form-results-events").empty();
                    for (var i = 0; i < 6; i++) {
                        var x = Math.floor(Math.random()*eventsAllObj.length);
                        // console.log("x is " + x);
                        eventsObj.push(eventsAllObj[x]);
                        eventsAllObj.splice(x, 1);
                        // console.log(eventsObj[i].num);
                        // $("#form-results-events").append('\
                        //     <p>name: ' + eventsObj[i].name + '</p>\
                        //     <p>artist: ' + eventsObj[i].artist + '</p>\
                        //     <p>venue: ' + eventsObj[i].venue + '</p>\
                        //     <p>startdate: ' + eventsObj[i].startdate + '</p>\
                        //     <button type="button" id="watchvideo">Watch A Video</button>\
                        //     <br>\
                        // ');


                    var eventName = eventsObj[i].name.substring(0, eventsObj[i].name.indexOf(' at '));

                        $("#form-results-events").append('\
                            <div class="col-md-4 mb-4">\
                                <div class="card h-100">\
                                    <div class="card-body">\
                                        <h2 class="card-title event-name">' + eventName + '</h2>\
                                        <p class="card-text event-details">Headlining Artist: ' + eventsObj[i].artist + '</p>\
                                        <p class="card-text event-details">Venue: ' + eventsObj[i].venue + '</p>\
                                        <p class="card-text event-details">Start Date: ' + eventsObj[i].startdate + '</p>\
                                    </div>\
                                    <div class="card-footer">\
                                        <a href="#" class="btn btn-primary button-load-video">Load Music Video</a>\
                                    </div>\
                                </div>\
                            </div>\
                        ');
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
                    // console.log(eventsAllObj);
                    console.log(eventsObj);
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
                                <p class="card-text event-details">Headlining Artist: ' + eventsObj[i].artist + '</p>\
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
function loadVideo() {
    // use variable 'headlineArtist' and Youtube API to get video and autoplay
}

}

$(window).on('load', function() {
window.searchModule = {

  cors: "http://crossorigin.me/",
  ytEndpoint: "https://www.googleapis.com/youtube/v3/search",
  ytKey: "AIzaSyCB__3Jht7AQDhI-LHyuvdh9xO0Q2CnA2c",

  init: function(sentSearch) {
    var self = this,
        bandCheck = $("#bandCheckbox").is(":checked");
    
    if(bandCheck == true) {
      sentSearch = sentSearch + "+(band)";
    }
    
    self.ytSearch(sentSearch);
    self.watchers();
  },


  ytSearch: function(sentSearch) {
    var self = this;

    $.ajax({
      url: self.ytEndpoint + "?part=snippet&q=" + sentSearch + "&key=" + self.ytKey,
      success: function(response) {
        //console.log(response);
        self.formatYt(response);
      },

      error: function(response) {
        console.log(response);
      }
    })
  },

  formatYt: function(response) {
    var self = this,
        source = $("#yt-template").html(),
        template = Handlebars.compile(source),
        destination = $("#yt-destination"),
        newResponse = {items : []};

    //filter out youtube channels
    //only show videos
    $.each(response.items, function(i, item) {          
      if(item.id.kind == "youtube#video") {
        newResponse.items.push(item);
      }
    })

    $("#yt-player").attr("src", "https://www.youtube.com/embed/" + newResponse.items[0].id.videoId);

    destination.html(template(newResponse));
    self.changeYtVideo();
    $(".wrapper").show();
  },

  changeYtVideo: function() {

    $(".yt-wrapper .result").click(function() {
      var newVideoId = $(this).attr("data-video-id");
      $("#yt-player").attr("src", "https://www.youtube.com/embed/" + newVideoId);

    })
  },

  watchers: function() {
    var self = this;

    $("#bandButton").click(function() {
      self.start();
    })

    $("#bandInput").keyup(function(e) {    
      if(e.keyCode === 13) {
        self.start();
      }
    });

    $("#restartSearch").click(function() {
      $("#bandInput").val("");
      $("#bandCheckbox").attr("checked", false);
      $("#yt-player").attr("src", "");
      $(".searchBox").show();
      $(".wrapper").hide();
    })
  },

  start: function() {
    var inputVal = $("#bandInput").val();

    if(inputVal === "undefined" || inputVal === "") {
      $(".error").show();

    } else {
      //console.log(inputVal);
      $(".error").hide();
      $(".searchBox").hide();
      window.searchModule.init(inputVal);
    }
  }

}

$(function() {
  window.searchModule.watchers();
});
});

