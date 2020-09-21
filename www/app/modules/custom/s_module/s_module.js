function s_module_menu() {
  try {
    var items = {};    
    //if (drupalgap.settings.app_settings.enabled_modules.module_1) {

		//console.log(drupalgap.settings.app_settings);

		var page_name = 'Мои записи';
		try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title) {
				page_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title;
			}  
		} catch (err) {
			//console.log(err);
		}

		items['mob-records-page'] = {
		  title: page_name,
		  page_callback: 's_mob_records_page',
		  options:{
			reloadPage:true
		  },
		};
		
		page_name = 'Мои записи';
		try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_1) {
				page_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_1;
			}  
		} catch (err) {
			//console.log(err);
		}
		items['mob-records-list/%'] = {
		  title: page_name,
		  page_callback: 's_mob_records_list_page',
		  options:{
			reloadPage:true
		  },
		  page_arguments: [1],
		};
		
		page_name = 'Добавить запись';
		try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_2) {
				page_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_2;
			}  
		} catch (err) {
			//console.log(err);
		}
		items['mob-record-add'] = {
		  title: page_name,
		  page_callback: 'drupalgap_get_form',
		  page_arguments: ['s_mob_record_add_form'],
		  pageshow: 's_mob_record_add_pageshow',
		  options:{
			reloadPage:true
		  },
		};
	//}
    
    //items['s_sites_list_page'] = {
      //title: 'Мои сайты',
      //page_callback: 's_sites_list_page'
    //};
    //items['s_sites_actions_page/%'] = {
      //title: 'Акции сайта',
      //page_callback: 's_sites_actions_page',
      //options:{
        //reloadPage:true
      //},
      //page_arguments: [1],
    //};
    //items['node/add/shares/%'] = {
      //title: 'Добавить акцию',
      //page_callback: 'node_add_page_by_type',
      //options:{
        //reloadPage:true
      //},
      //page_arguments: [2],
    //};
    //items['s_sites_news_page/%'] = {
      //title: 'Новости сайта',
      //page_callback: 's_sites_news_page',
      //options:{
        //reloadPage:true
      //},
      //page_arguments: [1],
    //};
    //items['node/add/modal_news/%'] = {
      //title: 'Добавить новость',
      //page_callback: 'node_add_page_by_type',
      //options:{
        //reloadPage:true
      //},
      //page_arguments: [2],
    //};
    //items['s_sites_photoalbums_page/%'] = {
      //title: 'Фотоальбомы сайта',
      //page_callback: 's_sites_photoalbums_page',
      //options:{
        //reloadPage:true
      //},
      //page_arguments: [1],
    //};
    //items['node/add/photo_gallery/%'] = {
      //title: 'Добавить фотоальбом',
      //page_callback: 'node_add_page_by_type',
      //options:{
        //reloadPage:true
      //},
      //page_arguments: [2],
    //};
    return items;
  }
  catch (error) { console.log('my_module_menu - ' + error); }
}

function s_mob_records_page() {
  try {
	var content = {};
	var button_name = '';

	button_name = 'Мои записи';
	try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_1) {
			button_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_1;
		}  
	} catch (err) {
		//console.log(err);
	}
    content.s_online_record_link = {
	  theme: 'link',
	  text: '<i class="fi_ofctr fi-address-book s-main-color-group"></i><span class="s-main-color-group s-link-title">'+button_name+'</span>',
	  path: 'mob-records-list/'+localStorage.getItem('s_user_hash'),
	  options:{
        reloadPage:true
      },
      attributes: {
        'class': 's-link-icon'
      }
	};
	
	button_name = 'записаться';
	try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_2) {
			button_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_first_page_step_app_2;
		}  
	} catch (err) {
		//console.log(err);
	}
	 content.s_online_record_add_link = {
	  theme: 'link',
	  text: '<i class="fi_ofctr fi-plus s-add-record-link-icon s-main-color-group"></i><span class="s-main-color-group s-add-record-link s-link-title">'+button_name+'</span>',
	  path: 'mob-record-add',
	  attributes: {
        'class': 's-link-icon'
      }
	};
    return content;
  }
  catch (error) { console.log('s_mob_records_page - ' + error); }
}

function s_mob_records_list_page(s_hash) {
	//console.log(s_hash);
  try {
    var content = {};
    content['s_mob_records_list'] = {
      theme: 'view',
      format: 'ul',
      path: 'mob-records-list/'+s_hash+'?hash_url='+Date.now(),
      row_callback: 's_mob_records_list_row',
      empty_callback: 's_mob_records_list_empty',
      attributes: {
        id: 's_mob_records_list_view'
      }
    };
    return content;
  }
  catch (error) { console.log('s_mob_records_list_page - ' + error); }
}

function s_mob_records_list_row(view, row, variables) {
  try {
    return row.title;
    //return l(t(row.title), 'node/' + row.nid);
  }
  catch (error) { console.log('my_module_articles_list_row - ' + error); }
}

function s_mob_records_list_empty(view, variables) {
  var content = {};
  content['msg'] = { markup: '<div class="s-empty-views-list">Ничего не найдено</div>' }
  return content;
}


