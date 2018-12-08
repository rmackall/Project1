// Initial page - date/location
// 
// Once date/location entered, remove that field and have just youtube video with event details below it
// 
// 
// 
// 
// 

$(".searchBox").hide();

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
        
    }

    console.log(videoIDsObj);

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

// // Input form - date picker from
// function populatedropdownfrom(dayfield, monthfield, yearfield) {
//     var today=new Date()
//     var dayfield=document.getElementById(dayfield)
//     var monthfield=document.getElementById(monthfield)
//     var yearfield=document.getElementById(yearfield)
//     for (var i=0; i<31; i++) {
//         dayfield.options[i]=new Option(i, i+1)
//         dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true) //select today's day
//     }
//     for (var m=0; m<12; m++) {
//         monthfield.options[m]=new Option(monthtext[m], monthtext[m])
//         monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true) //select today's month
//     }
//     var thisyear=today.getFullYear()
//     for (var y=0; y<20; y++){
//         yearfield.options[y]=new Option(thisyear, thisyear)
//         thisyear+=1
//     }
//     yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true) //select today's year
// }

// // Input form - date picker to [examined to know what it does now!]
// function populatedropdownto(dayfield, monthfield, yearfield) {
//     var today=new Date(); // get today's date
//     var dayfield=document.getElementById(dayfield) // put html id into a variable
//     var monthfield=document.getElementById(monthfield) // put html id into a variable
//     var yearfield=document.getElementById(yearfield) // put html id into a variable
//     for (var i=0; i<31; i++) {
//         dayfield.options[i]=new Option(i, i+1)
//         dayfield.options[today.getDate()]=new Option(today.getDate() + 1, today.getDate() + 1, true, true) //select today's day
//         // if (i<9) {
//         //     $("#dayfield").attr("data-day", "0" + i);
//         // }
//         // else {
//         //     $("#dayfield").attr("data-day", i);
//         // }
//     }
//     for (var m=0; m<12; m++) {
//         monthfield.options[m]=new Option(monthtext[m], monthtext[m])
//         monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true) //select today's month
//         // $("#monthfield").attr("data-month", m + 1);
//     }
//     var thisyear=today.getFullYear()
//     for (var y=0; y<20; y++){
//         yearfield.options[y]=new Option(thisyear, thisyear)
//         thisyear+=1
//     }
//     yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true) //select today's year
//     console.log("to date is " + today);
// }


var songKickMinDate
var songKickMaxDate

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
var artistsLiked = [];
var artistsDisliked = [];

                //// **** LISTENERS **** ////

// On load, populate date field and run initial songkick
window.onload=function(){
    // populatedropdownfrom("daydropdownfrom", "monthdropdownfrom", "yeardropdownfrom")
    // populatedropdownto("daydropdownto", "monthdropdownto", "yeardropdownto")
    $(".datepicker").datepicker({
        format: "YYYY-MM-DD",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    }).datepicker("setDate", new Date());    

    // Get table ready
    // $('#myTable').DataTable();

    // Run initial API query
    apiSongKickRun();
}


// Button to run SongKick API, using input City & Date
$(document).on("click", "#form-run-songkick", function() {
    $("#myTableBody").empty();
    if (songKickMinDate != null && songKickMaxDate != null) {
        apiSongKickRun();
    }
    else {
        alert("Enter the dates to search");
    }
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
    console.log("headline artist is " + $("#bandInput").val());
    $("#bandButton").click();
    topFunction(); 
    $("#yt-btn-next").show();
    $("#yt-btn-openinyt").show();
    $("#yt-btn-like").show();
    $("#yt-btn-dislike").show();


    for (var i = 0; i < eventsAllObj.length; i++) {
        if (eventsAllObj[i].artist == headlineArtist) {
            var time;
            if (eventsAllObj[i].starttime == null) {
                time = "18:00"
            }
            $("#sidebar-search-initial").html("<section class='results-text'>Artist: " + eventsAllObj[i].artist + "\
                <br>Venue: " + eventsAllObj[i].venue + "\
                <br>Start Date: " + eventsAllObj[i].startdate + "\
                <br>Start Time: " + time + "\
                <br><a href='" + eventsAllObj[i].url + "' target='_blank'>Songkick Event Page</a>\
                <br><br></section>")
        }
    }    
});

