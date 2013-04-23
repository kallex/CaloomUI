$(document).on("click", ".open-IncontextEditDialog_Text_Short", function () {
    var isNotEditable = $(this).hasClass("noteditable");
    if (isNotEditable == true)
        return;
    var fieldid = $(this).data('id');
    var fieldtext = $(this).text();

    $(".modal-body #InContextEditFieldID").val(fieldid);
    $(".modal-body #Text_Short").val(fieldtext);
    $('#IncontextEditDialog_Text_Short').modal('show');
});

$(document).on("click", ".open-IncontextEditDialog_Text_Long", function () {
    var isNotEditable = $(this).hasClass("noteditable");
    if (isNotEditable == true)
        return;
    var fieldid = $(this).data('id');
    //var fieldtext = $(this).text();
    var fieldtext = $(this).html();

    $(".modal-body #InContextEditFieldID").val(fieldid);
    $(".modal-body #Text_Long").val(fieldtext);
    addRichTextEditTextLong();
    $('#IncontextEditDialog_Text_Long').modal('show');
});