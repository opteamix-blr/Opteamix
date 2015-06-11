/* ========================================================================
 * odc.js v0.1
 * ========================================================================
 * Copyright 2011-2015 Opteamix.
 * ======================================================================== */

$(document).ready(function() {
    $("#mdButton,#mdmImage").click(function(event) {
    	$("#odcModelSelectDiv").hide();
    	$("#mdmDiv").show(500);
    });
});

$(document).ready(function() {
    $("#riButton,#rimImage").click(function(event) {
    	$("#odcModelSelectDiv").hide();
    	$("#riDiv").show(500);
    });
});

$(document).ready(function() {
    $("#mdmDivButton").click(function(event) {
    	calculateMdmCost(event);
    	$("#odcModelSelectDiv").hide();
    	$("#riDiv").hide();
    	$("#mdmDiv").show(500);
    });
});

$(document).ready(function() {
    $("#riDivButton").click(function(event) {
    	calculateRiCost(event);
    	$("#odcModelSelectDiv").hide();
    	$("#mdmDiv").hide();
    	$("#riDiv").show(500);
    });
});

$(document).ready(function() {
    $("#proceed").click(function(event) {
    	$("#odcModelSelectDiv").hide();
    	calculateMdm(event);
    	calculateMdmCost(event);
    	$("#calcMdmDiv").show();
    	$("#calcMdmCostDiv").show();
    });
});

$(document).ready(function() {
    $("#riProceed").click(function(event) {
    	$("#odcModelSelectDiv").hide();
    	calculateRiCost(event);
    	$("#calcRiDiv").show();
    });
});

function calculateMdm(event) {
	var projectHours = $('#projectHours').val();
	var projectMonths = $('#projectMonths').val();
	var monthlyHours = 160;
	
	var mbr = Math.round(projectHours / projectMonths);
	var headcount = roundNumber(mbr / monthlyHours);
	
	$('#mbr').val(mbr);
    $('#headcount').val(headcount);
    
    var manager = roundNumber(headcount * 0.10);
    var tl = roundNumber(headcount * 0.125);
    var ba = roundNumber(headcount * 0.125);
    var tester = roundNumber(headcount * 0.25);
    var developer = roundNumber(headcount * 0.40);
    
    var managerHours = Math.round(projectHours * 0.10);
    var tlHours = Math.round(projectHours * 0.125);
    var baHours = Math.round(projectHours * 0.125);
    var testerHours = Math.round(projectHours * 0.25);
    var developerHours = Math.round(projectHours * 0.40);
    
    $('#manager').val(manager);
    $('#tl').val(tl);
    $('#ba').val(ba);
    $('#tester').val(tester);
    $('#developer').val(developer);
    
    $('#managerHours').val(managerHours);
    $('#tlHours').val(tlHours);
    $('#baHours').val(baHours);
    $('#testerHours').val(testerHours);
    $('#developerHours').val(developerHours);
}

function roundNumber(num) {
	return num % 1 != 0 ? num.toFixed(2) : num;
}

function calculateMdmCost(event) {
	var projectHours = $('#projectHours').val();
	var blendedCost = 27;
	
	var mdmTotalCost = roundNumber(projectHours * blendedCost);
	
	$('#mdmTotalCost').val(mdmTotalCost);
    
    formatAllNumbers();
}

function calculateRiCost(event) {
	var riTeamSize = $('#riTeamSize').val();
	var riProjectMonths = $('#riProjectMonths').val();
	var monthlyHours = 160;
	var blendedCost = 27;
	
	var labourCost = roundNumber(riTeamSize * riProjectMonths * monthlyHours * blendedCost);
	var oversight = roundNumber(labourCost * 0.05);
	var riTotalCost = labourCost + oversight;
	
	$('#labourCost').val(labourCost);
    $('#oversight').val(oversight);
    $('#riTotalCost').val(riTotalCost);
    
    formatAllNumbers();
}

function formatAllNumbers() {
	$('#labourCost,#oversight,#riTotalCost,#mdmTotalCost').formatNumber({format:"#,##0.00", locale:"us"});
}

$(document).ready(function() {
	$('#manager,#tl,#ba,#tester,#developer').change(function() {
		recalculateHours(event);
	});
});

function recalculateHours(event){
	;
}

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
    	prepareResouceData();
    	$('#resourceCostsModal').modal('show');
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

