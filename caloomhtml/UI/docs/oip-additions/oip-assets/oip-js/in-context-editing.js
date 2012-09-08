$(document).on("click", ".open-IncontextEditDialog_Text_Short", function () {
    var fieldid = $(this).data('id');
    var fieldtext = $(this).text();


    $(".modal-body #ObjectFieldID").val(fieldid);
    $(".modal-body #Text_Short").val(fieldtext);


$('#IncontextEditDialog_Text_Short').modal('show');
});

$(document).on("click", ".open-IncontextEditDialog_Text_Long", function () {
    var fieldid = $(this).data('id');
    var fieldtext = $(this).text();


    $(".modal-body #ObjectFieldID").val(fieldid);
    $(".modal-body #Text_Long").val(fieldtext);


$('#IncontextEditDialog_Text_Long').modal('show');
});