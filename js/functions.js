var zoom = 100;
var rot = 0;
var origWidth = 0, origHeight = 0;

$(document).ready(function() {
    var image = $('#principal-image');
    var choose = $('#init-image');

   image.css('position', 'relative');
   image.css('display', 'none');
    
    $("#unfullscreen").hide();

    $("#zoom-in").click(function() {
        console.log("Zoom-In");
        image.css('max-width', '');
        image.css('width', image.width()*1.2);
        image.css('height', image.height()*1.2);
    });

    $("#zoom-out").click(function() {
        console.log("Zoom-Out");
        image.css('max-width', '');
        image.css('width', image.width()/1.2);
        image.css('height', image.height()/1.2);
    });

    $("#zoom-best").click(function() {
        image.css('width', '');
        image.css('max-width', '100%');
        image.css('height', 'auto');
    });

    $("#zoom-original").click(function() {
        image.css('max-width', '');
        image.css('width', origWidth);
        image.css('height', origHeight);
    });

    $("#fullscreen").click(function() {
        $(".toolbar").fadeIn('slow');
        $("#canvas").css('top', '0px');
        $("#unfullscreen").show();
    });

    $("#unfullscreen").click(function() {
        $(".toolbar").show()
        $("#canvas").css('top', '55px');
        $("#unfullscreen").hide();
    });

    $("#init-image button").click(function() {
        $('#search_image').click();
    });

    $("#rotate_anticlockwise").click(function() {
        rot -= 90
        if (rot < 0) {
          rot = 270
        };
        image.rotate(rot);
    });

    $("#rotate_clockwise").click(function() {
        rot += 90
        if (rot > 270) {
          rot = 0
        };
        image.rotate(rot);
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