$(document).on("click", "#yt-btn-like", function(event) {
    event.preventDefault();
    // Push artist to artistsLiked array
    for (i = 0; i < eventsAllObj.length; i++) {
        if (headlineArtist == eventsAllObj[i].artist) {
            console.log("this is " + eventsAllObj[i].artist + " and array number " + i);
            artistsLiked.push(headlineArtist);
            buildEventTable();
        }
    }
    $("#yt-btn-share").show();    
});

$(document).on("click", "#yt-btn-dislike", function(event) {
    event.preventDefault();
    // console.log($("#yt-player").attr("data-artist"));
    for (i = 0; i < eventsAllObj.length; i++) {
        if (headlineArtist == eventsAllObj[i].artist) {
            console.log("this is " + eventsAllObj[i].artist + " and array number " + i);
            eventsAllObj.splice(i, 1);
            artistsDisliked.push(headlineArtist);
        }
    }       
    $("#vidph").html('<img class="img-fluid rounded" id="vidph-pic" src="assets/images/vidph1.jpg" alt=""></img>');
    var randImg = imagesObj[Math.floor(Math.random() * imagesObj.length)];
    $("#vidph-pic").attr("src", randImg);
    $("#sidebar-search-initial").html("Load more videos or send your favourited events to a friend.");
    $("#yt-btn-next").hide();
    $("#yt-btn-openinyt").hide();
    $("#yt-btn-like").hide();
    $("#yt-btn-dislike").hide();
    buildEventTable();
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


$(document).on("click", "#yt-btn-openinyt", function() {
    var currentVidSrc = $("#yt-player").attr("src");
    var videoLink = currentVidSrc.replace("https://www.youtube.com/embed/", "https://www.youtube.com/watch?v=");
    // $("#yt-player").attr("src", "https://www.youtube.com/watch?v=" + currentVidID);
    // console.log($("#yt-player").attr("src"));
    // var videoLink = "https://www.youtube.com/embed/" + currentVidID;
    // https://www.youtube.com/watch?v=
    // console.log(videoLink)
    window.open(videoLink,'BranchOut','height:563;width:342;');
});


$(document).on("click", "#yt-btn-share", function() {

    var currentVidSrc = $("#yt-player").attr("src");

    var mailBody = "";
    for (var i = 0; i < eventsAllObj.length; i++) {
        for (j = 0; j < artistsLiked.length; j++) {
            if (eventsAllObj[i].artist == artistsLiked[j]) {
                mailBody = mailBody + "%0A%20%20" + eventsAllObj[i].artist
                    + "%20at%20" + eventsAllObj[i].venue + "%20on%20" + eventsAllObj[i].startdate
                    // + "%0A" + eventsAllObj[i].url + " ";
                    + "%0A";
            }
        }
    }

    // mailBody.replace(/ /g,"%20");

    console.log(mailBody);

    location.href = "mailto:?subject=BranchOut%20-%20Your%20friend%20recommended%20these%20concerts%20in%20" + locationCity + "\
        &body=I'm%20interested%20in%20these%20upcoming%20concerts%20in%20" + locationCity + "%20-%20let%20me%20know%20if%20you're%20interested%20too!%0A%0A\
        " + mailBody + "\
        %0A%0AI%20found%20these%20concerts%20using%20BranchOut%20https://dgellisco.github.io/08-BranchOut/";

    // var newWindow=window.open();
    // newWindow.document.open().write(
    //     '<!DOCTYPE html></body>\
    //         <html lang="en">\
    //         <head>\
    //         <meta charset="UTF-8">\
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">\
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">\
    //         <title>BranchOut</title>\
    //         <meta charset="utf-8">\
    //         \
    //         <!-- Bootstrap core CSS -->\
    //         <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">\
    //         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"\
    //             crossorigin="anonymous">\
    //         \
    //         <!-- jQuery CSS -->\
    //         <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">\
    //         </head>\
    //         \
    //         <body>\
    //         <h3>Concerts I am interested in, in ' + locationCity + '</h3>\
    //         <div id="content"></div>\
    //         <br>\
    //         </body>\
    //         </html>\
    //     ');

    // $(newWindow.document.body).ready(function() {
    //     for (var i = 0; i < eventsAllObj.length; i++) {
    //         for (j = 0; j < artistsLiked.length; j++) {
    //             if (eventsAllObj[i].artist == artistsLiked[j]) {
    //                 $(newWindow.document.body).append("\
    //                     <section id='artist" + i + "'>\
    //                         <h5>" + eventsAllObj[i].name + "</h5>\
    //                         <p>" + eventsAllObj[i].venue + " at " + eventsAllObj[i].startTime + "<p>\
    //                         <iframe src='" + currentVidSrc + "' frameborder='0' allowfullscreen='' id='yt-player' height='563' width='342'></iframe>\
    //                         <a href='" + eventsAllObj[i].url + "'>SongKick Event Page</a>\
    //                         <br>\
    //                     </section>\
    //                 ");
    //                 console.log(eventsAllObj[i].artist + " is the same as liked " + artistsLiked[j]);
    //             }
    //         }
    //     }
    //     $(newWindow.document.body).append("\
    //         <h3>Let me know if you are interested in any of these!</h3>\
    //         <br>\
    //     ");
    // });

});


                //// **** FUNCTIONS **** ////

    //// ~~~ SONGKICK ~~~ ////

// API FUNCTION - pull events based on location and date
function apiSongKickRun() {

    // Grab dates from fields
    songKickMinDate = $("#datepickermin").val();
    songKickMaxDate = $("#datepickermax").val();  

    // Convert dates to SongKick format YYYY-MM-DD
    var songKickMinDateMonth = songKickMinDate.slice(0, 2);
    console.log("month is " + songKickMinDateMonth);
    var songKickMinDateDay = songKickMinDate.slice(3, 5);
    console.log("day is " + songKickMinDateDay);
    var songKickMinDateYear = songKickMinDate.slice(6, 10);
    console.log("year is " + songKickMinDateYear);
    songKickMinDate = songKickMinDateYear + "-" + songKickMinDateMonth + "-" + songKickMinDateDay;

    var songKickMaxDateMonth = songKickMaxDate.slice(0, 2);
    console.log("month is " + songKickMaxDateMonth);
    var songKickMaxDateDay = songKickMaxDate.slice(3, 5);
    console.log("day is " + songKickMaxDateDay);
    var songKickMaxDateYear = songKickMaxDate.slice(6, 10);
    console.log("year is " + songKickMaxDateYear);
    songKickMaxDate = songKickMaxDateYear + "-" + songKickMaxDateMonth + "-" + songKickMaxDateDay;

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
        var queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + locationID + "/calendar.json?apikey=" + apiSongKickKey + "&min_date=" + songKickMinDate + "&max_date=" + songKickMaxDate;
        

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
                // // Check within date range
                // if (response.resultsPage.results.event[i].start.date >= "2019-01-01" && response.resultsPage.results.event[i].start.date <= "2019-01-31") {
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
                // }    
            }

            console.log(eventsAllObj);
            console.log(eventsAllObj.length);

            buildEventTable();

        });

    });

}


