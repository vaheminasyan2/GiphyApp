// Create an array of sports
var sports = [
    "football", "soccer", "basketball", "boxing", "tennis", "baseball", "gymnastics", "figure skating", "diving", "ufc", "golf", "weightlifting"
]

// Creat function to render buttons from array of sports
function renderButtons() {
    $(".buttons").empty();
    for (var i = 0; i < sports.length; i++) {
        var x = sports[i];
        var y = $("<button>").text(x).attr("class", "btn btn-success sport-button m-2");
        $(".buttons").append(y).append(" ");
    };
};
renderButtons();

// Create a function to publish GIF images to the mage using API call
function onclickListenerButton() {
    $(".sport-button").on("click", function () {
        $(".main-content").empty();
        var sport = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dthecGosxfmkvwKwbZ1nJiGq7vm7KMZi&limit=10";
        //console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var sportDiv = $("<div>");

                var p = $("<p>");
                p.text("Rating: " + results[i].rating);

                var sportImage = $("<img>");
                sportImage.attr("src", results[i].images.fixed_height_small_still.url).attr("data-still", results[i].images.fixed_height_small_still.url).attr("data-animate", results[i].images.fixed_height_small.url).attr("data-state", "still").addClass("gif");

                sportDiv.append(p).addClass("imageBlock");
                sportDiv.append(sportImage);
                $(".main-content").append(sportDiv);
            };
        });
    });
};
onclickListenerButton();

// Create a function to play and pause GIFs

function onclickListenerGIF() {
$(".gif").on("click", function () {

    //alert("test");
    //console.log("1")
    
    //var state = $(this).attr("data-state");
    //console.log(state);

    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
        
});
};
onclickListenerGIF();


// Create a function to generate a new sportButton based on user's entry into the search box
$(".addItem-button").on("click", function () {
    event.preventDefault();
    var newSport = $("#addItem").val().trim().toLowerCase();
    if (newSport !== "") {
    //console.log(newSport);
    sports.push(newSport);
    renderButtons();
    onclickListenerButton();
    onclickListenerGIF();
    }
});


//$(document).ready(function() {});


