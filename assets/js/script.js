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
      for (var j = 0; j < p; j++) {
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
  function copyToClipboard(element) {
    element = $(this);
    console.log(element);
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val("font-family: '" + $(element).text() + "', sans-serif").select();
    document.execCommand("copy");
    $temp.remove();

    var div = $("<div class = 'copy-success is-fullwidth'>");
    div.text("Copied: " + "font-family: '" + $(element).text() + "', sans-serif");
    $("#historyCol").append(div);
    
    var timeLeft = 5;
    setInterval(function(){
      timeLeft--;

      if (timeLeft === 0) {
        div.hide()
      }
    }, 1000);
    
  }
  $(".hero-body").on("click", ".storedFonts", copyToClipboard);
  //Image Upload, Base64 encoding and into local storage code
  //Function to upload an image file  - WORKS - Needs tidying up alot
  $(function () {
    $("#file-input").change(async (event)=> {
        event.preventDefault();
    const file = event.currentTarget.files[0];
     var reader = new FileReader();//**MH */
   // reader.onload = function (event) {
     // var img = new Image(); // Create a new image.
      //img.src = reader.result; //loads the details of reader.result into the img.src ""
      //localStorage.theImage = reader.result; //stores the image to localStorage
      //$("#file-input").html(img);
      //console.log(img);
    //};

    if (event.currentTarget.files || event.currentTarget.files[0])
    {

     console.log(event.currentTarget.files); // This returns FileList with the (#imgUpload).value in it
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(event.currentTarget.files[0]);
     console.log(event.currentTarget.files[0]);
    }
    //Function to change the src of the <img> tag
  function imageIsLoaded(event) {
    $("#imgUp").attr("src", event.target.result);
    console.log(event.target.result)
    console.log(event);
   
    localStorage.setItem("#fileUpload", event.target.result) // Not working - is working not sure why as yet
    console.log(localStorage);
    callImageApi(event.target.result)
    
};
  function callImageApi(base64File) {
    const formData = new FormData();
    formData.append('image_base64',base64File);
    var settings = {
        "url": "https://api.imagga.com/v2/colors",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Basic YWNjXzhhNWU4NWIzOTZmNGI4Njo0NjMzNWViZTAxYTFjY2UyNjUxYzc0MDU4YTliODRhMQ=="
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formData
      };
    
      $.ajax(settings).done(function (response) {
        console.log(response);
        });
    }
});
});
  });
