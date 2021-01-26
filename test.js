  $(document).ready (function(){//Image Upload, Base64 encoding and into local storage code
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
