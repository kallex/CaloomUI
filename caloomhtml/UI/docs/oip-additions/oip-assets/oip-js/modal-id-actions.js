$(document).on("click", ".open-IDAction_ConfirmRemove", function () {
    var fieldid = $(this).data('id');
    var fieldquestion = $(this).data('question');
    var command = $(this).data('command');
    var commandtext = $(this).data('commandtext');

    $('.modal-body #ObjectFieldID').val(fieldid);
    $('.modal-body #question').text(fieldquestion);
    var button = $('.modal-body #RootSourceAction');
    // Set button text
    button.html(commandtext);
    // Set button value
    button.val(command);

    $('#IDAction_ConfirmRemove').modal('show');
});

$(document).on("click", ".open-IDAction_AssignGroupRole", function () {
    var fieldid = $(this).data('id');
    var currentrole = $(this).data('currentrole');
    var command = $(this).data('command');
    // var fieldquestion = $(this).data('question');

    $('.modal-body #ObjectFieldID').val(fieldid);
    if (currentrole == "Initiator") {
        alert("Cannot assign role for initiator of the group");
        return;
    }
    $("#rad" + currentrole).prop('checked', true);
    //$('.modal-body #grouproles').val("Dynamic role list here...");

    var button = $('#IDAction_AssignGroupRole #RootSourceAction');
    button.val(command);
    button.html("Assign Role!");

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
    var modal_body_selector = "#" + modal_body;
    var hookSubmitButtons = function() {
        $(".ajaxbutton").on('click', function () {
            var operationName = $(this).data("cmdvalue");
            //alert("Executing cmd: " + operationName);
            $("#RootSourceActionInput").val(operationName);
        });
    };
    var RemoteUrlFormSubmit = function () {
        var options = {
            // target:"#divResult",

            success: function(html) {
                $(modal_body_selector).html(html);
                var modalForm = $("#" + modal_id + " form").each(function() {
                    $(this).submit(RemoteUrlFormSubmit);
                });
                hookSubmitButtons();
            },
            error: function(html, textStatus, errorThrown) {
                alert("Someone changed the information during the edit and save. Please retry your change.");
                $(modal_body_selector).html("Loading content...");
                $(modal_body_selector).load(url, function() {
                    var modalForm = $("#" + modal_id + " form").each(function() {
                        $(this).submit(RemoteUrlFormSubmit);
                    });
                    hookSubmitButtons();
                });
            },

            url: url
        };
        $(this).ajaxSubmit(options);
        //alert("Submitted");
        return false;
    };

    $(modal_body_selector).html("Loading content...");
    $(modal_body_selector).load(url, function () {
        var modalForm = $("#" + modal_id + " form").each(function () {
            $(this).submit(RemoteUrlFormSubmit);
        });
        hookSubmitButtons();
    });
    /*
    modalForm.submit(function () {
    alert("Submitting...");
    var options = {
    // target:"#divResult",

    success: function (html) {
    $(modal_body_selector).replaceWith(html);
    },

    url: url
    }
    $(this).ajaxSubmit(options);
    alert("Submitted");
    return false;
    });
    */

    $("#" + modal_id).modal('show');
});

//SelectedIDCommaSeparated
