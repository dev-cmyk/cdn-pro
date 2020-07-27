
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

jQuery(function (jQuery) {

    jQuery(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    if (jQuery(window).width() < 768) {
        jQuery("#div-slick-container").removeClass("mi-slick-this");
        jQuery("#tacc-container").hide();
    } else {
        jQuery("#div-slick-container").addClass("mi-slick-this");
    }

    jQuery('#personal_info input').prop('required', true);
    jQuery('#date_time_fieldset input').prop('required', true);

    jQuery('#tswitch').click(function(){
        if(jQuery(this).prop("checked") == true){
            jQuery("#tacc-container").show();
        }
        else if(jQuery(this).prop("checked") == false){
            jQuery("#tacc-container").hide();
        }
    });

    /*** HIDE CARDS ***/
    jQuery("#bs_personal_information_and_vehicle_information_card").hide();
    jQuery("#bs_steel_tray_card").hide();
    jQuery("#bs_aluminium_tray_card").hide();
    jQuery("#bs_fibreglass_tray_card").hide();


    /*** HIDE ACCESSORIES ***/
    jQuery("#tray_accessories").hide();
    jQuery("#fibreglass_accessories").hide();


    /*** HIDE FIBREGLASS CANOPY DECKTYPE ***/
    jQuery("#fibreglass_decktype_container").hide();
    jQuery("#input_painted_field_container").hide();

    /*** HIDE PRICE PANEL ***/
    jQuery("#bs_price_panel").hide();


    /*** OPTIONAL EXTRAS SLICK SLIDER ***/
    cSlick();

    jQuery('.steel-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: true,
        onInit: function() {
            jQuery('.current').text('1');
        },
        onAfterChange: function() {
            jQuery('.current').text(jQuery('.slides').slickCurrentSlide()+1);
        }
    });

    jQuery('.aluminium-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: true,
        onInit: function() {
            jQuery('.current').text('1');
        },
        onAfterChange: function() {
            jQuery('.current').text(jQuery('.slides').slickCurrentSlide()+1);
        }
    });

    jQuery('.fibreglass-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: true,
        onInit: function() {
            jQuery('.current').text('1');
        },
        onAfterChange: function() {
            jQuery('.current').text(jQuery('.slides').slickCurrentSlide()+1);
        }
    });

    jQuery("#fitting_location").prop("required", true);

    jQuery('#fbg-color-link').click(function() {
        jQuery(".fbg-modal").slideDown("fast");
    });

    jQuery('#fbg-modal-color').click(function() {
        jQuery(this).slideUp("fast");
    });

    jQuery("#slct-booking-location").change(function () {
        fittingLocationChanged = true;
        productSelection();
        refreshSlick();
    });

    //STEEL UTE TRAY
    jQuery("input[name='steel_tray_color']").click(function () {
        enableBlockRadio();
    });
    jQuery("#steel-tray-size").click(function () {
        enableBlockRadio();
    });
    jQuery("#steel-tub-removal").click(function () {
        enableBlockRadio();
    });
    jQuery("#steel-tail-lights").click(function () {
        enableBlockRadio();
    });
    jQuery("input[name='steel_drivetrain']").click(function () {
        enableBlockRadio();
    });
    //ALUMINIUm UTE TRAY
    jQuery("input[name='aluminium_tray_color']").click(function () {
        enableBlockRadio();
    });
    jQuery("#aluminium-tray-size").click(function () {
        enableBlockRadio();
    });
    jQuery("#steel-tub-removal").click(function () {
        enableBlockRadio();
    });
    jQuery("#steel-tail-lights-premium").click(function () {
        enableBlockRadio();
    });
    jQuery("input[name='aluminium_drivetrain']").click(function () {
        enableBlockRadio();
    });
    //FIBREGLASS CANOPY
    jQuery("input[name='deck_type']").click(function () {
        enableBlockRadio();
    });
    jQuery("#slct_fiberglass_window_type").click(function () {
        enableBlockRadio();
    });
    jQuery("input[name='canopy_color']").click(function () {
        enableBlockRadio();
    });

    jQuery('.blockradio').click(function () {
        var getRadio = jQuery(this).text();
        openWarningPrompt();

        jQuery("#warning_confirm").click(function () {
            jQuery('input[name="quote_product"][value="' + getRadio + '"]').prop('checked', true);
            resetTrayForms();
            traySizeChecker();
            inputIsFilled();
            closeWarningPrompt();
            openTrayCard();
            closeCard();
            productSelection();
            jQuery('.blockradio').addClass('d-none').removeClass('d-block');

            disableHiddenFields("bs_steel_tray_card", "form-steel-tray");
            disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");
            disableHiddenFields("bs_fibreglass_tray_card", "form-fibreglass-canopy");

            jQuery("#form-steel-tray, #form-aluminium-tray, #form-fibreglass-canopy, #form-tray-accessories, #fibreglass_canopy_accessory_fieldset").removeAttr('disabled');
            jQuery('#btn_view_price').show();
            jQuery('#bs_price_panel').slideUp();
            jQuery('#div-calendar').hide();
            jQuery('#div-accessories').empty();
            jQuery('#proceed-btn').css('display', 'block');

            refreshSlick();
        });

        jQuery("#warning_cancel").click(function () {
            closeWarningPrompt();
        });
    });

    jQuery("input[name='steel-tray-accessories[]']").click(function () {
        traySizeIsFilled = false;
        // Define variable for checkbox id
        var targetId = jQuery(this).data('target-id');
        var isStandalone = jQuery(this).data('standalone');
        
        // Check if checkbox has been added to the state object
        if (!state.hasOwnProperty(targetId)) {
            state[targetId] = {};
        } else {
            delete state[targetId].selectedValue;
        }
        
        // Update true/false on the state object
        // ex: isChecked: true
        state[targetId].isChecked = jQuery(this).is(':checked');
        state[targetId].isStandalone = !!isStandalone;
        
        // Function for checking and updating span#text
        traySizeChecker();
        console.log("traySizeChecker: " + traySizeIsFilled);

        var chkds = jQuery("input[name='steel-tray-accessories[]']:checkbox");

        setTimeout(function () {

            if (chkds.is(":checked") && (!jQuery('select[id^="size-"]').is(":visible"))) {

                extrasWithNoSizeIsSelected = true;
                extrasWithSizeIsSelected = false;
                noExtraIsSelected = false;
                traySizeIsFilled = false;


            } else if (chkds.is(":checked") && (jQuery('select[id^="size-"]').is(":visible"))) {

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

    jQuery('select[id^="size-"]').change(function() {

        // Define variable for checkbox id
        var targetId = jQuery(this).data('target-id');
        
        // Check if dropdown value has been added to the state object
        if (!state.hasOwnProperty(targetId)) {
            state[targetId] = {};
        }
        
        // Update value on the state object
        // ex: selectedValue: "2"
        state[targetId].selectedValue = jQuery(this).val();
        
        // Function for checking and updating span#text
        traySizeChecker();
        inputIsFilled();
        console.log("traySizeChecker: " + traySizeIsFilled);

    });

    jQuery("input[name='installation']").click(function () {

        if (jQuery("#rdo-installation").prop("checked")) {
            installationAtPiranhaBranchIsSelected = true;
            diyIsSelected = false;
            disableViewPrice();
        } else if (jQuery("#rdo-diy").prop("checked")) {
            installationAtPiranhaBranchIsSelected = false;
            diyIsSelected = true;
            disableViewPrice();
        }

        productSelection();

    });

    /*** FIBREGLASS CANOPY COLOR ***/
    jQuery("input[name='canopy_color']").click(function () {

        if ((jQuery('#radio_fibreglass_primered').is(':checked')) || (jQuery('#radio_fibreglass_painted').is(':checked'))) {

            fibreglassCanopyColorIsChecked = true;

            inputIsFilled();

        } else {

            fibreglassCanopyColorIsChecked = false;

        }

    });

    /*** STEEL TRAY COLOR RADIO ***/
    jQuery("input[name='steel_tray_color']").click(function () {

        /*** STEEL TRAY COLOR RADIO ***/
        if ((jQuery('#rdo-steel-black').is(':checked')) || (jQuery('#rdo-steel-white').is(':checked'))) {

            jQuery("#rdo-steel-black").next().removeClass("custom-error");
            jQuery("#rdo-steel-white").next().removeClass("custom-error");
            jQuery("#steel_tray_color_heading").removeClass("text-danger");
            jQuery("#steel_tray_color_validator").hide();

            steelTrayColorIsChecked = true;

            inputIsFilled();

        } else {

            steelTrayColorIsChecked = false;

        }

    });

    /*** ALUMINIUM TRAY COLOR RADIO ***/
    jQuery("input[name='aluminium_tray_color']").click(function () {

        /*** ALUMINIUM TRAY COLOR RADIO ***/
        if ((jQuery('#rdo-aluminium-black').is(':checked')) || (jQuery('#rdo-aluminium-mill').is(':checked'))) {

            jQuery("#rdo-aluminium-black").next().removeClass("custom-error");
            jQuery("#rdo-aluminium-mill").next().removeClass("custom-error");
            jQuery("#aluminium_tray_color_heading").removeClass("text-danger");
            jQuery("#aluminium_tray_color_validator").hide();

            aluminiumTrayColorIsChecked = true;

            inputIsFilled();

        } else {

            aluminiumTrayColorIsChecked = false;

        }

    });

    /*** STEEL TRAY DRIVETRAIN IS CHECKED ***/
    jQuery("input[name='steel_drivetrain']").click(function () {

        /*** STEEL TRAY DRIVETRAIN IS CHECKED ***/
        if ((jQuery('#rdo-steel-2wd').is(':checked')) || (jQuery('#rdo-steel-4wd').is(':checked'))) {

            jQuery("#steel_tray_drivetrain_heading").removeClass("text-danger");
            jQuery("#steel_tray_drivetrain_validator").hide();

            jQuery("#rdo-steel-2wd").removeClass("custom-radio-error");
            jQuery("#rdo-steel-2wd").next().removeClass("text-danger");

            jQuery("#rdo-steel-4wd").removeClass("custom-radio-error");
            jQuery("#rdo-steel-4wd").next().removeClass("text-danger");

            steelDriveTrainIsChecked = true;

            inputIsFilled();

        } else {

            steelDriveTrainIsChecked = false;

        }

    });

    /*** ALUMINIUM TRAY DRIVETRAIN IS CHECKED ***/
    jQuery("input[name='aluminium_drivetrain']").click(function () {

        /*** ALUMINIUM TRAY DRIVETRAIN IS CHECKED ***/
        if ((jQuery('#rdo-aluminium-2wd').is(':checked')) || (jQuery('#rdo-aluminium-4wd').is(':checked'))) {

            jQuery("#aluminium_tray_drivetrain_container").removeClass("text-danger");
            jQuery("#aluminium_tray_drivetrain_validator").hide();

            jQuery("#rdo-aluminium-2wd").removeClass("custom-radio-error");
            jQuery("#rdo-aluminium-2wd").next().removeClass("text-danger");

            jQuery("#rdo-aluminium-4wd").removeClass("custom-radio-error");
            jQuery("#rdo-aluminium-4wd").next().removeClass("text-danger");

            aluminiumDriveTrainIsChecked = true;

            inputIsFilled();

        } else {

            aluminiumDriveTrainIsChecked = false;

        }

    });

    jQuery("input[type='radio']").click(function () {

        /*** PRODUCT SELECTION ***/
        productSelection();

        /*** FIBREGLASS CANOPY PAINT INPUT FIELD ***/
        jQuery("#radio_fibreglass_painted").prop("checked") ? jQuery("#input_painted_field_container").show() : jQuery("#input_painted_field_container").hide();

        if (jQuery("#rdo-petrol").prop("checked") || jQuery("#rdo-diesel").prop("checked")) {

            jQuery("#engine_heading").removeClass("text-danger");
            jQuery("#engine_radio_validator").hide();

            jQuery("#rdo-petrol").removeClass("custom-radio-error");
            jQuery("#rdo-petrol").next().removeClass("text-danger");

            jQuery("#rdo-diesel").removeClass("custom-radio-error");
            jQuery("#rdo-diesel").next().removeClass("text-danger");

            engineIsChecked = true;

            inputIsFilled();

        } else {

            engineIsChecked = false;

        }

    });


    jQuery("#btn_view_price").click(function () {

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


    jQuery("input[type='text']").blur(function () {

        if ((jQuery("#first_name").val() != "") && (jQuery("#last_name").val() != "")) {

            textFieldIsNotEmpty = true;

        } else {

            textFieldIsNotEmpty = false;

        }

        inputIsFilled();

    });

    jQuery("input[type='number']").blur(function () {

        if ((jQuery("#c_phone").val() != "") && (jQuery("#c_postcode").val() != "") && (jQuery("#v_year").val() != "")) {

            numberFieldIsNotEmpty = true;

        } else {

            numberFieldIsNotEmpty = false;

        }

        inputIsFilled();

    });

    jQuery("input[type='email']").blur(function () {

        if ((jQuery("#c_email").val() != "")) {

            emailFieldIsNotEmpty = true;

        } else {

            emailFieldIsNotEmpty = false;

        }

        inputIsFilled();

    });

    jQuery("#v_make").change(function () {

        if (jQuery("#v_make option:selected").val() === "") {

            vmakeIsNotEmpty = false;

        } else {

            vmakeIsNotEmpty = true;

        }

        inputIsFilled();

    });

    jQuery("#v_model").change(function () {

        if (jQuery("#v_model option:selected").val() === "") {

            vmodelIsNotEmpty = false;

        } else {

            vmodelIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** STEEL TRAY SIZE ***/
    jQuery("#steel-tray-size").change(function () {

        if (jQuery("#steel-tray-size option:selected").val() === "") {

            steelTraySizeIsNotEmpty = false;

        } else {

            steelTraySizeIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** ALUMINIYM TRAY SIZE ***/
    jQuery("#aluminium-tray-size").change(function () {

        if (jQuery("#aluminium-tray-size option:selected").val() === "") {

            aluminiumTraySizeIsNotEmpty = false;

        } else {

            aluminiumTraySizeIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** STEEL TUB REMOVAL ***/
    jQuery("#steel-tub-removal").change(function () {

        if (jQuery("#steel-tub-removal option:selected").val() === "") {

            steelTubRemovalIsNotEmpty = false;

        } else {

            steelTubRemovalIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** ALUMINIUM TUB REMOVAL ***/
    jQuery("#steel-tub-removal-premium").change(function () {

        if (jQuery("#steel-tub-removal-premium option:selected").val() === "") {

            aluminiumTubRemovalIsNotEmpty = false;

        } else {

            aluminiumTubRemovalIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** STEEL TAIL LIGHTS ***/
    jQuery("#steel-tail-lights").change(function () {

        if (jQuery("#steel-tail-lights option:selected").val() === "") {

            steelTailLightsIsNotEmpty = false;

        } else {

            steelTailLightsIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** ALUMINIUM TAIL LIGHTS ***/
    jQuery("#steel-tail-lights-premium").change(function () {

        if (jQuery("#steel-tail-lights-premium option:selected").val() === "") {

            aluminiumTailLightsIsNotEmpty = false;

        } else {

            aluminiumTailLightsIsNotEmpty = true;

        }

        inputIsFilled();

    });

    /*** FIBREGLASS CANOPY WINDOW TYPE ***/
    jQuery("#slct_fiberglass_window_type").change(function () {

        if (jQuery("#slct_fiberglass_window_type option:selected").val() === "") {

            fibreglassWindowTypeIsNotEmpty = false;

        } else {

            fibreglassWindowTypeIsNotEmpty = true;

        }

        inputIsFilled();

    });


});


/*** PRODUCT SELECTION ***/
function productSelection() {

    if (jQuery("#rdo-steel-tray").is(":checked")) {

        jQuery("#booking_note").html("<b>NOTE: </b> We only accept 1 booking per day.");

        steelTrayIsSelected = true;
        aluminiumTrayIsSelected = false;
        fibreglassCanopyIsSelected = false;

        jQuery("#ipb-icon").removeClass("rdo-disabled-icon");
        jQuery("#ipb-text").removeClass("rdo-disabled");
        jQuery("#diy-icon").removeClass("rdo-disabled-icon");
        jQuery("#diy-text").removeClass("rdo-disabled");
        jQuery("#rdo-installation").prop("disabled", false);
        jQuery("#rdo-diy").prop("disabled", false);

        if ((jQuery("#rdo-installation").is(":checked")) && (fittingLocationChanged == true)) {

            openCard("bs_steel_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_steel_tray_card", "form-steel-tray");

            jQuery("#txt-fitting-location").html("Fitting");

            jQuery("#fibreglass_accessories").hide();

            jQuery("#steel_tray_tub_removal_container").show();
            jQuery("#steel-tub-removal").prop("disabled", false);
            jQuery("#steel_tray_tail_lights_container").show();
            jQuery("#steel-tail-lights").prop("disabled", false);
            jQuery("#steel_tray_drivetrain_container").show();
            jQuery("input[name='steel_drivetrain']").prop("disabled", false);

        } else if ((jQuery("#rdo-diy").is(":checked")) && (fittingLocationChanged == true)) {

            openCard("bs_steel_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_steel_tray_card", "form-steel-tray");

            jQuery("#txt-fitting-location").html("Pickup");

            jQuery("#fibreglass_accessories").hide();

            jQuery("#steel_tray_tub_removal_container").hide();
            jQuery("#steel-tub-removal").prop("disabled", true);
            jQuery("#steel_tray_tail_lights_container").hide();
            jQuery("#steel-tail-lights").prop("disabled", true);
            jQuery("#steel_tray_drivetrain_container").hide();
            jQuery("input[name='steel_drivetrain']").prop("disabled", true);

        }

    } else if (jQuery("#rdo-aluminium-tray").is(":checked")) {

        steelTrayIsSelected = false;
        aluminiumTrayIsSelected = true;
        fibreglassCanopyIsSelected = false;

        jQuery("#booking_note").html("<b>NOTE: </b> We only accept 1 booking per day.");

        jQuery("#ipb-icon").removeClass("rdo-disabled-icon");
        jQuery("#ipb-text").removeClass("rdo-disabled");
        jQuery("#diy-icon").removeClass("rdo-disabled-icon");
        jQuery("#diy-text").removeClass("rdo-disabled");
        jQuery("#rdo-installation").prop("disabled", false);
        jQuery("#rdo-diy").prop("disabled", false);

        if ((jQuery("#rdo-installation").is(":checked")) && (fittingLocationChanged == true)) {

            jQuery("#txt-fitting-location").html("Fitting");

            openCard("bs_aluminium_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");

            jQuery("#fibreglass_accessories").hide();

            jQuery("#aluminium_tray_tub_removal_container").show();
            jQuery("#steel-tub-removal-premium").prop("disabled", false);
            jQuery("#aluminium_tray_tail_lights_container").show();
            jQuery("#steel-tail-lights-premium").prop("disabled", false);
            jQuery("#aluminium_tray_drivetrain_container").show();
            jQuery("input[name='aluminium_drivetrain']").prop("disabled", false);

        } else if ((jQuery("#rdo-diy").is(":checked")) && (fittingLocationChanged == true)) {

            jQuery("#txt-fitting-location").html("Pickup");

            openCard("bs_aluminium_tray_card", "tray_accessories");
            closeCard();
            refreshSlick();

            disableHiddenFields("bs_aluminium_tray_card", "form-aluminium-tray");

            jQuery("#fibreglass_accessories").hide();

            jQuery("#aluminium_tray_tub_removal_container").hide();
            jQuery("#steel-tub-removal-premium").prop("disabled", true);
            jQuery("#aluminium_tray_tail_lights_container").hide();
            jQuery("#steel-tail-lights-premium").prop("disabled", true);
            jQuery("#aluminium_tray_drivetrain_container").hide();
            jQuery("input[name='aluminium_drivetrain']").prop("disabled", true);

        }


    } else if (jQuery("#rdo-fibreglass-canopy").is(":checked")) {

        steelTrayIsSelected = false;
        aluminiumTrayIsSelected = false;
        fibreglassCanopyIsSelected = true;
        installationAtPiranhaBranchIsSelected = true;

        jQuery("#booking_note").html("<b>NOTE: </b> We only accept 2 bookings per day.");

        jQuery("#ipb-icon").removeClass("rdo-disabled-icon");
        jQuery("#ipb-text").removeClass("rdo-disabled");
        jQuery("#diy-icon").addClass("rdo-disabled-icon");
        jQuery("#diy-text").addClass("rdo-disabled");
        jQuery("#rdo-installation").prop("checked", true);
        jQuery("#rdo-installation").prop("disabled", false);
        jQuery("#rdo-diy").prop("disabled", true);

        if ((jQuery("#rdo-installation").is(":checked")) && (fittingLocationChanged == true)) {

            jQuery("#txt-fitting-location").html("Fitting");

            openCard("bs_fibreglass_tray_card", "fibreglass_accessories");
            closeCard();

            disableHiddenFields("bs_fibreglass_tray_card", "form-fibreglass-canopy");

            jQuery("#tray_accessories").hide();
        }
    }

}


function openCard(cardID, accessoryID) {
    jQuery("#bs_personal_information_and_vehicle_information_card").slideDown();
    jQuery("#" + cardID).slideDown();
    jQuery("#" + accessoryID).slideDown();
}

function openTrayCard() {
    var cardIDs = jQuery('input[type=radio][name=quote_product]:checked').attr('data-card');
    jQuery("#" + cardIDs).show();
}

function closeCard() {
    jQuery('input[name="quote_product"]').not(':checked').each(function () {
        var cardIDs = jQuery(this).attr("data-card");
        jQuery("#" + cardIDs).hide();
    });
}

function refreshSlick() {
    jQuery('.mi-slick-this').slick('refresh');
    jQuery('.steel-slider').slick('refresh');
    jQuery('.aluminium-slider').slick('refresh');
    jQuery('.fibreglass-slider').slick('refresh');

    jQuery('.slick-list.draggable').addClass('pb-3');
}

/*** INPUT FIELD CHECKER ***/
function checkField(fieldID) {

    if (jQuery("#" + fieldID).val().length === 0) {
        jQuery("#" + fieldID).addClass("custom-error");
        jQuery("#" + fieldID).prev().addClass("text-danger");
        jQuery("#" + fieldID).next().show();
    } else {
        jQuery("#" + fieldID).removeClass("custom-error");
        jQuery("#" + fieldID).prev().removeClass("text-danger");
        jQuery("#" + fieldID).next().hide();
    }
}
/*** INPUT FIELD CHECKER ***/
function onInputFocusOut(fieldID) {
    jQuery("#" + fieldID).blur(function () {
        checkField(fieldID);
    });
}

/*** DROPDOWN SELECT CHECKER ***/
function dropDownSelect(fieldID) {

    if (jQuery("#" + fieldID + " option:selected").val() === "") {
        jQuery("#" + fieldID).addClass("custom-dropdown-error");
        jQuery("#" + fieldID).prev().addClass("text-danger");
        jQuery("#" + fieldID).next().show();
    } else {
        jQuery("#" + fieldID).removeClass("custom-dropdown-error");
        jQuery("#" + fieldID).prev().removeClass("text-danger");
        jQuery("#" + fieldID).next().hide();
    }

}
/*** DROPDOWN SELECT CHECKER ***/
function dropDownOnChangedEvent(fieldID) {

    jQuery("#" + fieldID).change(function () {
        dropDownSelect(fieldID);
    });

}

function enableViewPrice() {

    jQuery('#btn_view_price').removeAttr('disabled');
    jQuery('#btn_view_price').addClass('btn-custom-active').removeClass('btn-custom-disabled');
    jQuery('#text-price').hide();

}

function disableViewPrice() {

    jQuery('#btn_view_price').attr('disabled', 'disabled');
    jQuery('#btn_view_price').addClass('btn-custom-disabled').removeClass('btn-custom-active');
    jQuery('#text-price').show();
}

function disableHiddenFields(cardID, fieldsetID) {

    if (jQuery("#" + cardID + ":visible").length == 0) {

        jQuery("#" + fieldsetID).prop("disabled", true);

    } else {

        jQuery("#" + fieldsetID).prop("disabled", false);

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
    jQuery(bsModal).slideDown("fast");
}

function closeWarningPrompt() {
    //bsModal.style.display = "none";
    jQuery(bsModal).slideUp("fast");
}

function resetTrayForms() {

    jQuery('select[id^="size-"]').prop('selectedIndex', 0);
    jQuery('input[name="steel-tray-accessories[]"]').prop('checked', false);

    /*** RESET STEEL TRAY ***/
    jQuery('input[name="steel_tray_color"]').prop('checked', false);
    steelTrayColorIsChecked = false;
    jQuery('#steel-tray-size').prop('selectedIndex', 0);
    steelTraySizeIsNotEmpty = false;
    jQuery('#steel-tub-removal').prop('selectedIndex', 0);
    steelTubRemovalIsNotEmpty = false;
    jQuery('#steel-tail-lights').prop('selectedIndex', 0);
    steelTubRemovalIsNotEmpty = false;
    jQuery('input[name="steel_drivetrain"]').prop('checked', false);
    steelDriveTrainIsChecked = false;

    /*** RESET ALUMINIUM TRAY ***/
    jQuery('input[name="aluminium_tray_color"]').prop('checked', false);
    aluminiumTrayColorIsChecked = false;
    jQuery('#aluminium-tray-size').prop('selectedIndex', 0);
    aluminiumTraySizeIsNotEmpty = false;
    jQuery('#steel-tub-removal-premium').prop('selectedIndex', 0);
    aluminiumTubRemovalIsNotEmpty = false;
    jQuery('#steel-tail-lights-premium').prop('selectedIndex', 0);
    aluminiumTailLightsIsNotEmpty = false;
    jQuery('input[name="aluminium_drivetrain"]').prop('checked', false);
    aluminiumDriveTrainIsChecked = false;

    /*** RESET FIBREGLASS CANOPY ***/
    jQuery('#slct_fiberglass_window_type').prop('selectedIndex', 0);
    fibreglassWindowTypeIsNotEmpty = false;
    jQuery('input[name="canopy_color"]').prop('checked', false);
    fibreglassCanopyColorIsChecked = false;

    jQuery('span[id^="sp-"]').hide();
    jQuery('select[id^="size-"]').hide();
    jQuery('input[name="fibreglass-opt-ext[]"]').prop('checked', false);

    disableViewPrice();
}

function enableBlockRadio() {

    if ((jQuery("input[name='quote_product']").is(":checked")) && (jQuery("input[name='steel_tray_color']").is(":checked")) || (jQuery("#steel-tray-size option:selected").index() > 0) || (jQuery("#steel-tub-removal option:selected").index() > 0) || (jQuery("#steel-tail-lights option:selected").index() > 0) || (jQuery("#steel_drivetrain").is(":checked")) || (jQuery("input[name='aluminium_tray_color']").is(":checked")) || (jQuery("#aluminium-tray-size option:selected").index() > 0) || (jQuery("#steel-tub-removal-premium option:selected").index() > 0) || (jQuery("#steel-tail-lights-premium option:selected").index() > 0) || (jQuery("#aluminium_drivetrain").is(":checked")) || (jQuery("#slct_fiberglass_window_type option:selected").index() > 0) || (jQuery("input[name='canopy_color']").is(":checked"))) {
        jQuery('.blockradio').addClass("d-block").removeClass('d-none');
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
	jQuery('.mi-slick-this').slick({
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
