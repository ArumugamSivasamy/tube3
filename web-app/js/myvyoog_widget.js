/**		File		:		myvyoog_widget.js
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
/*                    File Name     :myvyoog_widget.js                         */
/*                    Update By     : Arumugam	                               */
/*               Last Update Date   : 28-05-2014      
 * 						Changes		: Commented Plus button trigger Lines(87,95)*/
/*******************************************************************************/
/* 
 * MY VYOOG WIDGET PLUGIN
 * ----------------------
 * This plugin uses the bootstrap panel.
 * It adds the button to the panel header and controls the panel-body or widget-content
 * 
 * USAGE:
 *  $(".myvyoog-widget").widget( options );
 * */
(function($) {
    "use strict";

    $.fn.vygWidget = function(options) {
        // Render options
        var settings = $.extend({
            refreshButton	: ".refresh-btn",				// Class/Id of the refresh button
            closeButton		: ".close-btn",					// Class/Id of the close bbutton
            initUrl			: "",							// URL to source the data for first time, or for refresh
            editUrl			: "",
            onLoadStart		: function(widget) {
            }, 												// Before the loading starts..
            onLoadComplete	: function(widget) {
            } 												// After the data has been loaded
        }, options);

        //The overlay
        var overlay = $('<div class="overlay"></div><div class="loading-img"></div>');

        return this.each(function() {
        	var initUrl = settings.initUrl
        	var widgetName = $(this).attr("data-widgetName")
        	if (initUrl === "") {
        		initUrl = $(this).attr("data-initUrl")
        	}
            if (initUrl === "") {
                if (console) {
                    console.log("Please specify a source first - widgetRefresh()");
                }
                return;
            }
        	
            //the widget
            var $widget = $(this);
            var $refreshBtn = $widget.find(settings.refreshButton).first();
            var $closeBtn = $widget.find(settings.closeButton).first();

            // handle refresh button click
            $refreshBtn.click(function(e) {
                e.preventDefault();
                
                //Add loading overlay
                start($widget);

                //Perform ajax call
                if (initUrl) {
	                $widget.find(".widget-content").load(initUrl, {"widget": true, "widgetName": widgetName, "currentState": $widget.data("currentState")}, function(responseText, textStatus, req) {
	                	var currentState = req.getResponseHeader("CURRENT_STATE")
                    	console.log("currentState1: " + currentState)
	            		if (textStatus == "error") {
	            			//alert("oh noes!!!!");
	            	    } else {
	            	    	//alert(responseText)
	            	    }
	                	if (currentState) {
	                		$widget.data("currentState", currentState);
	                	}

	            		done($widget);
	                });
                } else {
                	done($widget)
                }
            });
            
            $widget.find(".panel-actions .btn").each( function() {
            	if ( $(this).data("url") ) {
            		$(this).click(function(e) {
                        e.preventDefault();
                        
                        //Add loading overlay
                        start($widget);

                        //Perform ajax call
                        $widget.find(".widget-content").load($(this).data("url"), {"widget": true, "widgetName": widgetName, "currentState": $widget.data("currentState")}, function(responseText, textStatus, req) {
                        	var currentState = req.getResponseHeader("CURRENT_STATE")
                        	console.log("currentState2: " + currentState)
    	            		if (textStatus == "error") {
    	            			//alert("oh noes!!!!");
    	            	    } else {
    	            	    	//alert(responseText)
    	            	    }
                        	if (currentState) {
                        		$widget.data("currentState", currentState);
                        	}

    	            		done($widget);
    	                });
                    });
        		}
            });
            
            // handle refresh button click
            $closeBtn.click(function(e) {
                e.preventDefault();
                $widget.slideUp();
            });
            
            start($widget);
            //Perform ajax call
            if (initUrl) {
            	$widget.find(".widget-content").load(initUrl, {"widget": true, "widgetName": widgetName}, function(responseText, textStatus, req) {
            		if (textStatus == "error") {
            			//alert("oh noes!!!!");
            	    }
            		var currentState = req.getResponseHeader("CURRENT_STATE")
                	console.log("currentState3: " + currentState)
                	if (currentState) {
                		$widget.data("currentState", currentState);
                	}
            		done($widget);
            	});
            } else {
            	done($widget)
            }
        });
            
        function start(widget) {
    		//Add overlay and loading img
            widget.append(overlay);
    		settings.onLoadStart.call(widget);
        }

        function done(widget) {
        	//Remove overlay and loading img
        	widget.find(overlay).remove();
        	settings.onLoadComplete.call(widget);
        }
    };
    
    $.fn.vygTable = function(options) {
    	
    	// Render options
        var settings = $.extend({
        	pageSize		: 20,
        	filter			: false,
        	sorting			: true,             //Enable sorting
            sortEmptyLast	: true,        		//Empty values will be shown last
            columnPicker	: true,        		//Show the columnPicker button
            pageSizes		: [1,5,10,20],      //Set custom pageSizes. Leave empty array to hide button.
            hidePagerOnEmpty: true,     		//Removes the pager if data is empty.
            //checkboxes		: true,           	//Make rows checkable. (Note. You need a column with the 'unique' property)
            checkAllToggle	: true,        		//Show the check-all toggle
            preFill			: false,            //Initially fills the table with empty rows (as many as the pagesize).
            types			: {            		//Following are some specific properties related to the data types
                string: {
                    filterTooltip	: "Something",    	//What to say in tooltip when hoovering filter fields. Set false to remove.
                    placeHolder		: "Type here..."    //What to say in placeholder filter fields. Set false for empty.
                },
                number: {
                    decimals: 2  	 					//Sets decimal precision for float types
                },
                bool: {
                    //filterTooltip: false
                },
                date: {
                 // utc: true,            			//Show time as universal time, ie without timezones.
                  format: 'MM/dd/yyyy',   			//The format. See all possible formats here http://arshaw.com/xdate/#Formatting.
                  datePicker: false     			//Requires "Datepicker for Bootstrap" plugin (http://www.eyecon.ro/bootstrap-datepicker).
                },
                
            },
            actions: {                //This generates a button where you can add elements.
                filter		: true,         //If true, the filter fields can be toggled visible and hidden.
                columnPicker: true,   //if true, the columnPicker can be toggled visible and hidden.
                custom		: [             //Add any other elements here. Here is a refresh and export example.
                  $('<a href="#" class="refresh"><i class="icon-refresh"></i>&nbsp;Refresh</a>'),
                  $('<a href="#" class="export_all"><i class="icon-share"></i>&nbsp;Export all rows</a>') //,
                 // $('<a href="#" class="export_checked"><i class="icon-share"></i>&nbsp;Export checked rows</a>'),
                  //$('<a href="#" class="export_filtered"><i class="icon-share"></i>&nbsp;Export filtered rows</a>')
                ]
            },
            tableCreated: function(data) {    //Fires when the table is created / recreated. Use it if you want to manipulate the table in any way.
                console.log('table created'); //data.table holds the html table element.
                console.log(data);            //'this' keyword also holds the html table element.
                /*
                var thead = $(this).find("thead").first();
                var hdrRow = $("<tr></tr>").prependTo(thead);
                var hdrRowCell = $("<td colspan=0></td>").prependTo(hdrRow);
                var hdrToolbar = $('<div class="btn-toolbar"></div>').appendTo(hdrRowCell);
                var hdrButtons = $('<div class="btn-group"></div>').appendTo(hdrToolbar);
                $('<ul class="pagination"><li><a>AA</a></li></ul>').appendTo(hdrToolbar);
                
                //$(this).find("thead").first().prepend($("<tr class=\"fc-header\"><td class=\"fc-header-center\" colspan=\"0\"><span class=\"fc-header-title\">Hello</span></td></tr>"));
                
                */
            },
            rowClicked: function(data) {      //Fires when a row is clicked (Note. You need a column with the 'unique' property).
                console.log('row clicked');   //data.event holds the original jQuery event.
                console.log(data);   
                
                if (data.column.xeditUrl && data.column.xeditUrl.length > 0) {
                    $(this).attr("data-pk",data.row.id);
                    $(this).attr("data-name",data.column.column);
                    $(this).attr("data-type",data.column.xeditType);
                  //  $(this).editable({
                    var $edit = $(this).editable({
                    	url : data.column.xeditUrl,
                    	title : 'Enter username',
                    	source:data.column.xeditList,
                    	
                    });
                    
                    if (data.column.xeditType2 == "date" ) {
                    	$('.editable-input input')
                    		.removeClass()
                    		.addClass("dateonly");
                    	
                    	$('.editable-input input.dateonly').datetimepicker({
	                    		onGenerate : function(ct) {
	                    			jQuery(this).find('.xdsoft_date.xdsoft_weekend').addClass('xdsoft_disabled');
	                    		},
	    	    				language : 'en',
	    	    				closeOnDateSelect:true,
	    	    				timepicker : false,
	    	    				weekends : [  ],
	    	    				format : 'm/d/Y'
	                		});
                    }
                    
                    if (data.column.xeditType2 == "time" ) {
                    	$('.editable-input input').removeClass().addClass("timeonly");
                    	$(".editable-input input.timeonly").datetimepicker({
                    		datepicker:false,
                    		closeOnDateSelect:true,
                       	 	format:'H:i'
                       });
                    }
                    
                } 								//data.checked is true if row is checked.
                                              //'this' keyword holds the clicked element.
            },
            columnClicked: function(data) {   //Fires when a column is clicked
              	console.log('column clicked');  //data.event holds the original jQuery event
              	console.log(data);              //data.column holds the underlying column you supplied
                                              //data.descending is true when sorted descending (duh)
            },
            pageChanged: function(data) {     //Fires when manually changing page
              	console.log('page changed');    //data.event holds the original jQuery event
              	console.log(data);              //data.page holds the new page index
            },
            pageSizeChanged: function(data) { //Fires when manually changing pagesize
              	console.log('pagesize changed');//data.event holds teh original event
              	console.log(data);              //data.pageSize holds the new pagesize
            }        	
        }, options);
        
    	return this.each(function() {
    		var waTable = $(this).WATable({
                debug					: settings.debug,
                pageSize				: settings.pageSize,	
                filter					: settings.filter,
                sorting					: settings.sorting,
                sortEmptyLast			: settings.sortEmptyLast,
                columnPicker			: settings.columnPicker,
                pageSizes				: settings.pageSizes,
                hidePagerOnEmpty		: settings.hidePageOnEmpty,
                checkboxes				: settings.checkboxes,
                checkAllToggle			: settings.checkAllToggle,
                preFill					: settings.preFill,
                types					: settings.types,
                actions					: settings.actions,
                tableCreated			: settings.tableCreated,
                rowClicked				: settings.rowClicked,
                columnClicked			: settings.columnClicked,
                pageChanged				: settings.pageChanged,
                pageSizeChanged			: settings.pageSizeChanged
            }).data('WATable');  //This step reaches into the html data property to get the actual WATable object. Important if you want a reference to it as we want here.
    		
            var data = $(this).data("source");
            
            jQuery.each(data.cols, function(name, col) {
            	switch (col["type"]) {
            	case "time": 
            		col["type"] = "string";
            		col["xeditType"] = "text";
            		col["xeditType2"] = "time";
            		break;
            		
            	case "date":
            		col["type"] = "date";
            		col["xeditType"] = "text";
            		col["xeditType2"] = "date";
            		break;
            		
            	case "datetime": 
            		col["type"] = "string";
            		col["xeditType"] = "text";
            		col["xeditType2"] = "datetime";
            		break;
            		
            	case "string": 
            		col["type"] = "string";
            		col["xeditType"] = "text";
            		break;
            		
            	case "textarea": 
            		col["type"] = "string";
            		col["xeditType"] = "textarea";
            		break;

            	case "number": 
            		col["type"] = "number";
            		col["xeditType"] = "number";
            		break;

            	
            	}
            })
            waTable.setData(data);  //Sets the data.
            
            //var allRows = waTable.getData(false); //Gets the data you previously set.
            //var checkedRows = waTable.getData(true); //Gets the data you previously set, but with checked rows only.
            //var filteredRows = waTable.getData(false, true); //Gets the data you previously set, but with filtered rows only.
            //var pageSize = waTable.option("pageSize"); //Get option
            //waTable.option("pageSize", pageSize); //Set option
          //Example event handler triggered by the custom refresh link above.
            $(this).on('click', '.refresh', function(e) {
                e.preventDefault();
                var data = getData();
                waTable.setData(data, true);
            });

            //Example event handler triggered by the custom export links above.
            $(this).on('click', '.export_checked, .export_filtered, .export_all', function(e) {
                e.preventDefault();
                var elem = $(e.target);
                var data;
                if (elem.hasClass('export_all')) data = waTable.getData(false);
                else if (elem.hasClass('export_checked')) data = waTable.getData(true);
                else if (elem.hasClass('export_filtered')) data = waTable.getData(false, true);
                console.log(data.rows.length + ' rows returned');
                console.log(data);
                alert(data.value);
             $.ajax({
                    url : 'task/sample',
                    //data:JSON.stringify(data),
                    data:data,
                    type : 'POST',
                    dataType: 'json',
                    success : function(data) {              
                        alert('Data: '+data);
                    },
                    error : function(request,error)
                    {
                        alert("Request: "+JSON.stringify(request));
                    }
                });
                alert(data);
                alert(data.rows.length + ' rows returned.\nSee console for details.');
            }); 
            
            $(this).wrapAll("<div class='waTableContainer'></div>");
		});
           	
    };

    $.fn.vygChart = function(options) { 
    	//alert("ra");
    	/* var dummyData = [{
            type: 'pie',
            name: 'Tasks',
            data: [
                ['NoTasks', 1]
            ]
        }] */
    	var chartdata = $(this).data("source");
    	var chartTitle = $(this).data("title");
    	$(this).highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: 1,//null,
	            plotShadow: false
	        },
	        title: {
	            text: chartTitle  //'Project Overview'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: chartdata
	    });
    
    }
})(jQuery);
