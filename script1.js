document.querySelector("#file").addEventListener("change", async (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileB64 = await toBase64(file);
    console.log(fileB64);
    const formData = new FormData();
    formData.append('image_base64', fileB64);
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
        console.log(btoa(response));
      });
})
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

    console.log(btoa(""));
});