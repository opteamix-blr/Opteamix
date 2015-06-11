//$(document).ready(function() {
function prepareResouceData() {
	var t = $('#example').DataTable();
    var counter = 1;
    var resources = createResources();

    if(counter == 1) {
    $(resources).each(
			function(key, resource) {
				get_content(t, counter, resource);
				counter++;
			});
    }
//    $('#addRow').on( 'click', function () {
//        t.row.add( ['<td>'+counter+'</td>',
//                    '<td>'+resourceType+'</td>',
//                    '<td><input type="text" id="row-1-age" name="row-1-age" value="61"></td>',
//                    '<td><input type="text" id="row-1-position" name="row-1-position" value="System Architect"></td>',
//
//            counter +'.1'
//        ] ).draw();
// 
//        counter++;
//    } );
// 
//    // Automatically add a first row of data
//    $('#addRow').click();
}

//<th>#</th>
//<th>Resource</th>
//<th>Resource</br>Level</th>
//<th>No.of</br>Resources</th>
//<th>Hours</th>
//<th>Rate</th>
//<th>Resource Cost</th>
//<th>Travel Cost</th>
//<th>KT Cost</th>
//<th>Final Cost</th>

function createResources() {
	var resourceIds = ['dev', 'ba', 'devTest', 'devLead', 'devManager', 'qa'];
	var resources = [];
	
	$(resourceIds).each(function(key, resourceId) {
		var resource = {
				resId : resourceId,
				resourceType : getResourceType(resourceId),
				noOfResources : $('#'+resourceId).val(),
				hours : $('#'+resourceId+'Hours').val()
		};
		resources.push(resource);
	});
	return resources;
}

function getResourceType(resourceId) {
	var resourceType = null;
	switch (resourceId) {
    case 'dev':
    	resourceType = "Dev";
        break;
    case 'ba':
    	resourceType = "BA";
        break;
    case 'devTest':
    	resourceType = "Dev Test";
        break;
    case 'devLead':
    	resourceType = "Dev Lead";
        break;
    case 'devManager':
    	resourceType = "Dev Manager";
        break;
    case 'qa':
    	resourceType = "QA";
        break;
    default:
    	resourceType = "Other";
        break;
}
	return resourceType;
}

function get_content(t, counter, resource) {
	 t.row.add( ['<td>'+counter+'</td>',
                 '<td>'+resource.resourceType+'</td>',
                 '<td>'+''+'</td>',
                 '<td><input type="text" id="row-1-position" name="row-1-position" size="5" value="'+resource.noOfResources+'"></td>',
                 '<td>'+resource.hours+'</td>',
         counter +'.1',
         counter +'.2',
         counter +'.3',
         counter +'.4',
         counter +'.5'
     ] ).draw();
//	var content = "", value = spinner.settings.value;
//
//	if (spinner.settings.min_value > spinner.settings.value) {
//		value = spinner.settings.min_value;
//	} else if (spinner.settings.max_value < spinner.settings.value) {
//		value = spinner.settings.max_value;
//	}

//	content += '<div class="input-group">';
//	content += '<span class="input-group-btn">';
//	content += '<button type="button" class="btn btn-default btn-number" data-type="minus" data-field="'+spinner.settings.name+'">';
//	content += '<span class="'+spinner.settings.minus_icon+'"></span>';
//	content += '</button>';
//	content += '</span>';
//	content += '<input type="text" name="'+spinner.settings.name+'" id="'+spinner.settings.name+'" class="form-control input-number" value="'+value+'"size="2" min="'+spinner.settings.min_value+'" max="'+spinner.settings.max_value+'">';
//	content += '<span class="input-group-btn">';
//	content += '<button type="button" class="btn btn-default btn-number" data-type="plus" data-field="'+spinner.settings.name+'">';
//	content += '<span class="'+spinner.settings.plus_icon+'"></span>';
//	content += '</button>';
//	content += '</span>';
//	content += '</div>';
//
//	return content;
}
//$(document).ready(function() {
//    var t = $('#example').DataTable();
//    var counter = 1;
//    var resourceType = 'BA';
// 
//    $('#addRow').on( 'click', function () {
//        t.row.add( ['<td>'+counter+'</td>',
//                    '<td>'+resourceType+'</td>',
//                    '<td><input type="text" id="row-1-age" name="row-1-age" value="61"></td>',
//                    '<td><input type="text" id="row-1-position" name="row-1-position" value="System Architect"></td>',
//
//            counter +'.1'
//        ] ).draw();
// 
//        counter++;
//    } );
// 
//    // Automatically add a first row of data
//    $('#addRow').click();
//} );          