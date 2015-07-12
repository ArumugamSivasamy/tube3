(
function($) {
	$.fn.fieldsetgroup = function(options){
		var setting={collapsed:false};
		$.extend(setting, options);
		this.each(function(){
			var fieldset=$(this);
			fieldset.addClass("panel panel-perf");
			
			var groupTitle = $(this).attr('title');			
			$(this).attr('title', '');
			var fieldsetBody = $(this).children().wrapAll("<div class='panel-body'>").parent();
			
			var fieldSetTitle;
			if (groupTitle) {
				fieldSetTitle = $("<div class='panel-heading'><span>" + groupTitle + "</span></div>").prependTo($(this));
			}
			
			$(".displayGroupActions", fieldset).insertAfter($(".panel-heading span", fieldset))
			
			if(fieldSetTitle) {
				fieldSetTitle.click( function() {
					var fieldset=$(this).closest(".displayGroup");
					if (fieldset.hasClass('collapsed')) {
						fieldset.removeClass("collapsed").addClass("expanded");
					} else {
						fieldset.removeClass("expanded").addClass("collapsed");						
					}
				});
			}
		
			/*
			if (setting.collapsed == true) {
				fieldset.addClass('collapsed').removeClass("expanded");
			} else {
				fieldset.addClass('expanded').removeClass("collapsed");
			}
			*/
		});
	}
}
)(jQuery);