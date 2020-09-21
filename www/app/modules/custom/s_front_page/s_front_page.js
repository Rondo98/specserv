/**
 * Implements hook_menu().
 */

//var s_front_page_default_actions_link = '<span id="s-action-dynamic-text-link"><span class="s-link-description">полезная информация об акциях и скидках</span></span>';
//var s_front_page_default_news_link = '<span id="s-news-dynamic-text-link"><span class="s-link-description">полезные новости от нашей компании</span></span>';
var s_front_page_default_chat_link = '<span id="s-chat-dynamic-text-link"><span class="s-link-description">Ваша переписка с нами, мы рады общению.</span></span>';

function s_front_page_menu() {
  try {
    var items = {};
	var s_module_title = '';
	
    items['s_front_page'] = {
      title: 'OFFICE CONTROLLER',
      page_callback: 's_front_page_callback',
      pagebeforeshow: 's_new_content_callback'
    };
    
    s_module_title = 'Новости<br />от нас';
	try {
		if(drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_title) {
			s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_title;
		}
	} catch (err) {
		//console.log(err);
	}
    items['mob-news-list-page/%'] = {
      title: '<i class="s-menu-icon s-menu-icon3 fi_ofctr fi-news"></i> '+s_module_title,
      page_callback: 's_mob_news_list_page',
      options:{
        reloadPage:true
      },
      //pageshow: 's_mob_news_list_page_pageshow',
      page_arguments: [1],
    };
    
    s_module_title = 'Акции и<br />подарки';
	try {
		if(drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_title) {
			s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_title;
		}
	} catch (err) {
		//console.log(err);
	}
    
    items['mob-actions-list-page/%'] = {
      title: '<i class="s-menu-icon s-menu-icon2 fi_ofctr fi-promo"></i> '+s_module_title,
      page_callback: 's_mob_actions_list_page',
      options:{
        reloadPage:true
      },
      page_arguments: [1],
    };
    
    s_module_title = 'Наша с Вами<br />переписка';
	try {
		if(drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_title) {
			s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_title;
		}
	} catch (err) {
		//console.log(err);
	}
    items['mob-chat-page'] = {
      title: '<i class="s-menu-icon s-menu-icon4 fi_ofctr fi-chat"></i> '+s_module_title,
      page_callback: 's_mob_chat_page',
      options:{
        reloadPage:true
      },
      //page_arguments: [1],
    };
    
    return items;
  }
  catch (error) { console.log('s_front_page_menu - ' + error); }
}

