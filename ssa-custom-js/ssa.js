
var bsModal = document.getElementById("bs-myModal");

var fittingLocationChanged = false;

var textFieldIsNotEmpty = false;
var numberFieldIsNotEmpty = false;
var emailFieldIsNotEmpty = false;
var vmakeIsNotEmpty = false;
var vmodelIsNotEmpty = false;
var engineIsChecked = false;

var steelTrayColorIsChecked = false;
var aluminiumTrayColorIsChecked = false;
var fibreglassCanopyColorIsChecked = false;

var installationAtPiranhaBranchIsSelected = false;
var diyIsSelected = false;

var steelTrayIsSelected = false;
var aluminiumTrayIsSelected = false;
var fibreglassCanopyIsSelected = false;

var steelTraySizeIsNotEmpty = false;
var steelTubRemovalIsNotEmpty = false;
var steelTailLightsIsNotEmpty = false;
var steelDriveTrainIsChecked = false;

var aluminiumTraySizeIsNotEmpty = false;
var aluminiumTubRemovalIsNotEmpty = false;
var aluminiumTailLightsIsNotEmpty = false;
var aluminiumDriveTrainIsChecked = false;

var extrasWithNoSizeIsSelected = false;
var extrasWithSizeIsSelected = false;
var extrasIsSelected = false;
var traySizeIsFilled = false;

var noExtraIsSelected = true;

var fibreglassWindowTypeIsNotEmpty = false;

var state = {};

