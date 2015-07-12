/**		File		:		myvyoog_panel.js
*		Author		:
*		CreatedDate	:
*		LastUpdated	:	
*		CurrentVersion	:	0.1
**/

/**		Global variables
 *
 **/
/*******************************************************************************/
/*                    Company Name  : Vyoog Information Pvt Ltd                */
/*                    MyVyoog       : MyVyoog2			                       */
/*                    File Name     :myvyoog_panel.js                         */
/*                    Update By     : Arumugam	                               */
/*               Last Update Date   : 28-05-2014      
 * 						Changes		: Commented Plus button trigger Lines(87,95)*/
/*******************************************************************************/
/* 
 * MY VYOOG WIDGET PLUGIN
 * ----------------------
 * This plugin uses the bootstrap panel.
 * It adds the button to the panel header and controls the panel-body or panel-content
 * 
 * USAGE:
 *  $(".myvyoog-panel").panel( options );
 * */

function cp_onClickHandler(event) {
	//alert("before calling: " + $(event.currentTarget).attr('on_Click'));
	if ($(event.currentTarget).attr('on_Click')
			&& $(event.currentTarget).hasClass('ui-state-active')) {
		eval($(event.currentTarget).attr('on_Click'));
	}
	event.stopPropagation();
}

function cp_disableInputs(obj) {
	$("input:not(.button)", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default');
	$("input:checkbox", obj).attr("disabled", "disabled");
	$("input:text", obj).attr("disabled", "disabled");
	$("select", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default').attr("disabled", "disabled");
	$("input.disableSubmit", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default').attr("disabled", "disabled");
	$("textarea", obj).attr("readonly", true).addClass('ui-state-disabled ui-state-default');
	$("input.deleteSelected").hide();
	$(".link", obj).addClass('inactive_link');
	$("input:radio ", obj).attr("disabled", "disabled")
	$(".radio_options input").button("disable")
	$("th input", obj).attr("readonly", false).attr("disabled", false).removeClass('ui-state-disabled ui-state-default');
	$(".button[data-showOnEdit]", obj).each( function() {
		$(this).addClass("ui-state-disabled").hide();
	})
	
	//$("div.editAlways", obj).each( function() {
	//	cp_enableInputs($(this))
	//});
}

function cp_enableInputs(obj) {
	// obj is conatiner class dom
	obj.find('.panel-body input').not(
			obj.find('.panel-body .myvyoog-panel input')).each(function(index) {
				if ( !$(this).hasClass("no_edit") ) {
					$(this).attr("disabled", false).attr("readonly", false).removeClass('ui-state-disabled');
				}
	});
	obj.find('.panel-body select').not(
			obj.find('.panel-body .myvyoog-panel select')).each(function(index) {
				if ( !$(this).hasClass("no_edit") ) {
					$(this).attr("readonly", false).removeClass('ui-state-disabled').attr("disabled", false);
				}
	});
	obj.find('.panel-body textarea').not(
			obj.find('.panel-body .myvyoog-panel textarea')).each(function(index) {
				if ( !$(this).hasClass("no_edit") ) {
					$(this).attr("readonly", false).removeClass('ui-state-disabled');
				}
	});
	$(".link", obj).removeClass('inactive_link');
	$(".radio_options input").button("enable")
}


function cp_startEdit(event, button) {
	var currentButtons = $(event.currentTarget).closest(".panel-actions").find('.button');
	currentButtons.each(
		function(index) {
			if ( ( $(this).attr('data-showOnEdit') === "#" + $(event.currentTarget).attr("id") ) && $(this).hasClass('ui-state-disabled') ) {
				$(this).addClass('ui-state-active')
					.removeClass('ui-state-disabled no-display')
					.attr('disabled', false)
					.show();
				$('textarea').removeClass('ui-state-disabled ui-state-default')
				.attr('disabled', false)
				.show();
				if ($(this).attr('name') == 'save') {
					$(this).attr('action_url', $(event.currentTarget).attr('action_url'))
				}
				
				if ($(event.currentTarget).hasClass('edit')) {
					cp_enableInputs($(event.currentTarget).closest(".mvg-panel"));
					$(event.currentTarget).parent().parent().parent().addClass('in_edit_mode');
					$(event.currentTarget).parent().parent().parent().data('lastButtonId', $(event.currentTarget).attr('id'));
				}
			} else {
				$(this).removeClass('ui-state-active').addClass('ui-state-disabled enabled_on_save').attr('disabled', true)
			}
		});

	/* disable children action buttons */
	var parentButtons = $(event.currentTarget).parents('.mvg-panel');
	parentButtons.each( function(index) {
		$('.panel-actions .buttons .button', $(this)).not(currentButtons).each( function(index) {
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
		var cp = $(event.currentTarget).closest(".mvg-panel");
		//var formObj = cp.find('.collapsibleContainerContent .cp_content :input')
		//						.not(cp.find('.collapsibleContainer .collapsibleContainerContent .cp_content :input'));
		//
		//formObj = 	
		
		var formdata = cp
				.find('.panel-body :input')
				.not( cp.find('.panel-body .mvg-panel :input' ) )
				.serialize();
		var urlAction = $(event.currentTarget).attr('action_url')
		console.log("form data "+formdata);
		//alert("formid is : " + " :Input" + " - url:" + urlAction);		

		var posting = $.ajax({
			type : 'POST',
			url : urlAction,
			data : formdata,
			success : function(data, textStatus, jqXHR) {
				$(event.currentTarget).removeClass('ui-state-active').addClass('ui-state-disabled');
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

(function($) {
    "use strict";
    
    

    $.fn.vygPanel = function(options) {
        // Render options
        var settings = $.extend({
            inEditMode		: false,
            onLoadStart		: function(panel) {
            }, 												// Before the loading starts..
            onLoadComplete	: function(panel) {
            } 												// After the data has been loaded
        }, options);

        //The overlay
        var overlay = $('<div class="overlay"></div><div class="loading-img"></div>');
        return this.each(function() {
        	var initUrl = settings.initUrl
        	var panelName = $(this).attr("data-panelName")
        	if (initUrl === "") {
        		initUrl = $(this).attr("data-initUrl")
        	}
                if (initUrl === "") {
                if (console) {
                    console.log("Please specify a source first - panelRefresh()");
                }
                return;
            }
        	
            //the panel
            var $panel = $(this);
            
            // handle refresh button click
            /*
            $refreshBtn.click(function(e) {
                e.preventDefault();
                //Add loading overlay
                start($panel);
                //Perform ajax call
                
                /-*
                if (initUrl) {
	                $panel.find(".panel-content").load(initUrl, {"panel": true, "panelName": panelName}, function() {
	                    done($panel);
	                });
                } else {
                	done($panel)
                }
                *-/
            });
            */
            
            /*
            // handle refresh button click
            $closeBtn.click(function(e) {
                e.preventDefault();
                $panel.slideUp();
            });
            */
            
    		/* Add the onClick handlers for the buttons */
            $(".panel-actions:first .button", this).each( function(index) {
            	if ( $(this).attr("on_Click")) {
    				var button = $("<input type=\"submit\"></input>").appendTo(cc);
    				button.addClass("btn btn-default").addClass($(this).text());
    				button.attr("name", $(this).text());
    				button.attr("value", $(this).text());
    				button.attr('on_Click', $(this).attr("on_Click"));
    				button.attr('action_url', $(this).attr("url"));
    				button.attr('id', $(this).attr("id"));
    				button.addClass('ui-state-active ui-state-hover');
    				button.click(cp_onClickHandler);

    				if ($(this).attr("on_Init")) {
    					alert($(this).text() + " has " + $(this).attr("on_Init") + " for on_Init");
    					me = $(this);
    					eval($(this).attr("on_Init"));
    				}
    				button.clone(true).appendTo(dd);
    			}
    		});
    		
            start($panel);
            /*
            //Perform ajax call
            if (initUrl) {
            	$panel.find(".panel-content").load(initUrl, {"panel": true, "panelName": panelName}, function() {
            		done($panel);
            	});
            } else {
            	done($panel)
            }
            */
        });
            
        function start(panel) {
    		//Add overlay and loading img
            //panel.append(overlay);
        	
        	cp_disableInputs(panel)
    		settings.onLoadStart.call(panel);
        }

        function done(panel) {
        	//Remove overlay and loading img
        	panel.find(overlay).remove();
        	settings.onLoadComplete.call(panel);
        }
        
        function startEditMode(panel) {
        }
        
    };
    
})(jQuery);
