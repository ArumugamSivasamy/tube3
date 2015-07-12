/*
$(document).ready(function() {
    renderCalendar();
    setupDatePickers();
    setupRecurOptions();
    setupRecurSavePopups();
});
 */
// Calculate Business Days excluding weekends
function calcBusinessDays(dDate1, dDate2) { // input given as Date objects
	var arrayDates = [];
	var iWeeks, iDateDiff, iAdjust = 0;
	if (dDate2 < dDate1)
		return -1; // error code if dates transposed
	var iWeekday1 = dDate1.getDay(); // day of week
	console.log("Day1 " + iWeekday1);
	var iWeekday2 = dDate2.getDay();
	console.log("Day2 " + iWeekday2);
	iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
	iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
	if ((iWeekday1 > 5) && (iWeekday2 > 5))
		iAdjust = 1; // adjustment if both days on weekend
	iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
	iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

	// calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days =
	// 604800000)
	iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)
	console.log("Weeks " + iWeeks);
	if (iWeekday1 <= iWeekday2) {
		iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
	} else {
		iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
	}
	console.log("Weekday1 " + iWeekday1);
	console.log("Weekday2 " + iWeekday2);
	iDateDiff -= iAdjust // take into account both days on weekend
	var hour1 = dDate1.getHours();
	var hour2 = dDate2.getHours();
	if (hour1 < hour2) {
		finalhours = hour2 - hour1;
	} else {
		finalhours = (hour2 + 24) - hour1;
	}
	var holidays = 0;
	var date1Hours = 0;
	var date2Hours = 0;
	// alert(finalhours);
	for (var i = 0; i < arrayDates.length; i++) {
		if (arrayDates[i] >= dDate1.getTime()
				&& arrayDates[i] <= (dDate2.getTime() + 86400000)) {
			holidays += 1;
			if (arrayDates[i] == dDate1.getTime()) {
				date1Hours = dDate1.getHours();
			}
			if (arrayDates[i] == dDate2.getTime()) {
				date2Hours = dDate2.getHours();
			}
		}
	}
	var day = 0;
	var finalDay1 = new Date();
	var finalDay2 = new Date();
	if (dDate1.getDay() == 6) {
		finalDay1.setDate(dDate1.getDate() - 1);
		finalDay1.setHours(23, 0, 0, 0);
	} else if (dDate1.getDay() == 0) {
		finalDay1.setDate(dDate1.getDate() - 2);
		finalDay1.setHours(23, 0, 0, 0);
	} else {
		finalDay1.setDate(dDate1.getDate());
	}
	if (dDate2.getDay() == 6) {
		finalDay2.setDate(dDate2.getDate() - 1);
		finalDay2.setHours(23, 0, 0, 0);
	} else if (dDate2.getDay() == 0) {
		finalDay2.setDate(dDate2.getDate() - 2);
		finalDay2.setHours(23, 0, 0, 0);
	} else {
		finalDay2.setDate(dDate2.getDate());
	}
	var weekendDayCount = 0;

	while (finalDay2 < finalDay2) {
		finalDay2.setDate(finalDay2.getDate() + 1);
		if (finalDay2.getDay() === 0 || finalDay2.getDay() == 6) {
			++weekendDayCount;
		}
	}

	console.log("Weekends " + weekendDayCount);
	var numberWeeks = Math
			.floor((finalDay2.getTime() - finalDay1.getTime()) / 604800000)
	console.log("Weeks " + numberWeeks);
	if (iWeekday1 <= iWeekday2) {
		iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
	} else {
		iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
	}
	/*
	 * console.log(finalDay1.getTime()); console.log(finalDay2.getTime());
	 * console.log((finalDay2.getTime() - finalDay1.getTime()) / 3600000);
	 * console.log(dDate2.getHours()); console.log(((dDate2.getTime() -
	 * dDate1.getTime()) - ((date1Hours * 3600000) + (date2Hours *
	 * 3600000)))/3600000); console.log(holidays);
	 */
	console.log(iDateDiff);
	return (iDateDiff + 1); // add 1 because dates are inclusive /MyVyoog2/task/list.json
}

