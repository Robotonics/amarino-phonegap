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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        var amarino = new amarinoPlugin({"connectionId":"00:12:03:10:22:91"},
        	function() {
     			amarino.buttonEvent(
       				function(data) {
       					var currentTimestamp = new Date().getTime();
       					
       					console.log("amarinoPlugin:" + (currentTimestamp-amarino.timestamp) );
       					if(data === "B:released") {
       						if( (currentTimestamp-amarino.timestamp) < 1000 ) {
       							alert("short press");
       						} else {
       							alert("long press");
       						}
       					}
       					amarino.timestamp = currentTimestamp;
      				},
       				function() {}
       			);
        	},
        	function() {
        	}
        );
        amarino.timestamp = new Date().getTime();
        /*
        setTimeout(function() {
			amarino.controlLED();
		}, 10000);
		*/
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
