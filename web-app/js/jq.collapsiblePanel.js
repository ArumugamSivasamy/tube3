(function($) {
	$.fn.extend({
		collapsiblePanel : function(options) {
			return $(this).each(ConfigureCollapsiblePanel);
		}
	});
})(jQuery);

function ConfigureCollapsiblePanel() {
	$('.checkbox_input').click(function(event) {
		if ($(event.currentTarget).attr('checked')) {
			$(event.currentTarget).attr('value', true);
		} else {
			$(event.currentTarget).attr('value', false);
		}
	});

	$(this).addClass("panel panel-default");
	var ccc = $(this)
			.children()
			.wrapAll("<div class='collapsibleContainerContent panel-body' />");

	var aa = $("<div>").addClass('titleBar panel-heading').prependTo($(this));
	
	$(".title_actions:first", $(this)).children().appendTo(aa);
	aa.find("Input").each( function() {
		if ($(this).attr("on_Init")) {
			me = $(this);
			eval($(this).attr("on_Init"));
		}
	});
	
	var bb = aa.prepend($("<div class=\"titleText\">" + $(this).attr("title") + "</div>"));
	bb.click(CollapsibleContainerTitleOnClick);

	var cc = $("<div>").appendTo(aa);
	cc.addClass("btn-group btn-group-sm pull-right");

	var dd = $("<div>").appendTo(aa);
	dd.addClass("btn-group btn-group-sm pull-right");

	if ($(".title_actions:first > p", this).length) {
		$(".title_actions:first > p", this).each(
		function(index) {
			if ($(this).attr("on_Click").length) {
				var button = $("<input type=\"submit\"></input>").appendTo(cc);
				
				button.addClass("btn btn-default button").addClass($(this).text());
				button.attr("name", $(this).text());
				button.attr("value", $(this).text());

				button.attr('on_Click', $(this).attr("on_Click"));
				button.attr('action_url', $(this).attr("url"));
				button.attr('id', $(this).attr("id"));
				button.addClass('ui-state-active ui-state-hover');
				button.click(cp_onClickHandler);

				if ($(this).attr("on_Init")) {
					//alert($(this).text() + " has " + $(this).attr("on_Init") + " for on_Init");
					me = $(this);
					eval($(this).attr("on_Init"));
				}
				button.clone(true).appendTo(dd);
			}
		});
	}

	$(".collapsibleContainerContent:first .cp_content", $(this)).each(
		function(index) {
			if ($(this).attr("on_Init") && $(this).attr("on_Init").length) {
				me = $(this);
				eval($(this).attr("on_Init"));
			}
	});

	/* Disable all input fields during the loading */
	$('input', $(this)).addClass('ui-state-default');
	$('select', $(this)).addClass('ui-state-default');

	$(".collapsibleContainerContent Input", $(this)).each(
			function(index) {
				if ($(this).hasClass("user_modified")) {
					$(this).removeClass('user_modified').addClass('user_modified');
				}
			});

	/*
	 * The following function stores all the old values, which will be needed
	 * when the Cancel action is invoked
	 */
	if ($(this).attr("on_Init")) {
		//alert($(this) + " has " + $(this).attr("on_Init") + " for on_Init");
		eval($(this).attr("on_Init"));
	}
	/*
	$(this).bind('keypress', function(e) {
		cp_handleKeyPressEvent(e)
	});
	*/
	
	$("input:text", $(this)).each(function() {
		var el = $(this);
		$(el).data('oldVal', $(el).val());
		$(el).change(function() {
			// store new value
			if (!$(this).hasClass("field_modified")) {
				$(this).addClass("field_modified")
				if ($(this).attr('name').substring(0, 10) == "attribute_") {
					$(this).attr('name', $(this).attr('name') + "_modified")
                }
                var $this = $(this);
                var newValue = $this.data('newVal', $this.val());
                var oldValue = $(this).data('oldVal');
			}
		}).focus(function() {
			// Get the value when input gains focus
			var oldValue = $(this).data('oldVal');
		});
	});

    $("input:radio", $(this)).each(function() {
        var el = $(this);
        if ( $(el).attr('checked') ) {
        	$(el).data('oldVal', true)
        } else {
        	$(el).data('oldVal', false)
        }
        //alert((el).attr('name') + ' **** ' + $(el).attr('checked') + ' **** ' + $(el).val() + ' *** ' + $(el).data('oldVal') )
        $(el).change(function() {
            alert((el).attr('name') + ' **** ' + $(el).attr('checked') + ' **** ' + $(el).val() + ' *** ' + $(el).data('oldVal') )
            // store new value
            if (!el.hasClass("field_modified")) {
                el.addClass("field_modified")
                if (el.attr('name').substring(0, 10) == "attribute_") {
                    var name = el.attr('name')
                    var newName  = name + "_modified"
                    $('input[name=' + name + ']').each ( function() {
                    	$(this).attr('name', newName);
                        //var $this = $(this);
                        //var newValue = $this.data('newVal', $this.attr('checked'));
                        //var oldValue = $(this).data('oldVal');
                    });
                }
            }
        }).focus(function() {
            // Get the value when input gains focus
            var oldValue = $(this).data('oldVal');
        });
    });

    $("input:checkbox", $(this)).each(function() {
        var el = $(this);
        if ( $(el).attr('checked') ) {
        	$(el).data('oldVal', true)
        } else {
        	$(el).data('oldVal', false)
        }
        $(el).change(function() {
            // store new value
            if (!el.hasClass("field_modified")) {
                el.addClass("field_modified")
                if (el.attr('name').substring(0, 10) == "attribute_") {
                    el.attr('name', el.attr('name') + "_modified")
                }
                var $this = $(this);
                var newValue = $this.data('newVal', $this.attr('checked'));
                var oldValue = $(this).data('oldVal');
            }
        }).focus(function() {
            // Get the value when input gains focus
            var oldValue = $(this).data('oldVal');
        });
    });
	
	$("select", $(this)).each(function() {
		var el = $(this);
		$(el).data('oldVal', $(el).val());
		$(el).change(function() {
			// store new value
			if (!el.hasClass("field_modified")) {
				el.addClass("field_modified")
				if (el.attr('name').substring(0, 10) == "attribute_") {
					el.attr('name', el.attr('name') + "_modified")
				}

                var $this = $(this);
                var newValue = $this.data('newVal', $this.val());
                var oldValue = $(this).data('oldVal');
			}
		}).focus(function() {
			// Get the value when input gains focus
			var oldValue = $(this).data('oldVal');
		});
	});
	
	$("textarea", $(this)).each(function() {
		var el = $(this);
		$(el).data('oldVal', $(el).val());
		$(el).change(function() {
			// store new value
			if (!$(this).hasClass("field_modified")) {
				$(this).addClass("field_modified")
				if ($(this).attr('name').substring(0, 10) == "attribute_") {
					$(this).attr('name', $(this).attr('name') + "_modified")
                }
                var $this = $(this);
                var newValue = $this.data('newVal', $this.val());
                var oldValue = $(this).data('oldVal');
			}
		}).focus(function() {
			// Get the value when input gains focus
			var oldValue = $(this).data('oldVal');
		});
	});
	
	
	$(this).attr("title", "")
	
	
}


