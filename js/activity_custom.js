var zoom = 100;
var rot = 0;
var iWidth = 0, iHeight = 0;
var oWidth = 0, oHeight = 0;

$(document).ready(function() {
    var image = $('#principal-image');
    //canvas = $('#myCanvas');
    var canvas = document.getElementById("myCanvas");
    //var image_for_canvas = document.getElementById("principal-image");
    var choose = $('#init-image');
    var cContext = canvas.getContext('2d');

    image.css('position', 'relative');

    $("#unfullscreen").hide();

    $("#zoom-in").click(function() {
        console.log("Zoom-In");
        cContext.clearRect(0, 0, iWidth, iHeight);
        var resize = 140; // resize amount in percentage
        var newH   = iHeight * (resize / 100);
        var newW   = iWidth * (resize / 100);
        iWidth = newW;
        iHeight = newH;

        cContext.drawImage(image[0], 0,0,newW, newH);
    });

    $("#zoom-out").click(function() {
        console.log("Zoom-Out");
        cContext.clearRect(0, 0, iWidth, iHeight);
        var resize = 140; // resize amount in percentage
        var newH   = iHeight / (resize / 100);
        var newW   = iWidth / (resize / 100);
        iWidth = newW;
        iHeight = newH;
        cContext.drawImage(image[0], 0,0,newW, newH);
    });

    $("#zoom-best").click(function() {
        console.log("Zoom-Best");
        //image.css('width', '100%');
        //image.css('height', '100%');
        cContext.drawImage(image[0], 0,0,'100%', '100%');
    });

    $("#zoom-original").click(function() {
        console.log("Zoom-Original");
        image.css('width', oWidth);
        image.css('height', oHeight);
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
      //var cContext = canvas.getContext('2d'); //moved to global
      var cw = image[0].width, ch = image[0].height, cx = 0, cy = 0;

      //   Calculate new canvas size and x/y coorditates for image
      switch(rot){
        case 90:
          cw = image[0].height;
          ch = image[0].width;
          cy = image[0].height * (-1);
          break;
        case 180:
          cx = image[0].width * (-1);
          cy = image[0].height * (-1);
          break;
        case 270:
          cw = image[0].height;
          ch = image[0].width;
          cx = image[0].width * (-1);
          break;
        }

      //  Rotate image
      canvas.setAttribute('width', cw);
      canvas.setAttribute('height', ch);
      cContext.rotate(degree * Math.PI / 180);
      cContext.drawImage(image[0], cx, cy);
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

            var dimg = new Image;
            dimg.src = imageSrc;

            choose.css('display', 'none');
            image.attr('src', imageSrc);
            image.css('display', 'none');

            canvas.setAttribute('width', image[0].width);
            canvas.setAttribute('height', image[0].height);
            cContext.drawImage(image[0], 0,0);
            alert('the image is drawn');

            //Setting heights and Widths in variables
            iWidth = image.width();
            iHeight = image.height();
            oWidth = image.width();
            oHeight = image.height(); 
            //$('#myCanvas').remove();
          }
          reader.readAsDataURL(file);
        }
      });
    });

});
