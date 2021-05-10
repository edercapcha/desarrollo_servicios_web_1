var strLinkRedirect;

function f_show_message_error(pStrTitulo, pStrMensaje) {
    $('#spnMessageErrorTitle').html(pStrTitulo);
    $('#spnMessageError').html(pStrMensaje);
    $('#divModalMensajeError').modal('show');
    $('#divModalMensajeError').on('shown.bs.modal', function () {
        $('#btnCerrarModalError').focus();
    });
    //setTimeout(function () { $('#divModalMensajeError').modal('hide'); }, 3000);
    $("#divModalMensajeError").off('hidden.bs.modal');
}

function f_show_message_error2(pStrTitulo, pStrMensaje, callback) {
    $('#spnMessageErrorTitle').html(pStrTitulo);
    $('#spnMessageError').html(pStrMensaje);
    $('#divModalMensajeError').modal('show');
    $('#divModalMensajeError').on('shown.bs.modal', function () {
        $('#btnCerrarModalError').focus();
    });
    $("#divModalMensajeError").on('hidden.bs.modal', function () {
        if (callback != null) { callback(); }
    });
}
function f_show_message_decision(pStrTitulo, pStrMensaje, pStrURLRedirect) {
    $('#spnMessageDecisionTitle').html(pStrTitulo);
    $('#spnMessageDecision').html(pStrMensaje);
    $('#divModalMensajeDecision').modal('show');
    $('#divModalMensajeDecision').on('shown.bs.modal', function () {
        $('#btnNoModalDecision').focus();
    });
    $(document).on("click", "#btnSiModalDecision", function () {
        $(location).attr('href', pStrURLRedirect);
    });
    //setTimeout(function () { $('#divModalMensajeError').modal('hide'); }, 3000);
}



function f_show_message_success(pStrTitulo, pStrMensaje, pStrURLRedirect) {
    $('#spnMessageSuccessTitle').html(pStrTitulo);
    $('#spnMessageSuccess').html(pStrMensaje);
    $('#divModalMensajeSuccess').modal('show');
    //setTimeout(function () { $('#divModalMensajeSuccess').modal('hide'); }, 3000);
    strLinkRedirect = pStrURLRedirect;
    $("#divModalMensajeSuccess").off('hidden.bs.modal');
}
function f_show_message_success2(pStrTitulo, pStrMensaje, pStrURLRedirect, callback) {
    $('#spnMessageSuccessTitle').html(pStrTitulo);
    $('#spnMessageSuccess').html(pStrMensaje);
    $('#divModalMensajeSuccess').modal('show');
    strLinkRedirect = pStrURLRedirect;

    $("#divModalMensajeSuccess").on('hidden.bs.modal', function () {
        if (callback != null) { callback(); }
    });
}
function f_show_message_info(pStrTitulo, pStrMensaje, pStrURLRedirect) {
    $('#spnMessageInfoTitle').html(pStrTitulo);
    $('#spnMessageInfo').html(pStrMensaje);
    $('#divModalMensajeInfo').modal('show');
    //setTimeout(function () { $('#divModalMensajeSuccess').modal('hide'); }, 3000);
    strLinkRedirect = pStrURLRedirect;
    $("#divModalMensajeInfo").off('hidden.bs.modal');
}
function f_show_message_info2(pStrTitulo, pStrMensaje, pStrURLRedirect, callback) {
    $('#spnMessageInfoTitle').html(pStrTitulo);
    $('#spnMessageInfo').html(pStrMensaje);
    $('#divModalMensajeInfo').modal('show');
    //setTimeout(function () { $('#divModalMensajeSuccess').modal('hide'); }, 3000);
    $("#divModalMensajeInfo").on('hidden.bs.modal', function () {
        if (callback != null) { callback(); }
    });
    strLinkRedirect = pStrURLRedirect;
}

function f_show_message_password() {
    $('#spnMessageInfoTitle').html('Información del sistema');
    $('#spnMessageInfo').html('Si olvid&oacute; su contraseña, por favor, comun&iacute;quese con el administrador de la red.');
    //setTimeout(function () { $('#divModalMensajeInfo').modal('show'); }, 3000);
}

//$("#btnAceptarMensajeSuccess").click(function () {
//    //event.preventDefault();
//    if (strLinkRedirect) {
//        waitingDialog.show('Cargando...');
//        window.location.href = strLinkRedirect;
//    }
//});




function f_get_message_text(pStrId, callback) {
    var strMensaje = "";
    $.ajax({
        url: '/Metadata/GetMessage',
        method: 'POST',
        data: "{ 'id':'" + pStrId + "' }",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            strMensaje = data.Message;
            $("#" + pStrId).html(strMensaje);
            if (callback != null) {
                callback(data);
            }
        },
        error: function () {
        }
    });
    return strMensaje;
}

function f_show_message_error_span(pIdSpan, pStrMensaje) {
    //$('#' + pIdSpan).text(pStrMensaje);
    setTimeout(function () {
        $('#' + pIdSpan).text(pStrMensaje).fadeIn(1000);
    }, 0);
    setTimeout(function () {
        $('#' + pIdSpan).fadeOut(500);
    }, 2000);
}