function s_front_page_callback() {
  try {
    var content = {};
    var s_user_phone = localStorage.getItem('s_user_phone');

    if (s_user_phone) {		
		if (drupalgap.settings.mode == 'web-app') {
			/* content['phone_num_link'] = {
				  theme: 'popup',
				  button_text: s_user_phone+' ('+localStorage.getItem('s_user_hash')+')',
				  button_attributes: {
					'data-icon': 'delete',
					'data-iconpos': 'right',
					'ui-corner': 'all',
					'data-mini': 'true'
				  },
				  content: '<ul data-role="listview" class="ui-listview">'+
								'<li data-icon="delete" class="ui-first-child">'+
									'<a href="#" onclick="javascript:_s_app_phone_number_remove();" data-icon="delete" class="ui-btn ui-btn-icon-right ui-icon-delete">Удалить</a>'+
								'</li>'+
								'<li class="ui-last-child">'+
									'<a href="#" data-rel="back" class="ui-btn">Отменить</a>'+
								'</li>'+
							'</ul>',
				  attributes: {
					id: drupalgap_get_page_id() + '_my_popup'
				  }
				};
			 
			 
			 
			 content.temp_data = {
				 //markup: '<p style="color: #fff">Дата регистрации '+localStorage.getItem('s_user_date_app_registration')+'</p>'
				 markup: '<p style="color: #fff">Дата регистрации '+new Date(localStorage.getItem('s_user_date_app_registration')*1000).toLocaleString()+'</p>'
			 } */
		}
		 
		 //console.log('drupalgap.settings.app_settings.');
		 //console.log(drupalgap.settings.app_settings.enabled_modules);
		 
		 s_content = {};
		 s_content_result = {};
		 var s_module_title = '';
		 var s_module_description = '';

		/* --- Блок администрирования --- */
		// in s_new_content_callback() function
		content['s_admin_block'] = {
			markup: '<div class="s-admin-block-wrapper"></div>'
		}
		/* --- END Блок администрирования --- */
		 
		 if (!drupalgap.settings.app_settings.enabled_modules || (drupalgap.settings.app_settings.enabled_modules && drupalgap.settings.app_settings.enabled_modules.module_1)) {
			 s_module_title = 'онлайн запись';
			 s_module_description = '<span class="s-link-description">записывайтесь на прием, выбирайте мастера или услугу, дату и время</span>';
			 
			try {
				if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title) {
					s_module_title = drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title;
				} 
				if(drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title_description) {
					s_module_description = '<span class="s-link-description">'+drupalgap.settings.app_settings.online_record_settings.online_rec_set2_title_description+'</span>';
				}   
			} catch (err) {
				//console.log(err);
			}
			 
			 s_content.s_online_record_page_link = {
			  theme: 'link',
			  text: '<span class="s-image"><i class="s-main-color-group s-menu-icon s-menu-icon1 fi_ofctr fi-booking"></i></span>' +
					'<span class="s-link-text">' +
						'<span class="s-link-title">'+s_module_title+'</span>' +
						s_module_description +
					'</span>',
			  path: 'mob-records-page',
			  attributes: {
				'class': 's-link',
			  },
			};
		 }
		 
		 if (!drupalgap.settings.app_settings.enabled_modules || (drupalgap.settings.app_settings.enabled_modules && drupalgap.settings.app_settings.enabled_modules.module_4)) {
			s_module_title = 'скидки и подарки';
			s_module_description = '<span id="s-action-dynamic-text-link"><span class="s-link-description">полезная информация об акциях и скидках</span></span>';
			 
			try {
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_title) {
					s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_title;
				}  
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_description) {
					s_module_description = '<span id="s-action-dynamic-text-link"><span class="s-link-description">'+drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_description+'</span></span>';
				}  
			} catch (err) {
				//console.log(err);
			}
			 
			 s_content.s_online_actions_page_link = {
			  theme: 'link',
			  text: '<span class="s-image"><i class="s-main-color-group s-menu-icon s-menu-icon2 fi_ofctr fi-promo"></i></span>' +
					'<span class="s-link-text">' +
						'<span class="s-link-title">'+s_module_title+'</span>' +
						 s_module_description +
					'</span>',
			  path: 'mob-actions-list-page/'+drupalgap.settings.site_id,
			  attributes: {
				'class': 's-link',
			  },
			};
		}
		if (!drupalgap.settings.app_settings.enabled_modules || (drupalgap.settings.app_settings.enabled_modules && drupalgap.settings.app_settings.enabled_modules.module_3)) {
			s_module_title = 'новости от нас';
			s_module_description = '<span id="s-action-dynamic-text-link"><span class="s-link-description">полезные новости от нашей компании</span></span>';
			 
			try {
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_title) {
					s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_title;
				}
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_description) {
					s_module_description = '<span id="s-news-dynamic-text-link"><span class="s-link-description">'+drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_description+'</span></span>';
				}    
			} catch (err) {
				//console.log(err);
			}
			 
			 s_content.s_online_news_page_link = {
			  theme: 'link',
			  text: '<span class="s-image"><i class="s-main-color-group s-menu-icon s-menu-icon3 fi_ofctr fi-news"></i></span>' +
					'<span class="s-link-text">' +
						'<span class="s-link-title">'+s_module_title+'</span>' +
						s_module_description +
					'</span>',
			  path: 'mob-news-list-page/'+drupalgap.settings.site_id,
			  attributes: {
				'class': 's-link',
			  },
			};
		}
		if (!drupalgap.settings.app_settings.enabled_modules || (drupalgap.settings.app_settings.enabled_modules && drupalgap.settings.app_settings.enabled_modules.module_5)) {
			s_module_title = 'задать вопрос';
			s_module_description = '<span id="s-chat-dynamic-text-link"><span class="s-link-description">Ваша переписка с нами, мы рады общению.</span></span>';
			 
			try {
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_title) {
					s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_title;
				}  
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_description) {
					s_module_description = '<span id="s-chat-dynamic-text-link"><span class="s-link-description">'+drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_description+'</span></span>';
				}  
			} catch (err) {
				//console.log(err);
			}
			
			 s_content.s_online_chat_page_link = {
			  theme: 'link',
			  text: '<span class="s-image"><i class="s-main-color-group s-menu-icon s-menu-icon4 fi_ofctr fi-chat"></i></span>' +
					'<span class="s-link-text">' +
						'<span class="s-link-title">'+s_module_title+'</span>' +
						s_module_description +
					'</span>',
			  path: 'mob-chat-page',
			  attributes: {
				'class': 's-link',
			  },
			};
		}
		
		if (!drupalgap.settings.app_settings.enabled_modules || (drupalgap.settings.app_settings.enabled_modules && drupalgap.settings.app_settings.enabled_modules.module_2)) {
			s_module_title = 'заказать звонок';
			s_module_description = '<span class="s-link-description">мы перезвоним Вам за 7 секунд</span>';
			 
			try {
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[2].modules_settings_title) {
					s_module_title = drupalgap.settings.app_settings.app_settings_other.modules_settings[2].modules_settings_title;
				}
				if(drupalgap.settings.app_settings.app_settings_other.modules_settings[2].modules_settings_description) {
					s_module_description = '<span class="s-link-description">'+drupalgap.settings.app_settings.app_settings_other.modules_settings[2].modules_settings_description+'</span>';
				}    
			} catch (err) {
				//console.log(err);
			}
			
			 s_content.s_online_feedback_page_link = {
			  theme: 'link',
			  text: '<span class="s-image"><i class="s-main-color-group s-menu-icon s-menu-icon5 fi_ofctr fi-callback"></i></span>' +
					'<span class="s-link-text">' +
						'<span class="s-link-title">'+s_module_title+'</span>' +
						//'<span class="s-link-description">мы перезвоним Вам за 7 секунд. Или выберите удобное время</span>' +
						s_module_description +
					'</span>',
			  //path: 'mob-feedback-page',
			  path: '#',
			  attributes: {
				'class': 's-link',
				'onclick': '_s_call_feedback(\''+drupalgap_get_page_id()+'\');',
			  },
			};
		}
		
		//content['s_call_feedback_result'] = {
		  ////markup: '<p style="display: none;" id="'+drupalgap_get_page_id() + '_s_call_feedback_result">My Custom HTML</p>'
		  //markup: '<div data-role="popup" id="'+drupalgap_get_page_id() + '_s_call_feedback_result" data-theme="a" data-overlay-theme="b" class="ui-content" data-transition="pop" >'+
					  //'<div class="s-popup s-popup-request-result s-popup-close-button">'+bl('Close', null, {
								//attributes: {
								  //'class': 'ui-btn-right',
								  //'data-icon': 'delete',
								  //'data-iconpos': 'notext',
								  //'data-rel': 'back',
								  //'data-inset': 'true'
								//}
							//})+'<div class="s-box-1">'+
									//'<div class="s-title">Перезвоните мне сейчас</div>'+
									//'<div class="s-text">перезвоним через 7 секунд, держите телефон включенным</div>'+
									//'<div class="s-text">звонок для Вас будет бесплатным</div>'+
									//'<div class="s-link"><a href="#" onclick="javascript:_s_call_feedback_send(\''+drupalgap_get_page_id()+'\');">нажмите чтобы подтвердить</a></div>'+
								//'</div>'+
								//'<div class="s-box-2">'+
									//'<div class="s-title">Звонок успешно заказан!</div>'+
									//'<div class="s-text">сейчас Вам поступит звонок</div>'+
								//'</div>'+
						//'</div>'+
					//'</div>'
		//};
		if (drupalgap.settings.app_settings.app_settings_other && drupalgap.settings.app_settings.app_settings_other.modules_weight) {
			var s_app_settings_other_modules_weight_mapping = {
				1: 's_online_record_page_link',
				4: 's_online_actions_page_link',
				3: 's_online_news_page_link',
				5: 's_online_chat_page_link',
				2: 's_online_feedback_page_link',
			};	
			var widget_num = '';		
			
			for (key in drupalgap.settings.app_settings.app_settings_other.modules_weight) {	
				widget_num = drupalgap.settings.app_settings.app_settings_other.modules_weight[key];
				if (s_app_settings_other_modules_weight_mapping[widget_num] && s_content[s_app_settings_other_modules_weight_mapping[widget_num]]) {
					content[s_app_settings_other_modules_weight_mapping[widget_num]] = s_content[s_app_settings_other_modules_weight_mapping[widget_num]];
				}
			}
		}
		else $.extend(content, s_content);
		
		//console.log(s_content_result);
		//$.extend(content, s_content_result);
	}
	else {
		var s_form_phone_check = drupalgap_get_form('s_front_page_form');
		content['my_intro_text'] = {
		  markup: s_form_phone_check
		};

		var html = drupalgap_jqm_page_event_script_code({
			page_id: drupalgap_get_page_id(),
			jqm_page_event: 'pageshow',
			jqm_page_event_callback: '_s_phone_mask',
		});
		
		content['s_phone_mask_inline_code'] = {
		  markup: html
		};
	}
	
    // --- Проверка user ---
    //if (Drupal.user.uid != 0) {
	  //content.s_online_record_link = {
		  //theme: 'button_link',
		  //text: 'Мои записи',
		  //path: 's_online_record_list_page',
		//};
	//}else{
	   //console.log('not_logged');
	//}
	// ----
    
		//content['my_text_field'] = {
		  //theme: 'textfield',
		  //title: 'Поле с датой',
			//attributes: {
				//'data-role': 'date',
				//'data-inline': "true",
				//'data-dateFormat': 'yy-mm-dd',
			//}
		//};
	
    
    
    //content.get_started2 = {
		//theme: 'button_link',
	    //text: 'Добавить фотоальбом (верменная кнопка)',
	    //path: 'node/add/photo_gallery/16850',
	    //attributes: {
		  //'data-icon': 'plus',
		  //'class': 'sss-button',
	    //}
	//}
    
    
    return content;
  }
  catch (error) { console.log('s_front_page_callback - ' + error); }
}