$.noConflict();
jQuery( document ).ready(function( $ ) {

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    if ($(window).width() < 768) {
        $("#div-slick-container").removeClass("mi-slick-this");
        $("#tacc-container").hide();
    } else {
        $("#div-slick-container").addClass("mi-slick-this");
    }

    $('#personal_info input').prop('required', true);
    $('#date_time_fieldset input').prop('required', true);

    $('#tswitch').click(function(){
        if($(this).prop("checked") == true){
            $("#tacc-container").show();
        }
        else if($(this).prop("checked") == false){
            $("#tacc-container").hide();
        }
    });

    /*** HIDE CARDS ***/
    $("#bs_personal_information_and_vehicle_information_card").hide();
    $("#bs_steel_tray_card").hide();
    $("#bs_aluminium_tray_card").hide();
    $("#bs_fibreglass_tray_card").hide();


    /*** HIDE ACCESSORIES ***/
    $("#tray_accessories").hide();
    $("#fibreglass_accessories").hide();


    /*** HIDE FIBREGLASS CANOPY DECKTYPE ***/
    $("#fibreglass_decktype_container").hide();
    $("#input_painted_field_container").hide();

    /*** HIDE PRICE PANEL ***/
    $("#bs_price_panel").hide();


    /*** OPTIONAL EXTRAS SLICK SLIDER ***/
    cSlick();

    $('.steel-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: true,
        onInit: function() {
            $('.current').text('1');
        },
        onAfterChange: function() {
            $('.current').text($('.slides').slickCurrentSlide()+1);
        }
    });

    $('.aluminium-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: true,
        onInit: function() {
            $('.current').text('1');
        },
        onAfterChange: function() {
            $('.current').text($('.slides').slickCurrentSlide()+1);
        }
    });

    $('.fibreglass-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: true,
        onInit: function() {
            $('.current').text('1');
        },
        onAfterChange: function() {
            $('.current').text($('.slides').slickCurrentSlide()+1);
        }
    });

    $("#fitting_location").prop("required", true);

    $('#fbg-color-link').click(function() {
        $(".fbg-modal").slideDown("fast");
    });

    $('#fbg-modal-color').click(function() {
        $(this).slideUp("fast");
    });

    $("#slct-booking-location").change(function () {
        fittingLocationChanged = true;
        productSelection();
        refreshSlick();
    });

    //STEEL UTE TRAY
    $("input[name='steel_tray_color']").click(function () {
        enableBlockRadio();
    });
    $("#steel-tray-size").click(function () {
        enableBlockRadio();
    });
    $("#steel-tub-removal").click(function () {
        enableBlockRadio();
    });
    $("#steel-tail-lights").click(function () {
        enableBlockRadio();
    });
    $("input[name='steel_drivetrain']").click(function () {
        enableBlockRadio();
    });
    //ALUMINIUm UTE TRAY
    $("input[name='aluminium_tray_color']").click(function () {
        enableBlockRadio();
    });
    $("#aluminium-tray-size").click(function () {
        enableBlockRadio();
    });
    $("#steel-tub-removal").click(function () {
        enableBlockRadio();
    });
    $("#steel-tail-lights-premium").click(function () {
        enableBlockRadio();
    });
    $("input[name='aluminium_drivetrain']").click(function () {
        enableBlockRadio();
    });
    //FIBREGLASS CANOPY
    $("input[name='deck_type']").click(function () {
        enableBlockRadio();
    });
    $("#slct_fiberglass_window_type").click(function () {
        enableBlockRadio();
    });
    $("input[name='canopy_color']").click(function () {
        enableBlockRadio();
    });

    $('.blockradio').click(function () {
        var getRadio = $(this).text();
        openWarningPrompt();

        $("#warning_confirm").click(function () {
            $('input[name="quote_product"][value="' + getRadio + '"]').prop('checked', true);
            resetTrayForms();
            traySizeChecker();
            inputIsFilled();
            closeWarningPrompt();
            openTrayCard();
            closeCard();
            productSelection();
            $('.blockradio').addClass('d-none').removeClass('d-block');

            disableHiddenFields("bs_steel_tray_card", "form-steel-tray");
            disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");
            disableHiddenFields("bs_fibreglass_tray_card", "form-fibreglass-canopy");

            $("#form-steel-tray, #form-aluminium-tray, #form-fibreglass-canopy, #form-tray-accessories, #fibreglass_canopy_accessory_fieldset").removeAttr('disabled');
            $('#btn_view_price').show();
            $('#bs_price_panel').slideUp();
            $('#div-calendar').hide();
            $('#div-accessories').empty();
            $('#proceed-btn').css('display', 'block');

            refreshSlick();
        });

        $("#warning_cancel").click(function () {
            closeWarningPrompt();
        });
    });

    $("input[name='steel-tray-accessories[]']").click(function () {
        traySizeIsFilled = false;
        // Define variable for checkbox id
        var targetId = $(this).data('target-id');
        var isStandalone = $(this).data('standalone');
        
        // Check if checkbox has been added to the state object
        if (!state.hasOwnProperty(targetId)) {
            state[targetId] = {};
        } else {
            delete state[targetId].selectedValue;
        }
        
        // Update true/false on the state object
        // ex: isChecked: true
        state[targetId].isChecked = $(this).is(':checked');
        state[targetId].isStandalone = !!isStandalone;
        
        // Function for checking and updating span#text
        traySizeChecker();
        console.log("traySizeChecker: " + traySizeIsFilled);

        var chkds = $("input[name='steel-tray-accessories[]']:checkbox");

        setTimeout(function () {

            if (chkds.is(":checked") && (!$('select[id^="size-"]').is(":visible"))) {

                extrasWithNoSizeIsSelected = true;
                extrasWithSizeIsSelected = false;
                noExtraIsSelected = false;
                traySizeIsFilled = false;


            } else if (chkds.is(":checked") && ($('select[id^="size-"]').is(":visible"))) {

                extrasWithNoSizeIsSelected = false;
                extrasWithSizeIsSelected = true;
                noExtraIsSelected = false;

            } else {

                console.log("No Extras is Checked");
                extrasWithNoSizeIsSelected = false;
                extrasWithSizeIsSelected = false;
                noExtraIsSelected = true;
                traySizeIsFilled = false;
                enableViewPrice();

            }

            inputIsFilled();

        }, 300);


    });

    $('select[id^="size-"]').change(function() {

        // Define variable for checkbox id
        var targetId = $(this).data('target-id');
        
        // Check if dropdown value has been added to the state object
        if (!state.hasOwnProperty(targetId)) {
            state[targetId] = {};
        }
        
        // Update value on the state object
        // ex: selectedValue: "2"
        state[targetId].selectedValue = $(this).val();
        
        // Function for checking and updating span#text
        traySizeChecker();
        inputIsFilled();
        console.log("traySizeChecker: " + traySizeIsFilled);

    });

    $("input[name='installation']").click(function () {

        if ($("#rdo-installation").prop("checked")) {
            installationAtPiranhaBranchIsSelected = true;
            diyIsSelected = false;
            disableViewPrice();
        } else if ($("#rdo-diy").prop("checked")) {
            installationAtPiranhaBranchIsSelected = false;
            diyIsSelected = true;
            disableViewPrice();
        }

        productSelection();

    });

    /*** FIBREGLASS CANOPY COLOR ***/
    $("input[name='canopy_color']").click(function () {

        if (($('#radio_fibreglass_primered').is(':checked')) || ($('#radio_fibreglass_painted').is(':checked'))) {

            fibreglassCanopyColorIsChecked = true;

            inputIsFilled();

        } else {

            fibreglassCanopyColorIsChecked = false;

        }

    });

    /*** STEEL TRAY COLOR RADIO ***/
    $("input[name='steel_tray_color']").click(function () {

        /*** STEEL TRAY COLOR RADIO ***/
        if (($('#rdo-steel-black').is(':checked')) || ($('#rdo-steel-white').is(':checked'))) {

            $("#rdo-steel-black").next().removeClass("custom-error");
            $("#rdo-steel-white").next().removeClass("custom-error");
            $("#steel_tray_color_heading").removeClass("text-danger");
            $("#steel_tray_color_validator").hide();

            steelTrayColorIsChecked = true;

            inputIsFilled();

        } else {

            steelTrayColorIsChecked = false;

        }

    });

    /*** ALUMINIUM TRAY COLOR RADIO ***/
    $("input[name='aluminium_tray_color']").click(function () {

        /*** ALUMINIUM TRAY COLOR RADIO ***/
        if (($('#rdo-aluminium-black').is(':checked')) || ($('#rdo-aluminium-mill').is(':checked'))) {

            $("#rdo-aluminium-black").next().removeClass("custom-error");
            $("#rdo-aluminium-mill").next().removeClass("custom-error");
            $("#aluminium_tray_color_heading").removeClass("text-danger");
            $("#aluminium_tray_color_validator").hide();

            aluminiumTrayColorIsChecked = true;

            inputIsFilled();

        } else {

            aluminiumTrayColorIsChecked = false;

        }

    });

    /*** STEEL TRAY DRIVETRAIN IS CHECKED ***/
    $("input[name='steel_drivetrain']").click(function () {

        /*** STEEL TRAY DRIVETRAIN IS CHECKED ***/
        if (($('#rdo-steel-2wd').is(':checked')) || ($('#rdo-steel-4wd').is(':checked'))) {

            $("#steel_tray_drivetrain_heading").removeClass("text-danger");
            $("#steel_tray_drivetrain_validator").hide();

            $("#rdo-steel-2wd").removeClass("custom-radio-error");
            $("#rdo-steel-2wd").next().removeClass("text-danger");

            $("#rdo-steel-4wd").removeClass("custom-radio-error");
            $("#rdo-steel-4wd").next().removeClass("text-danger");

            steelDriveTrainIsChecked = true;

            inputIsFilled();

        } else {

            steelDriveTrainIsChecked = false;

        }

    });

    /*** ALUMINIUM TRAY DRIVETRAIN IS CHECKED ***/
    $("input[name='aluminium_drivetrain']").click(function () {

        /*** ALUMINIUM TRAY DRIVETRAIN IS CHECKED ***/
        if (($('#rdo-aluminium-2wd').is(':checked')) || ($('#rdo-aluminium-4wd').is(':checked'))) {

            $("#aluminium_tray_drivetrain_container").removeClass("text-danger");
            $("#aluminium_tray_drivetrain_validator").hide();

            $("#rdo-aluminium-2wd").removeClass("custom-radio-error");
            $("#rdo-aluminium-2wd").next().removeClass("text-danger");

            $("#rdo-aluminium-4wd").removeClass("custom-radio-error");
            $("#rdo-aluminium-4wd").next().removeClass("text-danger");

            aluminiumDriveTrainIsChecked = true;

            inputIsFilled();

        } else {

            aluminiumDriveTrainIsChecked = false;

        }

    });

    $("input[type='radio']").click(function () {

        /*** PRODUCT SELECTION ***/
        productSelection();

        /*** FIBREGLASS CANOPY PAINT INPUT FIELD ***/
        $("#radio_fibreglass_painted").prop("checked") ? $("#input_painted_field_container").show() : $("#input_painted_field_container").hide();

        if ($("#rdo-petrol").prop("checked") || $("#rdo-diesel").prop("checked")) {

            $("#engine_heading").removeClass("text-danger");
            $("#engine_radio_validator").hide();

            $("#rdo-petrol").removeClass("custom-radio-error");
            $("#rdo-petrol").next().removeClass("text-danger");

            $("#rdo-diesel").removeClass("custom-radio-error");
            $("#rdo-diesel").next().removeClass("text-danger");

            engineIsChecked = true;

            inputIsFilled();

        } else {

            engineIsChecked = false;

        }

    });


    $("#btn_view_price").click(function () {

        checkField("first_name");
        checkField("last_name");
        checkField("c_email");
        checkField("c_phone");
        checkField("c_postcode");
        checkField("v_year");

        dropDownSelect("v_make");
        dropDownSelect("v_model");

    });


    onInputFocusOut("first_name");
    onInputFocusOut("last_name");
    onInputFocusOut("c_email");
    onInputFocusOut("c_phone");
    onInputFocusOut("c_postcode");
    onInputFocusOut("v_year");

    dropDownOnChangedEvent("v_make");
    dropDownOnChangedEvent("v_model");

    /*** STEEL TRAY ***/
    dropDownOnChangedEvent("steel-tray-size");
    dropDownOnChangedEvent("steel-tub-removal");
    dropDownOnChangedEvent("steel-tail-lights");

    /*** ALUMINIUM TRAY ***/
    dropDownOnChangedEvent("aluminium-tray-size");
    dropDownOnChangedEvent("steel-tub-removal-premium");
    dropDownOnChangedEvent("steel-tail-lights-premium");

    /*** DISABLE HIDDEN FIELDS ***/
    disableHiddenFields("bs_steel_tray_card", "form-steel-tray");
    disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");
    disableHiddenFields("bs_fibreglass_tray_card", "form-fibreglass-canopy");


    $("input[type='text']").blur(function () {

        if (($("#first_name").val() != "") && ($("#last_name").val() != "")) {

            textFieldIsNotEmpty = true;

        } else {

            textFieldIsNotEmpty = false;

        }

        inputIsFilled();

    });

    $("input[type='number']").blur(function () {

        if (($("#c_phone").val() != "") && ($("#c_postcode").val() != "") && ($("#v_year").val() != "")) {

            numberFieldIsNotEmpty = true;

        } else {

            numberFieldIsNotEmpty = false;

        }

        inputIsFilled();

    });

    $("input[type='email']").blur(function () {

        if (($("#c_email").val() != "")) {

            emailFieldIsNotEmpty = true;

        } else {

            emailFieldIsNotEmpty = false;

        }

        inputIsFilled();

    });

    $("#v_make").change(function () {

        if ($("#v_make option:selected").val() === "") {

            vmakeIsNotEmpty = false;

        } else {

            vmakeIsNotEmpty = true;

        }

        inputIsFilled();

    });

    $("#v_model").change(function () {

        if ($("#v_model option:selected").val() === "") {

            vmodelIsNotEmpty = false;

        } else {

            vmodelIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** STEEL TRAY SIZE ***/
    $("#steel-tray-size").change(function () {

        if ($("#steel-tray-size option:selected").val() === "") {

            steelTraySizeIsNotEmpty = false;

        } else {

            steelTraySizeIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** ALUMINIYM TRAY SIZE ***/
    $("#aluminium-tray-size").change(function () {

        if ($("#aluminium-tray-size option:selected").val() === "") {

            aluminiumTraySizeIsNotEmpty = false;

        } else {

            aluminiumTraySizeIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** STEEL TUB REMOVAL ***/
    $("#steel-tub-removal").change(function () {

        if ($("#steel-tub-removal option:selected").val() === "") {

            steelTubRemovalIsNotEmpty = false;

        } else {

            steelTubRemovalIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** ALUMINIUM TUB REMOVAL ***/
    $("#steel-tub-removal-premium").change(function () {

        if ($("#steel-tub-removal-premium option:selected").val() === "") {

            aluminiumTubRemovalIsNotEmpty = false;

        } else {

            aluminiumTubRemovalIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** STEEL TAIL LIGHTS ***/
    $("#steel-tail-lights").change(function () {

        if ($("#steel-tail-lights option:selected").val() === "") {

            steelTailLightsIsNotEmpty = false;

        } else {

            steelTailLightsIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** ALUMINIUM TAIL LIGHTS ***/
    $("#steel-tail-lights-premium").change(function () {

        if ($("#steel-tail-lights-premium option:selected").val() === "") {

            aluminiumTailLightsIsNotEmpty = false;

        } else {

            aluminiumTailLightsIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** FIBREGLASS CANOPY WINDOW TYPE ***/
    $("#slct_fiberglass_window_type").change(function () {

        if ($("#slct_fiberglass_window_type option:selected").val() === "") {

            fibreglassWindowTypeIsNotEmpty = false;

        } else {

            fibreglassWindowTypeIsNotEmpty = true;

        }

        inputIsFilled();

    });


});


/*** PRODUCT SELECTION ***/
function productSelection() {

    if ($("#rdo-steel-tray").is(":checked")) {

        $("#booking_note").html("<b>NOTE: </b> We only accept 1 booking per day.");

        steelTrayIsSelected = true;
        aluminiumTrayIsSelected = false;
        fibreglassCanopyIsSelected = false;

        $("#ipb-icon").removeClass("rdo-disabled-icon");
        $("#ipb-text").removeClass("rdo-disabled");
        $("#diy-icon").removeClass("rdo-disabled-icon");
        $("#diy-text").removeClass("rdo-disabled");
        $("#rdo-installation").prop("disabled", false);
        $("#rdo-diy").prop("disabled", false);

        if (($("#rdo-installation").is(":checked")) && (fittingLocationChanged == true)) {

            openCard("bs_steel_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_steel_tray_card", "form-steel-tray");

            $("#txt-fitting-location").html("Fitting");

            $("#fibreglass_accessories").hide();

            $("#steel_tray_tub_removal_container").show();
            $("#steel-tub-removal").prop("disabled", false);
            $("#steel_tray_tail_lights_container").show();
            $("#steel-tail-lights").prop("disabled", false);
            $("#steel_tray_drivetrain_container").show();
            $("input[name='steel_drivetrain']").prop("disabled", false);

        } else if (($("#rdo-diy").is(":checked")) && (fittingLocationChanged == true)) {

            openCard("bs_steel_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_steel_tray_card", "form-steel-tray");

            $("#txt-fitting-location").html("Pickup");

            $("#fibreglass_accessories").hide();

            $("#steel_tray_tub_removal_container").hide();
            $("#steel-tub-removal").prop("disabled", true);
            $("#steel_tray_tail_lights_container").hide();
            $("#steel-tail-lights").prop("disabled", true);
            $("#steel_tray_drivetrain_container").hide();
            $("input[name='steel_drivetrain']").prop("disabled", true);

        }

    } else if ($("#rdo-aluminium-tray").is(":checked")) {

        steelTrayIsSelected = false;
        aluminiumTrayIsSelected = true;
        fibreglassCanopyIsSelected = false;

        $("#booking_note").html("<b>NOTE: </b> We only accept 1 booking per day.");

        $("#ipb-icon").removeClass("rdo-disabled-icon");
        $("#ipb-text").removeClass("rdo-disabled");
        $("#diy-icon").removeClass("rdo-disabled-icon");
        $("#diy-text").removeClass("rdo-disabled");
        $("#rdo-installation").prop("disabled", false);
        $("#rdo-diy").prop("disabled", false);

        if (($("#rdo-installation").is(":checked")) && (fittingLocationChanged == true)) {

            $("#txt-fitting-location").html("Fitting");

            openCard("bs_aluminium_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");

            $("#fibreglass_accessories").hide();

            $("#aluminium_tray_tub_removal_container").show();
            $("#steel-tub-removal-premium").prop("disabled", false);
            $("#aluminium_tray_tail_lights_container").show();
            $("#steel-tail-lights-premium").prop("disabled", false);
            $("#aluminium_tray_drivetrain_container").show();
            $("input[name='aluminium_drivetrain']").prop("disabled", false);

        } else if (($("#rdo-diy").is(":checked")) && (fittingLocationChanged == true)) {

            $("#txt-fitting-location").html("Pickup");

            openCard("bs_aluminium_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");

            $("#fibreglass_accessories").hide();

            $("#aluminium_tray_tub_removal_container").hide();
            $("#steel-tub-removal-premium").prop("disabled", true);
            $("#aluminium_tray_tail_lights_container").hide();
            $("#steel-tail-lights-premium").prop("disabled", true);
            $("#aluminium_tray_drivetrain_container").hide();
            $("input[name='aluminium_drivetrain']").prop("disabled", true);

        }


    } else if ($("#rdo-fibreglass-canopy").is(":checked")) {

        steelTrayIsSelected = false;
        aluminiumTrayIsSelected = false;
        fibreglassCanopyIsSelected = true;
        installationAtPiranhaBranchIsSelected = true;

        $("#booking_note").html("<b>NOTE: </b> We only accept 2 bookings per day.");

        $("#ipb-icon").removeClass("rdo-disabled-icon");
        $("#ipb-text").removeClass("rdo-disabled");
        $("#diy-icon").addClass("rdo-disabled-icon");
        $("#diy-text").addClass("rdo-disabled");
        $("#rdo-installation").prop("checked", true);
        $("#rdo-installation").prop("disabled", false);
        $("#rdo-diy").prop("disabled", true);

        if (($("#rdo-installation").is(":checked")) && (fittingLocationChanged == true)) {

            $("#txt-fitting-location").html("Fitting");

            openCard("bs_fibreglass_tray_card", "fibreglass_accessories");
            closeCard();

            disableHiddenFields("bs_fibreglass_tray_card", "form-fibreglass-canopy");

            $("#tray_accessories").hide();
        }
    }

}


function openCard(cardID, accessoryID) {
    $("#bs_personal_information_and_vehicle_information_card").slideDown();
    $("#" + cardID).slideDown();
    $("#" + accessoryID).slideDown();
}

function openTrayCard() {
    var cardIDs = $('input[type=radio][name=quote_product]:checked').attr('data-card');
    $("#" + cardIDs).show();
}

function closeCard() {
    $('input[name="quote_product"]').not(':checked').each(function () {
        var cardIDs = $(this).attr("data-card");
        $("#" + cardIDs).hide();
    });
}

function refreshSlick() {
    $('.mi-slick-this').slick('refresh');
    $('.steel-slider').slick('refresh');
    $('.aluminium-slider').slick('refresh');
    $('.fibreglass-slider').slick('refresh');

    $('.slick-list.draggable').addClass('pb-3');
}

/*** INPUT FIELD CHECKER ***/
function checkField(fieldID) {

    if ($("#" + fieldID).val().length === 0) {
        $("#" + fieldID).addClass("custom-error");
        $("#" + fieldID).prev().addClass("text-danger");
        $("#" + fieldID).next().show();
    } else {
        $("#" + fieldID).removeClass("custom-error");
        $("#" + fieldID).prev().removeClass("text-danger");
        $("#" + fieldID).next().hide();
    }
}
/*** INPUT FIELD CHECKER ***/
function onInputFocusOut(fieldID) {
    $("#" + fieldID).blur(function () {
        checkField(fieldID);
    });
}

/*** DROPDOWN SELECT CHECKER ***/
function dropDownSelect(fieldID) {

    if ($("#" + fieldID + " option:selected").val() === "") {
        $("#" + fieldID).addClass("custom-dropdown-error");
        $("#" + fieldID).prev().addClass("text-danger");
        $("#" + fieldID).next().show();
    } else {
        $("#" + fieldID).removeClass("custom-dropdown-error");
        $("#" + fieldID).prev().removeClass("text-danger");
        $("#" + fieldID).next().hide();
    }

}
/*** DROPDOWN SELECT CHECKER ***/
function dropDownOnChangedEvent(fieldID) {

    $("#" + fieldID).change(function () {
        dropDownSelect(fieldID);
    });

}

function enableViewPrice() {

    $('#btn_view_price').removeAttr('disabled');
    $('#btn_view_price').addClass('btn-custom-active').removeClass('btn-custom-disabled');
    $('#text-price').hide();

}

function disableViewPrice() {

    $('#btn_view_price').attr('disabled', 'disabled');
    $('#btn_view_price').addClass('btn-custom-disabled').removeClass('btn-custom-active');
    $('#text-price').show();
}

function disableHiddenFields(cardID, fieldsetID) {

    if ($("#" + cardID + ":visible").length == 0) {

        $("#" + fieldsetID).prop("disabled", true);

    } else {

        $("#" + fieldsetID).prop("disabled", false);

    }

}

function inputIsFilled() {

    if ((steelTrayIsSelected == true) && (installationAtPiranhaBranchIsSelected == true)) {

        steelInstallation();

    } else if ((steelTrayIsSelected == true) && (diyIsSelected == true)) {

        steelDiy();

    } else if ((aluminiumTrayIsSelected == true) && (installationAtPiranhaBranchIsSelected == true)) {

        aluminiumInstallation();

    } else if ((aluminiumTrayIsSelected == true) && (diyIsSelected == true)) {

        aluminiumDiy();

    } else if ((fibreglassCanopyIsSelected == true) && (installationAtPiranhaBranchIsSelected) == true) {

        fibreglassCanopy();

    }

}

function steelInstallation() {
    // if ((steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (steelTubRemovalIsNotEmpty == true) && (steelTailLightsIsNotEmpty == true) && (steelDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    //     enableViewPrice();
    // } else {
    //     disableViewPrice();
    // }

    if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == true) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (steelTubRemovalIsNotEmpty == true) && (steelTailLightsIsNotEmpty == true) && (steelDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    } else if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == false) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (steelTubRemovalIsNotEmpty == true) && (steelTailLightsIsNotEmpty == true) && (steelDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        disableViewPrice();
    } else if ((noExtraIsSelected == true) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (steelTubRemovalIsNotEmpty == true) && (steelTailLightsIsNotEmpty == true) && (steelDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    } else if ((extrasWithNoSizeIsSelected == true) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (steelTubRemovalIsNotEmpty == true) && (steelTailLightsIsNotEmpty == true) && (steelDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    }
    
    refreshSlick();
    
}

function steelDiy() {
    // if ((steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    //     enableViewPrice();
    // } else {
    //     disableViewPrice();
    // }

    if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == true) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    } else if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == false) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        disableViewPrice();
    } else if ((noExtraIsSelected == true) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    } else if ((extrasWithNoSizeIsSelected == true) && (steelTrayColorIsChecked == true) && (steelTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    }
    
    refreshSlick();
    
}

function aluminiumInstallation() {
    // if ((aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (aluminiumTubRemovalIsNotEmpty == true) && (aluminiumTailLightsIsNotEmpty == true) && (aluminiumDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    //     enableViewPrice();
    // } else {
    //     disableViewPrice();
    // }

    if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == true) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (aluminiumTubRemovalIsNotEmpty == true) && (aluminiumTailLightsIsNotEmpty == true) && (aluminiumDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    } else if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == false) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (aluminiumTubRemovalIsNotEmpty == true) && (aluminiumTailLightsIsNotEmpty == true) && (aluminiumDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        disableViewPrice();
    } else if ((noExtraIsSelected == true) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (aluminiumTubRemovalIsNotEmpty == true) && (aluminiumTailLightsIsNotEmpty == true) && (aluminiumDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    } else if ((extrasWithNoSizeIsSelected == true) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (aluminiumTubRemovalIsNotEmpty == true) && (aluminiumTailLightsIsNotEmpty == true) && (aluminiumDriveTrainIsChecked == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
        enableViewPrice();
    }
    
    refreshSlick();
    
}

function aluminiumDiy() {
    // if ((aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    //     enableViewPrice();
    // } else {
    //     disableViewPrice();
    // }

    if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == true) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    enableViewPrice();
} else if ((extrasWithSizeIsSelected == true) && (traySizeIsFilled == false) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    disableViewPrice();
} else if ((noExtraIsSelected == true) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    enableViewPrice();
} else if ((extrasWithNoSizeIsSelected == true) && (aluminiumTrayColorIsChecked == true) && (aluminiumTraySizeIsNotEmpty == true) && (textFieldIsNotEmpty == true) && (numberFieldIsNotEmpty == true) && (emailFieldIsNotEmpty == true) && (vmakeIsNotEmpty == true) && (vmodelIsNotEmpty == true) && (engineIsChecked == true)) {
    enableViewPrice();
}
    
    refreshSlick();
    
}

function fibreglassCanopy() {
    if ((fibreglassCanopyColorIsChecked == true) && (fibreglassWindowTypeIsNotEmpty == true)) {
        enableViewPrice();
    } else {
        disableViewPrice();
    }
    
    refreshSlick();
    
}

function openWarningPrompt() {
    //bsModal.style.display = "block";
    $(bsModal).slideDown("fast");
}

function closeWarningPrompt() {
    //bsModal.style.display = "none";
    $(bsModal).slideUp("fast");
}

function resetTrayForms() {

    $('select[id^="size-"]').prop('selectedIndex', 0);
    $('input[name="steel-tray-accessories[]"]').prop('checked', false);

    /*** RESET STEEL TRAY ***/
    $('input[name="steel_tray_color"]').prop('checked', false);
    steelTrayColorIsChecked = false;
    $('#steel-tray-size').prop('selectedIndex', 0);
    steelTraySizeIsNotEmpty = false;
    $('#steel-tub-removal').prop('selectedIndex', 0);
    steelTubRemovalIsNotEmpty = false;
    $('#steel-tail-lights').prop('selectedIndex', 0);
    steelTubRemovalIsNotEmpty = false;
    $('input[name="steel_drivetrain"]').prop('checked', false);
    steelDriveTrainIsChecked = false;

    /*** RESET ALUMINIUM TRAY ***/
    $('input[name="aluminium_tray_color"]').prop('checked', false);
    aluminiumTrayColorIsChecked = false;
    $('#aluminium-tray-size').prop('selectedIndex', 0);
    aluminiumTraySizeIsNotEmpty = false;
    $('#steel-tub-removal-premium').prop('selectedIndex', 0);
    aluminiumTubRemovalIsNotEmpty = false;
    $('#steel-tail-lights-premium').prop('selectedIndex', 0);
    aluminiumTailLightsIsNotEmpty = false;
    $('input[name="aluminium_drivetrain"]').prop('checked', false);
    aluminiumDriveTrainIsChecked = false;

    /*** RESET FIBREGLASS CANOPY ***/
    $('#slct_fiberglass_window_type').prop('selectedIndex', 0);
    fibreglassWindowTypeIsNotEmpty = false;
    $('input[name="canopy_color"]').prop('checked', false);
    fibreglassCanopyColorIsChecked = false;

    $('span[id^="sp-"]').hide();
    $('select[id^="size-"]').hide();
    $('input[name="fibreglass-opt-ext[]"]').prop('checked', false);

    disableViewPrice();
}

function enableBlockRadio() {

    if (($("input[name='quote_product']").is(":checked")) && ($("input[name='steel_tray_color']").is(":checked")) || ($("#steel-tray-size option:selected").index() > 0) || ($("#steel-tub-removal option:selected").index() > 0) || ($("#steel-tail-lights option:selected").index() > 0) || ($("#steel_drivetrain").is(":checked")) || ($("input[name='aluminium_tray_color']").is(":checked")) || ($("#aluminium-tray-size option:selected").index() > 0) || ($("#steel-tub-removal-premium option:selected").index() > 0) || ($("#steel-tail-lights-premium option:selected").index() > 0) || ($("#aluminium_drivetrain").is(":checked")) || ($("#slct_fiberglass_window_type option:selected").index() > 0) || ($("input[name='canopy_color']").is(":checked"))) {
        $('.blockradio').addClass("d-block").removeClass('d-none');
    }

}

function traySizeChecker() {

    console.log(state)
  
    var checkCount = 0;

  // Loop every object on the state object
  for (var id in state) {
    
    // If isChecked has true value continue below else go back to loop
    if (!state[id].isChecked) {
      continue;
    }
    
    checkCount += 1;
    
    if (!state[id].isStandalone && !state[id].selectedValue) {
      traySizeIsFilled = false;
      
      return false;
    }
    
    // If selectedValue has value update span#text to true
    traySizeIsFilled = true;
  }

  if (checkCount === 0) {
    traySizeIsFilled = false;
  }

}

function deleteAllProperty() {

    for (var id in state){
        if (state.hasOwnProperty(id)){
            delete state[id];
        }
    }

}

function cSlick() {
	$('.mi-slick-this').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        speed: 200,
        responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}
