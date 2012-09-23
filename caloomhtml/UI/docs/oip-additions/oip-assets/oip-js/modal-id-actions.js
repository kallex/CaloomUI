$(document).on("click", ".open-IDAction_ConfirmRemove", function () {
    var fieldid = $(this).data('id');
    var fieldquestion = $(this).data('question');


    $('.modal-body #ObjectFieldID').val(fieldid);
    $('.modal-body #question').val(fieldquestion);


    $('#IDAction_ConfirmRemove').modal('show');
});

$("#edittogle").click(function () {
    alert('Toggling page elements to/from edit mode...');
    //var inEditMode = $(".editable");
    //var notInEditMode = $(".endEditable");
    //inEditMode.removeClass("editable").addClass("endEditable");
    //notInEditMode.removeClass("endEditable").addClass("editable");
    //alert("Toggled to edit: " + not.length + " - toggled off from edit: " + inedi.length + " elements...");
});