function cp_reload() {
	//alert(window.location)
	//alert(self.location)
	//location.reload();
	//location.reload(true)
	//window.location = self.location
	//window.location.reload(true);
	//return true;
	parent.location.reload();
}

function CollapsibleContainerTitleOnClick(event) {
	// The item clicked is the title div... get this parent (the overall
	// container) and toggle the content within it.
	//alert("in CollapsibleContainerTitleOnClick");
	if ($(this).hasClass("ui-corner-top")) {
		$(this).removeClass("ui-corner-top")
		$(this).parent().removeClass("ui-corner-top")
	} else {
		$(this).addClass("ui-corner-top")
		$(this).parent().addClass("ui-corner-top")
	}
	$(".collapsibleContainerContent", $(this).parent()).slideToggle();
	event.preventDefault();
	event.stopPropagation();
}

function cp_hide(obj) {
	if (obj.hasClass('ui-state-active')) {
		obj.removeClass('ui-state-active').addClass('ui-state-disabled');
	}
	if ( $(obj).attr('type') == "submit") {
		$(obj).attr("disabled", true)
	}
}

function cp_enabledOnEdit(obj) {
	if (obj.hasClass('ui-state-active')) {
		obj.removeClass('ui-state-active').addClass('ui-state-disabled no-display displayOnEditMode');
	}
	if ( $(obj).attr('type') == "submit") {
		$(obj).attr("disabled", true)
	}
}