function s_front_page_form(form, form_state) {
  try {
	  var s_user_phone_step_2 = localStorage.getItem('s_user_phone_step_2');
	  var button_name = 'Отправить';
	  var s_description_text = '<div class="s-description s-main-color-group">На указанный Вами телефон отправлено сообщение с кодом подтверждения.</div>';

	  //s_user_phone_step_2 = true;

	if (!s_user_phone_step_2) {
		localStorage.removeItem('s_user_phone_code');
		button_name = 'получить смс с кодом';

		form.elements['user_phone'] = {
		  type: 'tel',
		  title: 'Ваш номер телефона',
		  required: true,
		  prefix: '<div class="s_phone_num_check_title">Подтверждение номера телефона</div>',
		  attributes: {
			onkeypress: "drupalgap_form_onkeypress('" + form.id + "', event)"
		  }
		};

		s_description_text = '<div class="s-description s-main-color-group">Ваш телефон для Вашего удобного и надежного доступа к нашему сервису</div>';
		form.options.attributes['class'] += 's_big_button ';
	}
	else {
		form.elements['user_phone_code'] = {
		  type: 'tel',
		  title: 'Код подтверждения',
		  required: true,
		  prefix: '<div class="s_phone_num_check_title">Подтверждение номера телефона</div>',
		  attributes: {
			onkeypress: "drupalgap_form_onkeypress('" + form.id + "', event)"
		  }
		};
		localStorage.removeItem('s_user_phone_step_2');
	}
    
    form.elements['submit'] = {
      type: 'submit',
	  value: button_name,
	  /* attributes: {
		class: "sss"
	  } */
    };
    
    form.elements['privacy_agreement'] = {
	  type: 'markup',
		markup: s_description_text +
			'<div id="s_mob_privacy_agreement_box"><div class="s-small-text s-main-color-group">Нажимая, Вы принимаете <a href="#" onclick="window.open(\'https://lk.office-controller.ru/politic.pdf\', \'_system\'); return false;">Соглашение о конфиденциальности</a></div></div>',
	};
    return form;
  }
  catch (error) { console.log('my_module_custom_form - ' + error); }
}

