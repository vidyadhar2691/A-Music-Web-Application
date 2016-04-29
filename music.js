//Name : Vidyadhar Angadiyavar
//UTA ID :1001103525
// Please note Top Albums and Events Take time to load
// Put your Last.fm API key here
var api_key = "Your API key obtained from Last.fm"

var request = new XMLHttpRequest();
var request1= new XMLHttpRequest();
var request2= new XMLHttpRequest();

//Displays the result of artist.getInfo
function displayResult () {
    if (request.readyState == 4) {
        var json = JSON.parse(request.responseText);
        var str = JSON.stringify(json,undefined,2);

	document.getElementById("artist_info").innerHTML="Artist Information";
	document.getElementById("artist_name").innerHTML=json.artist.name;
	document.getElementById("img").src=json.artist.image[3]["#text"];
    	document.getElementById("output").innerHTML= "<h2>Summary</h2><br>"+json.artist.bio.summary;
	}
}


//Displays the result of artist.getTopAlbums
function displayResult1 () {
    if (request1.readyState == 4) {
        var json = JSON.parse(request1.responseText);
        var str = JSON.stringify(json,undefined,2);

	var title = document.createElement("H2");
	title.innerHTML="Top Albums";
	document.getElementById("div_2").appendChild(title);
	document.getElementById("div_2").appendChild(document.createElement("BR"));
        document.getElementById("div_2").appendChild(document.createElement("BR"));	
 
	for(var i=0;i<json.topalbums.album.length;i++){
		var image = document.createElement("IMG");
		var albumt = document.createElement("A");
		albumt.innerHTML=json.topalbums.album[i].name;
		albumt.setAttribute("href",json.topalbums.album[i].url);	
		image.setAttribute("id",i);		
		image.setAttribute("src",json.topalbums.album[i].image[1]["#text"]);
		albumt.setAttribute("target","_blank");
 		document.getElementById("div_2").appendChild(image);
		document.getElementById("div_2").appendChild(albumt);
		document.getElementById("div_2").appendChild(document.createElement("BR"));
	
	
	}
       
    }
}

//Displays the result of artist.getEvents

function displayResult2 () {
    if (request2.readyState == 4) {
        var json = JSON.parse(request2.responseText);
        var str = JSON.stringify(json,undefined,2);
	
        document.getElementById("div_3").appendChild(document.createElement("BR"));
        document.getElementById("div_3").appendChild(document.createElement("BR"));

	var title1 = document.createElement("H2");
        title1.innerHTML="Upcoming Events";
        document.getElementById("div_3").appendChild(title1);
        document.getElementById("div_3").appendChild(document.createElement("BR"));
        document.getElementById("div_3").appendChild(document.createElement("BR"));
	

	for(var i=0;i<json.events.event.length;i++){
		var title= document.createElement("A");
		title.innerHTML=json.events.event[i].title;
		title.setAttribute("href",json.events.event[i].url);
		title.setAttribute("target","_blank");
		var date1= document.createTextNode(json.events.event[i].startDate);
		var venue= document.createTextNode(json.events.event[i].venue.name);
		var st= document.createTextNode(json.events.event[i].venue.location.street);
		var city= document.createTextNode(json.events.event[i].venue.location.city);
		var country = document.createTextNode(json.events.event[i].venue.location.country);
		document.getElementById("div_3").appendChild(title);
		document.getElementById("div_3").appendChild(document.createElement("BR"));
		document.getElementById("div_3").appendChild(date1);
		document.getElementById("div_3").appendChild(document.createElement("BR"));
        	document.getElementById("div_3").appendChild( document.createTextNode("Venu:"));
        	document.getElementById("div_3").appendChild(venue);
	 	document.getElementById("div_3").appendChild(document.createElement("BR"));
        	document.getElementById("div_3").appendChild(st);
	 	document.getElementById("div_3").appendChild(document.createElement("BR"));
        	document.getElementById("div_3").appendChild(city);
	 	document.getElementById("div_3").appendChild(document.createElement("BR"));
        	document.getElementById("div_3").appendChild(country);
        	document.getElementById("div_3").appendChild(document.createElement("BR"));
        	document.getElementById("div_3").appendChild(document.createElement("BR"));

	 
	}
    }
}


function sendRequest () {
	document.getElementById("div_2").innerHTML="";
	document.getElementById("div_3").innerHTML="";
    	var method = "artist.getinfo";
    	var method1= "artist.getTopAlbums";
    	var method2= "artist.getEvents";
      
    request.onreadystatechange = displayResult;
    request1.onreadystatechange= displayResult1;
    request2.onreadystatechange=displayResult2;	
    
	
    var artist = document.getElementById("form-input").value;
    

	request.open("GET","proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
	request1.open("GET","proxy.php?method="+method1+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
	request2.open("GET","proxy.php?method="+method2+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    	 request.withCredentials = "true";
	 request1.withCredentials = "true";
	 request2.withCredentials = "true";
     request.send(null);	
     request1.send(null);
     request2.send(null);
}