function cp_enableInputs(obj) {
	// obj is conatiner class dom
	obj.find('.cp_content input').not(
			obj.find('.cp_content .has_own_edit  input')).each(function(index) {
				if ( !$(this).hasClass("no_edit") ) {
					$(this).attr("disabled", false).attr("readonly", false).removeClass('ui-state-disabled');
				}
	});
	obj.find('.cp_content select').not(
			obj.find('.cp_content .has_own_edit select')).each(function(index) {
				if ( !$(this).hasClass("no_edit") ) {
					$(this).attr("readonly", false).removeClass('ui-state-disabled').attr("disabled", false);
				}
	});
	obj.find('.cp_content textarea').not(
			obj.find('.cp_content .has_own_edit  textarea')).each(function(index) {
				if ( !$(this).hasClass("no_edit") ) {
					$(this).attr("readonly", false).removeClass('ui-state-disabled');
				}
	});
	$(".link", obj).removeClass('inactive_link');
	$(".radio_options input").button("enable")
}

function cp_disableInputs(obj) {
	$("input:not(.button)", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default');
	$("input:checkbox", obj).attr("disabled", "disabled")
	$("select", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default').attr("disabled", "disabled");
	//$("textarea", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default');
	//$("textarea", obj).attr("disabled","disabled")
	$("input.deleteSelected").hide();
	$(".link", obj).addClass('inactive_link');
	$("input:radio ", obj).attr("disabled", "disabled")
	//$(".radio_options input").button("disable")
	
	$("th input", obj).attr("readonly", false).attr("disabled", false).removeClass('ui-state-disabled ui-state-default');
}

function cp_onClickHandler(event) {
	//alert("before calling: " + $(event.currentTarget).attr('on_Click'));
	if ($(event.currentTarget).attr('on_Click')
			&& $(event.currentTarget).hasClass('ui-state-active')) {
		eval($(event.currentTarget).attr('on_Click'));
	}
	event.stopPropagation();
}

function cp_startEdit(event, button) {
	
	var currentButtons = $(event.currentTarget).closest(".titleBar").find('.button');
	currentButtons.each(
		function(index) {
			//alert ($(this).attr("class"));
			if ($(this).hasClass('displayOnEditMode') && $(this).hasClass('ui-state-disabled') ) {
				$(this).addClass('ui-state-active')
					.removeClass('ui-state-disabled')
					.removeClass('no-display')
					.attr('disabled', false);
				
				if ($(this).attr('name') == 'save') {
					$(this).attr('action_url', $(event.currentTarget).attr('action_url'))
				}
				
				if ($(event.currentTarget).hasClass('edit')) {
					cp_enableInputs($(event.currentTarget).parent().parent().parent());
					$(event.currentTarget).parent().parent().parent().addClass('in_edit_mode');
					$(event.currentTarget).parent().parent().parent().data('lastButtonId', $(event.currentTarget).attr('id'));
				}
			} else {
				$(this).removeClass('ui-state-active').addClass('ui-state-disabled enabled_on_save').attr('disabled', true)
			}
		});

	/* disable children action buttons */
	var parentButtons = $(event.currentTarget).parents('.collapsibleContainer');
	parentButtons.each( function(index) {
		$('.titleBar .buttons .button', $(this)).not(currentButtons).each( function(index) {
			if (! $(this).hasClass('ui-state-disabled') ) {
				$(this).removeClass('ui-state-active').addClass('ui-state-disabled enabled_on_save').attr('disabled', true)
			}
		});
	});
	
	event.stopPropagation();
}

function cp_save(event) {
	event.stopPropagation();
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		var cp = $(event.currentTarget).parent().parent().parent();
		//alert($(event.currentTarget).parent().attr('class'));
		//alert($(event.currentTarget).parent().parent().attr('class'));
		//alert(cp.attr('id'));
		
		//var formObj = cp.find('.collapsibleContainerContent .cp_content :input')
		//						.not(cp.find('.collapsibleContainer .collapsibleContainerContent .cp_content :input'));
		//
		//formObj = 	
		
		var formdata = cp
				.find('.collapsibleContainerContent .cp_content :input')
				.not(cp.find('.collapsibleContainer .collapsibleContainerContent .cp_content :input'))
				.serialize();
		var urlAction = $(event.currentTarget).attr('action_url')
		//alert("formdata: " + formdata);
		//alert("formid is : " + " :Input" + " - url:" + urlAction);		

		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			data : formdata,
			success : function(data, textStatus, jqXHR) {
				$(event.currentTarget).removeClass('ui-state-active').addClass(
						'ui-state-disabled');
				//alert("1" + data);
				cp_disableInputs($(this));
				location.reload(true);
				//cp_trigger(event, '#' + cp.parent().attr('id') )
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("jqXHR= " + jqXHR.responseText + ")")
				alert("textStatus= " + textStatus + ", errorThrown= " + errorThrown);
				//location.reload(true);
			}
		});
	}
}

