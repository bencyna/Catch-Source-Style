$(document).ready(function () {
  //Declaring variables queryURL, apiKey and font array - MH
  var apiKey = "key=AIzaSyA1_caxY9Rg6SLCat1ahYVvOIYxlZCdlXw";
  var queryURL = "https://www.googleapis.com/webfonts/v1/webfonts?" + apiKey;
  var fontArray = {};
    var buttonValue = ""
  var cssURL =  "https://fonts.googleapis.com/css?family=" + buttonValue //+ apiKey;
  console.log(cssURL)


  //ajax call
  $.ajax({
    url: queryURL,
    data: {},
    success: function (font) {
      console.log(font);
      var dropdown = $("#fonts");
      // $(dropdown).empty();

      for (var i = 0; i < font.items.length; i++) {
        var text = $('<button type = "button" class = "font-items">').text(font.items[i].family);
        
        var newDIv = $('<div>')
        newDIv.append(text);
        $("#fonts").append(newDIv)
        // dropdown.append($('<div class="dropdown-item>').text(font.items[i].family))  //+ JSON.stringify(font.items[i].family)) //+ '>' + font.items    [i].family);
        // console.log(font.items[i].family);
      }
      $(".font-items").click(function(){
        buttonValue = $(this).text()
        cssFamilyDisplay()
      });
    },
  });
  function cssFamilyDisplay() {
  $.ajax({
    url: cssURL, 
    success: function (cssFamily) {
        console.log(cssFamily)
    }})
}

});