function s_front_page_form_submit(form, form_state) {
  	try {
	  	var s_sms_code = localStorage.getItem('s_user_phone_code');
		if (!s_sms_code) {
			s_sms_code = Math.floor(Math.random() * 9000) + 1000;
			$.get("https://sms.ru/sms/send", { api_id: "2b1a55d0-464d-6b14-5504-bac80be38fdc", to: form_state.values.user_phone, msg: 'Code: "'+s_sms_code+'"', json:1 } );
			//s_sms_code = '77777';
			localStorage.setItem('s_user_phone_step_2', true);
			localStorage.setItem('s_user_phone_code', s_sms_code);
			localStorage.setItem('s_user_phone_phone_value', form_state.values.user_phone);
		}
		else {
			//console.log(s_sms_code);
			localStorage.removeItem('s_user_phone_code');
		}
		if (s_sms_code) drupalgap_goto('s_front_page', {transition:'none', reloadPage:true});
	  	//localStorage.setItem('s_user_phone', null);
  	}
  	catch (error) { console.log('my_module_custom_form_submit - ' + error); }
}

function s_front_page_form_validate(form, form_state) {
	//window.localStorage.setItem("test", "val1");
	/*NativeStorage.setItem("dummy_ref_obj",
		'11111111',
		function (result) {
			alert("Saved Data : " + result);
		},
		function (e) {
			fail("Write Object Failed");
		});*/
		
		/*NativeStorage.getItem("dummy_ref_obj",
            function (result) {
				localStorage.setItem('dummy_ref_obj', result);
			},
            function (e) {
                console.log("Read Object Failed");
            });*/

	//drupalgap_alert(NativeStorage.getItem("reference_to_value"));
	
	var s_sms_code = localStorage.getItem('s_user_phone_code');
	var s_user_phone_phone_value = localStorage.getItem('s_user_phone_phone_value');

  try {
	  if (s_sms_code) {
		if (form_state.values['user_phone_code'] == s_sms_code || form_state.values['user_phone_code'] == 77777) {
			
			NativeStorage.setItem("s_user_phone",s_user_phone_phone_value,
			function (result) {
				localStorage.setItem('s_user_phone', s_user_phone_phone_value);
				
				var number = s_user_phone_phone_value.replace(/[^\d]+/g, "");
				var s_params = {
					's_phone': number,
					's_site_id': drupalgap.settings.site_id
				}
				
				//drupalgap_loading_message_show();
				Drupal.services.call({
					method: 'POST',
					path: 's_custom_service_resources/get_hash_phone.json',
					data: JSON.stringify({'s_custom_service_params': s_params}),
					success: function(result) {
						  var s_hash = result[0];
						  
						  NativeStorage.setItem("s_user_hash",s_hash,
						  function (result) {
								localStorage.setItem('s_user_hash', s_hash);
								
								_front_page_check_mobile_client(s_hash, localStorage.getItem('s_user_date_app_registration'), true);
								
								drupalgap_goto('s_front_page', {transition:'none', reloadPage:true});
						  });
						}
				});
			},
			function (e) {
				console.log("write Object Failed");
			});

		  //drupalgap_form_set_error('name', 'Sorry, Bob is out to lunch!');
		}
		else {
			drupalgap_form_set_error('user_phone_code', 'Неправильный код!');
		}
	}
  }
  catch (error) { console.log('s_front_page_form_validate - ' + error); }
}

/*function s_front_page_locale() {
  // Tell DrupalGap we have custom Spanish and Italian translations to load.
  return ['ru'];
}*/

//$(document).on('vclick', '.sss-button', function() {
	
//});

function _s_app_phone_number_remove() {
	//console.log('remove phone');
	
	if (drupalgap.settings.mode == 'web-app') {
		console.log('in mode web-app not delete number');
	}
	else {
		NativeStorage.remove("s_user_phone",function (result) {
			localStorage.removeItem('s_user_phone');
			localStorage.removeItem('s_user_hash');
			drupalgap_goto('s_front_page', {reloadPage:true});
		},
		function (e) {
			console.log("Remove Object Failed");
		});
	}
	
	
}

//function s_front_page_preprocess_page(variables) {
	//var s_user_phone = localStorage.getItem('s_user_phone');
	//console.log(drupalgap.settings.mode);
	
	//if (!s_user_phone) {
		//if (drupalgap.settings.mode == 'web-app') {
			//localStorage.setItem('s_user_phone', '89184590028');
		//}
		//else {
			
			////NativeStorage.setItem("s_user_phone",'8918459002811111',
				////function (result) {
					//////alert('phongape mode '+result);
					//////localStorage.setItem('s_user_phone', result);
				////},
				////function (e) {
					////console.log("write Object Failed");
				////});
			
			//NativeStorage.getItem("s_user_phone",
				//function (result) {
					//alert('phongape mode '+result);
					//localStorage.setItem('s_user_phone', result);
				//},
				//function (e) {
					//console.log("Read Object Failed");
				//});
		//}
	//}
//}

function _s_phone_mask() {
	if ($('#edit-s-front-page-form-user-phone').length)
		$('#edit-s-front-page-form-user-phone').mask('+7(000) 000 0000', {placeholder: "+7(___) ___ ____"});
}