function s_mob_record_add_form(form, form_state) {
	try {
		
		drupalgap_add_css('app/modules/custom/s_date_field_goodly/includes/js/jquery.mobile.datepicker.css');
    
		drupalgap_add_js('app/modules/custom/s_date_field_goodly/includes/js/jquery.ui.datepicker.js');
		drupalgap_add_js('app/modules/custom/s_date_field_goodly/includes/js/jquery.mobile.datepicker.js');
		drupalgap_add_js('app/modules/custom/s_date_field_goodly/includes/js/datepicker-ru.js');
		
		var s_form_val = '';
		var s_form_val1 = '';
		s_form_val = 'Выбор филиала';
		try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_breadcrumbs_adress) {
				s_form_val = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_breadcrumbs_adress;
			}  
		} catch (err) {
			//console.log(err);
		}

		form.elements['title'] = {
		  type: 'markup',
		  markup: '<div class="s-form-title">'+s_form_val+'</div>',
		};
				
		form.elements['affiliates'] = {
		  type: 'markup',
		  markup: '<div id="s_mob_record_add_form_step1"></div>',
		};
		
		s_form_val = 'Сотрудник';
		s_form_val1 = 'Услуга';
		try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_empl_name) {
				s_form_val = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_empl_name;
			}  
		} catch (err) {
			//console.log(err);
		}try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_serv_name) {
				s_form_val1 = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_serv_name;
			}  
		} catch (err) {
			//console.log(err);
		}
		form.elements['empl_or_service'] = {
			type: 'radios',
			options: {
				0: '<i class="fi_ofctr fi-choise-man"></i>'+s_form_val,
				1: '<i class="fi_ofctr fi-choise-service"></i>'+s_form_val1
			},
			default_value:'0'
		};
		
		form.elements['check_employer_or_serv'] = {
			type: 'markup',
			markup: '<div id="s_mob_record_check_employer_serv_elem"></div>',
		};
		
		form.elements['check_employer_or_serv_next'] = {
			type: 'markup',
			markup: '<div id="s_mob_record_check_employer_serv_elem_next"></div>',
		};
		
		form.elements['check_date'] = {
			type: 'markup',
			markup: '<div id="s_mob_record_check_date">' +
						'<div class="s-date-anotation-wrapper">'+
							'<span class="s-an s-an1"><span class="s-ico"></span><span class="s-text">нет записи</span></span>'+
							'<span class="s-an s-an2"><span class="s-ico"></span><span class="s-text">мало мест</span></span>'+
							'<span class="s-an s-an3"><span class="s-ico"></span><span class="s-text">много мест</span></span>'+
						'</div>' +
						'<input type="text" data-role="date" data-minDate="today" data-inline="true">' +
					'</div>',
		};
		
		form.elements['check_time'] = {
			type: 'markup',
			markup: '<div id="s_mob_record_check_times_employer"></div><div class="s-hidden"><input id="s-checked-time-val" type="text"><input id="s-checked-time-val1" type="text"></div>',
		};
		
		form.elements['final_form'] = {
			type: 'markup',
			markup: '<div id="s_mob_record_final_step_data"></div>',
		};
		
		form.elements['record_creation'] = {
			type: 'markup',
			markup: '<div id="s_mob_record_submit_message"></div>',
		};
		
		
		
		form.elements['step'] = {
			type: 'hidden',
			default_value:1,
		};
		
		
		
		//form.elements['affiliates'] = {
			  //type: 'radios',
			  //options: {
				//0: 'Краснодар',
				//1: 'Анапа'
			  //},
			  //default_value:"0"
		//};
		
		//form.elements['name'] = {
		  //type: 'textfield',
		  //title: 'Your name',
		  //required: true
		//};
		
		form.elements['submit'] = {
		  type: 'submit',
		  value: 'Далее',
		};
		
		form.elements['privacy_agreement'] = {
		  type: 'markup',
			markup: '<div id="s_mob_privacy_agreement_box"><div class="s-small-text">Нажимая, Вы принимаете <a href="#" onclick="window.open(\'https://lk.office-controller.ru/politic.pdf\', \'_system\'); return false;">Соглашение о конфиденциальности</a></div></div>',
		};
		
		
		
		return form;
  }
  catch (error) { console.log('my_module_custom_form - ' + error); }
}

function s_chat_add_message_form(form, form_state) {
	try {	
		
		last_message_id = false;
		if ($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child').length) {
			last_message_id = $('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child').data('cid');
		}	
		
		form.elements['message'] = {
		  type: 'textarea',
		  title: 'Текст сообщения:',
		  required: true,
		  attributes: {'data-last-message-id': last_message_id},
		};
		
		form.elements['submit'] = {
		  type: 'submit',
		  value: 'Отправить',
		};
		
		return form;
  }
  catch (error) { console.log('my_module_custom_form - ' + error); }
}

