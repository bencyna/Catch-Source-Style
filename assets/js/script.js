$(document).ready(function() {
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
            var button = $('<button type = "button" class = "storedFonts" id = "font' + i + '" style = "font-family: ' + font + '">').text(font);
            button.attr("data-attribute", i);
            li.append(button);
            console.log(font)
            $(".historyFonts").prepend(li);
        }
    };

    function getItems() {
        var storedFonts = JSON.parse(localStorage.getItem("fontArray"));
        if (storedFonts !== null) {
            fontArray = storedFonts;
        }
        renderStoredFonts();
    };

    function storeFonts() {
        localStorage.setItem("fontArray", JSON.stringify(fontArray));
    };

    // pushes current font to the fontArray to be stored in localstorage
    function addFontsArray() {
        var fontName = buttonValue;
        fontArray.push(fontName);
        console.log(fontArray);

        storeFonts();
        renderStoredFonts();
    };

    // added css here to avoid conflict potentially when pushing
    $(".dropdown-menu").css({ "max-height": "450px", overflow: "scroll" });
    //ajax call
    $.ajax({
        url: queryURL,
        data: {},
        success: function(font) {
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
            $(".font-items").click(function() {
                buttonValue = $(this).text();
                cssFamilyDisplay();
            });
        },
    });
    // will need to style in css potentially
    // this function adds display sentence of font and calls addFontArray()
    function cssFamilyDisplay() {
        $(".textDisplay").empty();

        var sampleTextVal = $('#userInput').val()
        console.log(sampleTextVal)

        var newHOne = $('<h1 class = "exampleHeader">').text(
            "Here is what the font '" + buttonValue + "' looks like as a h1 element: " + sampleTextVal
        );
        var newP = $("<p class = 'exampleParagraph'>").text(
            "As a 'p' tag, '" + buttonValue + "' displays as this: " + sampleTextVal
        );
        var button = $("<button type = 'button' class = 'storeStyles'>").text(
            "Like this style? Click me to save it!"
        );

        $(".textDisplay").css("font-family", buttonValue);
        console.log(buttonValue);
        $(".textDisplay").append(newHOne);
        $(".textDisplay").append(newP);
        $(".textDisplay").append(button);

        $(".storeStyles").click(function() {
            addFontsArray();
        });
    }

    $(".dropdown").click(function() {
        $(".dropdown").toggleClass("is-inactive");
        $(".dropdown").toggleClass("is-active");
    });
    $("#clearBtn").click(function(event) {
        var element = event.target;
        var index = element.parentElement.getAttribute("data-attribute");
        fontArray.splice(index, fontArray.length);
        storeFonts();
        renderStoredFonts();
    });
    $(".storedFonts").click(function(element) {
        element = $(this).text();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();

        var fontFamCopy = "font-family: " + $(this).text() + ", sans-serif;"
        console.log(fontFamCopy)
    });
});