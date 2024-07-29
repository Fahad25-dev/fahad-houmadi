$(document).ready(function () {
    $('#debloque').hide();
    $('#bloque').click(function (e) {
        $('#bloque').hide();
        $('#debloque').show();
    });

    $('#debloque').click(function (e) {
       $('#debloque').hide();
       $('#bloque').show();

    });
});
