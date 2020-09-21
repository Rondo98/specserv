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
function date_field_widget_form(form, form_state, field, instance, langcode,
                                 items, delta, element) {
  try {
    // replace core widget form
    s_date_field_goodly_field_widget_form(form, form_state, field, instance, langcode, items, delta, element);
  }
  catch (error) {
    console.log('date_field_widget_form - ' + error);
  }
}

function date_assemble_form_state_into_field(entity_type, bundle,
									form_state_value, field, instance, langcode, delta, field_key) {
  try {
    // replace core widget form
    return s_date_field_goodly_assemble_form_state_into_field(entity_type, bundle, form_state_value, field, instance, langcode, delta, field_key);
  }
  catch (error) {
    console.log('date_field_widget_form - ' + error);
  }
}

function date_field_formatter_view(form, form_state, field, instance, langcode,
                                 items, delta, element) {
  try {
    // replace core widget form
    return s_date_field_goodly_field_formatter_view(form, form_state, field, instance, langcode, items, delta, element);
  }
  catch (error) {
    console.log('date_field_widget_form - ' + error);
  }
}
