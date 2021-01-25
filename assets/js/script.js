$(document).ready(function () {
  //Declaring variables queryURL, apiKey and font array - MH
  var apiKey = "key=AIzaSyA1_caxY9Rg6SLCat1ahYVvOIYxlZCdlXw";
  var queryURL = "https://www.googleapis.com/webfonts/v1/webfonts?" + apiKey;
  var fontArray = [];
  var buttonValue = "";

  getItems();

  function renderStoredFonts() {
    $(".historyFonts").html("");

    for (var p = 0; p < fontArray.length; p++) {
      for (var j = 0; j < i; j++) {
        if (fontArray[p] === fontArray[j] || fontArray[p] == "") {
          fontArray.splice(p, 1); // removes duplicates and empty buttons if theres an error
        }
      }
    }
    // appends the saved buttons to the third column in a list
    for (var i = 0; i < fontArray.length; i++) {
      var font = fontArray[i];

      var li = $('<li class = "listStoredFonts">');
      var button = $(
        '<button type = "button" class = "storedFonts" id = "font' +
          i +
          '" style = "font-family: ' +
          font +
          '">'
      ).text(font);
      button.attr("data-attribute", i);
      li.append(button);
      console.log(font);
      $(".historyFonts").prepend(li);
    }
  }

  function getItems() {
    var storedFonts = JSON.parse(localStorage.getItem("fontArray"));
    if (storedFonts !== null) {
      fontArray = storedFonts;
    }
    renderStoredFonts();
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
    renderStoredFonts();
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
    $(".textDisplay").empty();

    var sampleTextVal = $("#userInput").val();
    console.log(sampleTextVal);

    var newHOne = $('<h1 class = "exampleHeader">').text(sampleTextVal);
    var newP = $("<p class = 'exampleParagraph'>").text(sampleTextVal);
    var button = $(
      "<button class='button is-info is-light is-fullwidth storeStyles' id='storeStyles'>"
    ).text("Like this style? Click me to save it!");

    $(".textDisplay").css("font-family", buttonValue);
    console.log(buttonValue);
    $(".textDisplay").append(newHOne);
    $(".textDisplay").append(newP);
    $(".textDisplay").append(button);

    $(".storeStyles").click(function () {
      addFontsArray();
    });
  }

  $(".dropdown").click(function () {
    $(".dropdown").toggleClass("is-inactive");
    $(".dropdown").toggleClass("is-active");
  });
  $("#clearBtn").click(function (event) {
    var element = event.target;
    var index = element.parentElement.getAttribute("data-attribute");
    fontArray.splice(index, fontArray.length);
    storeFonts();
    renderStoredFonts();
  });
  $(".storedFonts").click(function (element) {
    element = $(this).text();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();

    var fontFamCopy = "font-family: " + $(this).text() + ", sans-serif;";
    console.log(fontFamCopy);
  });
  //Image Upload, Base64 encoding and into local storage code
  //Function to upload an image file  - WORKS - Needs tidying up alot
  $(function () {
    $(":file").change(function () {
      var fileInput = $(this)[0]; //returns a HTML DOM object by putting the [0] since it's really an associative array.
      console.log(fileInput);
      var file = fileInput.files[0]; //there is only '1' file since they are not multiple type.
      console.log(file);

      var reader = new FileReader();
      reader.onload = function (event) {
        var img = new Image(); // Create a new image.
        img.src = reader.result; //loads the details of reader.result into the img.src ""
        localStorage.theImage = reader.result; //stores the image to localStorage
        $("#fileUpload").html(img);
        console.log(img);
      };

      if (this.files || this.files[0]) console.log(this.files); // This returns FileList with the (#imgUpload).value in it
      {
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
        reader.result;
        console.log(reader.result); //Returns as null
        console.log(this.files[0]);
      }
    });
  });

  //Function to change the src of the <img> tag
  function imageIsLoaded(event) {
    $("#imgUp").attr("src", event.target.result);
    console.log("#imgUpload");
    localStorage.setItem("#fileUpload", event.target.result); // Not working - is working not sure why as yet
    console.log(localStorage);
  }
  localStorage.getItem("img");
});
