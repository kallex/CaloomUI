$(document).on("click", ".open-IDAction_ConfirmRemove", function () {
    var fieldid = $(this).data('id');
    var fieldquestion = $(this).data('question');

    $('.modal-body #ObjectFieldID').val(fieldid);
    $('.modal-body #question').val(fieldquestion);

    $('#IDAction_ConfirmRemove').modal('show');
});

$(document).on("click", ".open-IDAction_AssignGroupRole", function () {
    var fieldid = $(this).data('id');
    // var fieldquestion = $(this).data('question');

    $('.modal-body #ObjectFieldID').val(fieldid);
    $('.modal-body #grouproles').val("Dynamic role list here...");
    
    //$('.modal-body #question').val(fieldquestion);

    $('#IDAction_AssignGroupRole').modal('show');
});


$("#edittoggle").click(function () {
    // alert('Toggling page elements to/from edit mode...');
    var inEditMode = $(".editable");
    var notInEditMode = $(".noteditable");
    inEditMode.removeClass("editable").addClass("noteditable");
    notInEditMode.removeClass("noteditable").addClass("editable");
    // alert("Toggled to edit: " + notInEditMode.length + " - toggled off from edit: " + inEditMode.length + " elements...");
});

$(".remoteurlmodal").on('click', function () {
    var url = $(this).data('url');
    var modal_id = "IDRemoteUrlModal";
    var modal_body = modal_id + "Body";
    $("#" + modal_body).load(url);
    $("#" + modal_id).modal('show');
});