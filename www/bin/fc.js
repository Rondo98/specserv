/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        /*var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
        
        var push = PushNotification.init({
			android: {
				senderID: "923798029799",
				/*clearBadge: true,*/
			},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});
		
		window.push = push;

		push.on('registration', function(data) {
			console.log("device token: " + data.registrationId);
			localStorage.setItem('s_fcm_id', data.registrationId);
			//NativeStorage.setItem('s_fcm_id', data.registrationId,
				//function (result) {
					//localStorage.setItem('s_fcm_id', data.registrationId);
				//},
				//function (e) {
					//console.log("write Object Failed");
			//});
			
			//var url = 'https://lk.office-controller.ru/s_fcm_notify_topic_subscribe'; // подписка на топик
			//var topic_name = drupalgap.settings.site_id;
			//$.post(url, {
				//token: data.registrationId,
				//topic_name: topic_name,
				//is_ajax: true
			//});
			//console.log("device topic: " + topic_name);
		});

		push.on('notification', function(data) {
			   console.log(data.message);
			   console.log(data.title);
			   console.log(data.count);
			   console.log(data.sound);
			   console.log(data.image);
			   console.log(data.additionalData);
			   
			   
			   //push.getApplicationIconBadgeNumber(
				  //n => {
					//console.log('badge', n);
					//console.log('success', n);
					//var s_badge_count = n;
				  //},
				  //() => {
					//console.log('badge error');
					//console.log('error');
				  //}
				//);
				
				//push.getApplicationIconBadgeNumber(function(count) {
					//console.log('get badge : ' + count);
					//count++;

					//push.setApplicationIconBadgeNumber(function() {
						//console.log('set badge : ' + count);
					//}, function() {
						//console.log('set badge error');
					//}, count);

				//}, function() {
					//console.log('get badge error');
				//});
				
		});

		push.on('error', function(e) {
			   console.log(e.message)
		});
    }
};

app.initialize();