function buildEventTable() {
    // Pull x number of events from local array of events (i.e. eventsAllObj array).
    // Deletes them from the array so they aren't shown again.
    // !!!!! IF THE SAME SEARCH IS RUN, PERHAPS CONTINUE TO READ AND REMOVE FROM REMAINING ARRAY.  THIS WILL AVOID DUPLICATES.
    $("#myTableBody").html("");

    for (var i = 0; i < eventsAllObj.length; i++) {
        console.log("i is " + i);
        // var x = Math.floor(Math.random()*eventsAllObj.length);
        // eventsObj.push(eventsAllObj[x]);
        // eventsAllObj.splice(x, 1);

        // Cut out extraneous text from event name (i.e. 'Beck at The Paramount (November 27)' becomes 'Beck')
        var eventName = "";
        if (eventsAllObj[i].name.includes(" at "))
            eventName = eventsAllObj[i].name.substring(0, eventsAllObj[i].name.indexOf(' at '));
        else {
            eventName = eventsAllObj[i].artist;
        }
        eventName = eventName.replace(eventsAllObj[i].artist, "");
        if (eventName.startsWith(" and ")){
            eventName = eventName.replace(" and ", "");
        }
        if (eventName.startsWith(" with ")){
            eventName = eventName.replace(" with ", "");
        }
        if (eventName.startsWith(", ")){
            eventName = eventName.replace(", ", "");
        }

        var startTime = "";
        if (eventsAllObj[i].starttime == null) {
            startTime = "18:00";
        }
        else {
            startTime = eventsAllObj[i].starttime;
            startTime = startTime.slice(0, -3);
        }

        $("#myTableBody").append('\
            <tr id="eventsAllObj' + i + '">\
                <td>' + eventsAllObj[i].artist + '</td>\
                <td>' + eventsAllObj[i].venue + '</td>\
                <td>' + eventsAllObj[i].startdate + '</td>\
                <td>' + startTime + '</td>\
                <td><a href="#" class="button-load-video" id="loadVidBtn' + i + '" data-artist="' + eventsAllObj[i].artist + '" data-event="'+ eventsAllObj[i].id + '">Load Videos</a></td>\
                <td><a href="' + eventsAllObj[i].url + '" target="_blank" class="button-songkick-link" id="eventPageBtn' + i + '" data-artist="' + eventsAllObj[i].artist + '" data-event="'+ eventsAllObj[i].id + '">Event Page</a></td>\
            </tr>\
        ');

        // $("#myTableBody").append('\
        //     <tr id="eventsAllObj' + i + '">\
        //         <td>' + eventsAllObj[i].artist + '</td>\
        //         <td>' + eventsAllObj[i].venue + '</td>\
        //         <td>' + eventsAllObj[i].startdate + '</td>\
        //         <td><a href="#" class="button-load-video" id="youtubeInputSearch" data-artist="' + eventsAllObj[i].artist + '" data-event="'+ eventsAllObj[i].id + '">Load Video</a></td>\
        //         <td><div class="tooltip" id="moreInfo' + i + '" title="Start Time: ' + startTime + '<br>Test">More Info</div></td>\
        //     </tr>\
        // ');

        // // $("#moreInfo" + i).append('<div class="tooltip" title="Start Time: ' + startTime + '">More Info2</div>');

        // $('.tooltip').tooltip({html: true});


        for (j = 0; j < artistsLiked.length; j++) {
            if (eventsAllObj[i].artist == artistsLiked[j]) {
                $("#eventsAllObj" + i).css({
                    color: "#fff",
                    // "background-color": "#007bff"
                    "background-color": "black"
                    });
                // $("#eventsAllObj" + i).css("background-color", "#007bff");
                $("#loadVidBtn" + i).addClass("link-liked");
                $("#eventPageBtn" + i).addClass("link-liked");
                console.log(eventsAllObj[i].artist + " is the same as liked " + artistsLiked[j]);
            }
        }
    }

    // $('#myTable').DataTable();

    $('[data-toggle="tooltip"]').tooltip();

    // Prints all remaining events in eventsAllObj array
    // console.log(eventsAllObj);
    // Prints all events we've pushed to html
    // console.log(eventsObj);
}