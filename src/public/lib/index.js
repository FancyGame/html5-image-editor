/**
 * Created by md on 14-5-22.
 */

$("#file").change(function(){
    var reader = new FileReader();
    reader.onload = function () {
        var base64Data = this.result.replace(/^data:image\/\w+;base64,/, "");
//        $('#image').val(base64Data);
        $('#img_show').attr('src',this.result);

        var dataURL = null;
        try {
            var canvas = document.getElementById("canvas");
            var img = document.getElementById("img_show");
            var w = canvas.width;
            var h = canvas.height;
            var context = canvas.getContext('2d');

//            var g1 = context.createRadialGradient(200, 150, 0, 200, 150, 100);
//                        g1.addColorStop(0.1, 'rgb(255,0,0)');
//                        g1.addColorStop(1, 'rgb(50,0,0)');
//                         context.fillStyle = g1;
//                         context.beginPath();
//                         context.arc(200, 150, 100, 0, Math.PI * 2, true);
//                         context.closePath();
//                         context.fill();

            console.log('drawIamge',img.width,img.height,w,h);
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
            dataURL = canvas.toDataURL(/*type == 'image/jpeg' ? type : 'image/png', 10*/);
            var dataTranslated = dataURL.replace(/^data:image\/\w+;base64,/, "");
            console.log('canvas',dataTranslated);
            $('#image').val(dataTranslated);
        } catch (e) {
            console.log(e);
        }
    };
    reader.onerror = function() {
        console.log("onerror");
    };
    reader.readAsDataURL(document.getElementById("file").files[0]);
});

$("#submit").click(function(){
    var success = function(data) {
        console.log(data);
    };
    var error = function() {
        console.log("error");
    };
    var options = {
        url: '/upload',
        type:'post',
        success: success,
        error: error
    };
    $('#form').ajaxSubmit(options);
});