function cp_cancelEdit(event) {
	event.stopPropagation();
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		location.reload(true);
		/*
		var cp = $(event.currentTarget).parent().parent().parent();
		var urlAction = $(event.currentTarget).attr('action_url')
		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			success : function(data, textStatus, jqXHR) {
				$(event.currentTarget).removeClass('ui-state-active').addClass('ui-state-disabled');
				cp_disableInputs($(this));
				location.reload(true);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("jqXHR= " + jqXHR.responseText + ", textStatus= "
						+ textStatus + ", errorThrown= " + errorThrown);
			}
		});
		*/
	}
}

function cp_saveAndRefresh(event, refreshDivId) {
	
	//alert("In cp_save: " + $(event.currentTarget).attr('class'));
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		var cp = $(event.currentTarget).parent().parent().parent();
		//alert($(event.currentTarget).parent().attr('class'));
		//alert($(event.currentTarget).parent().parent().attr('class'));
		//alert(cp.attr('id'));
		var formdata = cp
				.find('.collapsibleContainerContent .cp_content :input')
				.not(
						cp
								.find('.collapsibleContainer .collapsibleContainerContent .cp_content :input'))
				.serialize();
		//alert("formdata: " + formdata);
		var urlAction = $(event.currentTarget).attr('action_url')
		//alert("formid is : " + " :Input" + " - url:" + urlAction);

		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			data : formdata,
			success : function(data, textStatus, jqXHR) {
				$(event.currentTarget).removeClass('ui-state-active').addClass(
						'ui-state-disabled');
				
				$(refreshDivId, cp).html(data);
				
				cp.find('.collapsibleContainerContent').each( function(index) {
					//alert($(this).attr("class"));
					cp_disableInputs($(this));
					$('.displayGroup', $(this)).fieldsetgroup();
				} );				
				
				$('.enabled_on_save').addClass('ui-state-active').removeClass('ui-state-disabled ').attr('disabled', false);
				
				//alert("Data: " + data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert( $(refreshDivId, cp).attr("id") )
				alert("jqXHR= " + jqXHR.responseText + ", textStatus= "
						+ textStatus + ", errorThrown= " + errorThrown);
				//location.reload(true);
			}
		});
	}
}


function cp_get(event) {
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		var urlAction = $(event.currentTarget).attr('action_url')
		//alert(urlAction);
		jQuery('<form action="'+ urlAction +'" method="get"></form>').appendTo('body').submit().remove();
	}
};

function cp_redirect(event) {
	event.stopPropagation();
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		//alert($(event.currentTarget).attr("name"))
		
		var urlAction = $(event.currentTarget).attr('action_url')
		var cp = $(event.currentTarget).parent().parent().parent();
		if ($(cp).hasClass('collapsibleContainer in_edit_mode')) {
			var c = confirm('Are you sure, to cancel your changes?');
			if (c) {
				window.location.href = urlAction;
			}
		} else if (urlAction) { 
			window.location.href = urlAction;
		}
	}
	
	return;
}

