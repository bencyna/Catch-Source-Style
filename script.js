$(document).ready(function () {
    
    //Declaring variables queryURL, apiKey and font array - MH
var apiKey = "key=AIzaSyA1_caxY9Rg6SLCat1ahYVvOIYxlZCdlXw";
var queryURL = "https://www.googleapis.com/webfonts/v1/webfonts?" + apiKey;
var fontArray = {};

//ajax call
$.ajax({
    url: queryURL,
    data: {},
    success: function(font) {
        console.log(font);
        var dropdown = ('#dropdown-fonts');
        $(dropdown).empty();
        for (var i = 0; i < font.length; i++) {
            $(dropdown).append('<option id=' + font.item[i].family + ' value=' + font.item[i].family + '>' + font.item[i].family + '</option>');
        }
    }
    });
});