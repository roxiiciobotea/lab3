var cnt = 0;
var movies=[];

$("#addButton").on("click", function () {
    var movieName = $("#movieName").val();
    $("#moviesList").append('<li id=movie' + cnt++ + '>' + movieName + ' <button id="deleteButton">Delete</button></li>');
    $("#movieName").val("").focus();
    movies[cnt++] = movieName;
});

$("#movieName").on("keypress", function (event) {
    if (event.which == 13) {
        var movieName = $("#movieName").val();
        $("#moviesList").append('<li>' + movieName + ' <button class="deleteButton">Delete</button></li>');
        $("#movieName").val("").focus();
        movies[cnt++] = movieName;
    }
});

$("body").on("click", ".deleteButton", function (event) {
    var toDelete = event.currentTarget.closest("li");
    toDelete.remove();
});
