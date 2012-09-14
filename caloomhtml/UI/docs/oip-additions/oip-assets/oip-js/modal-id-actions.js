$(document).on("click", ".open-IDAction_ConfirmRemove", function () {
    var fieldid = $(this).data('id');
    var fieldquestion = $(this).data('question');


    $('.modal-body #ObjectFieldID').val(fieldid);
    $('.modal-body #question').val(fieldquestion);


    $('#IDAction_ConfirmRemove').modal('show');
});
