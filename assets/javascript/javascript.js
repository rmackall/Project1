var apiKey = "api_id=f7f77cc0c81af633e6bcb2dc17dcd1bc";

function renderGIF() {
  
    var queryURL = "http://api.bandsintown.com/artists/Lucy%20Seven/events.json?" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(response) {

            console.log(response);

            
        });
    

}