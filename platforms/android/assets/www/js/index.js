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
        document.addEventListener("resume", this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("Activando plugin background");

        cordova.plugins.backgroundMode.setDefaults(
                                        {
                                        title:'DotRedes-DesafiandoRetos.',
                                        text:'Esta App funciona en segundo plano.'
                                        });

        window.plugin.backgroundMode.enable();
        Concurrent.Thread.create(function(){
            while(1)
            {
                navigator.geolocation.getCurrentPosition(getLocation,onError);
                Concurrent.Thread.sleep(1000*60*5);
            }
        });
    },
    onResume: function(){
        app.receivedEvent('onResume');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Evento disparado: ' + id);
    }
};

function getLocation(location){
$(".received").html("Lat: "+location.coords.latitude+"<br>Lon"+location.coords.longitude);
/*$.post("URL",
{
id_empleado:
},function(data){});*/
console.log("Lat: "+location.coords.latitude+" / Lon"+location.coords.longitude);

}
function onError(error){
$(".received").html("Ha ocurrido un error");
}
app.initialize();