function s_chat_add_message_form_submit(form, form_state, last_message_id) {
	try { 
		if (form_state.values.message) {
			
			last_message_id = $('#edit-s-chat-add-message-form-message').data('lastMessageId');
			//console.log(last_message_id);
			
			Drupal.services.call({
				data: JSON.stringify({
					hash: localStorage.getItem('s_user_hash'),
					message: form_state.values.message,
					last_message_id: last_message_id,
				}),
				method: 'POST',
				service: 's_custom_service_resources',
				resource: 's_chat_add_message',
				path: 's_custom_service_resources/s_chat_add_message.json',
				success: function(result) {
					if (result.html) {
						if (result.s_last_comment_cid) {
							
							$('.s-chat-messages-wrapper').find('.s-chat-message-box[data-cid="'+result.s_last_comment_cid+'"]').nextAll().remove();
							var s_add_comments = $('.s-chat-messages-wrapper', result.html).html();
							
							//console.log(s_add_comments);
							
							$('.s-chat-box-wrapper .s-chat-messages-wrapper').append(s_add_comments);
							
							//var s_add_comments = $('.s-chat-messages-wrapper', result.html).html();
							//$('.s-chat-box-wrapper .s-chat-messages-wrapper').append(s_add_comments);
							
							//last_message_id = false;
							//if ($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child').length) {
								//last_message_id = $('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child').data('cid');
							//}
							//$('#edit-s-chat-add-message-form-message').attr('data-last-message-id',last_message_id);
							
						}
						else {
							$('.mob-chat-page .s-chat-content-wrapper').replaceWith(result.html);
						}
					}
					
					if (result.scroll) {
						s_wait_ajax_replace($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child'), 100);
					}

					$( "#s-chat-add-message-form-popup" ).popup( "close" );
					$("#s-chat-add-message-form-popup textarea#edit-s-chat-add-message-form-message").val('');
				}
			});
		}
	}
	catch (error) { console.log('s_chat_add_message_form_submit - ' + error); }
}

function s_mob_record_add_pageshow(form, form_state) {

	s_module_get_site_affiliates({
		data: JSON.stringify({s_site_id: drupalgap.settings.site_id}),
		success: function(result) {
		  $('#s_mob_record_add_form_step1').html(result[0]).trigger('create');
		  $('#mob_record_add').addClass('s-fixed-submit-button');
		}
	});
}

function s_mob_record_add_form_validate(form, form_state) {
  try {
	/* --- проверка поля с выбором времени на пустоту --- */
    if (form_state.values['step'] == 6) {
		if($.trim($(".field-name-check-time #s-checked-time-val").val()).length > 0) {
				
			}
			else {
				drupalgap_form_set_error('name', 'Не выбрано время!');
			}
	}
  }
  catch (error) { console.log('my_module_custom_form_validate - ' + error); }
}

function s_mob_record_add_form_submit(form, form_state) {
	try {
		//$('#mob_record_add.s-fixed-submit-button').removeClass('s-fixed-submit-button');
		
		
		form_state.values['affiliates'] = $('#s_mob_record_add_form_step1 .ui-radio input:checked').val();
		form_state.values['check_employer_or_serv'] = $('#s_mob_record_check_employer_serv_elem .ui-radio input:checked').val();
		form_state.values['check_employer_or_serv_next'] = $('#s_mob_record_check_employer_serv_elem_next .ui-radio input:checked').val();
		//if (form_state.values['step'] > 4)
		form_state.values['check_date'] = $('#s_mob_record_add_form .field-name-check-date .ui-input-text input').val();
		form_state.values['check_time'] = $('#s_mob_record_add_form .field-name-check-time #s-checked-time-val').val();
		form_state.values['check_time1'] = $('#s_mob_record_add_form .field-name-check-time #s-checked-time-val1').val();
		
		form_state.values.step = parseInt(form_state.values['step']) + 1;
		$('#edit-s-mob-record-add-form-step').val(form_state.values.step);
		
		/* --- get employers list or service list by id affiliates --- */
		if (form_state.values['step'] == 3) {
			s_module_get_employers_or_services({
				data: JSON.stringify({
					s_branch_id: form_state.values.affiliates, 
					empl_or_service: form_state.values['empl_or_service'],
					checked_empl_or_service_id: 0
				}),
				success: function(result) {
				  //console.log(result);
				  $('#s_mob_record_check_employer_serv_elem').html(result[0]).trigger('create');
				  setTimeout(function(){
					_s_module_hidding_form_fields_by_step(form_state.values['step']);
				  }, 400);
				  
					
					/* --- open more info emloyers list --- */
					$('.s-table .s-more').on('vclick', function() {
						$(this).closest('.ui-btn').find('.s-description').slideToggle();
					});
				}
			});
			
			//if (form_state.values['empl_or_service'] == 0) {
				//s_module_get_employers({
					//data: JSON.stringify({s_branch_id: form_state.values.affiliates}),
					//success: function(result) {
					  //$('#s_mob_record_check_employer_serv_elem').html(result[0]).trigger('create');
					  
					//}
				//});
			//}
			//if (form_state.values['empl_or_service'] == 1) {
				//s_module_get_services({
					//data: JSON.stringify({s_branch_id: form_state.values.affiliates}),
					//success: function(result) {
					  //$('#s_mob_record_check_employer_serv_elem').html(result[0]).trigger('create');
					//}
				//});
			//}
		}
		
		/* --- get employers list or service list next step by cheked before --- */
		if (form_state.values['step'] == 4) {
			s_module_get_employers_or_services({
				data: JSON.stringify({
					s_branch_id: form_state.values.affiliates, 
					empl_or_service: form_state.values['empl_or_service'],
					checked_empl_or_service_id: form_state.values['check_employer_or_serv']
				}),
				success: function(result) {
				  //console.log(result);
				  $('#s_mob_record_check_employer_serv_elem_next').html(result[0]).trigger('create');
				  setTimeout(function(){
					_s_module_hidding_form_fields_by_step(form_state.values['step']);
				  }, 200);
				  
				  /* --- open more info emloyers list --- */
					$('.s-table .s-more').on('vclick', function() {
						$(this).closest('.ui-btn').find('.s-description').slideToggle();
					});
				}
			});
		}
		
		/* --- get employers list time --- */
		if (form_state.values['step'] == 6) {
			s_module_get_times_employers({
				data: JSON.stringify({
					s_branch_id: form_state.values.affiliates,
					empl_id: (form_state.values.empl_or_service == '0' ? form_state.values.check_employer_or_serv : form_state.values.check_employer_or_serv_next),
					serv_id: (form_state.values.empl_or_service == '0' ? form_state.values.check_employer_or_serv_next : form_state.values.check_employer_or_serv),
					check_date: form_state.values.check_date,
				}),
				success: function(result) {
				  //console.log(result);
				  $('#s_mob_record_check_times_employer').html(result[0]).trigger('create');
				  $('#s_mob_record_check_times_employer .s-range-wrapper a').on('vclick', function() {
						$('#s_mob_record_check_times_employer .s-range-wrapper a').removeClass('active');
						$(this).addClass('active');
						$(".field-name-check-time #s-checked-time-val").val($(this).data('time'));
						$(".field-name-check-time #s-checked-time-val1").val($(this).data('time1'));
						
						//$('#mob_record_add').addClass('s-fixed-submit-button');
						return false;
					});
				  $('#s_mob_record_check_times_employer .s-work-time-list-wrapper .s-hour-line a').on('vclick', function() {
						if ($(this).hasClass('s-open')) $('span', this).text(' развернуть');
						else $('span', this).text(' свернуть');
						$(this).toggleClass('s-open').parent().next('.s-range-wrapper').slideToggle();
						return false;
					});
					
					setTimeout(function(){
						_s_module_hidding_form_fields_by_step(form_state.values['step']);
					  }, 200);
				}
			});
			//else alert('Error');
		}

		var _s_apply_button_text = 'подтвердить';
		try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_textbtn) {
				_s_apply_button_text = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_textbtn;
			}  
		} catch (err) {
			//console.log(err);
		}
		
		/* --- final step --- */
		if (form_state.values['step'] == 7) {
			$('#s_mob_record_add_form .field-name-submit').hide();
			if ($('#s_mob_record_add_form .field-name-submit .dg_form_submit_button').text() != _s_apply_button_text)
				$('#s_mob_record_add_form .field-name-submit .dg_form_submit_button').text(_s_apply_button_text);
				
			$('#s_mob_record_add_form .form-item.field-name-privacy-agreement').show();
			
			//console.log(form_state.values);
			s_module_final_step_service({
				data: JSON.stringify({
					s_branch_id: form_state.values.affiliates, 
					empl_id: (form_state.values.empl_or_service == '0' ? form_state.values.check_employer_or_serv : form_state.values.check_employer_or_serv_next),
					serv_id: (form_state.values.empl_or_service == '0' ? form_state.values.check_employer_or_serv_next : form_state.values.check_employer_or_serv),
					check_date: form_state.values.check_date,
					check_time: form_state.values.check_time,
					check_time1: form_state.values.check_time1,
				}),
				success: function(result) {
				  //console.log(result);
				  $('#s_mob_record_final_step_data').html(result[0]).trigger('create');
				  $('#s_mob_record_add_form .field-name-submit').show();
				  setTimeout(function(){
					_s_module_hidding_form_fields_by_step(form_state.values['step']);
				  }, 200);
				}
			});
		}
		else {
			if ($('#s_mob_record_add_form .field-name-submit .dg_form_submit_button').text() == _s_apply_button_text)
				$('#s_mob_record_add_form .field-name-submit .dg_form_submit_button').text('далее');
				
			$('#s_mob_record_add_form .form-item.field-name-privacy-agreement').hide();
		}
		
		/* --- create record step --- */
		if (form_state.values['step'] == 8) {
			
			var s_user_phone = localStorage.getItem('s_user_phone');
		
			$('#s_mob_record_add_form .field-name-submit').hide();
			
			//console.log(form_state.values);
			s_module_create_record_service({
				data: JSON.stringify({
					s_branch_id: form_state.values.affiliates, 
					empl_id: (form_state.values.empl_or_service == '0' ? form_state.values.check_employer_or_serv : form_state.values.check_employer_or_serv_next),
					serv_id: (form_state.values.empl_or_service == '0' ? form_state.values.check_employer_or_serv_next : form_state.values.check_employer_or_serv),
					check_date: form_state.values.check_date,
					check_time: form_state.values.check_time,
					check_time1: form_state.values.check_time1,
					site_id: drupalgap.settings.site_id,
					s_user_phone: s_user_phone,
				}),
				success: function(result) {
				  //console.log(result);
				  $('#s_mob_record_submit_message').html(result[0]).trigger('create');
				  $(".field-name-check-time #s-checked-time-val").val('');
				}
			});
		}
		//console.log(form_state.values['step']);
		
		/* --- final form --- */
		//if (form_state.values['step'] == 7) {
			
		//}
		
		//console.log(form_state.values);
		
		if (form_state.values.step == 3) {
			_s_module_set_step_title(form_state.values.step, empl_serv = form_state.values.empl_or_service);
		}
		else if (form_state.values.step == 4) {
			empl_serv = (form_state.values.empl_or_service == '0' ? '1' : '0');
			_s_module_set_step_title(form_state.values.step, empl_serv);
		}
		else _s_module_set_step_title(form_state.values.step, empl_serv = false);
		
		
		/* --- step prev functionality --- */
		
		if (form_state.values.step > 1 && form_state.values.step < 8) {
			$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').addClass('s-more-step').html('');
			
			var s_prev_step_links = '';
			var last_step_num = 1;
			for (var i = 1; i < form_state.values.step; i++) {
				s_prev_step_links += '<a onclick="_s_return_step('+(i)+')" class="s-step-prev s-step-prev-'+(i)+'" data-step="'+i+'">'+(i)+'</a>';
				last_step_num = i;
			}
			
			//s_prev_step_links += '<img src="images/title-arrow.png" class="s-title-arrow" />'
			s_prev_step_links += '<i onclick="_s_return_step('+(last_step_num)+')" class="fi_ofctr fi-chevron-left"></i>'
			
			$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').html(s_prev_step_links);
		}
		
		else if (form_state.values.step >= 8) {
			$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').removeClass('s-more-step').html('Успешно добавлено');
		}
		
		//$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').on('vclick', 'a.s-step-prev', function() {
			//if ($(this).data('step'))
			//_s_return_step($(this).data('step'));
			////$('#mob_record_add.s-fixed-submit-button').removeClass('s-fixed-submit-button');
		//});
		//$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').on('vclick', 'i.fi-chevron-left', function() {
			//$s_step = $(this).prev('.s-step-prev').data('step');
			//console.log($s_step);
			//_s_return_step($s_step);
			////$('#mob_record_add.s-fixed-submit-button').removeClass('s-fixed-submit-button');
		//});
		
		$('#mob_record_add #s_mob_record_submit_message').on('vclick', 'a.s-return-start-link', function() {
			_s_return_step($(this).data('step'));
			$('#s_mob_record_add_form .field-name-submit').show();
			//$('#mob_record_add.s-fixed-submit-button').removeClass('s-fixed-submit-button');
			return false;
		});
		
		/* --- */
		
		if ($.inArray(form_state.values['step'], [3,4,6]) == -1)
			_s_module_hidding_form_fields_by_step(form_state.values['step']);
	}
	catch (error) { console.log('my_module_custom_form_submit - ' + error); }
}