function renderCalendar(calDivId) {
		
	var initUrl = $("#" + calDivId).attr("data-initUrl")
	
	var initUrl;
	var initUrl1 = $("#" + calDivId).attr("data-initUrl1")
	var initUrl2 = $("#" + calDivId).attr("data-initUrl2")
	var initUrl2;
	var viewCount=1;
	
	
	
	$("#" + calDivId).fullCalendar({
		 
		viewDisplay: function (view) {
			
			if (view.name == 'month' || view.name == 'agendaWeek' || view.name =='agendaDay') {
				if(viewCount==1){
					
					$('.fc-header-left').append("<select class='dropdown' id='filter'><option>Task</option><option>Event</option><option>All</option></select>");
					$('.dropdown').val('All');
					var events = {
			                  url: initUrl,
			                  color : '#BCDCFA',
			      			  textColor : 'black'
					  };
					 var tasks = {
			                 url: initUrl2,
			                  color : '#0B68BF',
			      			textColor : 'white',
					  };
					var ft=document.getElementById('filter').value
					$('#filter').on('change', function() {
						  if($("#filter").val()==='Event'){
							 // $('div.fc-day-content').empty();
							  $('#myCalendar').fullCalendar('removeEventSource',events);
							  $('#myCalendar').fullCalendar('removeEventSource',tasks);
							 
							  $('#myCalendar').fullCalendar('addEventSource', events);
							  $('#myCalendar').fullCalendar('refetchEvents');
							 
						  }
						  if($("#filter").val()==='Task'){
							  //$('div.fc-day-content').empty();
							  $('#myCalendar').fullCalendar('removeEventSource',events);
							  $('#myCalendar').fullCalendar('removeEventSource',tasks);
							  $('#myCalendar').fullCalendar('addEventSource', tasks);
							  $('#myCalendar').fullCalendar('refetchEvents');
						  }
						  if($("#filter").val()==='All'){
							  //$('div.fc-day-content').empty();
							   $('#myCalendar').fullCalendar('removeEventSource',tasks);
							   $('#myCalendar').fullCalendar('removeEventSource',events);
							   $('#myCalendar').fullCalendar('addEventSource', events);
							   $('#myCalendar').fullCalendar('addEventSource', tasks);
							   $('#myCalendar').fullCalendar('refetchEvents');
						  }
						  
						  
					});
					viewCount++;
					
				}
			}
		},
		
		eventSources : [ {
			url : initUrl,
			color : '#BCDCFA',
			textColor : 'black'
		}, {

			url : initUrl2,
			color : '#0B68BF',
			textColor : 'white',
			
		} ],
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,agendaWeek,agendaDay',
				
		},
		
		eventAfterRender : function(event, element,view) {
			var twoDigitMonth = (event.start.getMonth()+1)+"";if(twoDigitMonth.length==1)  twoDigitMonth="0" +twoDigitMonth;
			var twoDigitDate = event.start.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
			var divDate=event.start.getFullYear()+"-"+twoDigitMonth+"-"+twoDigitDate;
			element.addClass("vyg-day-" + divDate)
			
			//elmentTop = $("td[data-date='"+divDate+"']").data('date');
			var   elmentTop = ($("td[data-date='"+divDate+"']").find('.fc-day-content')).position().top
			//$("td[data-date='"+divDate+"']").find('div.fc-day-content').html($('.vyg-day-'+divDate));
			//$("td[data-date='"+divDate+"']").find('div.fc-day-content').append($('.vyg-day-'+divDate));//don't delete this code
			//$("div.fc-event-own[data-containerDate='"+divDate+"']").html($('.vyg-day-'+divDate));
			
			//alert($('td.fc-day').attr("data-date"));
			/*$('table.fc-border-separate tr td').each(function()
						{
					       $(this).attr('data-date');
					       var t=($(this).find('.fc-day-content')).position().top;
					       alert(t);
					    }
					});*/
			
			var cnt = element.parent().children(".vyg-day-" + divDate).length;

			if (cnt >=3) {
				
				var w = '20';
				var h = '20';
				var l='0';
				var t='0';
				var idx = 0;
				var pagecnt = 0;
				element.parent().children(".vyg-day-" + divDate).each( function()  {
				h=$(this).height()+5;
				if (t === '0') {	// first one
					//t = $(this).position().top;
					t=elmentTop;
					l = $(this).position().left;
				} else if ( (idx % 3) == 0) {	// every third...
						t = t + h;
						l = l - 50;
						pagecnt = pagecnt + 1;
				} else {
						l = l + 25;
					  }
					$(this).animate({"width":w,"left":l,"top":t})
					$(this).css("height", "20px");

					//$('.fc-day-content').css("height","90px");
					($('.fc-day-content')).children().css({"position":"fixed"});
					//making the TD Size as fixed
					//$('.fc-day-content').parent().css("height","75px");
					//$('.fc-day-content').css("height","60px");
					
					//$('.fc-day-content').css("overflow-y","scroll");
					//$(".fc-day-content :first-child").css("height","30px");
					//$(".fc-event-inner").css("height","22px");
					
					//($('.fc-day-content')).children().css("height","120px");
					idx = idx + 1;
					//$(this).addClass("vyg-page").addClass("vyg-page-" + pagecnt );
					//$(this).parent().css({"background-color":"blue","font-size":"100%"});
					//$(this).parent().addClass('redbg').css({"background-color":"blue","font-size":"50%"}); 
						
					});	
				}
				else{
					var count=0;
					element.parent().children(".vyg-day-" + divDate).each( function()  {
					
					if(count==0){
						t=elmentTop;
					}
					if(count==1){
						t=elmentTop+22;
					}
					$(this).animate({"left":l,"top":t})
					$(this).css("height", "20px");
					count++;
					});
					
				}
				
				//$('element').addClass('redbg');
			
			var occurrenceStart = event.occurrenceStart;
			var occurrenceEnd = event.occurrenceEnd;
			var start = event.start;
			
			var data = {
				id : event.id,
				occurrenceStart : occurrenceStart,
				occurrenceEnd : occurrenceEnd,
				start : start
			};
			
			$(element).qtip({
				content : {
					text : ' ',
					ajax : {
						url : event.initurlview,
						type : "GET",
						data : data
						
					}
				},
				show : {
					event : 'click',
					solo : true
				},
				hide : {
					when: {event:'mouseout unfocus'}, fixed: true, delay: 500
				},
				style : {
					width : '500px',
					widget : true
				},
				position : {
					my : 'bottom middle',
					at : 'top middle',
					viewport : true
				}
			    
				
			});
			 
		},
		eventMouseover : function(event, jsEvent, view) {
			$('.fc-event').attr("data-name",event.title);
			$(this).addClass("calendertooltip");
		},
		eventMouseout : function(event, jsEvent, view) {
			$(this).removeClass("calendertooltip");
		},
//		dayClick: function(date, allDay, jsEvent, view) {
//			alert(date);
//			if (allDay && (view.name=="month" || view.name=="agendaWeek") ) {
//				var $fc = $(jsEvent.target).closest(".fc")
//				$fc.fullCalendar( 'changeView', 'agendaDay' );
//				$fc.fullCalendar('gotoDate', date);
//				alert($fc.attr("id"))
//			}
//	   }
		
	});
	
}