function s_mob_news_list_page(site_id) {
  try {
    var content = {};
    content['s_mob_news_list'] = {
      theme: 'view',
      format: 'ul',
      //path: '/mob-news-list/'+site_id+'?hash_url='+Date.now(),
      path: '/mob-news-list/'+site_id+'/'+localStorage.getItem('s_user_hash')+'?hash_url='+Date.now(),
      row_callback: 's_mob_list_row',
      empty_callback: 's_mob_list_empty',
      attributes: {
        id: 's_mob_news_list_view'
      }
    };
    
    return content;
  }
  catch (error) { console.log('s_mob_records_list_page - ' + error); }
}

function s_mob_actions_list_page(site_id) {
	//console.log(s_hash);
  try {
    var content = {};
    content['s_mob_actions_list'] = {
      theme: 'view',
      format: 'ul',
      //path: '/mob-news-list/'+site_id+'?hash_url='+Date.now(),
      path: '/mob-actions-list/'+site_id+'/'+localStorage.getItem('s_user_hash')+'?hash_url='+Date.now(),
      row_callback: 's_mob_list_row',
      empty_callback: 's_mob_list_empty',
      attributes: {
        id: 's_mob_actions_list_view'
      }
    };
    return content;
  }
  catch (error) { console.log('s_mob_records_list_page - ' + error); }
}

//function s_mob_news_list_page_pageshow() {
	//console.log(jQuery.mobile.path.get());
	//$('body').addClass('s-title-spec s-views-spec');
//}

function s_mob_list_row(view, row, variables) {
  try {
	  //console.log(view);
	  //console.log(row);
	  //console.log(variables);
	  
		var result_content = '';
	  
	  if (view.name == 'mob_my_actions' && view.display == 'page_1') {
		  if(row.field_news_image['src'].indexOf('/public/default_images/news-default-img') + 1 === 0) {
			result_content = result_content + '<div class="s-image"><img src="'+row.field_news_image['src']+'" /></div>';
			}
	  }
	  
	  if (view.name == 'mob_my_actions' && view.display == 'page') {
		  //console.log(row);
		  //console.log(row.field_shares_image.src);
		  
		  if(row.field_shares_image['src']) {
			result_content = result_content + '<div class="s-image"><img src="'+row.field_shares_image['src']+'" /></div>';
			}
	  }
	  
	  
	  
	  result_content = result_content + '<div class="s-info-wrapper" data-nid="'+row.nid+'">';
		
	  if (row.s_new)
		result_content = result_content + '<div class="s-new">'+row.s_new+'</div>';
		
	  if (row.field_news_add_date)
		result_content = result_content + '<div class="s-date">'+row.field_news_add_date+'</div>';
		
	  if (row.field_shares_time)
		result_content = result_content + '<div class="s-date">'+row.field_shares_time+'</div>';
		
	  
	  result_content = result_content + '<div class="s-title">'+row.title+'</div>';
	  
	  if(row.field_news_text && row.field_news_text !== '') {
		  result_content = result_content + '<div class="s-text">'+row.field_news_text+'</div>';
	  }
	  if(row.field_shares_text && row.field_shares_text !== '') {
		  result_content = result_content + '<div class="s-text">'+row.field_shares_text+'</div>';
	  }
	  result_content = result_content + '<div class="s-more s-app-color-links-wrapper">'+l('посмотреть', 'node/' + row.nid)+'</div>';
	  result_content = result_content + '</div>';
	  
    return result_content;
    //return l(t(row.title), 'node/' + row.nid);
  }
  catch (error) { console.log('my_module_articles_list_row - ' + error); }
}

function s_mob_list_empty(view, variables) {
  var content = {};
  content['msg'] = { markup: '<div style="color:#fff">Ничего не найдено</div>' }
  return content;
}

function s_front_page_add_page_to_dom_alter(attributes, options) {
  var cur_path = drupalgap_router_path_get();

  if (cur_path == 'mob-news-list-page/%' || cur_path == 'mob-actions-list-page/%' || cur_path == 'mob-chat-page') {
    attributes.class += ' s-title-spec s-views-spec ';
  }

}

function s_front_page_node_page_view_alter_modal_news(node, options) {
  //console.log(node.nid);
  try {
    node.title = '<a data-iconpos="notext" class="s-return-link" onclick="javascript:drupalgap_back();" data-role="button" href="#" role="button">' +
					'<i class="fi_ofctr fi-chevron-left"></i>' +
				'</a>' +
				'<i class="s-title-icon fi_ofctr fi-news"></i> вернуться к списку';
	
   options.success(node.s_html);
   
   var s_params = {
		'hash': localStorage.getItem('s_user_hash'),
		'nid': node.nid,
		'site_id': drupalgap.settings.site_id,
	}
	Drupal.services.call({
		method: 'POST',
		path: 's_custom_service_resources/s_mark_as_read_content.json',
		data: JSON.stringify(s_params),
		success: function(result) {
			//console.log(result);
			if ($('.s-info-wrapper[data-nid="'+node.nid+'"] .s-new').length) {
				$('.s-info-wrapper[data-nid="'+node.nid+'"] .s-new').remove();
				
				if (result.modal_news) {
					$('#s-news-dynamic-text-link .s-count').text(result.modal_news.length);
				}
				else $('#s-news-dynamic-text-link').replaceWith(s_front_page_default_news_link);
				
				
				push.getApplicationIconBadgeNumber(
				  n => {
						push.setApplicationIconBadgeNumber(
						  () => {
							console.log('success');
						  },
						  () => {
							console.log('error');
						  },
						  n - 1
						);
						
				  },
				  () => {
					console.log('error');
				  }
				);
			}
		}
	});
    
  }
  catch (error) { console.log('my_module_node_page_view_alter_article - ' + error); }
}

