/**
 * Created by lux on 21.01.2017.
 */

/**
 * Implements hook_field_formatter_view().
 * @param {String} entity_type
 * @param {Object} entity
 * @param {Object} field
 * @param {Object} instance
 * @param {String} langcode
 * @param {Object} items
 * @param {Object} display
 */
function s_date_field_goodly_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) {
  try {
    // Iterate over each item, and place a widget onto the render array.
    var content = {};
    for (var delta in items) {
      if (!items.hasOwnProperty(delta)) {
        continue;
      }
      var item = items[delta];
      
      var s_date_field_gf_output = _s_date_field_gf_parse_date_str(item.value);
      if (item.value2 && item.value2 != item.value) {
		  s_date_field_gf_output = 'c '+s_date_field_gf_output+' до '+_s_date_field_gf_parse_date_str(item.value2);
	  }
      
      content[delta] = {
          markup: '<p>' + s_date_field_gf_output + '</p>'
        };
    }
    return content;
  }
  catch (error) {
    console.log('media_field_formatter_view - ' + error);
  }
}

/**
 * Implements hook_field_widget_form().
 * @param {Object} form
 * @param {Object} form_state
 * @param {Object} field
 * @param {Object} instance
 * @param {String} langcode
 * @param {Object} items
 * @param {Number} delta
 * @param {Object} element
 */
function s_date_field_goodly_field_widget_form(form, form_state, field, instance, langcode,
                                 items, delta, element) {
  try {
    items[delta].type = 'hidden';
    var todate = field.settings.todate;
    
    drupalgap_add_css('app/modules/custom/s_date_field_goodly/includes/js/jquery.mobile.datepicker.css');
    
    drupalgap_add_js('app/modules/custom/s_date_field_goodly/includes/js/jquery.ui.datepicker.js');
    drupalgap_add_js('app/modules/custom/s_date_field_goodly/includes/js/jquery.mobile.datepicker.js');
    drupalgap_add_js('app/modules/custom/s_date_field_goodly/includes/js/datepicker-ru.js');

    // Make sure the widget is supported.
    var supported_widgets = [
      'date_popup'
    ];
    if (!in_array(instance.widget.type, supported_widgets)) {
      console.log('WARNING: s_date_field_gf_field_widget_form() - widget type not supported! (' + instance.widget.type + ')');
      return;
    }
	
	var s_date_field_gf_default_vals = false;
    // If we have an existing value, add it to the element.
    if (items[delta].item) {
		var s_date_field_gf_default_vals = _s_date_field_gf_parse_date_str(items[delta].item.value);
		
		if (items[delta].item.value2) {
			s_date_field_gf_default_vals += ','+_s_date_field_gf_parse_date_str(items[delta].item.value2);
		}
		items[delta].value = s_date_field_gf_default_vals;
		items[delta].options.attributes.value = s_date_field_gf_default_vals;
    }

    var date_val_id = 's-'+items[delta].id;
    var date_val = {
      id: date_val_id,
      type: 'textfield',
      options: {
        attributes: {
          id: date_val_id,
          value: items[delta].item ? _s_date_field_gf_parse_date_str(items[delta].item.value) : '',
        }
      }
    };
    
    if (todate) { 
		date_val.title = 'с';
		
		var date_val2_id = 's-'+items[delta].id + '2';
		var date_val2 = {
		  id: date_val2_id,
		  title: 'до',
		  type: 'textfield',
		  options: {
			attributes: {
			  id: date_val2_id,
			  value: (items[delta].item && items[delta].item.value2 && items[delta].item.value2 != items[delta].item.value) ? _s_date_field_gf_parse_date_str(items[delta].item.value2) : '',
			}
		  },
		};
	}
	
	
	var _s_date_fg_inline_script = '';
	_s_date_fg_inline_script += drupalgap_jqm_page_event_script_code({
		page_id: drupalgap_get_page_id(),
		jqm_page_event: 'pagebeforeshow',
		jqm_page_event_callback: '_s_date_fg_inline_script_callback',
		jqm_page_event_args: JSON.stringify({
			s_date_original_value_field_id: items[delta].id,
			s_date_value1_field_id: date_val_id,
			s_date_value2_field_id: todate? date_val2_id : false,
		})
	});
	
	if (_s_date_fg_inline_script && _s_date_fg_inline_script != '') {
		if (items[delta].children) {
		  items[delta].children.push({markup: _s_date_fg_inline_script});
		} else {
		  items[delta].children = [{markup: _s_date_fg_inline_script}];
		}
    }
	
    var options = {
      date_val: date_val.id
    };

    items[delta].children.push(date_val);
    
    if (todate) { 
		options.date_val2 = date_val2.id;
		items[delta].children.push(date_val2);
	}
  }
  catch (error) {
    console.log('s_date_field_goodly_field_widget_form - ' + error);
  }
}

