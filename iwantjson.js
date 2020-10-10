//Gather attributes
var url = document.currentScript.getAttribute('url');
var key = document.currentScript.getAttribute('key').split(".");


var xhttp = new XMLHttpRequest;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Code to be run after JSON recieved
        var data = JSON.parse(this.responseText);
        console.log(data);
        if(data.length === undefined) skimjson(false,data);
        else{
            skimjson(true,data);
        }
    }
}
xhttp.open("GET",url,true);
xhttp.send();

function skimjson(isarray,jsondata){
    if(isarray === true){
        var x;
        for(x=0;x<jsondata.length;x++){
            skimjson_main(true,jsondata,x);
        }
    }
    else{
        skimjson_main(false,jsondata);
    }
    function skimjson_main(passthrough_isarray,passthrough_jsondata,arrayloc){
        if(key.length>1){
            var z = passthrough_jsondata[arrayloc][key[0]];
            for(y=1;y<key.length;y++){
                if (passthrough_isarray === true){
                    if(y<key.length){
                        z = z[key[y]];
                    }
                }
                else{
                    var z = passthrough_jsondata[key[0]];
                    if(y<key.length){
                        z = z[key[y]];
                    }
                }
            }
            console.log(z);
        }
        else{
            if(passthrough_isarray === true) console.log(passthrough_jsondata[x][key[0]]);
            else console.log(passthrough_jsondata[key[0]]);
        }
    }
}