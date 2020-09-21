/**
 * Created by lux on 21.01.2017.
 */

/**
 * GLOBALS
 */

// cordova-plugin-imagepicker options
var IMAPICKER_OPTIONS = {
  quality: (drupalgap.settings.camera.quality) ? drupalgap.settings.camera.quality : 50,
  width: (drupalgap.settings.camera.targetWidth) ? drupalgap.settings.camera.targetWidth : 1024,
  height: (drupalgap.settings.camera.targetHeight) ? drupalgap.settings.camera.targetHeight : 1024
}

/**
 * enum for media actions
 */
var MEDIA_ACTIONS = {
  IMAGE_UPLOAD: 1,
  IMAGE_RECORD: 2,
  VIDEO_UPLOAD: 3,
  VIDEO_RECORD: 4,
  AUDIO_RECORD: 5,
  PICTURE_MULTIPLE_UPLOAD: 6,
};

/**
 * enum for media types
 */
var MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio'
};

/**
 * HELPERS
 */

/**
 * Generate media upload buttons
 * @param {Object} variables
 * @return {String}
 */
function media_buttons(variables) {
  try {
    var html = '';
    variables.attributes.onclick = 'media_upload_pressed(this);';
    variables.media_types.forEach(function (media_type) {
      html += theme('media_button', {
        type: media_type,
        attributes: variables.attributes
      });
    });
    return html;
  } catch (error) {
    console.log('media_buttons - ' + error);
  }
}

/**
 * Select Media source
 * @param {Object} button
 */
