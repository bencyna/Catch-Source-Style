$(document).ready(function () {
  //Declaring variables queryURL, apiKey and font array - MH
  var apiKey = "key=AIzaSyA1_caxY9Rg6SLCat1ahYVvOIYxlZCdlXw";
  var queryURL = "https://www.googleapis.com/webfonts/v1/webfonts?" + apiKey;
  var fontArray = [];
  var buttonValue = "";
  var colourArray = [];

  getItems();

  // call font API
  $.ajax({
    url: queryURL,
    data: {},
    success: function (font) {
      // removes previous text if input is already there
      var dropdown = $("#fonts");
      $(dropdown).empty();

      // creates a button with the name of each font found from API
      for (var i = 0; i < font.items.length; i++) {
        var text = $(
          '<button type = "button" class = "font-items is-info" id = "btnId">'
        ).text(font.items[i].family);

        // Displays each font in dropdown bar as clickabke buttons
        var newDIv = $("<div>");
        newDIv.append(text);
        $("#fonts").append(newDIv);
      }
      // When a font from the dropdown is clicked, the value of buttonValue becomes the font name
      // Calls cssFamilyDisplay which styles font for display
      $(".font-items").click(function () {
        buttonValue = $(this).text();
        cssFamilyDisplay();
      });
    },
  });
  //Image Upload, Base64 encoding and into local storage code
  //Function to upload an image file  - WORKS - Needs tidying up alot
  $(function () {
    $("#file-input").change(async (event) => {
      event.preventDefault();
      const file = event.currentTarget.files[0];
      var reader = new FileReader(); //**MH */
      // reader.onload = function (event) {
      // var img = new Image(); // Create a new image.
      //img.src = reader.result; //loads the details of reader.result into the img.src ""
      //localStorage.theImage = reader.result; //stores the image to localStorage
      //$("#file-input").html(img);
      //console.log(img);
      //};

      if (event.currentTarget.files || event.currentTarget.files[0]) {
        console.log(event.currentTarget.files); // This returns FileList with the (#imgUpload).value in it
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(event.currentTarget.files[0]);
        console.log(event.currentTarget.files[0]);
      }
      //Function to change the src of the <img> tag
      function imageIsLoaded(event) {
        $("#imgUp").attr("src", event.target.result);
        // console.log(event.target.result);
        // console.log(event);

        localStorage.setItem("#fileUpload", event.target.result); // Not working - is working not sure why as yet
        console.log(localStorage);
        callImageApi(event.target.result);
      }
    });
    // Calls Image API from photo chosen by user
    function callImageApi(base64File) {
      const formData = new FormData();
      formData.append("image_base64", base64File);
      var settings = {
        url: "https://api.imagga.com/v2/colors",
        method: "POST",
        timeout: 0,
        headers: {
          Authorization:
            "Basic YWNjXzhhNWU4NWIzOTZmNGI4Njo0NjMzNWViZTAxYTFjY2UyNjUxYzc0MDU4YTliODRhMQ==",
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
      };
      $.ajax(settings).done(function (response) {
        // Remove previous activity for colour display
        $(".colourDisplay").empty();
        // Chnage response to JSON format
        var imageColors = JSON.parse(response).result.colors.image_colors;
        localStorage.setItem("imageColors", JSON.stringify(imageColors));

        // Create a button for each colour found from colour API
        for (var l = 0; l < imageColors.length; l++) {
          var cssColourCode = imageColors[l].closest_palette_color_html_code;
          colourButtons = $(
            '<button class = "column gotColours" style = "background-color: ' +
              cssColourCode +
              '">'
          );
          // Displays as columns of colour
          colourButtons.text(cssColourCode);
          $(".colourDisplay").append(colourButtons);
        }
      });
    }
  });

  // This function adds display sentence of font and calls addFontArray()
  function cssFamilyDisplay() {
    $(".textDisplay").empty();

    // Allows user to choose the example text
    var sampleTextVal = $("#paragraphInput").val();
    var sampleTextHead = $("#headerInput").val();

    var newHOne = $('<h1 class = "exampleHeader">').text(sampleTextHead);
    var newP = $("<p class = 'exampleParagraph'>").text(sampleTextVal);
    var button = $(
      "<button class='button is-info is-light is-fullwidth storeStyles' id='storeStyles'>"
    ).text("Like this font? Click me to save it!");

    $(".textDisplay").css("font-family", buttonValue);
    console.log(buttonValue);
    $(".textDisplay").append(newHOne);
    $(".textDisplay").append(newP);
    $(".textDisplay").append(button);
    $("#selectedFont").text(buttonValue);

    // When the storeStyles button is clicked, the addFontsArray function is called
    $(".storeStyles").click(function () {
      addFontsArray();
    });
  }

  // Render stored fonts to the side of screen
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
  // Renders stored colours to the side of the screen
  function renderStoredColours() {
    $(".historyColours").html("");

    for (var q = 0; q < colourArray.length; q++) {
      for (var t = 0; t < q; t++) {
        if (colourArray[q] === colourArray[t] || colourArray[q] == "") {
          colourArray.splice(q, 1); // removes duplicates and empty buttons if theres an error
        }
      }
    }
    // For each item in storedColours array, a list item is appended with the value of the style
    for (var i = 0; i < colourArray.length; i++) {
      var colour = colourArray[i];

      var li = $('<li class = "listStoredColours">');
      var button = $(
        '<button type = "button" class = "storedColours" id = "colour' +
          i +
          '" style = "background-color: ' +
          colour +
          '">'
      ).text(colour);
      button.attr("data-attribute", i);
      li.append(button);
      $(".historyColours").prepend(li);
    }
  }
  // Get Items from localStorage and calls rendering of stored styles
  // Is called as soon as the file is opened
  function getItems() {
    var storedFonts = JSON.parse(localStorage.getItem("fontArray"));
    if (storedFonts !== null) {
      fontArray = storedFonts;
    }
    var storedColours = JSON.parse(localStorage.getItem("colourArray"));
    if (storedColours !== null) {
      colourArray = storedColours;
    }
    renderStoredFonts();
    renderStoredColours();
  }
  // Stores fontArray in local storage
  function storeFonts() {
    localStorage.setItem("fontArray", JSON.stringify(fontArray));
  }
  // created a seperate storeColours() function as they are called at seperate times
  function storeColours() {
    localStorage.setItem("colourArray", JSON.stringify(colourArray));
  }

  // pushes current font to the fontArray to be stored in localstorage
  function addFontsArray() {
    var fontName = buttonValue;
    fontArray.push(fontName);
    console.log(fontArray);

    storeFonts();
    renderStoredFonts();
  }

  // adds clicked colours to coloursArray, seperate to fonts because they occur at different times
  function addColoursArray() {
    var colourStyles = $(this).text();
    console.log(colourStyles);
    colourArray.push(colourStyles);
    console.log(colourArray);

    storeColours();
    renderStoredColours();
  }
  $(document).on("click", ".gotColours", addColoursArray);

  // When dropdown is clicked, it is activated, when clicked again, it is deactivated
  $(".dropdown").click(function () {
    $(".dropdown").toggleClass("is-inactive");
    $(".dropdown").toggleClass("is-active");
  });
  // Removes all items from localStorage
  $("#clearBtn").click(function (event) {
    var element = event.target;
    var index = element.parentElement.getAttribute("data-attribute");
    fontArray.splice(index, fontArray.length);
    colourArray.splice(index, colourArray.length);
    storeFonts();
    renderStoredFonts();
    storeColours();
    renderStoredColours();
  });
  // When a font stored in localStorage is clicked, the css style is copied 
  function copyFontsToClipboard(element) {
    element = $(this);
    console.log(element);
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val("font-family: '" + $(element).text() + "', sans-serif").select();
    document.execCommand("copy");
    $temp.remove();

    var div = $("<div class = 'copy-success is-fullwidth'>");
    div.text(
      "Copied: " + "font-family: '" + $(element).text() + "', sans-serif"
    );
    $("#historyCol").append(div);

    var timeLeft = 5;
    setInterval(function () {
      timeLeft--;

      if (timeLeft === 0) {
        div.hide();
      }
    }, 1000);
  }
  $(".hero-body").on("click", ".storedFonts", copyFontsToClipboard);
  // When a colour stored in localStorage is clicked, the css style is copied 
  function copyColoursToClipboard(colour) {
    colour = $(this);
    console.log(colour);
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val("background-color: " + $(colour).text()).select();
    document.execCommand("copy");
    $temp.remove();

    var div = $("<div class = 'copy-success is-fullwidth'>");
    div.text("Copied: " + "background-colour: " + $(colour).text());
    $("#historyCol").append(div);

    var timeLeft = 5;
    setInterval(function () {
      timeLeft--;

      if (timeLeft === 0) {
        div.hide();
      }
    }, 1000);
  }
  $(".hero-body").on("click", ".storedColours", copyColoursToClipboard);
});