function s_front_page_node_page_view_alter_shares(node, options) {
  try {
    node.title = '<a data-iconpos="notext" class="s-return-link" onclick="javascript:drupalgap_back();" data-role="button" href="#" role="button">' +
					'<i class="fi_ofctr fi-chevron-left"></i>' +
				'</a>' +
				'<i class="s-title-icon fi_ofctr fi-promo"></i> вернуться к списку';
				
	node.s_html = node.s_html + '<div data-role="popup" id="'+drupalgap_get_page_id() + '_s_call_share_exec_result" data-theme="a" data-overlay-theme="b" class="ui-content" data-transition="pop" >'+
					  '<div class="s-popup s-popup-request-result s-popup-close-button">'+bl('', null, {
								attributes: {
								  'class': 'ui-btn-right s-close-button fi_ofctr',
								  'data-icon': 'delete',
								  'data-iconpos': 'notext',
								  'data-rel': 'back',
								  'data-inset': 'true'
								}
							})+'<div class="s-title">Ваша заявка принята!</div>'+
							'<div class="s-text">С Вами свяжутся в ближайшее время</div>'+
						'</div>'+
					'</div>';
	
   options.success(node.s_html);
   
   var s_params = {
		'hash': localStorage.getItem('s_user_hash'),
		'nid': node.nid,
		'site_id': drupalgap.settings.site_id,
	}
	Drupal.services.call({
		method: 'POST',
		path: 's_custom_service_resources/s_mark_as_read_content.json',
		data: JSON.stringify(s_params),
		success: function(result) {
			//console.log(result);
			if ($('.s-info-wrapper[data-nid="'+node.nid+'"] .s-new').length) {
				$('.s-info-wrapper[data-nid="'+node.nid+'"] .s-new').remove();
					
				if (result.shares) {
					$('#s-action-dynamic-text-link .s-count').text(result.shares.length);
				}
				else $('#s-action-dynamic-text-link').replaceWith(s_front_page_default_actions_link);
				
				push.getApplicationIconBadgeNumber(
				  n => {
						push.setApplicationIconBadgeNumber(
						  () => {
							console.log('success');
						  },
						  () => {
							console.log('error');
						  },
						  n - 1
						);
						
				  },
				  () => {
					console.log('error');
				  }
				);
			}
		}
	});
    
  }
  catch (error) { console.log('my_module_node_page_view_alter_article - ' + error); }
}

//function _s_submit_share(options) {
  //try {
    //options.method = 'POST';
    //options.path = 's_custom_service_resources/s_submit_share.json';
    //options.service = 's_custom_service_resources';
    //options.resource = 's_submit_share';
    
    //console.log(options);
    
    //Drupal.services.call(options);
  //}
  //catch (error) {
    //console.log('_s_submit_share - ' + error);
  //}
//}

function _s_submit_share_exec(share_nid, s_page_id) {
	Drupal.services.call({
		data: JSON.stringify({
			share_data: {
				share_nid: share_nid,
				site_nid: drupalgap.settings.site_id,
				phone: localStorage.getItem('s_user_phone'),
			},
		}),
		method: 'POST',
		service: 's_custom_service_resources',
		resource: 's_submit_share',
		path: 's_custom_service_resources/s_submit_share.json',
		success: function(result) {
		  $( "#"+s_page_id+"_s_call_share_exec_result" ).popup();
		  $( "#"+s_page_id+"_s_call_share_exec_result" ).popup( "open" );
		}
	});
	
	
	//_s_submit_share({
		//data: JSON.stringify({
			//share_data: 'params',
		//}),
		//success: function(result) {
		  //console.log(result);
		//}
	//});
}

function _s_call_chat_add_message_form_popup() {
	last_message_id = false;
	if ($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child').length) {
		last_message_id = $('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child').data('cid');
	}	

	$('#edit-s-chat-add-message-form-message').attr('data-last-message-id',last_message_id);
	
	$( "#s-chat-add-message-form-popup" ).popup();
	$( "#s-chat-add-message-form-popup" ).popup( "open" );
}

function _s_call_feedback(s_page_id, panel_close = false) {
	$( "#"+s_page_id+"_s_call_feedback_result .s-box-1" ).show();
	$( "#"+s_page_id+"_s_call_feedback_result .s-box-2" ).hide();
	
	$( "#"+s_page_id+"_s_call_feedback_result" ).popup();
	$( "#"+s_page_id+"_s_call_feedback_result" ).popup( "open" );
	
	if (panel_close) $(".ui-panel.ui-panel-display-overlay" ).panel( "close" );
	//Drupal.services.call({
		//data: JSON.stringify({
			//s_user_phone: localStorage.getItem('s_user_phone'),
			//site_id: drupalgap.settings.site_id,
			//secret_hash: sha256(drupalgap.settings.site_id+localStorage.getItem('s_user_phone')+'_secret_word11177@'),
		//}),
		//method: 'POST',
		//service: 's_custom_service_resources',
		//resource: 's_submit_share',
		//path: 's_custom_service_resources/s_call_feedback.json',
		//success: function(result) {
			//if (result) {
				//if (result.error) {
					//console.log(result);
					//drupalgap_alert(result.error);
				//}
				//else {
					////drupalgap_alert(result.ok);
					//$( "#"+s_page_id+"_s_call_feedback_result" ).popup();
					//$( "#"+s_page_id+"_s_call_feedback_result" ).popup( "open" );
				//}
			//}
		//}
	//});
}