function _s_get_page_name_by_step_num() {
	return {
		1:  ['affiliates'],
		2:  ['empl-or-service'],
		3:  ['check-employer-or-serv'],
		4:  ['check-employer-or-serv-next'],
		5:  ['check-date'],
		6:  ['check-time'],
		7:  ['final-form'],
		8:  ['record-creation'],
	};
}

function _s_module_hidding_form_fields_by_step(step_num) {
	//console.log(step_num);
	
	var s_fields_by_step = _s_get_page_name_by_step_num();
	
	
	jQuery.each(s_fields_by_step, function( index, value ) {
		$.each(value, function( index1, value1 ) {
			if (index != step_num) $('.field-name-'+value1).hide();
			else $('#s_mob_record_add_form .form-item.field-name-'+value1).show();
		});
	});
	
}

function _s_module_set_step_title(step_num, empl_serv = false) {
	var s_title = '';
	var s_str1 = '';
	var s_affiliates = '';

	s_affiliates = 'Выбор филиала';
	try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_breadcrumbs_adress) {
			s_affiliates = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_breadcrumbs_adress;
		}  
	} catch (err) {
		//console.log(err);
	}
	
	var s_empl_name = false;
	var s_serv_name = false;

	try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_empl_name) {
			s_empl_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_empl_name;
		}  
	} catch (err) {
		//console.log(err);
	}try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_serv_name) {
			s_serv_name = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_serv_name;
		}  
	} catch (err) {
		//console.log(err);
	}

	s_str1 = (s_empl_name ? s_empl_name : 'Сотрудник')+' или '+(s_serv_name ? s_serv_name : 'услуга');

	var s_default_empl_step_3_4 = 'Выбор сотрудника';
	var s_default_serv_step_3_4 = 'Выбор услуги';

	try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_empl) {
			s_default_empl_step_3_4 = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_empl;
		}  
	} catch (err) {
		//console.log(err);
	}try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_serv_inner) {
			s_default_serv_step_3_4 = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_serv_inner;
		}  
	} catch (err) {
		//console.log(err);
	}

	var s_title_by_step = {
		1:  [s_affiliates],
		2:  [s_str1],
		3:  [s_default_empl_step_3_4, s_default_serv_step_3_4],
		4:  [s_default_empl_step_3_4, s_default_serv_step_3_4],
		5:  ['Выбор даты'],
		6:  ['Выбор времени'],
		7:  ['Подтверждение'],
		8:  ['Создание записи'],
	};
	
	if (s_title_by_step[step_num]) {
		if (empl_serv) s_title = s_title_by_step[step_num][empl_serv];
		else s_title = s_title_by_step[step_num];
		
		/* --- form step attr --- */
		if (empl_serv) {
			s_class = 's-form-step-'+step_num+'-'+empl_serv;
		}
		else s_class = 's-form-step-'+step_num;
		
		//console.log(s_title);
		$('#s_mob_record_add_form .field-name-title .s-form-title').text(s_title);
		
		$('#s_mob_record_add_form').attr( "step", s_class );
	}
}