function setupDateTimePickers() {
	$("input.datetime").datetimepicker({
		language : 'en',
		closeOnDateSelect:true,
		pick12HourFormat : true,
		pickDate : true,
		pickTime : true,
		stepMinute : 10,
		format : 'm/d/Y h:i A',
	});
}

function setupDatePickers() {
	$("input.dateonly").datetimepicker(
			{
				onGenerate : function(ct) {
					jQuery(this).find('.xdsoft_date.xdsoft_weekend').addClass(
							'xdsoft_disabled');
				},
				language : 'en',
				closeOnDateSelect:true,
				timepicker : false,
				weekends : [ '01.01.2014', '02.01.2014', '03.01.2014',
						'04.01.2014', '05.01.2014', '06.01.2014' ],
				format : 'm/d/Y',
			});
}



function setupTimePickers() {
    $("input.timeonly").datetimepicker({
    	 datepicker:false,
    	 closeOnDateSelect:true,
    	  format:'H:i'
    });
}




function setupRecurSavePopups() {

	$(document).on("click", ".delete.recurring", function() {
		$("#deletePopup").dialog({
			title : "Delete recurring event",
			width : 400,
			modal : true
		});

		return false;
	});

	var editPopup = $("#editPopup").dialog({
		title : "Update recurring event",
		width : 400,
		modal : true,
		autoOpen : false
	});

	$(".save.recurring").click(function() {
		var editTypeField = $("#editType");

		if ($(editTypeField).val() == "") {
			$(editPopup).dialog('open');
			return false;
		} else {
			return true;
		}
	});

	$("#editPopup button").click(function() {
		$("#editType").val($(this).val());
		$(editPopup).dialog('close');
		$(".save.recurring").trigger('click');
	});

}

