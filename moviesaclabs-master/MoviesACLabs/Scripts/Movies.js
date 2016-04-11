$("#movieName").focus();

$("#addButton").on("click", function () {
    var movieName = $("#movieName").val();
    $("#moviesList").append('<li id=movie' + cnt++ + '>' + movieName + ' <button id="deleteButton">Delete</button></li>');
    $("#movieName").val("").focus();
});

$("#movieName").on("keypress", function (event) {
    if (event.which == 13) {
        var movieName = $("#movieName").val();
        $("#moviesList").append('<li>' + movieName + ' <button class="deleteButton">Delete</button></li>');
        $("#movieName").val("").focus();
    }
});

$("body").on("click", ".deleteButton", function (event) {
    var toDelete = event.currentTarget.closest("li");
    toDelete.remove();
});
