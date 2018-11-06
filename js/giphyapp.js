// Create an array of sports
var sports = [
    "football", "soccer", "basketball", "boxing", "tennis", "baseball", "gymnastics", "figure skating", "diving", "ufc", "golf", "weightlifting"
]

function renderButtons() {
    $(".buttons").empty();
    for (var i = 0; i < sports.length; i++) {
        var x = sports[i];
        var y = $("<button>").text(x).attr("class", "btn btn-success sport-button m-2");
        $(".buttons").append(y).append(" ");
    };
};
renderButtons();

function onclickListener() {
    $(".sport-button").on("click", function () {
        event.preventDefault();
        var sport = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dthecGosxfmkvwKwbZ1nJiGq7vm7KMZi&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var sportDiv = $("<div>").attr("style", "width: 240px, float:left");

                var p = $("<p>");
                p.text("Rating: " + results[i].rating);

                var sportImage = $("<img>");
                sportImage.attr("src", results[i].images.fixed_height_small.url);

                sportDiv.append(p);
                sportDiv.append(sportImage);
                $(".images").prepend(sportDiv);
            };
        });
    });
};
onclickListener();

// Create a function to generate a new sportButton based on user's entry into the search box
$(".addItem-button").on("click", function () {
    event.preventDefault();
    var newSport = $("#addItem").val().trim().toLowerCase();
    //console.log(newSport);
    sports.push(newSport);
    renderButtons();
    onclickListener();
});

