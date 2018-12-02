


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

    videoIDsObj = [];

    for (i = 0; i < newResponse.items.length; i++) {
        videoIDsObj.push(newResponse.items[i].id.videoId);
        console.log(videoIDsObj[i]);
    }

    // dave
    $("#vidph").html('\
    <iframe src="" frameborder="0" allowfullscreen="" id="yt-player" width="100%" height="100%" data-vidid="' + newResponse.items[0].id.videoId + '"></iframe>\
    <br>\
    \
    ');

    $("#yt-player").attr("src", "https://www.youtube.com/embed/" + newResponse.items[0].id.videoId);

    // destination.html(template(newResponse));
    // self.changeYtVideo();
    // $(".wrapper").show();
  },

//   changeYtVideo: function() {

//     $(".yt-wrapper .result").click(function() {
//       var newVideoId = $(this).attr("data-video-id");
//       $("#yt-player").attr("src", "https://www.youtube.com/embed/" + newVideoId);

//     })
//   },

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
        dayfield.options[today.getDate()]=new Option(today.getDate() + 1, today.getDate() + 1, true, true) //select today's day
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

var videoIDsObj = [];

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

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// Button to load artist video of selected event
$(document).on("click", ".button-load-video", function(event) {
    event.preventDefault();
    headlineArtist = $(this).attr("data-artist");

    $("#bandInput").val('"' + headlineArtist + '" music');
    $("#bandButton").click();
    topFunction(); 
    $("#yt-btn-next").show();

    console.log("headline music " + headlineArtist);
    // console.log("running loadVideo()");
    // loadVideo(headlineArtist);

});

// Button to run SongKick API, using input City & Date
$(document).on("click", "#yt-btn-next", function() {
    $("#yt-btn-prev").show();
    
    var currentVidSrc = $("#yt-player").attr("src");
    var currentVidID = currentVidSrc.replace("https://www.youtube.com/embed/", "");
    console.log("currentVidId is " + currentVidID);
    console.log("currentVidSrc is " + currentVidSrc);

    var newVidID;

    for (i = 0; i < videoIDsObj.length; i++) {
        if (videoIDsObj[i] == currentVidID) {
            if (i == videoIDsObj.length - 1) {
                newVidID = videoIDsObj[0];
            }
            else {
                newVidID = videoIDsObj[i + 1];
            }
            break;
        }
    }
    console.log("newVidID is " + newVidID);
    // var newVideoId = 
    $("#yt-player").attr("src", "https://www.youtube.com/embed/" + newVidID);
});

$(document).on("click", "#yt-btn-prev", function() {
    
    var currentVidSrc = $("#yt-player").attr("src");
    var currentVidID = currentVidSrc.replace("https://www.youtube.com/embed/", "");
    console.log("currentVidId is " + currentVidID);
    console.log("currentVidSrc is " + currentVidSrc);

    var newVidID;

    for (i = 0; i < videoIDsObj.length; i++) {
        if (videoIDsObj[i] == currentVidID) {
            if (i == 0) {
                newVidID = videoIDsObj[videoIDsObj.length - 1];
            }
            else {
                newVidID = videoIDsObj[i - 1];
            }
            break;
        }
    }
    console.log("newVidID is " + newVidID);
    // var newVideoId = 
    $("#yt-player").attr("src", "https://www.youtube.com/embed/" + newVidID);
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
                if (response.resultsPage.results.event[i].start.date >= "2018-12-01" && response.resultsPage.results.event[i].start.date <= "2018-12-02") {
                    // Check event not ended
                    if (response.resultsPage.results.event[i].flaggedAsEnded == false) {
                        // Check event not cancelled
                        if (response.resultsPage.results.event[i].status != "cancelled") {
                            // Make sure event has a title
                            // if (response.resultsPage.results.event[i].displayName != null) {
                                // Push events into eventsAllObj array
                                eventsAllObj.push({
                                    id: "event" + response.resultsPage.results.event[i].id,
                                    num: "arraynum" + (eventsAllObj.length + 1),
                                    name: response.resultsPage.results.event[i].displayName,
                                    venue:  response.resultsPage.results.event[i].venue.displayName,
                                    venuelocation: response.resultsPage.results.event[i].location.city,
                                    artist:  response.resultsPage.results.event[i].performance[0].artist.displayName,
                                    startdate:  response.resultsPage.results.event[i].start.date,
                                    starttime:  response.resultsPage.results.event[i].start.time,
                                    url:  response.resultsPage.results.event[i].uri,
                                });
                            // }
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
                var eventName = "";
                if (eventsObj[i].name.includes(" at "))
                    eventName = eventsObj[i].name.substring(0, eventsObj[i].name.indexOf(' at '));
                else {
                    eventName = eventsObj[i].artist;
                }

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
                                <a href="#" class="btn btn-primary button-load-video" id="youtubeInputSearch" data-artist="' + eventsObj[i].artist + '" data-event="'+ eventsObj[i].id + '">Load Music Videos</a>\
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
      $(".searchBox").hide();


 