function _s_call_feedback_send(s_page_id) {
	
	Drupal.services.call({
		data: JSON.stringify({
			s_user_phone: localStorage.getItem('s_user_phone'),
			site_id: drupalgap.settings.site_id,
			secret_hash: sha256(drupalgap.settings.site_id+localStorage.getItem('s_user_phone')+'_secret_word11177@'),
		}),
		method: 'POST',
		service: 's_custom_service_resources',
		resource: 's_submit_share',
		path: 's_custom_service_resources/s_call_feedback.json',
		success: function(result) {
			if (result) {
				if (result.error) {
					console.log(result);
					drupalgap_alert(result.error);
				}
				else {
					$( "#"+s_page_id+"_s_call_feedback_result .s-box-1" ).hide();
					$( "#"+s_page_id+"_s_call_feedback_result .s-box-2" ).show();

					$( "#"+s_page_id+"_s_call_feedback_result" ).popup( "reposition", {x:null,y:null} );
				}
			}
		}
	});
	//$( "#"+s_page_id+"_s_call_feedback_result" ).popup( "close" );
}

function s_new_content_callback() {
	var s_params = {
		'type': 'NA', // news + actions
		'hash': localStorage.getItem('s_user_hash'),
		'site_id': drupalgap.settings.site_id,
	}
	Drupal.services.call({
		method: 'POST',
		path: 's_custom_service_resources/s_get_not_viewed_content.json',
		data: JSON.stringify(s_params),
		success: function(result) {
			
			//console.log(result);
			if (result) {
				if (result.shares) {
					
					s_module_description_2 = 'для Вас есть акции, которые Вы не видели';
					 
					try {  
						if(drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_description_2) {
							s_module_description_2 = drupalgap.settings.app_settings.app_settings_other.modules_settings[4].modules_settings_description_2;
						}  
					} catch (err) {
						//console.log(err);
					}
					
					var content = '<span id="s-action-dynamic-text-link"><span class="s-link-description">'+s_module_description_2+'</span><br />' +
					'<span class="s-link-more">посмотреть <span class="s-count">'+result.shares.length+'</span></span></span>';
						
					$('#s-action-dynamic-text-link').replaceWith(content);
				}
				if (result.modal_news) {
					
					s_module_description_2 = 'для Вас есть новости, которые Вы не видели';
					 
					try {  
						if(drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_description_2) {
							s_module_description_2 = drupalgap.settings.app_settings.app_settings_other.modules_settings[3].modules_settings_description_2;
						}  
					} catch (err) {
						//console.log(err);
					}
					
					var content = '<span id="s-news-dynamic-text-link"><span class="s-link-description">'+s_module_description_2+'</span><br />' +
					'<span class="s-link-more">посмотреть <span class="s-count">'+result.modal_news.length+'</span></span></span>';
						
					$('#s-news-dynamic-text-link').replaceWith(content);
				}
				if (result.chat) {
					
					s_module_description_2 = 'Ваша переписка с нами, мы рады общению';
					 
					try {  
						if(drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_description_2) {
							s_module_description_2 = drupalgap.settings.app_settings.app_settings_other.modules_settings[5].modules_settings_description_2;
						}  
					} catch (err) {
						//console.log(err);
					}
					
					var content = '<span id="s-chat-dynamic-text-link"><span class="s-link-description">'+s_module_description_2+'</span><br />' +
					'<span class="s-link-more">посмотреть <span class="s-count">'+result.chat+'</span></span></span>';
						
					$('#s-chat-dynamic-text-link').replaceWith(content);
				}
			}
		}
	});

	try {
		var s_params_admin_block = {
			'hash': localStorage.getItem('s_user_hash'),
			'site_id': drupalgap.settings.site_id
		}
		
		Drupal.services.call({
			method: 'POST',
			path: 's_custom_service_resources/s_custom_service_mobile_admin_block.json',
			data: JSON.stringify(s_params_admin_block),
			success: function(result) {
				//console.log(result);
				if (result.is_admin && result.html) {
					$('.s-admin-block-wrapper').append(result.html);
					drupalgap.settings.is_admin = true;
				}
				else $('.s-admin-block-wrapper').remove();
			}
		});
	} catch (err) {
		//console.log(err);
	}


}


//function s_front_page_preprocess_page(variables) {
	//console.log($('.ui-content.region_content').html());
	//var s_params = {
			//'type': 'N', // news
			//'hash': localStorage.getItem('s_user_hash'),
			//'site_id': drupalgap.settings.site_id,
		//}
		//Drupal.services.call({
			//method: 'POST',
			//path: 's_custom_service_resources/s_get_not_viewed_content.json',
			//data: JSON.stringify(s_params),
			//success: function(result) {
				//console.log(result);
				//if (result) {
					//if (result.modal_news) {
						//$.each(result.modal_news,function(index,value){
							//console.log(value.nid);
							//console.log($('.s-info-wrapper').html());
							//$('#s_mob_news_list_view .s-info-wrapper[data-nid="'+value.nid+'"] .s-date').append( "<p>Test</p>" );
						//});
					//}
				//}
			//}
		//});
//}

function _front_page_check_mobile_client(hash, date_registration, date_update) {
	console.log(hash);
	console.log(date_registration);
	
	var s_params = {
		'hash': hash,
		'date_registration': date_registration,
		'date_update': date_update,
		'data': {
			'field_fcm_token' : localStorage.getItem('s_fcm_id'),
			'field_mobile_client_site' : drupalgap.settings.site_id,
			'field_mobile_client_phone' : localStorage.getItem('s_user_phone'),
		}
	}
	Drupal.services.call({
		method: 'POST',
		path: 's_custom_service_resources/s_check_mobile_client.json',
		data: JSON.stringify(s_params),
		success: function(result) {
			//console.log(result);
		}
	});
};

