var zoom = 100;
var rot = 0;

$(document).ready(function() {
    //var image = document.getElementById('principal-image');
    var image = $('#principal-image');
    //var canvas = document.getElementById('myCanvas');
    canvas = $('#myCanvas');
    //var choose = document.getElementById('init-image');
    var choose = $('#init-image');

    //image.style.position = 'absolute';
    //image.style.visibility = 'hidden';
    image.css('position', 'relative');
    //image.css('visibility', 'hidden');

    $("#unfullscreen").hide();

    $("#zoom-in").click(function() {
        console.log("Zoom-In");
    });

    $("#zoom-out").click(function() {
        console.log("Zoom-Out");
    });

    $("#zoom-best").click(function() {
        console.log("Zoom-Best");
    });

    $("#zoom-original").click(function() {
        console.log("Zoom-Original");
    });

    $("#rotate_anticlockwise").click(function() {
        rot -= 90
        if (rot < 0) {
          rot = 270
        };
        rotateImage(rot);
    });

    $("#rotate_clockwise").click(function() {
        rot += 90
        if (rot > 270) {
          rot = 0
        };
        rotateImage(rot);
    });

    function rotateImage(degree) {
      var cContext = canvas.getContext('2d');
      var cw = image.width, ch = image.height, cx = 0, cy = 0;

      //   Calculate new canvas size and x/y coorditates for image
      switch(rot){
        case 90:
          cw = image.height;
          ch = image.width;
          cy = image.height * (-1);
          break;
        case 180:
          cx = image.width * (-1);
          cy = image.height * (-1);
          break;
        case 270:
          cw = image.height;
          ch = image.width;
          cx = image.width * (-1);
          break;
        }

      //  Rotate image
      canvas.setAttribute('width', cw);
      canvas.setAttribute('height', ch);
      cContext.rotate(degree * Math.PI / 180);
      cContext.drawImage(image, cx, cy);
      }

    $("#fullscreen").click(function() {
        console.log("Switching to fullscreen");
        $(".toolbar").fadeIn('slow');
        $("#canvas").css('top', '0px');
        $("#unfullscreen").show();
    });

    $("#unfullscreen").click(function() {
        console.log("Switching to fullscreen");
        $(".toolbar").show()
        $("#canvas").css('top', '55px');
        $("#unfullscreen").hide();
    });


    $("#init-image button").click(function() {
        $('#search_image').click();
    });

    $('#open-button').click(function() {
      var fileInput = document.getElementById('search_image');
      var imageType = /image.*/;

      fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            reader.onload = function(e) {
            var imageSrc = reader.result;
            choose.css('display', 'none');
            image.attr("src", imageSrc);
            image.css('display', '');
            origWidth = image.width();
            origHeight = image.height();
            $('#myCanvas').remove();
          }
          reader.readAsDataURL(file);
        }
      });
    });

});
