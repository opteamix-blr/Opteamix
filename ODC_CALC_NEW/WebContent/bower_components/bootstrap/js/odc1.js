//original http://bootsnipp.com/snippets/featured/buttons-minus-and-plus-in-input
(function($) {
	$.fn.bootnumberspiner = function(options) {
		var spinners = $(this);

		$(spinners).each(
				function(key, spinner) {
					spinner.settings = $.extend({
						width : "120px",
						value : 0,
						id : key,
						min_value : 0,
						max_value : 99,
						name : "quint",
						minus_icon : "glyphicon glyphicon-minus",
						plus_icon : "glyphicon glyphicon-plus",
						onChange : function() {
						},
						onCreate : function() {
						}
					}, options);

					var $spinner = $(spinner);
      
			        spinner.settings.value = $spinner.attr('data-value') || spinner.settings.value;
			        spinner.settings.id = $spinner.attr('data-id') || spinner.settings.id;
			      	spinner.settings.name = $spinner.attr('data-name') || spinner.settings.name;

			      	$spinner.css("width", spinner.settings.width);
					$spinner.html(get_content(spinner));

					bind_click($spinner, spinner);
					focusin($spinner, spinner);
					change($spinner, spinner);
					spinner.settings.onCreate(spinner);

				});
		
    function change($spinner, spinner) {
			var input_number = $spinner.find('.input-number');

			$(input_number).change(
					function() {

						minValue = parseFloat($(this).attr('min'));
						maxValue = parseFloat($(this).attr('max'));
						valueCurrent = parseFloat($(this).val());

						name = $(this).attr('name');
						if (valueCurrent >= minValue) {
							$spinner.find(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled');
						} else {
							alert('Sorry, the minimum value was reached');
							$(this).val($(this).data('oldValue') || minValue);
						}
						if(valueCurrent <= maxValue) {
							$spinner.find(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled');
						} else {
							alert('Sorry, the maximum value was reached');
							$(this).val($(this).data('oldValue') || maxValue);
						}

						spinner.settings.onChange(valueCurrent, spinner);
					});
		}

		    
    function focusin($spinner, spinner) {
			var input_number = $spinner.find('.input-number');

			$(input_number).focusin(function() {
				$(this).data('oldValue', $(this).val());
			});
		}

		    
    function bind_click($spinner, spinner) {
			var btn_number = $spinner.find('.btn-number');

			$(btn_number).click(function(e) {
				e.preventDefault();

				fieldName = $(this).attr('data-field');
				type = $(this).attr('data-type');
				var input = $spinner.find("input[name='" + fieldName + "']");
				var currentVal = parseFloat(input.val());

				if (!isNaN(currentVal)) {
					if (type == 'minus') {

						if (currentVal > input.attr('min')) {
							input.val(currentVal - 0.1).change();
						}
						if (parseFloat(input.val()) == input.attr('min')) {
							$(this).attr('disabled', true);
						}

					} else if (type == 'plus') {

						if (currentVal < input.attr('max')) {
							input.val(currentVal + 0.1).change();
						}
						if (parseFloat(input.val()) == input.attr('max')) {
							$(this).attr('disabled', true);
						}

					}
				} else {
					input.val(0);
				}
			});
		}

		    
    function get_content(spinner) {
			var content = "", value = spinner.settings.value;

			if (spinner.settings.min_value > spinner.settings.value) {
				value = spinner.settings.min_value;
			} else if (spinner.settings.max_value < spinner.settings.value) {
				value = spinner.settings.max_value;
			}

			content += '<div class="input-group">';
			content += '<span class="input-group-btn">';
			content += '<button type="button" class="btn btn-default btn-number" data-type="minus" data-field="'+spinner.settings.name+'">';
			content += '<span class="'+spinner.settings.minus_icon+'"></span>';
			content += '</button>';
			content += '</span>';
			content += '<input type="text" name="'+spinner.settings.name+'" id="'+spinner.settings.name+'" class="form-control input-number" value="'+value+'"size="2" min="'+spinner.settings.min_value+'" max="'+spinner.settings.max_value+'">';
			content += '<span class="input-group-btn">';
			content += '<button type="button" class="btn btn-default btn-number" data-type="plus" data-field="'+spinner.settings.name+'">';
			content += '<span class="'+spinner.settings.plus_icon+'"></span>';
			content += '</button>';
			content += '</span>';
			content += '</div>';

			return content;
		}
	}
})(jQuery);

$('.numSpinner').bootnumberspiner({
	onChange : function(valueCurrent, spinner) {
		//console.log(valueCurrent);
		//console.log(spinner);
	},
	onCreate : function(spinner) {
		//console.log(spinner.settings.value);
	}
});
                         