$(document).ready(function(){


	$.validator.addMethod("phone", function(value, element) {
		var re = /[^0-9\-\+\(\)]/;
		return this.optional(element) || !re.test(value.replace(/^\s*|\s*$/g, "")); 
	}, "Only numbers and hyphen allowed");

	var form = $("#survey-form");
	form.validate({
		highlight: function(element) {
		$(element).parents(".sampleform_input ").addClass("error");
    	},
    	unhighlight:function(element){
    		$(element).parents(".sampleform_input ").removeClass("error");
    	},
    	errorPlacement: function(error, element){
    		$(element).parents(".sampleform_input ").append(error);
    	},
		errorElement: "em",
		messages: {
			'Name' : 'Enter your name',
			'Transporter_Company_Name': 'Enter your company name',
			'Mobile_Number' : {
				required : 'Enter your phone number'
			},
			'optradio': 'Choose any one of the button'

		},
	    rules: {
	        'Mobile_Number': {
    			"phone": true
    		},
    		'optradio' : {required :true}
	    }
	});
	form.children("div").steps({
	    headerTag: "h3",
	    bodyTag: "section",
	    transitionEffect: "slideLeft",
	    onStepChanging: function (event, currentIndex, newIndex)
	    {
	        form.validate().settings.ignore = ":disabled,:hidden";
	        return form.valid();
	    },
	    onFinishing: function (event, currentIndex)
	    {
	        form.validate().settings.ignore = ":disabled";
	        return form.valid();
	    },
	    onFinished: function (event, currentIndex)
	    {
	        // alert("Submitted!");
	        setTimeout(function(){
				$('#survey-form').fadeOut()
				$('.thank-you').fadeIn();
	        },400)
	    }
	});
	
	// Showing the form by clicking the start button
	$('.survey_btn').on('click',function(){
		$('.index-page').fadeOut();
		$('#survey-form').fadeIn()
	})

	setTimeout(function(){
		$('.actions li a').each(function(){
			if($(this).attr('href').match('#previous')){$(this).addClass('icon-left').text('')}
			if($(this).attr('href').match('#next')){$(this).addClass('icon-right').text('')}	
		});
	},300)

	$('.survey-wrapper#steps-uid-0-p-3 .survey-list').hide();


	// Showing appropriate sub-contents when clicking the radio button
	$('input[name="optradio"]').change(function(){
		var checkedValue = $('input[name="optradio"]:checked').data('radio')
		$('.survey-wrapper#steps-uid-0-p-3 .survey-list').hide();
		$('#'+checkedValue).show();
		setTimeout(function(){
			$('.actions li a.icon-right').trigger('click')
		},300)
	})

})