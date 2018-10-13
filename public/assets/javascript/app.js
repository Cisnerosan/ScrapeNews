
$(".button-collapse").dropdown();

var currentURL = window.location.origin;

$(document).on("click", ".notes", function() {
    // empties the notes from the note section
    $("#notes").empty();
    // saves the article id
    var thisId = $(this).attr("data-id");

    // makes an ajax call for the article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    // adds the note information to the page
    .done(function(data) {
        $("#notes").append("<h5 class='notesArticle'>" + data.title + "</h5>");
        $("#notes").append("<input id='titleInput' name='title' placeholder='enter a note title'>");
        $("#notes").append("<textarea id='bodyInput' name='noteBody' placeholder='enter your notes'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='saveNote'> Save </button>");
        if (data.notes) {
            $("#titleInput").val(data.notes.title);
            $("#bodyInput").val(data.notes.body);
        }
    });
});

$(document).on("click", "#saveNote", function() {
    // grabs the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // runs a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // captures  from title input
            title: $("#titleInput").val(),
            // takes values from note textarea
            body: $("#bodyInput").val()
        }
    })
    .done(function(data) {
        // logs the response
        console.log(data);
        // empties the notes section
        $("#notes").empty();
    });
});

// sends a post request with the article id to change the status to hidden
$(document).on("click", ".hideArticle", function() {
    var articleId = $(this).attr("data-id");
    var articleToHide = $(this).parent().parent().parent();
    $.post({
        url: currentURL + "/hide",
        data: { 
            articleId: articleId
        }
    })
    .done(function(data) {
        console.log(data);
        articleToHide.remove();
    })
    .fail(function(error) { 
        console.log(error);
    })
});

// sends a post request with the article id to remove the hidden status
$(document).on("click", ".unhideArticle", function() {
    var articleId = $(this).attr("data-id");
    var articleToUnhide = $(this).parent().parent().parent();
    $.post({
        url: currentURL + "/unhide",
        data: { 
            articleId: articleId
        }
    })
    .done(function(data) {
        console.log(data);
        articleToUnhide.remove();
    })
    .fail(function(error) { 
        console.log(error);
    })
});

// sends a post request with the article id to change the status to saved
$(document).on("click", ".saveArticle", function() {
    var articleId = $(this).attr("data-id");
    var articleToSave = $(this).parent().parent().parent();
    $.post({
        url: currentURL + "/save",
        data: { 
            articleId: articleId
        }
    })
    .done(function(data) {
        console.log(data);
        articleToSave.remove();
    })
    .fail(function(error) { 
        console.log(error);
    })
});

// sends a post request with the article id to remove the saved status
$(document).on("click", ".unsaveArticle", function() {
    var articleId = $(this).attr("data-id");
    var articleToUnsave = $(this).parent().parent().parent();
    $.post({
        url: currentURL + "/unsave",
        data: { 
            articleId: articleId
        }
    })
    .done(function(data) {
        console.log(data);
        articleToUnsave.remove();
    })
    .fail(function(error) { 
        console.log(error);
    })
});

