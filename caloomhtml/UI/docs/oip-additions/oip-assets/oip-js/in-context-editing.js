$(document).on("click", ".open-AddBookDialog", function () {
    var myBookId = $(this).data('id');
var kala = $(this).data('kello');


    $(".modal-body #bookId").val( myBookId );     
$(".modal-body #btn2").val( kala );


    $('#addBookDialog').modal('show');
});