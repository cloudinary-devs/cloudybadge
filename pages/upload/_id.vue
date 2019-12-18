<template>
  <div>
    <button id="upload_widget" class="cloudinary-button">Upload files</button>
  </div>
</template>
<script>
export default {
  mounted() {
    var myWidget = cloudinary.createUploadWidget({
    cloudName: 'cdemo', 
    }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
  )

  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
  }
}
</script>