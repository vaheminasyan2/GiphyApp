// Create an array of sports
var sports = [
    "football", "soccer", "basketball", "boxing", "tennis", "baseball", "gymnastics", "figure skating", "diving", "ufc", "golf", "weightlifting"
]

// Create function to render buttons from array of sports
function renderButtons() {
    $(".buttons").empty();
    for (var i = 0; i < sports.length; i++) {
        var x = sports[i];
        var y = $("<button>").text(x).attr("class", "btn btn-success sport-button m-2");
        $(".buttons").append(y).append(" ");
    };
};

// Create a function to publish GIF images to the page using API call
function onclickListenerButton() {

    $(".sport-button").on("click", function () {
        var num = 10;
        $(".main-content").empty();
        var sport = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dthecGosxfmkvwKwbZ1nJiGq7vm7KMZi&limit=" + num;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var sportDiv = $("<div>").addClass("imageBlock");

                var ratingText = $("<p>");
                ratingText.text("Rating: " + results[i].rating);

                var downloadButton = $("<a>").attr("href", results[i].images.original.url).attr("download", "gif" + i).text("Download").attr("target", "_blank");

                var favoriteButton = $("<a>").attr("href", "#").text("Add to Favorites").attr("id", "favorites").attr("data-still", results[i].images.fixed_width_still.url).attr("data-animate", results[i].images.fixed_width.url).attr("data-state", "still").addClass("gif").attr("rating", results[i].rating);

                // addClass("btn btn-light")
                var sportImage = $("<img>");
                sportImage.attr("src", results[i].images.fixed_width_still.url).attr("data-still", results[i].images.fixed_width_still.url).attr("data-animate", results[i].images.fixed_width.url).attr("data-state", "still").addClass("gif");

                sportDiv.append(sportImage);
                sportDiv.append(ratingText);
                sportDiv.append(downloadButton).append(" | ");
                sportDiv.append(favoriteButton);
                $(".main-content").append(sportDiv);
            };
        });

        $(".moreGifs").on("click", function () {
            num = num + 10;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dthecGosxfmkvwKwbZ1nJiGq7vm7KMZi&limit=" + num;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var results = response.data;
                for (var i = num - 10; i < results.length; i++) {

                    var sportDiv = $("<div>").addClass("imageBlock");

                    var ratingText = $("<p>");
                    ratingText.text("Rating: " + results[i].rating);

                    var downloadButton = $("<a>").attr("href", results[i].images.original.url).attr("download", "gif" + i).text("Download").attr("target", "_blank");

                    var favoriteButton = $("<a>").attr("href", "#").text("Add to Favorites").attr("id", "favorites").attr("data-still", results[i].images.fixed_width_still.url).attr("data-animate", results[i].images.fixed_width.url).attr("data-state", "still").addClass("gif").attr("rating", results[i].rating);

                    var sportImage = $("<img>");
                    sportImage.attr("src", results[i].images.fixed_width_still.url).attr("data-still", results[i].images.fixed_width_still.url).attr("data-animate", results[i].images.fixed_width.url).attr("data-state", "still").addClass("gif");

                    sportDiv.append(sportImage);
                    sportDiv.append(ratingText);
                    sportDiv.append(downloadButton).append(" | ");
                    sportDiv.append(favoriteButton);
                    $(".main-content").append(sportDiv);
                };
            })
        })
    });
};

// Create function to add favorites 
function renderFavorites(list) {
    $(".favoritesBox").empty();
    for (var i = 0; i < list.length; i++) {
        var sportDiv = $("<div>");
        var ratingText = $("<p>").text("Rating: " + list[i].ratingText);
        var sportImage = $("<img>").attr("src", list[i].src).attr("data-still", list[i].dataStill).attr("data-animate", list[i].dataAnimate).attr("data-state", list[i].dataState).addClass("gif");
        sportDiv.append(sportImage);
        sportDiv.append(ratingText);
        $(".favoritesBox").append(sportDiv);
    }
}

function favorites() {
    $(document).on("click", "#favorites", function () {
        event.preventDefault();
        var ratingText = $(this).attr("rating");
        var src = $(this).attr("data-still");
        var dataStill = $(this).attr("data-still");
        var dataAnimate = $(this).attr("data-animate")
        var dataState = $(this).attr("data-state")


        list.push({ ratingText: ratingText, src: src, dataStill: dataStill, dataAnimate: dataAnimate, dataState: dataState });

        renderFavorites(list);

        sessionStorage.setItem("favoritesSS", JSON.stringify(list));
    })
};

// Initialize list array, make it empyt if sessionStorage is empty 
var list = JSON.parse(sessionStorage.getItem("favoritesSS"));
if (!Array.isArray(list)) {
    list = [];
    console.log("sessionStorage is empty");
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

// Request to upload more Gifs to the page
$(document).ready(function () {
    renderButtons();
    onclickListenerButton();
    favorites();
    renderFavorites(list);
    onclickListenerGIF();
    addButton();
});