//function s_sites_list_page() {
  //try {
    //var content = {};
    //content['s_sites_list_page'] = {
      //theme: 'view',
      //format: 'ul',
      //path: 'mob-sites-list', /* the path to the view in Drupal */
      //row_callback: 's_module_sites_list_row',
      //empty_callback: 's_module_sites_list_empty',
      //attributes: {
        //id: 'my_articles_list_view'
      //}
    //};
    //return content;
  //}
  //catch (error) { console.log('s_module_sites_list_page - ' + error); }
//}

//function s_module_sites_list_row(view, row, variables) {
  //try {
    //return l(t(row.title), 'node/' + row.nid);
  //}
  //catch (error) { console.log('my_module_articles_list_row - ' + error); }
//}

//function s_module_sites_list_empty(view, variables) {
  //var content = {};
  //content['msg'] = { markup: t('Sorry, no articles were found.') }
  //return content;
//}

///* --- Actions page --- */
//function s_sites_actions_page(nid) {
  //try {
    //var content = {};
    
    //var s_arg = arg();
    //var s_adding_link = 'node/add/shares';
    //if (s_arg[0] == 's_sites_actions_page' && s_arg[1]) {
		//s_adding_link = 'node/add/shares/'+s_arg[1];
	//}
	
	//content['s_sites_actions_page_add'] = {
		//theme: 'button_link',
	    //text: 'Добавить акцию',
	    //path: s_adding_link,
	    //attributes: {
		  //'data-icon': 'plus'
	    //}
	//};
    
    //content['s_sites_actions_page'] = {
      //theme: 'view',
      //format: 'ul',
      //path: 'mob-actions-list/'+nid, /* the path to the view in Drupal */
      //row_callback: 's_module_sites_actions_row',
      //empty_callback: 's_module_sites_actions_empty',
      //title: 'Список акций',
      //attributes: {
        //id: 'sites_actions_page_list_view_'+nid
      //}
    //};
    //return content;
  //}
  //catch (error) { console.log('s_sites_actions_page - ' + error); }
//}

//function s_module_sites_actions_row(view, row, variables) {
  //try {
    //return l(t(row.title), 'node/' + row.nid);
  //}
  //catch (error) { console.log('sites_actions_list_row - ' + error); }
//}

//function s_module_sites_actions_empty(view, variables) {
  //var content = {};
  //content['msg'] = { markup: t('Sorry, no articles were found.') }
  //return content;
//}
///* --- */

///* --- News page --- */
//function s_sites_news_page(nid) {
  //try {
    //var content = {};
    
    //var s_arg = arg();
    //var s_adding_link = 'node/add/modal_news';
    //if (s_arg[0] == 's_sites_news_page' && s_arg[1]) {
		//s_adding_link = 'node/add/modal_news/'+s_arg[1];
	//}
    
    //content['s_sites_news_page_add'] = {
		//theme: 'button_link',
	    //text: 'Добавить новость',
	    //path: s_adding_link,
	    //attributes: {
		  //'data-icon': 'plus'
	    //}
	//};
    
    //content['s_sites_news_page'] = {
      //theme: 'view',
      //format: 'ul',
      //path: 'mob-news-list/'+nid, /* the path to the view in Drupal */
      //row_callback: 's_module_sites_news_row',
      //empty_callback: 's_module_sites_news_empty',
      //title: 'Список новостей',
      //attributes: {
        //id: 'sites_news_page_list_view_'+nid
      //}
    //};
    //return content;
  //}
  //catch (error) { console.log('s_sites_news_page - ' + error); }
//}

//function s_module_sites_news_row(view, row, variables) {
  //try {
    //return l(t(row.title), 'node/' + row.nid);
  //}
  //catch (error) { console.log('sites_news_list_row - ' + error); }
//}

//function s_module_sites_news_empty(view, variables) {
  //var content = {};
  //content['msg'] = { markup: t('Sorry, no articles were found.') }
  //return content;
//}
///* --- */

///* --- Photoalbums page --- */
//function s_sites_photoalbums_page(nid) {
  //try {
    //var content = {};
    ////console.log(arg());
    //var s_arg = arg();
    //var s_adding_link = 'node/add/photo_gallery';
    //if (s_arg[0] == 's_sites_photoalbums_page' && s_arg[1]) {
		//s_adding_link = 'node/add/photo_gallery/'+s_arg[1];
	//}
    
    //content['s_sites_photoalbums_page_add'] = {
		//theme: 'button_link',
	    //text: 'Добавить фотоальбом',
	    //path: s_adding_link,
	    //attributes: {
		  //'data-icon': 'plus'
	    //}
	//};
    
    //content['s_sites_photoalbums_page'] = {
      //theme: 'view',
      //format: 'ul',
      //path: 'mob-photoalbums-list/'+nid, /* the path to the view in Drupal */
      //row_callback: 's_module_sites_photoalbums_row',
      //empty_callback: 's_module_sites_photoalbums_empty',
      //title: 'Список фотоальбомов',
      //attributes: {
        //id: 'sites_photoalbums_page_list_view_'+nid
      //},
    //};
    
    //return content;
  //}
  //catch (error) { console.log('s_sites_photoalbums_page - ' + error); }
//}

//function s_module_sites_photoalbums_row(view, row, variables) {
  //try {
    //return l(t(row.title), 'node/' + row.nid);
  //}
  //catch (error) { console.log('sites_photoalbums_list_row - ' + error); }
//}

//function s_module_sites_photoalbums_empty(view, variables) {
  //var content = {};
  //content['msg'] = { markup: t('Sorry, no articles were found.') }
  //return content;
//}
///* --- */

///* --- ссылка на настройки сайта --- */
//function s_module_node_page_view_alter_site(node, options) {
  //try {
    //var content = {};
    //content['s_title'] = {
      //markup: '<h2>'+node.title+'</h2>'
    //};
    //content['s_content'] = {
      //markup: node.content
    //};
    ////content['s_site_actions_link'] = {
      ////theme: 'button_link',
      ////text: 'Акции',
      ////path: 's_sites_actions_page/'+node.nid,
      ////attributes: {
		////'data-icon': 'gear'
	  ////}
    ////};
    //content['s_site_news_link'] = {
      //theme: 'button_link',
      //text: 'Новости',
      //path: 's_sites_news_page/'+node.nid,
      //attributes: {
		//'data-icon': 'gear'
	  //}
    //};
    //content['s_site_photoalbums_link'] = {
      //theme: 'button_link',
      //text: 'Фотоальбомы',
      //path: 's_sites_photoalbums_page/'+node.nid,
      //attributes: {
		//'data-icon': 'gear'
	  //}
    //};
    ////content['my_collapsible'] = {
      ////theme: 'collapsible',
      ////header: node.title,
      ////content: node.content
    ////};
    
    
    
    //options.success(content);
  //}
  //catch (error) { console.log('my_module_node_page_view_alter_article - ' + error); }