function media_upload(button, media_source) {
  try {
    var input_id = $(button).data("input_id");
    var cardinality = $(button).data("cardinality");
    var webform_component_type = $(button).data("webform_component_type");
    var form_id = $(button).data("form_id");
    var delta = $(button).data("delta");
    var name = $(button).data("element_name");

    function set_camera_options(srcType, medType) {
      var options = {
        quality: (drupalgap.settings.camera.quality) ? drupalgap.settings.camera.quality : 50,
        sourceType: srcType,
        destinationType: Camera.DestinationType.FILE_URI,
        mediaType: medType,
        targetWidth: (drupalgap.settings.camera.targetWidth) ? drupalgap.settings.camera.targetWidth : 1024,
        targetHeight: (drupalgap.settings.camera.targetHeight) ? drupalgap.settings.camera.targetHeight : 1024,
        saveToPhotoAlbum: (srcType == Camera.PictureSourceType.PHOTOLIBRARY) ? false : true
      };
      return options;
    }

    function upload_media_file(files) {
      // upload file
      var uri = encodeURI(Drupal.settings.site_path + "/" + Drupal.settings.endpoint + "/file/create_raw");
      var headers = {'X-CSRF-Token': Drupal.sessid};

      // get first file
      fileURI = files.shift();

      var fileOptions = new FileUploadOptions();
      fileOptions.fileKey = "files[file_1]";
      fileOptions.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1).split('?')[0];
      fileOptions.headers = headers;

      var ft = new FileTransfer();

      // show progress
      ft.onprogress = function (progressEvent) {
        if (progressEvent.lengthComputable) {
          var progress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          $(".ui-loader h1").replaceWith("<h1>" + t("Uploading") + " " + progress + "%</h1>");
        }
      };

      // show toast
      drupalgap.loader = 'uploading';
      drupalgap_loading_message_show();

      ft.upload(
        fileURI,
        uri,
        function (r) {
          var result = $.parseJSON(r.response);
          var fid = result[0].fid;

          // set fid in form
          if (cardinality == 1) {
            // only one file allowed
            $("input#" + input_id).val(fid);
          } else {
            // multiple files allowed
            // check if form element is a webform component multiple_file type
            if (webform_component_type == 'multiple_file') {
              // webform multiple file component
              $("input#" + input_id).val($("input#" + input_id).val() + fid + ',');
            } else {
              // drupal field with multiple values
              $("input#" + input_id).val(fid);
              // remove media buttons
              $('#' + input_id + '-media-buttons').remove();
              // add another field item
              
              _s_drupalgap_form_add_another_item(form_id, name, delta);
              $('.' + drupalgap_form_get_element_container_class(name).replace(/\s+/g, '.') + ' .description').remove();
            }
          }

          // check for additional files
          if (files.length > 0) {
            upload_media_file(files);
          } else {
            drupalgap_loading_message_hide();
          }
        },
        function (error) {
          // error
          drupalgap_loading_message_hide();
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        },
        fileOptions
      );
    }

    function get_media_success(f) {
      //var mediaFullPath = '';
      var mediaFullPaths = [];
      console.log('get_media_success - %o:', f);
      if (Array.isArray(f)) {
        f.forEach(function (mediaFullPath) {
          if (mediaFullPath.fullPath != undefined) {
            // captured with cordova-plugin-media-capture
            mediaFullPaths.push(f[0].fullPath);
          } else {
            // captured with cordova-plugin-imagepicker
            mediaFullPaths.push(mediaFullPath);
          }
        });
      } else {
        // captured with cordova-plugin-camera
        mediaFullPaths.push(f);
      }

      // inject media in form
      var mediaHTML = '';
      mediaFullPaths.forEach(function (mediaFullPath) {
        switch (media_type) {
          case MEDIA_TYPES.IMAGE:
            mediaHTML += "<img src='" + mediaFullPath + "'>";
            break;
          case MEDIA_TYPES.VIDEO:
            mediaHTML += "<video  style='max-width:100%;' controls preload='metadata' webkit-playsinline=webkit-playsinline' playsinline><source src='" + mediaFullPath + "'></video>";
            if (media_source == MEDIA_ACTIONS.VIDEO_RECORD) {
              try {
                // save captured video to album by cordova-library-helper
                LibraryHelper.saveVideoToLibrary({}, get_media_error, mediaFullPath, '');
              }
              catch (error) {
                console.log('get_media_success - error: %o', error);
              }
            }
            break;
          case MEDIA_TYPES.AUDIO:
            mediaHTML = "<audio style='max-width:100%;' controls preload='metadata'><source src='" + mediaFullPath + "'></audio>";
            break;
        }
      });

      if (cardinality == 1) {
        // replace media
        $("#" + input_id + "-media-field").html(mediaHTML);
      } else {
        // add media
        $("#" + input_id + "-media-field").append(mediaHTML);
      }
      // scroll down;
      scrollToElement('#' + input_id + '-media-buttons', 500, -40);

      //upload media
      upload_media_file(mediaFullPaths);
    }

    function get_media_error(error) {
      console.log('media_upload - error: %o' + error);
    }

    // get media
    var cameraOptions = {};
    var media_type = '';

    switch (media_source) {
      case MEDIA_ACTIONS.IMAGE_UPLOAD:
        media_type = MEDIA_TYPES.IMAGE;
        // @TODO: use image cordova-plugin-imagepicker for selecting multiple pictures at once
        // as cordova-plugin-imagepicker shows currently ony albums, it's hard to find pictures
        // if (cardinality == 1) {
        //   cameraOptions = set_camera_options(Camera.PictureSourceType.PHOTOLIBRARY, Camera.MediaType.PICTURE);
        // } else {
        //   // multiple files allowed, use cordova-plugin-imagepicker
        //   window.imagePicker.getPictures(get_media_success, get_media_error, IMAPICKER_OPTIONS);
        // }
        cameraOptions = set_camera_options(Camera.PictureSourceType.PHOTOLIBRARY, Camera.MediaType.PICTURE);
        break;
      case MEDIA_ACTIONS.IMAGE_RECORD:
        media_type = MEDIA_TYPES.IMAGE;
        cameraOptions = set_camera_options(Camera.PictureSourceType.CAMERA, Camera.MediaType.PICTURE);
        break;
      case MEDIA_ACTIONS.VIDEO_UPLOAD:
        media_type = MEDIA_TYPES.VIDEO;
        cameraOptions = set_camera_options(Camera.PictureSourceType.PHOTOLIBRARY, Camera.MediaType.VIDEO);
        break;
      case MEDIA_ACTIONS.VIDEO_RECORD:
        media_type = MEDIA_TYPES.VIDEO;
        navigator.device.capture.captureVideo(get_media_success, get_media_error, {limit: 1});
        //navigator.device.capture.captureVideo(captureVideoSuccess, captureError, {limit: 1});
        break;
      case MEDIA_ACTIONS.AUDIO_RECORD:
        media_type = MEDIA_TYPES.AUDIO;
        navigator.device.capture.captureAudio(get_media_success, get_media_error, {limit: 1});
        break;
    }

    if (!$.isEmptyObject(cameraOptions)) {
      // use cordova-plugin-camera
      navigator.camera.getPicture(get_media_success, get_media_error, cameraOptions);
    }
  }
  catch (error) {
    console.log('media_upload - ' + error);
  }
}