function cp_submitForm(event) {
	//alert($(event.currentTarget).attr("name"))
	//if ($(event.currentTarget).hasClass('ui-state-active')) {
		var formName = "#" + $(event.currentTarget).attr("name") + "-form"
		var dialogFormName = formName; // + "-copy"
		var dialogForm = $(formName)
		var width = dialogForm.attr("width")
		var height = dialogForm.attr("height")
		if (!width) { width = 400 }
		if (!height) { height = 400 }
		
		//alert(formName)
		//$(dialogForm).attr('name', $(event.currentTarget).attr("name") + "-form-copy")
		//$(dialogForm).attr('id', $(event.currentTarget).attr("name") + "-form-copy")
		//$(".datePicker", $(dialogForm)).datepicker( { minDate: "+3d"} ) 
		var urlAction = $(event.currentTarget).attr('action_url')
		
		
		var defButtons = {
			"Submit": function() {
				var posting = $.ajax( {			
					type: 'POST',
					url: urlAction,
					data: $(dialogFormName + " :Input").serialize(),
					success: function(data, textStatus, jqXHR) {
						//alert("Submitted successfully");
						window.location.reload(false)
					}, 
					error: function( jqXHR, textStatus, errorThrown ) {	
						alert("Unable to submit this change. Try later");
					}
				});
				$( this ).dialog( "close" ); 
			},
			"Cancel": function() {
				$( this ).dialog( "close" );
			}
		};
		
		var defOptions = {
			autoOpen: false,
			title: $(dialogFormName).attr('title'),
			modal: true,
			width: width,
	        height: height,
			buttons: defButtons,
			close: function() { 
				//$( dialogFormName ).remove();
				$( this ).dialog( "close" ); 
			}
		};
		
		$(dialogFormName).dialog(defOptions).dialog("open");
		//$(createBugFormDiv).destroy()
	//}
	return;
}

function cp_submitBsForm(event) {
	var formName = "#" + $(event.currentTarget).attr("name") + "-form"
	var $dialogForm = $(formName).clone(true);
	var width = $dialogForm.attr("width")
	var height = $dialogForm.attr("height")
	var urlAction = $(event.currentTarget).attr("action_url")
	
	$dialogForm.children().wrapAll('<div id="b1" class="modal-body"></div>');
	var $mcb = $dialogForm.children().wrapAll('<div class="modal-dialog"><div class="modal-content"></div></div>');
	var $mch = $('<div id="h1" class="modal-header"></div>');
	var	$mcf = $('<div id="f1" class="modal-footer"></div>');
	
	$mch.append($('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'));
	$mch.append($('<h4 class="modal-title">' + $dialogForm.attr("title") + '</h4>'));
	
	var $btnSave = $('<button type="button" class="btn btn-primary">Save</button>');
	var $btnClose = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>')
	$mcf.append($btnClose).append($btnSave);
	
	$btnClose.click( function() {
		//window.location.reload(false);
		//alert("on close button click")
		//$dialogForm.remove();
	});
		
	$btnSave.click( function() {
		var $formData = new FormData($dialogForm[0]);
		var posting = $.ajax( {			
			type: 'POST',
			cache: false,
            contentType: false,
            processData: false,
			url: urlAction,
			data: $formData,//$dialogForm.find("select,textarea, input").serialize(),
			beforeSend: function(){
			     $('#mainspinner').show();
			},
			success: function(data, textStatus, jqXHR) {
				//alert("Submitted successfully");
				 $('#mainspinner').hide();
				location.reload(true);
				
				if (data.redirect) {
		            // data.redirect contains the string URL to redirect to
				    window.location.href = data.redirect;
		        } else {
		        	$btnClose.trigger("click");
		        }
				//window.location.reload(false);
			}, 
			error: function( jqXHR, textStatus, errorThrown ) {	
				 $('#mainspinner').hide();
				alert("Unable to submit this change. Try later");
			}
		});		
		//$dialogForm.remove();
	});
	
	$mcb.before($mch).after($mcf)
	
	$dialogForm.on('hidden.bs.modal', function (e) {
		$dialogForm.remove();
	});

				
	$dialogForm
		.addClass("modal fade")
		.modal();
	
	return;
}