//}

function s_module_form_alter(form, form_state, form_id) {
	//console.log(form_id);
	//console.log(form);
	
	if (form_id == 'user_login_form') {
		form.elements.submit.value = 'Войти';
		form.buttons.create_new_account.title = 'Регистрация';
		form.buttons.forgot_password.title = 'Восстановление пароля';
		
	}
	
	if (form_id == 'node_edit' && form.bundle == 'shares') {
		if (arg(3)) {
			form.elements['field_site_nid']['und']['0']['value'] = arg(3);
			form.elements['language'].default_value = 'ru';
			form.elements['field_modal_status']['field_info_instance']['default_value']['0'].value = "1";
		}
		
		form.elements['title'].title = "Заголовок акции";
		//form.elements['title'].value = "Временный заголовок";
		form.elements['title'].weight = 0;
		
		form.elements['field_site_nid'].prefix = '<div style="display: none;">';
		form.elements['field_site_nid'].suffix = '</div>';
		
		form.elements['field_modal_status'].prefix = '<div style="display: none;">';
		form.elements['field_modal_status'].suffix = '</div>';
		
		form.elements['field_json_data'].prefix = '<div style="display: none;">';
		form.elements['field_json_data'].suffix = '</div>';
		
		try {
			form.buttons['delete'].attributes['s_del_redirect'] = "s_sites_actions_page/"+form.elements.field_site_nid.und[0].value;
			//console.log(form.elements.field_site_nid.und[0].value);
		}
		catch(error) {}
	}
	
	if (form_id == 'node_edit' && form.bundle == 'modal_news') {
		if (arg(3)) {
			form.elements['field_site_nid']['und']['0']['value'] = arg(3);
			form.elements['language'].default_value = 'ru';
			form.elements['field_modal_status']['field_info_instance']['default_value']['0'].value = "1";
		}
		
		form.elements['title'].title = "Заголовок новости";
		//form.elements['title'].value = "Временный заголовок";
		form.elements['title'].weight = 0;
		
		form.elements['field_site_nid'].prefix = '<div style="display: none;">';
		form.elements['field_site_nid'].suffix = '</div>';
		
		form.elements['field_modal_status'].prefix = '<div style="display: none;">';
		form.elements['field_modal_status'].suffix = '</div>';
		
		try {
			form.buttons['delete'].attributes['s_del_redirect'] = "s_sites_news_page/"+form.elements.field_site_nid.und[0].value;
			//console.log(form.elements.field_site_nid.und[0].value);
		}
		catch(error) {}
		
	}
	if (form_id == 'node_edit' && form.bundle == 'photo_gallery') {
		//console.log(arg());
		//form.submit.unshift('s_module_node_save_submit_loader');
		//form.submit[0] = 's_module_node_save_submit_loader';
		
		if (arg(3)) {
			form.elements['field_site_nid']['und']['0']['value'] = arg(3);
			form.elements['language'].default_value = 'ru';
			form.elements['field_modal_status']['field_info_instance']['default_value']['0'].value = "1";
		}
		//form.elements['field_site_nid'].access = false;
		form.elements['field_site_nid'].prefix = '<div style="display: none;">';
		form.elements['field_site_nid'].suffix = '</div>';
		
		form.elements['field_modal_status'].prefix = '<div style="display: none;">';
		form.elements['field_modal_status'].suffix = '</div>';
		
		form.elements['title'].title = "Заголовок фотоальбома";
		//form.elements['title'].value = "Временный заголовок";
		form.elements['title'].weight = 0;
		
		try {
			form.buttons['delete'].attributes['s_del_redirect'] = "s_sites_photoalbums_page/"+form.elements.field_site_nid.und[0].value;
			//console.log(form.elements.field_site_nid.und[0].value);
		}
		catch(error) {}
		
		//console.log(form);
		//$('.field-name-field-modal-status select').val(1).attr('selected', true).siblings('option').removeAttr('selected');
		//console.log(form.elements['field_modal_status']['und']['0']);
	}
	
	if (form.buttons.cancel) {
		form.buttons.cancel.title = "Отменить";
	}
	
	if (form.buttons['delete']) {
		form.buttons['delete'].title = "Удалить";
	}
	
	try {
		if (form.elements['submit'].value == "Save") {
			form.elements['submit'].value = "Сохранить";
		}
	}
	catch (error) {}
}

/* function s_module_node_page_view_alter_modal_news(node, options) {
  try {
    options.success(node.content);
  }
  catch (error) { console.log('my_module_node_page_view_alter_article - ' + error); }
} */



/* --- overide core --- */

function _s_return_step(step_num) {
	var s_checked_step = step_num;
			
	_s_module_hidding_form_fields_by_step(s_checked_step);
	$('#mob_record_add input#edit-s-mob-record-add-form-step').val(s_checked_step);
	
	$('#mob_record_add #s_mob_record_final_step_data').html('');
	
	if (s_checked_step >= 1) {
		$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').addClass('s-more-step').html('');
		var s_prev_step_links = '';
		var last_step_num = 1;
		for (var i = 1; i < s_checked_step; i++) {
			s_prev_step_links += '<a onclick="_s_return_step('+(i)+')" class="s-step-prev s-step-prev-'+(i)+'" data-step="'+i+'">'+(i)+'</a>';
			last_step_num = i;
		}
		
		//s_prev_step_links += '<img src="images/title-arrow.png" class="s-title-arrow" />'
		s_prev_step_links += '<i onclick="_s_return_step('+(last_step_num)+')" class="fi_ofctr fi-chevron-left"></i>'
		
		$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').html(s_prev_step_links);

		//_s_module_set_step_title(s_checked_step);

		console.log(s_checked_step);
		var s_checked_empl = $('form#s_mob_record_add_form .form-item.field-name-empl-or-service input').prop('checked');
		s_checked_empl = (s_checked_empl? '0':'1');

		if (s_checked_step == 3) {
			_s_module_set_step_title(s_checked_step, s_checked_empl);
		}
		else if (s_checked_step == 4) {
			s_checked_empl = (s_checked_empl == '0' ? '1' : '0');
			_s_module_set_step_title(s_checked_step, s_checked_empl);
		}
		else _s_module_set_step_title(s_checked_step, empl_serv = false);
	}
	else {
		$('#mob_record_add #drupalgap_page_title_mob_record_add.page-title').removeClass('s-more-step').html('Добавить запись');
	}
	
	var _s_apply_button_text = 'подтвердить';
	try {
		if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_textbtn) {
			_s_apply_button_text = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_check_textbtn;
		}  
	} catch (err) {
		//console.log(err);
	}

	if ($('#s_mob_record_add_form .field-name-submit .dg_form_submit_button').text() == _s_apply_button_text)
		$('#s_mob_record_add_form .field-name-submit .dg_form_submit_button').text('далее');
		
	$('#s_mob_record_add_form .form-item.field-name-privacy-agreement').hide();
}

