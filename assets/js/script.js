$(document).ready(function () {
  //Declaring variables queryURL, apiKey and font array - MH
  var apiKey = "key=AIzaSyA1_caxY9Rg6SLCat1ahYVvOIYxlZCdlXw";
  var queryURL = "https://www.googleapis.com/webfonts/v1/webfonts?" + apiKey;
  var fontArray = [];
  var buttonValue = "";

  getItems();

  function renderFonts() {
    $(".historyFonts").html("");

    for (var p = 0; p < fontArray.length; p++) {
      for (var j = 0; j < i; j++) {
        if (fontArray[p] === fontArray[j] || fontArray[p] == "") {
          fontArray.splice(p, 1); // removes duplicates and empty buttons if theres an error
        }
      }
    }
    // appends the saved buttons to the third column in a list
    for (var i = 0; i < fontArray.length; i++){
     var font = fontArray[i];

    var li = $('<li class = "listStoredFonts">');
    var button = $('<button type = "button" class = "fonts">').text(font);
    button.attr("data-attribute", i);
    li.append(button);
    $(".historyFonts").prepend(li);
  }
}

  function getItems() {
    var storedFonts = JSON.parse(localStorage.getItem("fontArray"));
    if (storedFonts !== null) {
      fontArray = storedFonts;
    }
    renderFonts();
  }

  function storeFonts() {
    localStorage.setItem("fontArray", JSON.stringify(fontArray));
  }
// pushes current font to the fontArray to be stored in localstorage
  function addFontsArray() {
    var fontName = buttonValue;
    fontArray.push(fontName);
    console.log(fontArray);

    storeFonts();
    renderFonts();
  }

  // added css here to avoid conflict potentially when pushing
  $(".dropdown-menu").css({ "max-height": "450px", overflow: "scroll" });
  //ajax call
  $.ajax({
    url: queryURL,
    data: {},
    success: function (font) {
      var dropdown = $("#fonts");
      $(dropdown).empty();

      for (var i = 0; i < font.items.length; i++) {
        var text = $('<button type = "button" class = "font-items">').text(
          font.items[i].family
        );

        var newDIv = $("<div>");
        newDIv.append(text);
        $("#fonts").append(newDIv);
        // make the buttons appear their font: need some css styling here
        $("font-items").css("font-family", $(this).text());
      }
      $(".font-items").click(function () {
        buttonValue = $(this).text();
        cssFamilyDisplay();
      });
    },
  });
  // will need to style in css potentially
  // this function adds display sentence of font and calls addFontArray()
  function cssFamilyDisplay() {
    $(".textExamples").empty();

    var newHOne = $('<h1 class = "exampleHeader">').text(
      "Here is what the font " + buttonValue + " looks like as a h1 element"
    );
    var newP = $("<p class = 'exampleParagraph'>").text(
      "As a 'p' tag, " + buttonValue + " displays as this"
    );
    var button = $("<button type = 'button' class = 'storeStyles'>").text(
      "Like this style? Click me to save it!"
    );

    $(".textExamples").css("font-family", buttonValue);
    $(".textExamples").append(newHOne);
    $(".textExamples").append(newP);
    $(".textExamples").append(button);

    $(".storeStyles").click(function () {
      addFontsArray();
    });
  }
});