function cp_submitBsFormForFile(event) {
	var formName = "#" + $(event.currentTarget).attr("name") + "-form"
	var $dialogForm = $(formName).clone(true);
	var width = $dialogForm.attr("width")
	var height = $dialogForm.attr("height")
	var urlAction = $(event.currentTarget).attr('action_url')
	
	$dialogForm.children().wrapAll('<div id="b1" class="modal-body"></div>');
	var $mcb = $dialogForm.children().wrapAll('<div class="modal-dialog"><div class="modal-content"></div></div>');
	var $mch = $('<div id="h1" class="modal-header"></div>');
	var	$mcf = $('<div id="f1" class="modal-footer"></div>');
	
	$mch.append($('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'));
	$mch.append($('<h4 class="modal-title">' + $dialogForm.attr("title") + '</h4>'));
	
	var $btnSave = $('<button type="button" class="btn btn-primary">Save changes</button>');
	var $btnClose = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>')
	$mcf.append($btnClose).append($btnSave);
	
	$btnClose.click( function() {
		//alert("on close button click")
		//$dialogForm.remove();
	});
	
	$btnSave.click( function() {
		var $formData = new FormData($dialogForm[0]);
		var posting = $.ajax( {			
			type: 'POST',
			url: urlAction,
			cache: false,
            contentType: false,
            processData: false,
			//data: $dialogForm.find("select,textarea, input").serialize(),
            data: $formData,
			success: function(data, textStatus, jqXHR) {
				//alert("Submitted successfully");
				$btnClose.trigger("click");
				window.location.reload(false);
			}, 
			error: function( jqXHR, textStatus, errorThrown ) {	
				alert("Unable to submit this change. Try later");
				alert(errorThrown + textStatus);
			}
		});		
		//$dialogForm.remove();
	});
	
	$mcb.before($mch).after($mcf)
	
	$dialogForm.on('hidden.bs.modal', function (e) {
		$dialogForm.remove();
	});

				
	$dialogForm
		.addClass("modal fade")
		.modal();
	
	return;
}

function cp_remotecall(event, reload, refreshDivId) {
	
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		var cp = $(event.currentTarget).parent().parent().parent();
		var formdata = cp
				.find('.collapsibleContainerContent .cp_content :input')
				.not( cp.find('.collapsibleContainer .collapsibleContainerContent .cp_content :input'))
				.serialize();
		var urlAction = $(event.currentTarget).attr('action_url')
		
		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			data : formdata,
			success : function(data, textStatus, jqXHR) {
				$(event.currentTarget).focusout();
				var toRedirect = jqXHR.getResponseHeader("REQUIRES_AUTH")
				if (toRedirect == "1") {
					location.reload(true);
		        } else if (reload) {
					location.reload(true);
				} else {
					$(refreshDivId, cp).html(data);
					$('.collapsibleContainer', $(refreshDivId)).collapsiblePanel();
					cp.find('.collapsibleContainerContent').each( function(index) {
						cp_disableInputs($(this));
						$('.displayGroup', $(this)).fieldsetgroup();
						$('.auto-numeric', $(this)).autoNumeric('init', {aSep: ',', aDec: '.'});
					} );			
					//alert(refreshDivId);
					$(event.currentTarget).trigger("blur");
					$(refreshDivId).trigger("click");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Erorr in processing request\n" + errorThrown);
			}
		});
	}
	event.stopPropagation();

}


function cp_startDelete(event) {
	// alert("In cp_startDelete: " + $(event.currentTarget).attr('class'));

	var currentButtons = $(event.currentTarget).parent().find('.button');
	currentButtons.each(
		function(index) {
			if ($(this).hasClass('displayOnEditMode') && $(this).hasClass('ui-state-disabled') ) {
				$(this).addClass('ui-state-active')
					.removeClass('ui-state-disabled')
					.removeClass('no-display')
					.attr('disabled', false);
				
				if ($(this).attr('name') == 'save') {
					$(this).attr('action_url', $(event.currentTarget).attr('action_url'))
				}
				if ($(event.currentTarget).hasClass('delete')) {
					$("input.deleteSelected", $(event.currentTarget).parent().parent().parent())
						.attr("disabled", false)
						.attr("readonly", false)
						.show();
					$(event.currentTarget).parent().parent().parent().addClass('in_edit_mode');
					$(event.currentTarget).parent().parent().parent().data('lastButtonId', $(event.currentTarget).attr('id'));
				}
			} else {
				$(this).removeClass('ui-state-active').addClass('ui-state-disabled enabled_on_save').attr('disabled', true)
			}
		});

	/* disable children action buttons */
	var parentButtons = $(event.currentTarget).parents('.collapsibleContainer');
	parentButtons.each( function(index) {
		$('.titleBar .buttons .button', $(this)).not(currentButtons).each( function(index) {
			if (! $(this).hasClass('ui-state-disabled') ) {
				$(this).removeClass('ui-state-active').addClass('ui-state-disabled enabled_on_save').attr('disabled', true)
			}
		});
	});
	
	event.stopPropagation();
}