/**
 * Implements hook_assemble_form_state_into_field().
 */
function s_date_field_goodly_assemble_form_state_into_field(entity_type, bundle,
  form_state_value, field, instance, langcode, delta, field_key) {
  try {
    if (empty(form_state_value)) { 
		return ''; 
	}
    
    var s_dates = form_state_value.split(',');
    console.log(s_dates);
    var s_vals = {};
    
    if (empty(s_dates[0]) && s_dates[1] && !empty(s_dates[1])) {
		s_dates[0] = _s_date_field_gs_get_current_date();
	}
    
    for (var i = 0; i < s_dates.length; i++) {
		if (i == 0) {
			if (!empty(s_dates[i])) {
				s_vals['value'] = {
					date: s_dates[i],
					time: '03:00',
				}
			}
			else {
				s_vals['value'] = '';
			}
		}
		else {
			if (!empty(s_dates[i])) {
				s_vals['value'+(parseInt(i)+1)] = {
					date: s_dates[i],
					time: '03:00',
				}
				s_vals.show_todate = 1;
			}
			else {
				s_vals['value'+(parseInt(i)+1)] = {
					date: '',
				};
				s_vals.show_todate = 0;
			}
			
		}
	}
	
	//console.log(s_vals);
    
    field_key.use_key = false;
    return s_vals;
  }
  catch (error) {
    console.log('geofield_assemble_form_state_into_field - ' + error);
  }
}

function _s_date_fg_inline_script_callback(options) {
	//console.log(options);
	
	var _s_result_val = false;
	$('#'+options.s_date_value1_field_id).date({
		inline: true,
		onSelect: function(dateText, inst){
			$('#'+options.s_date_value1_field_id).trigger('change');
		},
		"defaultDate": $('#'+options.s_date_value1_field_id).val(),
	});
	
	$('#'+options.s_date_value1_field_id).on('change', function() {
		_s_result_val = $(this).val();
		if (options.s_date_value2_field_id) {
			_s_result_val += ','+$('#'+options.s_date_value2_field_id).val();
		}
		$('#'+options.s_date_original_value_field_id).val(_s_result_val);

		/* -- Sega hardCode set minDate --- */
		if (options.s_date_value2_field_id) {
			$('#'+options.s_date_value2_field_id).date("option", "minDate", _s_date_field_gs_get_js_date($(this).val()));
			$('#'+options.s_date_value2_field_id).trigger('change');
		}

		/* --- */
	});

	if (empty($('#'+options.s_date_value1_field_id).val()) || empty($('#'+options.s_date_value1_field_id).attr('value'))) {
		$('#'+options.s_date_value1_field_id).val('');
	}
	
	if (options.s_date_value2_field_id) {
		$('#'+options.s_date_value2_field_id).date({
			inline: true,
			onSelect: function(dateText, inst){
				$('#'+options.s_date_value2_field_id).trigger('change');
			},
			"defaultDate": $('#'+options.s_date_value2_field_id).val(),
			minDate: (!empty($('#'+options.s_date_value1_field_id).val())) ? _s_date_field_gs_get_js_date($('#'+options.s_date_value1_field_id).val()) : '',
		});
		
		$('#'+options.s_date_value2_field_id).on('change', function() {
			_s_result_val = $('#'+options.s_date_value1_field_id).val()+',';
			_s_result_val += $(this).val();
			$('#'+options.s_date_original_value_field_id).val(_s_result_val);
		});
		
		if (empty($('#'+options.s_date_value2_field_id).val()) || empty($('#'+options.s_date_value2_field_id).attr('value'))) {
			$('#'+options.s_date_value2_field_id).val('');
		}
	}
	
	
}

function _s_date_field_gf_parse_date_str(item) {
	st = item.split(/(\d+)\-(\d+)\-(\d+)/);
	output=st[3]+'.'+st[2]+'.'+st[1];
	return output;
}

function _s_date_field_gs_get_current_date() {
	var d = new Date();
	return d.getDate()+'.'+ (d.getMonth()+1) +'.'+d.getFullYear();
}

/* --- 01.01.2018 + 1 to js Date --- */
function _s_date_field_gs_get_js_date(str_date) {
	var dateParts = str_date.split('.');
	return new Date(dateParts[2], dateParts[1] - 1, parseInt(dateParts[0]) + 1);
}