function s_module_get_site_affiliates(options) {
  try {
    options.method = 'POST';
    options.path = 's_custom_service_resources/get_site_affiliates.json';
    options.service = 's_custom_service_resources';
    options.resource = 'get_site_affiliates';
    Drupal.services.call(options);
  }
  catch (error) {
    console.log('my_module_get_user_count - ' + error);
  }
}

//function s_module_get_employers(options) {
  //try {
    //options.method = 'POST';
    //options.path = 's_custom_service_resources/get_employers.json';
    //options.service = 's_custom_service_resources';
    //options.resource = 'get_employers';
    //Drupal.services.call(options);
  //}
  //catch (error) {
    //console.log('my_module_get_employers - ' + error);
  //}
//}

//function s_module_get_services(options) {
  //try {
    //options.method = 'POST';
    //options.path = 's_custom_service_resources/get_services.json';
    //options.service = 's_custom_service_resources';
    //options.resource = 'get_services';
    //Drupal.services.call(options);
  //}
  //catch (error) {
    //console.log('my_module_get_services - ' + error);
  //}
//}

function s_module_get_employers_or_services(options) {
  try {
    options.method = 'POST';
    options.path = 's_custom_service_resources/get_employers_or_services.json';
    options.service = 's_custom_service_resources';
    options.resource = 'get_employers_or_services';
    Drupal.services.call(options);
  }
  catch (error) {
    console.log('my_module_get_services - ' + error);
  }
}

function s_module_get_times_employers(options) {
  try {
    options.method = 'POST';
    options.path = 's_custom_service_resources/get_times_employers.json';
    options.service = 's_custom_service_resources';
    options.resource = 'get_times_employers';
    Drupal.services.call(options);
  }
  catch (error) {
    console.log('my_module_get_services - ' + error);
  }
}

function s_module_final_step_service(options) {
  try {
    options.method = 'POST';
    options.path = 's_custom_service_resources/final_step_service.json';
    options.service = 's_custom_service_resources';
    options.resource = 'final_step_service';
    Drupal.services.call(options);
  }
  catch (error) {
    console.log('my_module_get_services - ' + error);
  }
}

function s_module_create_record_service(options) {
  try {
    options.method = 'POST';
    options.path = 's_custom_service_resources/create_record_message_step.json';
    options.service = 's_custom_service_resources';
    options.resource = 'create_record_message_step';
    Drupal.services.call(options);
  }
  catch (error) {
    console.log('my_module_get_services - ' + error);
  }
}



// --- slide menu ---

function s_module_block_info() {
  try {
    var blocks = {};
    blocks['s_module_slide_menu_block'] = {
      delta: 's_module_slide_menu_block',
      module: 's_module'
    };
    blocks['s_module_slide_menu_block_button'] = {
      delta: 's_module_slide_menu_block_button',
      module: 's_module'
    };
    blocks['s_module_feedback_popup_block'] = {
      delta: 's_module_feedback_popup_block',
      module: 's_module'
    };
    return blocks;
  }
  catch (error) { console.log('s_module_block_info - ' + error); }
}