function s_mob_chat_page() {
  try {
		var s_params = {
			'hash': localStorage.getItem('s_user_hash'),
		}
		Drupal.services.call({
			method: 'POST',
			path: 's_custom_service_resources/s_chat_messages.json',
			data: JSON.stringify(s_params),
			success: function(result) {
				
				$('#s-chat-dynamic-text-link').replaceWith(s_front_page_default_chat_link);
				
				//console.log(result);
				if (drupalgap.settings.mode == 'phonegap' && result.s_not_viewed_content != 'undefined') {
					push.getApplicationIconBadgeNumber(
					  n => {
							push.setApplicationIconBadgeNumber(
							  () => {
								console.log('success');
							  },
							  () => {
								console.log('error');
							  },
							  result.s_not_viewed_content
							);
							
					  },
					  () => {
						console.log('error');
					  }
					);		
				}
				
				if (result.html) {
					$('.mob-chat-page .s-chat-content-wrapper').replaceWith(result.html);
					
					if (result.scroll) {
						s_wait_ajax_replace($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child'), 100);
					}
				}
				
				
				$('#s-chat-add-message-form-popup .s-box-1').html(drupalgap_get_form('s_chat_add_message_form'));
				
				if (result.mobile_client_hash) {
					s_update_chat_interval = setInterval(_s_chat_update_worker,3000,result.mobile_client_hash,result.mobile_client_obj);
				}
				
				$('html').on( "pagecontainerchange", function( event, ui ) {
					if (!ui.toPage.hasClass('mob-chat-page')) {
						clearInterval(s_update_chat_interval);
					}
				});
				
				$( "#s-chat-add-message-form-popup-popup" ).bind({
				   popupbeforeposition: function(event, ui) {
					   console.log(event);
					   console.log(ui);
					   ui.y = 10;
				   }
				});

			}
		});
  }
  catch (error) { console.log('s_mob_records_list_page - ' + error); }
  
  var content = {};
	content.s_chat_page_content = {
	  markup: '<div class="s-chat-content-wrapper">...</div>'+
		'<div data-role="popup" id="s-chat-add-message-form-popup" data-theme="a" data-overlay-theme="b" class="ui-content" data-transition="pop" >'+
						  '<div class="s-popup s-popup-request-result s-popup-close-button">'+bl('', null, {
									attributes: {
									  'class': 'ui-btn-right s-close-button fi_ofctr',
									  'data-icon': 'delete',
									  'data-iconpos': 'notext',
									  'data-rel': 'back',
									  'data-inset': 'true'
									}
								})+'<div class="s-box-1">'+
									'</div>'+
							'</div>'+
						'</div>',
	};
	return content;
}

function _s_mob_chat_s_chat_scroll_to_last_message() {
	var last_message = $('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child');
	setTimeout(function(){
		$("html").scrollTop(last_message.offset().top);
	}, 300);
}

function s_wait_ajax_replace(selector, time) {
	if(selector.height() > 0) {
		//console.log(selector.height());

		//setTimeout(function(){
		  _s_mob_chat_s_chat_scroll_to_last_message();
		//}, 200);

		return;
	}
	else {
		setTimeout(function() {
			s_wait_ajax_replace(selector, time);
		}, time);
	}
}

function _s_chat_update_worker(mobile_client_hash = false, mobile_client_nid) {
	if (mobile_client_hash) {
		_s_ajax_get_chat_messages(mobile_client_hash, mobile_client_nid);
	}
}

function _s_ajax_get_chat_messages(mobile_client_hash, mobile_client_obj) {
	
	if ($('.mob-chat-page .s-chat-message-box:last-child').length) {
		submit_info = {
			'js': true,
			'last_comment': $('.mob-chat-page .s-chat-message-box:last-child').data('cid'),
			'mobile_client_hash': mobile_client_hash,
			'mobile_client_obj': mobile_client_obj,
			'from_app': true,
		}
	}
	else {
		submit_info = {
			'js': true,
			'mobile_client_hash': mobile_client_hash,
			'mobile_client_obj': mobile_client_obj,
			'from_app': true,
		}
	}
	
	//console.log(submit_info);
	
	Drupal.services.call({
		method: 'POST',
		path: 's_custom_service_resources/s_chat_update_worker.json',
		data: JSON.stringify({'s_data': submit_info}),
		success: function(result) {
			
			if (result.html) {
				if ($('.s-chat-content-wrapper').length) {
					if (result.s_last_comment_cid) {
						$('.s-chat-messages-wrapper').find('.s-chat-message-box[data-cid="'+result.s_last_comment_cid+'"]').nextAll().remove();
						var s_add_comments = $('.s-chat-messages-wrapper', result.html).html();
						$('.s-chat-box-wrapper .s-chat-messages-wrapper').append(s_add_comments);
						s_wait_ajax_replace($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child'), 100);
					}
					else {
						$('.mob-chat-page .s-chat-content-wrapper').replaceWith(result.html);
						s_wait_ajax_replace($('.mob-chat-page .s-chat-content-wrapper .s-chat-message-box:last-child'), 100);
					}	
				}
			}
		}
	});
	
	//var ajax = new Drupal.ajax(false, false, {url : '/s-ajax-update-chat', submit : submit_info});
	//ajax.eventResponse(ajax, {});
}
