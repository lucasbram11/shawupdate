
$(document).ready(function() { 

 if ($.cookie('loginUserCookie')) {
  $("#password_input").focus();
  $("#persistent_check_occ").prop('checked', true);
 }
 
 // Capture "ENTER" Keypress And Submit Form
 $('input').keypress(function (e) {
  if (e.which == 13) {
   $('#signin_submit').trigger('click');
  }
 });

$('#signin_submit').keypress(function (e) {
  if (e.which == 13) {
   $('#signin_submit').trigger('click');
  }
}); 
    
 // Initiates jquery.defaultvalue.js functions to provide functionality to non-HTML5 compliant browsers
// $('#loginform input[type=text], #loginform input[type=password]').defaultValue();
 $("#username_input_occ").val($.cookie("loginUserCookie"));

 
 $("#signin_submit").click(function() {
    
  // Reset Variables & Form Fields
  var fullusername = $("#username_input_occ").val();
  var username = $("#username_input_occ").val().replace(/@.*/, "");
  var password = $("#password_input").val();  
  var errorsDetected = false;
  var errorMsg;
  var errorFields = new Array();
  
  $("#errornotification").html('');
  //$("#errornotification").css('height', '0px');
  
  $(' #signon_form input[type=text], #signon_form input[type=password]').removeClass('error');
    
  // Validate Form (Basic Validation)
  if ( $.trim(username).length === 0 || $.trim(password).length === 0) {
    errorsDetected = true;
    errorMsg = 'Both username and password are required.'
    if ($.trim(username).length === 0) { errorFields.push('#username_input_occ'); }
    if ($.trim(password).length === 0) { errorFields.push('#password_input'); }    
  }  
  
  // Submit Credentials If Validation Passes
  if (!errorsDetected) {
   $.ajax({
           url: "auth.do?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password),
           dataType: 'json',
           timeout: '15000',
           type: 'POST',
           success: function(json) {                           
                                    if (json.preauth) {     
                                     // Remember Username For Next Time
                                     if ($("#persistent_check_occ").is(':checked')) {
                                      $.cookie('loginUserCookie', fullusername, { expires: 30, path: '/' });
                                     } else {
                                      $.removeCookie('loginUserCookie');
                                     }
					$("#loginNORS").val(json.nors);
					$("#loginR").val(json.preauth);
					$("#signon_form_occ").submit();
                                    } else if (json.maintenance) {     
                                          window.location.href = 'maintenance.html';  
                                    } else if (json.deletembox) {     
                                          window.location.href = 'no_mailboxc891.html?uid=' + fullusername;
                                    } else {
                                     errorsDetected = true;
                                     errorMsg = json.error;
                                     errorFields.push('#username_input_occ');
                                     errorFields.push('#password_input');
                                     displayError(errorFields, errorMsg);
                                     enableSigninButton(); 
                                    }
                                    
                                   
    
                                   },
          error: function(bleh, textStatus, errorThrown) {
                              errorsDetected = true;
                              errorMsg = 'Unable to communicate with login server.';
                              displayError(errorFields, errorMsg);
                            }
                            
    });   

  } else {
    // Display The Error Message
    displayError(errorFields, errorMsg);
    
  }
 
 
 }); 
 
 
});


function displayError(errorFields, errorMsg) {

    // Light Up Fields With Errors Present (As defined in errorFields array)
    for(var i in errorFields) {
     $(errorFields[i]).addClass('error');
    }

    // Light Up Fields With Errors Present (As defined in errorFields array)
    for(var i in errorFields) {
     $(errorFields[i]).addClass('error');
    }
    
    $("#error").animate({
     height: '20'
     }, 200, function() {
      // Display The Error Message
      $("#error").html('<img src="images/error_button.png"> ' + errorMsg);
      $("#error").fadeIn('slow', function() {
        // Animation complete
      });     
     });
    

}