function cp_delete(event) {
	
	var c = confirm('Are you sure?');

	if (c) {
	if ($(event.currentTarget).hasClass('ui-state-active')) {
		var cp = $(event.currentTarget).parent().parent().parent();
		var formdata = cp
				.find('.collapsibleContainerContent .cp_content :input')
				.not(cp.find('.collapsibleContainer .collapsibleContainerContent .cp_content :input'))
				.serialize();

		var cpContent = cp
				.find('.collapsibleContainerContent .cp_content #id')
				.not(
						cp
								.find('.collapsibleContainer .collapsibleContainerContent .cp_content #id'));
		var urlAction = $(event.currentTarget).attr('action_url')

		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			data : formdata,
			success : function(data, textStatus, jqXHR) {
				$(event.currentTarget).removeClass('ui-state-active').addClass(
						'ui-state-disabled');
				cp_disableInputs($(this));
				location.reload();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("jqXHR= " + jqXHR.responseText + ", textStatus= "
						+ textStatus + ", errorThrown= " + errorThrown);
			}
		});
	}
	}
}

function CollapsibleContainerButtonOnClick(event) {
	//alert($(event.currentTarget).attr('class'));
	if ($(event.currentTarget).hasClass('edit')) {
		var roContent = $(event.currentTarget).parent().parent().parent()
				.parent().find(
						'.collapsibleContainerContent > .readonly_content')
		var editContent = $(event.currentTarget).parent().parent().parent()
				.parent().find('.collapsibleContainerContent > .edit_content');
		roContent.hide();
		editContent.show();

		$(event.currentTarget).removeClass("edit").addClass("save");
		$(event.currentTarget.firstChild).replaceWith(
				"<div>" + "Save" + "</div>");
		$(event.currentTarget).val("save");
	} else if ($(event.currentTarget).hasClass('save')) {

		var roContent = $(event.currentTarget).parent().parent().parent()
				.parent().find(
						'.collapsibleContainerContent > .readonly_content')
		var editContent = $(event.currentTarget).parent().parent().parent()
				.parent().find('.collapsibleContainerContent > .edit_content');

		var formId = editContent.attr('Id')
		var url = "/VyoogERP/template/get/1"
		var urlAction = editContent.attr('action')
		//alert("formid is : " + "#" + formId + " :Input" + " - url:" + urlAction);
		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			data : $("#" + formId + " :Input").serialize(),
			success : function(data, textStatus, jqXHR) {
				alert("DONE:" + data.templateInstance.id);
				location.reload();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("jqXHR= " + jqXHR.responseText + ", textStatus= "
						+ textStatus + ", errorThrown= " + errorThrown);
			}
		});

		editContent.hide();
		roContent.show();

		$(event.currentTarget).removeClass("save");
		$(event.currentTarget).addClass("edit");
		$(event.currentTarget.firstChild).replaceWith(
				"<div>" + "Edit" + "</div>");
		$(event.currentTarget).val("edit");
	}
	event.stopPropagation();
}

function openModalDialog(event, dialogBoxId) {
	alert("hello" + dialogBoxId);
	$('#' + dialogBoxId).dialog("open");
	event.stopPropagation();
}


function cp_adjTextboxWidth(obj) {
	var w = 0;
	$("input[type=text]", obj).each( function(index ) {
		//alert($(this).position().left + " -- " + $(this).offset().left)
		if (w < $(this).offset().left) {
			w = $(this).offset().left
		}
	} );

	$("input[type=text]", obj).each( function(index ) {
		var p = $(this).offset();
		p.left = w;
		$(this).offset(p);
	} );
}

function cp_trigger(event, destId){
	if (!destId) {
		return;
	}

	$(this).parents("ul.nav").find(".active").removeClass("active");
	$(this).parents("li").addClass("active");
	$('div.linked-tabs').hide();
	$(destId).show();
	$(destId).find(".linked-tabs").show();
	$(destId).parents(".linked-tabs").show();	
}

/*
function cp_handleKeyPressEvent(e) {
	if(e.keyCode == 27) {		//Escape key is pressed. Cancel edit and reload
		var c = confirm('Are you sure, to cancel your changes?');
		if (c) {
			cp_cancelAndRefreshFromCache()
		}
	}
}
*/

