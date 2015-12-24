var zoom = 100;
var rot = 0;
var iWidth = 0, iHeight = 0;
var oWidth = 0, oHeight = 0;

$(document).ready(function() {
    var image = $('#principal-image');
    var canvas = document.getElementById("myCanvas");
    var choose = $('#init-image');
    var cContext;

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

        canvas.setAttribute('width', newW);
        canvas.setAttribute('height', newH);
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
        canvas.setAttribute('width', newW);
        canvas.setAttribute('height', newH);
        cContext.drawImage(image[0], 0,0,newW, newH);
    });

    $("#zoom-best").click(function() {
        console.log("Zoom-Best");
        var ratio = oHeight/oWidth;
        var ratio2 = oWidth/oHeight;
        
        var sWidth=$(document).width();
        var sHeight=$(document).height();

        if ( sWidth*ratio < sHeight ) {
          canvas.setAttribute('width', sWidth);
          canvas.setAttribute('height', sWidth*ratio);
          cContext.drawImage(image[0], 0,0,sWidth, sWidth*ratio);
          iWidth=sWidth;
          iHeight=sWidth*ratio;
        } else{
          canvas.setAttribute('width', sHeight*ratio2);
          canvas.setAttribute('height', sHeight);
          cContext.drawImage(image[0], 0,0,sHeight*ratio2, sHeight);
          iWidth=sHeight*ratio2;
          iHeight=sHeight;
        };
    });

    $("#zoom-original").click(function() {
        console.log("Zoom-Original");
        cContext.clearRect(0, 0, iWidth, iHeight);
        canvas.setAttribute('width', oWidth);
        canvas.setAttribute('height', oHeight);
        cContext.drawImage(image[0], 0,0,oWidth, oHeight);
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
      var cw = iWidth, ch = iHeight, cx = 0, cy = 0;

      cContext.clearRect(0, 0, iWidth, iHeight);

      //   Calculate new canvas size and x/y coorditates for image
      switch(rot){
        case 90:
          cw = iHeight;
          ch = iWidth;
          cy = iHeight * (-1);
          break;
        case 180:
          cx = iWidth * (-1);
          cy = iHeight * (-1);
          break;
        case 270:
          cw = iHeight;
          ch = iWidth;
          cx = iWidth * (-1);
          break;
        }

      //  Rotate image
      canvas.setAttribute('width', cw);
      canvas.setAttribute('height', ch);
      cContext.rotate(degree * Math.PI / 180);
      cContext.drawImage(image[0], cx, cy, cw, ch);
      //cContext.drawImage(image[0], 0, 0, iWidth, iHeight);
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
            var dimg = new Image;
            var imageSrc;
            reader.onload = function(e) {
            imageSrc = reader.result;

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
          dimg.src = imageSrc;
          cContext = canvas.getContext('2d')
          reader.readAsDataURL(file);
        }
      });
    });

});
