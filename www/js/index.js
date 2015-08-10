// Wait for device API libraries to load
    //
    var num=1;
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);

        Concurrent.Thread.create(function(){
            while(1)
            {
                $("h1").append("En función "+num+"<br>");
                Concurrent.Thread.sleep(1000);
                num=num+1;
            }
        });
    }

    // device APIs are available
    //
    function onDeviceReady() {
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
    }

    // Handle the pause event
    //
    function onPause() {
        Concurrent.Thread.create(function(){
            while(1)
            {
                $("h1").append("En pause "+num+"<br>");
                Concurrent.Thread.sleep(1000);
                num=num+1;
            }
        });
     }   
    function onResume() {
        alert("La app se recupero");
    }    
    