/**
 * Select Media source
 * @param {Object} button
 */
function media_upload_pressed(button) {
  try {
    var media_type = $(button).data("media-type");

    function onConfirm(buttonIndex) {
      // check for cancel
      if (buttonIndex != 3) {
        var media_action = '';

        switch (media_type) {
          case MEDIA_TYPES.IMAGE:
			if (buttonIndex == 1) media_action = MEDIA_ACTIONS.IMAGE_RECORD;
			if (buttonIndex == 2) media_action = MEDIA_ACTIONS.IMAGE_UPLOAD;
            //media_action = (buttonIndex == 2) ? MEDIA_ACTIONS.IMAGE_UPLOAD : MEDIA_ACTIONS.IMAGE_RECORD;
            media_upload(button, media_action);
            break;
          case MEDIA_TYPES.VIDEO:
            media_action = (buttonIndex == 2) ? MEDIA_ACTIONS.VIDEO_UPLOAD : MEDIA_ACTIONS.VIDEO_RECORD;
            media_upload(button, media_action);
            break;
        }
      }
    }

    var confirm_message = '';
    var confirm_title = '';
    var confirm_button_labels = [];

    switch (media_type) {
      case MEDIA_TYPES.IMAGE:
        confirm_message = t('Выбрать изображение');
        confirm_title = t('Загрузка изображения');
        confirm_button_labels = [t('Камера'), t('Библиотека'), t('Отмена')];
        break;
      case MEDIA_TYPES.VIDEO:
        confirm_message = t('Select Video source');
        confirm_title = t('Upload Video');
        confirm_button_labels = [t('Camera'), t('Media Library'), t('Cancel')];
        break;
      case MEDIA_TYPES.AUDIO:
        media_upload(button, MEDIA_ACTIONS.AUDIO_RECORD);
        break;
    }

    if (confirm_message) {
      navigator.notification.confirm(
        confirm_message,
        onConfirm,
        confirm_title,
        confirm_button_labels
      );
    }
  } catch (error) {
    console.log('media_upload_pressed - ' + error);
  }
}

/**
 * Implements hook_assemble_form_state_into_field().
 * @param {Object} entity_type
 * @param {String} bundle
 * @param {String} form_state_value
 * @param {Object} field
 * @param {Object} instance
 * @param {String} langcode
 * @param {Number} delta
 * @param {Object} field_key
 * @return {*}
 */
function file_assemble_form_state_into_field(entity_type, bundle,
                                             form_state_value,
                                             field,
                                             instance,
                                             langcode,
                                             delta,
                                             field_key) {
  try {
    field_key.value = 'fid';
    return form_state_value;
  }
  catch (error) {
    console.log('file_assemble_form_state_into_field - ' + error);
  }
}


