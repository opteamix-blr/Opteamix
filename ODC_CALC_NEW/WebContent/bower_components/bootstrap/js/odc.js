/* ========================================================================
 * odc.js v0.1
 * ========================================================================
 * Copyright 2011-2015 Opteamix.
 * ======================================================================== */
//Flot Pie Chart
function flotPieChart(devHours, baHours, devTestHours, devLeadHours, devManagerHours, qaHours) {
    var data = [{
        label: "Dev",
        data: devHours
    }, {
        label: "BA",
        data: baHours
    }, {
        label: "Dev Test",
        data: devTestHours
    }, {
        label: "Dev Lead",
        data: devLeadHours
    }, {
        label: "Dev Manager",
        data: devManagerHours
    }, {
        label: "QA",
        data: qaHours
    }];

    var plotObj = $.plot($("#flot-odc-pie-chart"), data, {
        series: {
            pie: {
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    });
}

$(document).ready(function() {
    $("#next").click(function(event) {
    	calculateEffort(event);
        $("#otherEfforts").show(1000);
        $("#pieChart").show(1000);
        
    });
});

$(document).ready(function() {
    $("#calculate").click(function(event) {
    	calculateCosts(event);
    	$("#costs").show();
        $("#allCosts").show(1000);
    });
});

$(document).ready(function() {
	$('#developers,#duration').change(function() {
		calculateEffort(event);
		calculateCosts(event);
	});
});

$(document).ready(function() {
	$('#ba,#devTest,#devLead,#devManager,#qa').change(function() {
		recalculateEffort(event);
		calculateCosts(event);
	});
});

function recalculateEffort(event) {
	var dev = $('#developers').val();
	var duration = $('#duration').val() * 160;
	var ba = $('#ba').parseNumber({format:"#,##0.00", locale:"us"}, false);
	var devTest = $('#devTest').parseNumber({format:"#,##0.00", locale:"us"}, false);
	var devLead = $('#devLead').parseNumber({format:"#,##0.00", locale:"us"}, false);
	var devManager = $('#devManager').parseNumber({format:"#,##0.00", locale:"us"}, false);
	var qa = $('#qa').parseNumber({format:"#,##0.00", locale:"us"}, false);

	var devHours =  dev * duration;
	var baHours = ba * duration;
	var devTestHours = devTest * duration;
	var devLeadHours = devLead * duration;
	var devManagerHours = devManager * duration;
	var qaHours = qa * duration;
    var grandTotal = devHours + baHours + devTestHours + devLeadHours + devManagerHours + qaHours;

    $('#devHours').val(devHours);
    $('#baHours').val(baHours);
    $('#devTestHours').val(devTestHours);
    $('#devLeadHours').val(devLeadHours);
    $('#devManagerHours').val(devManagerHours);
    $('#qaHours').val(qaHours);
	$('#grandTotal').val(grandTotal);
    
	flotPieChart(devHours, baHours, devTestHours, devLeadHours, devManagerHours, qaHours);
	formatNumbers();
}

function calculateEffort(e) {
	//alert("calculate");
	var dev = $('#developers').val();
	var duration = $('#duration').val() * 160;
	var ba = dev * .25;
	var devTest = dev * .25;
	var devLead = dev * .25;
	var devManager = dev * .19;
	var qa = dev * .48;

	var devHours = dev * duration;
    var baHours = ba * duration;
    var devTestHours = devTest * duration;
    var devLeadHours = devLead * duration;
    var devManagerHours = devManager * duration;
    var qaHours = qa * duration;

    var grandTotal = devHours + baHours + devTestHours + devLeadHours + devManagerHours + qaHours;

    $('#dev').val(dev);
    $('#ba').val(ba);
    $('#devTest').val(devTest);
    $('#devLead').val(devLead);
    $('#devManager').val(devManager);
    $('#qa').val(qa);

    $('#devHours').val(devHours);
    $('#baHours').val(baHours);
    $('#devTestHours').val(devTestHours);
    $('#devLeadHours').val(devLeadHours);
    $('#devManagerHours').val(devManagerHours);
    $('#qaHours').val(qaHours);
    $('#grandTotal').val(grandTotal);

    flotPieChart(devHours, baHours, devTestHours, devLeadHours, devManagerHours, qaHours);
    formatNumbers();
}

function calculateCosts(e) {
	var devHours = $('#devHours').parseNumber({format:"#,##0", locale:"us"}, false);
	var baHours = $('#baHours').parseNumber({format:"#,##0", locale:"us"}, false);
	var devTestHours = $('#devTestHours').parseNumber({format:"#,##0", locale:"us"}, false);
	var devLeadHours = $('#devLeadHours').parseNumber({format:"#,##0", locale:"us"}, false);
	var devManagerHours = $('#devManagerHours').parseNumber({format:"#,##0", locale:"us"}, false);
	var qaHours = $('#qaHours').parseNumber({format:"#,##0", locale:"us"}, false);

	var grandTotal =  $('#grandTotal').parseNumber({format:"#,##0", locale:"us"}, false);
    var projectDuration = parseFloat($('#duration').val()) * 160;
    var ktCost = projectDuration * 47;
    var opCost = projectDuration * 28;
    var projectCost = grandTotal * 32;

    $('#devHours').val(devHours);
    $('#baHours').val(baHours);
    $('#devTestHours').val(devTestHours);
    $('#devLeadHours').val(devLeadHours);
    $('#devManagerHours').val(devManagerHours);
    $('#qaHours').val(qaHours);
    $('#grandTotal').val(grandTotal);

    $('#ktCost').val(ktCost);
    $('#opCost').val(opCost);
    $('#projectCost').val(projectCost);
//    $('#ktCost').val(commaSeparateNumber(ktCost));
//    $('#opCost').val(commaSeparateNumber(opCost));
//    $('#projectCost').val(commaSeparateNumber(projectCost));
    formatNumbers();
}

function formatNumbers() {
	$('#ba,#devTest,#devLead,#devManager,#qa,#ktCost,#opCost,#projectCost').formatNumber({format:"#,##0.00", locale:"us"});
	$('#devHours,#baHours,#devTestHours,#devLeadHours,#devManagerHours,#qaHours,#grandTotal').formatNumber({format:"#,##0", locale:"us"});
}

