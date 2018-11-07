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

                var sportDiv = $("<div>").addClass("imageBlock");

                var p = $("<p>");
                p.text("Rating: " + results[i].rating);

                var sportImage = $("<img>");
                sportImage.attr("src", results[i].images.fixed_height_small_still.url).attr("data-still", results[i].images.fixed_height_small_still.url).attr("data-animate", results[i].images.fixed_height_small.url).attr("data-state", "still").addClass("gif");

                sportDiv.append(sportImage);
                sportDiv.append(p);
                $(".main-content").append(sportDiv);
            };
        });
    });
};

// Create a function to play and pause GIFs
function onclickListenerGIF() {
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
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

// Create a function to generate a new sportButton based on user's entry into the search box
function addButton() {
    $(".addItemButton").on("click", function () {
        event.preventDefault();
        var newSport = $("#addItem").val().trim().toLowerCase();
        $("#addItem").val("");
        if (newSport !== "") {
            //console.log(newSport);
            sports.push(newSport);
            renderButtons();
            onclickListenerButton();
        }
    });
};

$(document).ready(function () {
    renderButtons();
    onclickListenerButton();
    onclickListenerGIF();
    addButton();
});