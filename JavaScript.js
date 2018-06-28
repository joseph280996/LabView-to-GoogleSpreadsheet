   // Global Variables (useful so the callback functions know these values)
    //Client ID and APU key from the Developer Console
    var API_KEY = 'AIzaSyA4XwNE0KQybtdNeGD1zYTLhSxlq6KjPxM';
    var CLIENT_ID = '102722373468-scqb2ub2d0gjt5ntfqe055j9330bkv25.apps.googleusercontent.com';
    //Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    //authorization scope required by the API; multiple scops can be included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

    var authorizeButton = document.getElementById('signin-button');
    var signoutButton=document.getElementById('signout-button');
    var URL_strg = "http://myweb.wit.edu/phamt21/Coop/read3Val.php"; 
    var intervalTimer=2000; // Timer interval in ms (how long to wait)
    var dASensorVal;
    var dBSensorVal;
    var dCSensorVal;
function doHttpRequestForSensorVal (){
console.log("Timer done. Callback function called. Now prepare to send HTTP Get\n" );
var reqW = new XMLHttpRequest(); // Make object to do this HTTP request
reqW.onreadystatechange = cbHttpReqListenerGetSensorValAndDisplay; // set callback func
reqW.open("get", URL_strg, true); // Define as Get HTTP, and the URL
reqW.send(); // send the msg over web
}
// The callback function for the XMLHttpRequest.
// This function is called after data received back from server after HTTP Get request.
function cbHttpReqListenerGetSensorValAndDisplay () {

  console.log("For HTTP request, the readyState is " + this.readyState);
  console.log(" The status is " + this.status);
  // Take no action until HTTP request is completed, at readyState=4.
  if (this.readyState==4 && this.status==200){
    console.log(" The response text msg is: " + this.responseText);
    console.log("HTTP request completed. Status is "+ this.status );
    // Search text to find <value>
    var newdAValAsStrg = findValueInResponseXML(this.responseText,1); 
    var newdBValAsStrg = findValueInResponseXML(this.responseText,2);
    var newdCValAsStrg = findValueInResponseXML (this.responseText,3);
    var time=findValueInResponseXML(this.responseText,4);
    if (dASensorVal!=Number(newdAValAsStrg)||dBSensorVal!=Number(newdBValAsStrg)||dCSensorVal!=Number(newdCValAsStrg)){
      // Convert string number to number and make API call
      dASensorVal = Number( newdAValAsStrg ); 
      makeApiCall([time,dASensorVal],"'dA'!A1:B1");
      dBSensorVal = Number( newdBValAsStrg );
      makeApiCall([time,dBSensorVal],"'dB'!A1:B1");
      dCSensorVal = Number( newdCValAsStrg );
      makeApiCall([time,dCSensorVal],"'dC'!A1:B1");
      makeApiCall([time,dASensorVal,dBSensorVal,dCSensorVal],"'Main'!A1:D1");
      //Display values
      console.log(" New GI Sensor Value is " + dASensorVal );
      console.log(" New BG Sensor Value is " + dBSensorVal );
      console.log(" New Insulin Sensor Value is " + dCSensorVal );
    }
  }
}
// Function to Find value in string from HTTP response of XML text. Pass in string variables.
// msg is HTTP response XML text
function findValueInResponseXML(msg,choice){
  var sV0;
  var sV1;
  switch (choice){
    case 1:
      sV0="<dA>";
      sV1="</dA>";
      break;
    case 2:
      sV0="<dB>";
      sV1="</dB>";
      break;
    case 3:
      sV0="<dC>";
      sV1="</dC>";
      break;
    case 4:
      sV0='<time>';
      sV1='</time>';
  }
  return( msg.slice( (msg.indexOf(sV0)) + (sV0.length), msg.indexOf(sV1) ) );
}
function handleClientLoad() {
  gapi.load('client:auth2', setInterval(initClient,intervalTimer));
}

function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleSignInClick;
        signoutButton.onclick = handleSignOutClick;
      });
    }
    function updateSignInStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display='none';
          signoutButton.style.display='block';
          doHttpRequestForSensorVal();
      } else {
        authorizeButton.style.display='block';
        signoutButton.style.display='none';
      }
   }
  
    function handleSignInClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignOutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    function appendPre(message){
      var pre=document.getElementById('content');
      var textContent=document.createTextNode(message+'\n');
      pre.appendChild(textContent);
    }
    
     function makeApiCall(value,range) {
       var values=[value];
      gapi.client.sheets.spreadsheets.values.append({
        // The ID of the spreadsheet to update.
        spreadsheetId: '1pi7ffBCa6RuDz86BmXbxUIFbkZFE3klIUzybH4aA9nk',
        // The A1 notation of the values to update.
        range: range,
        majorDimension: 'ROWS',
        // How the input data should be interpreted.
        valueInputOption: 'RAW',
        values:values  // TODO: Update placeholder value.
      }).then(function(response) {
        // TODO: Change code below to process the `response` object:
        var result=response.resul;
        console.log('${result.updates.updateCells} calls appended.');
      }, function(response) {
        appendPre('Error: ' + response.result.error.message);
      });
    }