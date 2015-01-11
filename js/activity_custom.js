var zoom = 100;
var rot = 0;

$(document).ready(function() {
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

        if (rot == 0) {
            $("#principal-image").css('-webkit-transform', 'rotate(0deg)')
            $("#principal-image").css('-moz-transform', 'rotate(0deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=0)')
        };

        if (rot == 90) {
            $("#principal-image").css('-webkit-transform', 'rotate(90deg)')
            $("#principal-image").css('-moz-transform', 'rotate(90deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)')
        };
        if (rot == 180) {
            $("#principal-image").css('-webkit-transform', 'rotate(180deg)')
            $("#principal-image").css('-moz-transform', 'rotate(180deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)')
        };
        if (rot == 270) {
            $("#principal-image").css('-webkit-transform', 'rotate(270deg)')
            $("#principal-image").css('-moz-transform', 'rotate(270deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)')
        };

    });

    $("#rotate_clockwise").click(function() {
        rot += 90
        if (rot > 270) {
          rot = 0
        };

        if (rot == 0) {
            $("#principal-image").css('-webkit-transform', 'rotate(0deg)')
            $("#principal-image").css('-moz-transform', 'rotate(0deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=0)')
        };

        if (rot == 90) {
            $("#principal-image").css('-webkit-transform', 'rotate(90deg)')
            $("#principal-image").css('-moz-transform', 'rotate(90deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)')
        };
        if (rot == 180) {
            $("#principal-image").css('-webkit-transform', 'rotate(180deg)')
            $("#principal-image").css('-moz-transform', 'rotate(180deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)')
        };
        if (rot == 270) {
            $("#principal-image").css('-webkit-transform', 'rotate(270deg)')
            $("#principal-image").css('-moz-transform', 'rotate(270deg)')
            $("#principal-image").css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)')

        };

    });

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
            document.getElementById('init-image').style.display = 'none';
            $("#principal-image").css('z-index', '1')
            document.getElementById('principal-image').src = imageSrc;
          }
          reader.readAsDataURL(file);
        }
      });
    });

});
