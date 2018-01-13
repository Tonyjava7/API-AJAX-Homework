var topics = ["hgtv", "mclaren", "toystory"]

function displayTopicInfo() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=MHlbCbdhO9vYNjFnsTL7c6EFtKH9ngnt";

    // my API key MHlbCbdhO9vYNjFnsTL7c6EFtKH9ngnt

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(topicImage);
                    gifDiv.append(p);
                }
            }
        });
}


function renderButtons() {
    $("#buttons-here").empty();
    for (i = 0; i < topics.length; i++) {
        var a = $("<button");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-here").append(a);
    }
}
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});
$(document).on("click", ".topic", displayTopicInfo);
renderButtons();