function setupRecurOptions() {

	$("#isRecurring").change(function() {
		if ($(this).is(":checked")) {

			// showRecurPopup();
			$("#editRecurringLink").show();
		} else {
			$("#editRecurringLink").hide();
		}

		updateRecurDescriptions();
	});

	$("#editRecurringLink").click(function() {
		showRecurPopup();
	});

	$("#recurType").change(function() {

		if ($(this).val() == "DAILY") {

			$("#recur").show();
			$("#recur1").hide();
			$("#recur2").hide();
			$("#recur3").hide();

		}
		if ($(this).val() == "MONTHLY") {
			$("#repeatLabelMonth").html('months');
			$("#recur").hide();
			$("#recur1").hide();
			$("#recur2").show();
			$("#recur3").hide();
			

		}
		if ($(this).val() == "YEARLY") {

			$("#repeatLabelYear").text('years');
			$("#recur").hide();
			$("#recur1").hide();
			$("#recur2").hide();
			$("#recur3").show();
			

		}
		if ($(this).val() == "WEEKLY") {
			$("#repeatLabelWeek").text('weeks');
			$("#weeklyOptions").show();
			$("#recur1").show();
			$("#recur").hide();
			$("#recur2").hide();
			$("#recur3").hide();
			

		} else {
			$("#weeklyOptions").hide();
		}

		updateRecurDescriptions();
	});

	$("#recurInterval, input[name='recurDaysOfWeek']").change(function() {
		updateRecurDescriptions();
	});

	$("input[name='recurEndOption']").click(function() {
		if ($(this).val() == "never") {
			$("#recurUntil").val('');
			$("#recurCount").val('');
		}
		if ($(this).val() == "occurrences") {
			$("#recurUntil").val('');
		} 
		
		else {
			$("#recurCount").val('');
		}
		
		updateRecurDescriptions();
	});
	/*$("#recurUntil").click(function(){
		alert("checked");
		$("#recurCount").val('');
		$("#recurEndOption1").attr('checked',false);
		$("#recurEndOption2").attr('checked',false);
		$("#recurEndOption3").attr('checked',true);
	});*/
	$("#recurUntil, #recurCount").focusout(function() {
		// Make sure correct option is checked
		var checkboxId = +$(this).parent("label").attr("for");
		$("#" + checkboxId).attr("checked", true);

		updateRecurDescriptions();
	});

	/*$("#recurUntil").datetimepicker({
		ampm : true,
		onSelect : function(dateText, inst) {
			// Make sure correct option is checked
			var checkboxId = +$(this).parent("label").attr("for");
			$("#" + checkboxId).attr("checked", true);

			updateRecurDescriptions();
		}
	});*/

	updateRecurDescriptions();
}

function showRecurPopup() {

	var recurPopup = $("#recurPopup").dialog({
		title : 'Repeat',
		width : 400,
		modal : true,
		open : function(event, ui) {
			$("#recurOptions").show().appendTo("#recurPopup");
		},
		close : function(event, ui) {
			$("#recurOptions").hide().appendTo("form.main");
		},
		buttons : {
			Ok : function() {
				$(this).dialog("close");
			}
		}
	});

}

function getRecurDescription() {
	var description = ' ';
	var recurType = $("#recurType option:selected").text();
	var recurUntil = $("#recurUntil").val();
	var recurCount = $("#recurCount").val();
	var recurInterval = $("#recurInterval").val();

	if ($("#isRecurring").is(":checked")) {

		if (recurInterval == 1) {
			description += recurType;
		} else {
			description += "Every " + recurInterval + " "
					+ getRecurTypeUnit(recurType);
		}

		if (recurType == "Weekly") {
			description += " on ";
			$("input[name='recurDaysOfWeek']:checked").each(function() {
				description += " " + $(this).attr("title") + ",";
			});

			// Remove last comma
			description = description.replace(/,$/, '');
		}

		if (recurCount) {
			description += ", " + recurCount + " times";
		} else if (recurUntil) {
			description += ", until " + recurUntil;
		}

	} else {
		description = "...";
	}

	return description;
}

function getRecurTypeUnit(recurType) {
	var result = "";

	switch (recurType) {
	case "Daily":
		result = "days";
		break;
	case "Weekly":
		result = "weeks";
		break;
	case "Monthly":
		result = "months";
		break;
	case "Yearly":
		result = "years";
	}
	return result;
}

function updateRecurDescriptions() {
	var recurType = $("#recurType option:selected").text();

	var description = getRecurDescription();
	$("#recurDescription").html(description);
	//$("#recurSummary").html(description);

	var repeatType = getRecurTypeUnit(recurType);
	
	$("#repeatLabel").html(repeatType);
}