function cp_cancelAndRefreshFromCache() {
	$('.collapsibleContainer').each( function(indx) {
		
		if ($(this).hasClass('in_edit_mode')) {
			
			cp_disableInputs($(this))
			$('.enabled_on_save').addClass('ui-state-active').removeClass('ui-state-disabled ').attr('disabled', false);
			$('.displayOnEditMode', $(this)).removeClass('ui-state-active').addClass('no-display').addClass('ui-state-disabled ').attr('disabled', true);
			
			$(document.activeElement).trigger('change')
			//$ ( '#' + $(this).data('lastButtonId'), $(this) ).focus()
			$('input:text.field_modified', $(this)).each( function(indx) {
				$(this).val($(this).data('oldVal'))
				$(this).data('newVal', '');
				var name = $(this).attr('name')
				if ( name.substring(0, 10) == "attribute_" && name.substring(name.length, name.length - 9) == "_modified") {
					$(this).attr('name', name.substring(0, name.length - 9))
				}
				$(this).removeClass('field_modified')
				
			});		
			
			$('input:radio.field_modified', $(this)).each( function(indx) {
				var name = $(this).attr('name')
				if ( name.substring(0, 10) == "attribute_" && name.substring(name.length, name.length - 9) == "_modified") {
					$('input[name=' + name + ']').each ( function() {
						if ( $(this).data('oldVal') ) {
							$(this).attr('checked', true)
						}
					});
					$('input[name=' + name + ']').each ( function() {
						$(this).attr('name', name.substring(0, name.length - 9))
					});
				}
				$(this).removeClass('field_modified')
			});
			
			$('input:checkbox.field_modified', $(this)).each( function(indx) {
				$(this).attr('checked', $(this).data('oldVal'))
				$(this).data('newVal', '');
				var name = $(this).attr('name')
				if ( name.substring(0, 10) == "attribute_" && name.substring(name.length, name.length - 9) == "_modified") {
					$(this).attr('name', name.substring(0, name.length - 9))
				}
				$(this).removeClass('field_modified')
			});
				
			$('select.field_modified', $(this)).each( function(indx) {
				$(this).val($(this).data('oldVal'))
				$(this).data('newVal', '');
				var name = $(this).attr('name')
				if ( name.substring(0, 10) == "attribute_" && name.substring(name.length, name.length - 9) == "_modified") {
					$(this).attr('name', name.substring(0, name.length - 9))
				}
				$(this).removeClass('field_modified')
			});
		}
	});
	
	//if ( $(e.target).hasClass("button save") ) {
	//	var cancelConfirm = confirm('Are you sure to cancel your edit?');
	//	if (cancelConfirm) {
	//		//cp_reload();
	//	}
	//}
}

function cp_cancelAndRefreshFromCache2(obj) {
	$(obj).each( function(indx) {
		
		if ($(this).hasClass('in_edit_mode')) {
			cp_disableInputs($(this))
			$('.enabled_on_save', $(this)).addClass('ui-state-active').removeClass('ui-state-disabled ').attr('disabled', false);
			$(document.activeElement).trigger('change')
			//$ ( '#' + $(this).data('lastButtonId'), $(this) ).focus()
			
			$('input.field_modified', $(this)).each( function(indx) {
				$(this).val($(this).data('oldVal'))
				$(this).data('newVal', '');
				var name = $(this).attr('name')
				if ( name.substring(0, 10) == "attribute_" && name.substring(name.length, name.length - 9) == "_modified") {
					alert (name.substring(0, name.length - 9) )
					alert ( $(this).attr('name') )
					$(this).attr('name', name.substring(0, name.length - 9))
					alert ( $(this).attr('name') )
				}
				$(this).removeClass('field_modified')
				
			});
			
			$('select.field_modified', $(this)).each( function(indx) {
				$(this).val($(this).data('oldVal'))
				$(this).data('newVal', '');
				var name = $(this).attr('name')
				if ( name.substring(0, 10) == "attribute_" && name.substring(name.length, name.length - 9) == "_modified") {
					alert ( $(this).attr('name') )
					$(this).attr('name', name.substring(0, name.length - 9))
					alert ( $(this).attr('name') )
				}
				$(this).removeClass('field_modified')
			});
		}
	});
}
