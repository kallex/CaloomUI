$(document).on("click", ".open-IDAction_ConfirmRemove", function () {
    var fieldid = $(this).data('id');
    var fieldquestion = $(this).data('question');
    var fieldtext = $(this).text();


    $(".modal-body #ObjectFieldID").val(fieldid + "_Action_Remove");
    $(".modal-body #question").val(fieldquestion);


    $('#IDAction_ConfirmRemove').modal('show');
});