function s_module_block_view(delta, region) {
	var s_user_phone = localStorage.getItem('s_user_phone');
  try {
    var content = '';
    switch (delta) {

      // The slide menu (aka panel).
      case 's_module_slide_menu_block':

        var attrs = {
          id: drupalgap_panel_id(delta),
          'data-role': 'panel',
          'data-position': 'left', // left or right
          'data-display': 'overlay' // overlay, reveal or push
        };
        var items = [
		  bl('', '#', {
			  attributes: {
                'data-rel':"close",
                'data-icon': 'delete',
                'class': 's-close-button fi_ofctr',
              }
          }),
       
          /*bl('очистить все', '#', {
			  attributes: {
                'onclick': "javascript:_s_app_phone_number_remove();"
              }
		  }),*/
        ];
        
        var s_modules_names = {};
		s_modules_names.module_1 = 'онлайн запись';

        try {
			if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title) {
				s_modules_names.module_1 = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title;
			}  
		} catch (err) {
			//console.log(err);
		}
        s_modules_names.module_4 = 'скидки и подарки';
        try {
			if(drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_title) {
				s_modules_names.module_4 = drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_title;
			}  
		} catch (err) {
			//console.log(err);
		}
        s_modules_names.module_3 = 'новости от нас';
        try {
			if(drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_title) {
				s_modules_names.module_3 = drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_title;
			}  
		} catch (err) {
			//console.log(err);
		}
        s_modules_names.module_5 = 'задать вопрос';
        try {
			if(drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_title) {
				s_modules_names.module_5 = drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_title;
			}  
		} catch (err) {
			//console.log(err);
		}
        s_modules_names.module_2 = 'заказать звонок';
        try {
			if(drupalgap.settings.app_settings.app_settings_other.modules_settings[2].modules_settings_title) {
				s_modules_names.module_2 = drupalgap.settings.app_settings.app_settings_other.modules_settings[2].modules_settings_title;
			}  
		} catch (err) {
			//console.log(err);
		}
        
        if (!drupalgap.settings.app_settings.enabled_modules) {
			items.push(bl('<i class="s-menu-icon s-menu-icon1 fi_ofctr fi-booking"></i>'+s_modules_names.module_1, 'mob-records-page', {reloadPage:true}));
			items.push(bl('<i class="s-menu-icon s-menu-icon2 fi_ofctr fi-promo"></i>'+s_modules_names.module_4, 'mob-actions-list-page/'+drupalgap.settings.site_id, {
				  reloadPage:true
			  }));
			items.push(bl('<i class="s-menu-icon s-menu-icon3 fi_ofctr fi-news"></i>'+s_modules_names.module_3, 'mob-news-list-page/'+drupalgap.settings.site_id, {reloadPage:true}));
			items.push(bl('<i class="s-menu-icon s-menu-icon4 fi_ofctr fi-chat"></i>'+s_modules_names.module_5, 'mob-chat-page', {reloadPage:true}));
			items.push(bl('<i class="s-menu-icon s-menu-icon5 fi_ofctr fi-callback"></i>'+s_modules_names.module_2, '#', {
				  attributes: {
					'onclick': '_s_call_feedback(\''+drupalgap_get_page_id()+'\', true);'
				  }
			  }));
		}
        else {
			var s_content = {};
			
			if (drupalgap.settings.app_settings.enabled_modules.module_1) {
				s_content.s_online_record_page_link = (bl('<i class="s-menu-icon s-menu-icon1 fi_ofctr fi-booking"></i>'+s_modules_names.module_1, 'mob-records-page', {reloadPage:true}));
			}
			if (drupalgap.settings.app_settings.enabled_modules.module_4) {
				s_content.s_online_actions_page_link = (bl('<i class="s-menu-icon s-menu-icon2 fi_ofctr fi-promo"></i>'+s_modules_names.module_4, 'mob-actions-list-page/'+drupalgap.settings.site_id, {
					  reloadPage:true
				  }));
			}
			if (drupalgap.settings.app_settings.enabled_modules.module_3) {
				s_content.s_online_news_page_link = (bl('<i class="s-menu-icon s-menu-icon3 fi_ofctr fi-news"></i>'+s_modules_names.module_3, 'mob-news-list-page/'+drupalgap.settings.site_id, {reloadPage:true}));
			}
			if (drupalgap.settings.app_settings.enabled_modules.module_5) {
				s_content.s_online_chat_page_link = (bl('<i class="s-menu-icon s-menu-icon4 fi_ofctr fi-chat"></i>'+s_modules_names.module_5, 'mob-chat-page', {reloadPage:true}));
			}
			if (drupalgap.settings.app_settings.enabled_modules.module_2) {
				s_content.s_online_feedback_page_link = (bl('<i class="s-menu-icon s-menu-icon5 fi_ofctr fi-callback"></i>'+s_modules_names.module_2, '#', {
				  attributes: {
					'onclick': '_s_call_feedback(\''+drupalgap_get_page_id()+'\', true);'
				  }
			  }));
			}

			var s_app_settings_other_modules_weight_mapping = {
				1: 's_online_record_page_link',
				4: 's_online_actions_page_link',
				3: 's_online_news_page_link',
				5: 's_online_chat_page_link',
				2: 's_online_feedback_page_link',
			};	
			
			if (drupalgap.settings.app_settings.app_settings_other && drupalgap.settings.app_settings.app_settings_other.modules_weight) {
				var widget_num = '';		
				
				for (key in drupalgap.settings.app_settings.app_settings_other.modules_weight) {	
					widget_num = drupalgap.settings.app_settings.app_settings_other.modules_weight[key];
					if (s_app_settings_other_modules_weight_mapping[widget_num] && s_content[s_app_settings_other_modules_weight_mapping[widget_num]]) {
						items.push(s_content[s_app_settings_other_modules_weight_mapping[widget_num]]);
					}
				}
			}
			else {
				//items = s_content;

				for (key in s_content) {
					items.push(s_content[key]);
				}
			}
		}
        
        
        content += '<div ' + drupalgap_attributes(attrs) + '>' +
		  '<!-- s_module_slide_menu goes here -->' +
		  '<div class="s-slide-menu-wrapper">' +
		  theme('jqm_item_list', { items: items }) +
		  '</div>' +
        '</div><!-- /s_module_slide_menu -->';

        break;

      // The button to open the menu.
      case 's_module_slide_menu_block_button':
		
		if (s_user_phone) {
			content = bl('Open panel', '#' + drupalgap_panel_id('s_module_slide_menu_block'), {
				attributes: {
				  'data-icon': 'bars',
				  'data-iconpos': 'notext',
				  'class': 'ui-btn-left'
				}
			});
		}
        
        
        //content += '<div class="s-header-content"><div class="s-company-name">Фавикон и название вашей компании</div><div class="s-company-logo"><img class="s-app-logo" src="images/logo.png"></div></div>';

        var s_field_app_logo = 'images/logo.png';
        if (drupalgap.settings.app_settings && drupalgap.settings.app_settings.field_app_logo)
			s_field_app_logo = drupalgap.settings.app_settings.field_app_logo;
		
		var s_field_app_slogan = 'Слоган или название компании';
		if (drupalgap.settings.app_settings && drupalgap.settings.app_settings.field_app_slogan)
			s_field_app_slogan = drupalgap.settings.app_settings.field_app_slogan;
        
        content += '<div class="s-header-content"><div class="s-company-name">'+s_field_app_slogan+'</div><div class="s-company-logo"><img class="s-app-logo" src="'+s_field_app_logo+'"></div></div>';

        break;
        
		case 's_module_feedback_popup_block':

			content = {
			  //markup: '<p style="display: none;" id="'+drupalgap_get_page_id() + '_s_call_feedback_result">My Custom HTML</p>'
			  markup: '<div data-role="popup" id="'+drupalgap_get_page_id() + '_s_call_feedback_result" data-theme="a" data-overlay-theme="b" class="ui-content" data-transition="pop" >'+
						  '<div class="s-popup s-popup-request-result s-popup-close-button">'+bl('', null, {
									attributes: {
									  'class': 'ui-btn-right s-close-button fi_ofctr',
									  'data-icon': 'delete',
									  'data-iconpos': 'notext',
									  'data-rel': 'back',
									  'data-inset': 'true'
									}
								})+'<div class="s-box-1">'+
										'<div class="s-title s-app-color-links">Перезвоните мне сейчас</div>'+
										'<div class="s-text">перезвоним через 7 секунд, держите телефон включенным</div>'+
										'<div class="s-text">звонок для Вас будет бесплатным</div>'+
										'<div class="s-link s-app-color-links-wrapper"><a href="#" onclick="javascript:_s_call_feedback_send(\''+drupalgap_get_page_id()+'\');">нажмите чтобы подтвердить</a></div>'+
										'<div class="s-small-text s-app-color-links-wrapper">Нажимая, Вы принимаете <a href="#" onclick="window.open(\'https://lk.office-controller.ru/politic.pdf\', \'_system\'); return false;">Соглашение о конфиденциальности</a></div>'+
									'</div>'+
									'<div class="s-box-2">'+
										'<div class="s-title s-app-color-links">Звонок успешно заказан!</div>'+
										'<div class="s-text">сейчас Вам поступит звонок</div>'+
									'</div>'+
							'</div>'+
						'</div>'
					};

        break;

    }
    return content;
  }
  catch (error) { console.log('s_module_block_view - ' + error); }
}

// ----