function _s_drupalgap_form_add_another_item(form_id, name, delta) {
  try {
    // Locate the last item, load the form, extract the element from
    // the form, generate default variables for the new item, determine the next
    // delta value.
    var selector = '.' + drupalgap_form_get_element_container_class(name).replace(/\s+/g, '.') +
      ' .drupalgap_form_add_another_item';
    var add_another_item_button = $(selector);
    var form = drupalgap_form_local_storage_load(form_id);
    var language = language_default();
    var item = drupalgap_form_element_item_create(
      name,
      form,
      language,
      delta + 1
    );
    
    form.elements[name][language][delta + 1] = item;
    var element = form.elements[name];
    var variables = {
      attributes: {
        id: item.id,
        value: ''
      },
      field_info_field: element.field_info_field,
      field_info_instance: element.field_info_instance
    };
    var field_widget_form_function =
      element.field_info_instance.widget.module + '_field_widget_form';
    window[field_widget_form_function].apply(
      null,
      _drupalgap_form_element_items_widget_arguments(
        form,
        null,
        element,
        language,
        delta + 1
      )
    );
    drupalgap_form_local_storage_save(form);
    //console.log(_drupalgap_form_render_element_item(form, element, variables, item));
    $(add_another_item_button).replaceWith(
      _drupalgap_form_render_element_item(form, element, variables, item)
    );
  }
  catch (error) { console.log('_drupalgap_form_add_another_item - ' + error); }
}



function drupalgap_form_state_values_assemble(form) {
  //console.log(form, 'form');
  
  try {
    var lng = language_default();
    var form_state = { values: {} };
    for (var name in form.elements) {
      if (!form.elements.hasOwnProperty(name)) { continue; }
      var element = form.elements[name];
      if (name == 'submit') { continue; } // Always skip the form 'submit'.
      var id = null;
      if (element.is_field) {
        form_state.values[name] = {};
        form_state.values[name][lng] = {};
        var allowed_values = element.field_info_field.cardinality;
        if (allowed_values == -1) {
          // how many values are in the form
          allowed_values = Object.keys(element[lng]).length;
        }
        for (var delta = 0; delta < allowed_values; delta++) {
          id = drupalgap_form_get_element_id(name, form.id, lng, delta);
          form_state.values[name][lng][delta] =
            _drupalgap_form_state_values_assemble_get_element_value(
              id,
              element
            );
        }
      }
      else {
        id = drupalgap_form_get_element_id(name, form.id);
        form_state.values[name] =
          _drupalgap_form_state_values_assemble_get_element_value(
            id,
            element
          );
      }
    }
    // Attach the form state to drupalgap.form_states keyed by the form id.
    drupalgap.form_states[form.id] = form_state;
    return form_state;
  }
  catch (error) {
    console.log('drupalgap_form_state_values_assemble - ' + error);
  }
}



function drupalgap_entity_build_from_form_state(form, form_state) {
  try {
    var entity = {};
    var language = language_default();
    var s_values = {};
    var s_values_array = [];
    for (var name in form_state.values) {
        if (!form_state.values.hasOwnProperty(name)) { continue; }
        var value = form_state.values[name];
        
        
        
        //if (form.elements[name].type == 'datetime') {
			////console.log(form);
			////console.log(form_state);
			//if (form_state.values[name][language][0]) {
				//try {
					//s_values[name] = {};
					//s_values[name][language] = [];
					//s_values[name][language][0] = {};
					//s_values[name][language][0].value = {};
					//s_values[name][language][0].value.date = form_state.values[name][language][0];
					//s_values[name][language][0].value.time = '03:00';
					
					////if (form.elements[name].field_info_field.columns.value2) {
						////s_values[name][language][0].value2 = {};
						////s_values[name][language][0].value2.date = '25.08.2018';
						////s_values[name][language][0].value2.time = '03:00';
						////s_values[name][language][0].show_todate = 1;
						
						////console.log(s_values[name][language]);
					////}
				//}
				//catch(error) {
					//console.log('drupalgap_entity_build_from_form_state save date field - ' + error);
				//}
			//}
		//}
			
        if (form.elements[name].type == 'image') {
			if (form.elements[name].field_info_field.cardinality == -1) {
				try {
					s_values[name] = {};
					s_values[name][language] = [];
					if (form.arguments[0][name][language].length > 0) {
						for (var s_image_item = 0; s_image_item < form.arguments[0][name][language].length; s_image_item++) {
							s_values_array.push(form.arguments[0][name][language][s_image_item].fid);
						}

						
						if (Object.keys(value[language]).length > 0) {
							for (var s_image_item_values = 0; s_image_item_values < Object.keys(value[language]).length; s_image_item_values++) {
								if (value[language][s_image_item_values]) {
									if ($.inArray(value[language][s_image_item_values], s_values_array) == -1) {
										s_values_array.push(value[language][s_image_item_values]);
									}
								}
							}
						}
						
						for (var s_image_item = 0; s_image_item < s_values_array.length; s_image_item++) {
							s_values[name][language][s_image_item] = {};
							s_values[name][language][s_image_item].fid = s_values_array[s_image_item];
						}
					}
				}
				catch(error) {}
			}
			
		}
        // Skip elements with restricted access.
        if (
          typeof form.elements[name].access !== 'undefined' &&
          !form.elements[name].access
        ) { continue; }
        // Determine wether or not this element is a field. If it is, determine
        // it's module and field assembly hook.
        var is_field = false;
        var module = false;
        var hook = false;
        if (form.elements[name].is_field) {
          is_field = true;
          module = form.elements[name].field_info_field.module;
          hook = module + '_assemble_form_state_into_field';
          if (!function_exists(hook)) { hook = false; }
        }
        // Retrieve the potential key for the element, if we don't get one
        // then it is a flat field that should be attached as a property to the
        // entity. Otherwise attach the key and value to the entity.
        var key = drupalgap_field_key(name); // e.g. value, fid, tid, nid, etc.
        if (key) {
          // Determine how many allowed values for this field.
          var allowed_values = form.elements[name].field_info_field.cardinality;
         
         
         // if (allowed_values == -1) { allowed_values = 1; }
          if (allowed_values == -1) {
            //console.log('drupalgap_entity_build_from_form_state - value: ');
            //console.log(value);
            allowed_values = Object.keys(value[language]).length;
            //console.log('allowed_values : '+ allowed_values);
          }

         
         
         
         
          // Make sure there is at least one value before creating the form
          // element on the entity.
          if (typeof value[language][0] === 'undefined') { continue; }
          // Create an empty object to house the field on the entity.
          entity[name] = {};
          // Some fields do not use a delta value in the service call, so we
          // prepare for that here.
          // @todo - Do all options_select widgets really have no delta value?
          // Or is it only single value fields that don't have it? We need to
          // test this.
          var use_delta = true;
          if (
            form.elements[name].type ==
              'taxonomy_term_reference' ||
            form.elements[name].field_info_instance.widget.type ==
              'options_select'
          ) {
            use_delta = false;
            entity[name][language] = {};
          }
          else { entity[name][language] = []; }
          // Now iterate over each delta on the form element, and add the value
          // to the entity.
          for (var delta = 0; delta < allowed_values; delta++) {
            if (typeof value[language][delta] !== 'undefined') {
              // @TODO - the way values are determined here is turning into
              // spaghetti code. Every form element needs its own
              // value_callback, just like Drupal's FAPI. Right now DG has
              // something similar going on with the use of
              // hook_assemble_form_state_into_field(). So replace any spaghetti
              // below with a value_callback. Provide a deprecated hook warning
              // for any fields not haven't caught up yet, and fallback to the
              // hook for a while.
              // @UPDATE - Actually, the DG FAPI
              // hook_assemble_form_state_into_field() is a good idea, and
              // should be used by all field form elements, then in
              // drupalgap_field_info_instances_add_to_form(), that function
              // should use the value_callback idea to properly map entity data
              // to the form element's value.
              // Extract the value.
              var field_value = value[language][delta];
              // By default, we'll assume we'll be attaching this element item's
              // value according to a key (usually 'value' is the default key
              // used by Drupal fields). However, we'll give modules that
              // implement hook_assemble_form_state_into_field() an opportunity
              // to specify no usage of a key if their item doesn't need one.
              // The geofield module is an example of field that doesn't use a
              // key. The use_wrapper flag allows others to completely override
              // the use of a wrapper around the field value, e.g. taxonomy term
              // reference autocomplete. We'll attach any other helpful
              // variables here as well (element name, form id, etc).
              var field_key = {
                value: 'value',
                use_key: true,
                use_wrapper: true,
                use_delta: use_delta,
                name: name,
                form_id: form.id,
                element_id: form.elements[name][language][delta].id
              };
              // If this element is a field, give the field's module an
              // opportunity to assemble its own value, otherwise we'll just
              // use the field value extracted above.
              if (is_field && hook) {
                var fn = window[hook];
                field_value = fn(form.entity_type,
                  form.bundle,
                  field_value,
                  form.elements[name].field_info_field,
                  form.elements[name].field_info_instance,
                  language,
                  delta,
                  field_key,
                  form
                );
              }
              // If someone updated the key, use it.
              if (key != field_key.value) { key = field_key.value; }
              // If we don't need a delta value, place the field value using the
              // key, if posible. If we're using a delta value, push the key
              // and value onto the field to indicate the delta.
              if (!field_key.use_delta) {
                if (!field_key.use_wrapper) {
                  entity[name][language] = field_value;
                }
                else {
                  if ($.isArray(entity[name][language])) {
                    console.log(
                      'WARNING: drupalgap_entity_build_from_form_state - ' +
                      'cannot use key (' + key + ') on field (' + name + ') ' +
                      'language code array, key will be ignored.'
                    );
                    entity[name][language].push(field_value);
                  }
                  else { entity[name][language][key] = field_value; }
                }
              }
              else {
                if (field_key.use_key) {
                  var item = {};
                  item[key] = field_value;
                  entity[name][language].push(item);
                }
                else {
                  entity[name][language].push(field_value);
                }
              }
              // If the field value was null, we won't send along the field, so
              // just remove it. Except for list_boolean fields, they need a
              // null value to set the field value to false.
              if (
                field_value === null &&
                typeof entity[name] !== 'undefined' &&
                form.elements[name].type != 'list_boolean'
              ) {
                if (is_field) {
                  if (delta == 0) { delete entity[name]; }
                  else if (typeof entity[name][language][delta] !== 'undefined') {
                    delete entity[name][language][delta];
                  }
                }
                else { delete entity[name]; }
              }
              // If we had an optional select list, and no options were
              // selected, delete the empty field from the assembled entity.
              // @TODO - will this cause multi value issues?
              if (
                is_field && !use_delta &&
                form.elements[name].field_info_instance.widget.type ==
                  'options_select' && !form.elements[name].required &&
                field_value === '' && typeof entity[name] !== 'undefined'
              ) { delete entity[name]; }
            }
          }
      }
      else if (typeof value !== 'undefined') { entity[name] = value; }
    }
    
    if (!jQuery.isEmptyObject(s_values)) {
		//console.log(s_values);
		for (s_field_name in s_values) {
			try {
				if (s_values[s_field_name][language].length > 0) {
					entity[s_field_name] = s_values[s_field_name];
				}
			}
			catch(error) {}
			
		}		
	}
	//console.log(entity, 'entity');
    
    return entity;
  }
  catch (error) {
    console.log('drupalgap_entity_build_from_form_state - ' + error);
  }
}

//# sourceURL=media.helpers.js
