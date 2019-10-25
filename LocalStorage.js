   // Global Variables (useful so the callback functions know these values)
    //Client ID and APU key from the Developer Console
    var API_KEY = '';
    var CLIENT_ID = '';
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

    var authorizeButton = document.getElementById('signin-button');
    var signoutButton=document.getElementById('signout-button');
    var intervalTimer=5000; 
    var dASensorVal;
    var dBSensorVal;
    var dCSensorVal;
    var time;
function doHttpRequestForSensorVal (){
  console.log("Timer done. Callback function called. Now prepare to send HTTP Get\n" );
  var reqW = new XMLHttpRequest(); // Make object to do this HTTP request
  reqW.onreadystatechange = cbHttpReqListenerGetSensorValAndDisplay; // set callback func
  reqW.open("GET", "XML.xml", true); // Define as Get HTTP, and the URL
  reqW.send(); // send the msg over web
}
// The callback function for the XMLHttpRequest.
// This function is called after data received back from server after HTTP Get request.
function cbHttpReqListenerGetSensorValAndDisplay () {
  //Display the state and status
  console.log("For HTTP request, the readyState is " + this.readyState);
  console.log(" The status is " + this.status);
  // Take no action until HTTP request is completed, at readyState=4.
  if( (this.readyState===4) ){
    console.log(" The response text msg is: " + this.responseXML);
    console.log("HTTP request completed. Status is "+ this.status );
    // Search XML to find value
    var time = this.responseXML.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    var newdAValAsStrg= this.responseXML.getElementsByTagName("dA")[0].childNodes[0].nodeValue;
    var newdBValAsStrg= this.responseXML.getElementsByTagName("dB")[0].childNodes[0].nodeValue;
    var newdCValAsStrg= this.responseXML.getElementsByTagName("dC")[0].childNodes[0].nodeValue;
    if (dASensorVal!=Number(newdAValAsStrg)||dBSensorVal!=Number(newdBValAsStrg)||dCSensorVal!=Number(newdCValAsStrg)){
      // Convert string number to number & make API call
      dASensorVal = Number( newdAValAsStrg ); 
      makeApiCall([time,dASensorVal],"'dA'!A1:B1");
      dBSensorVal = Number( newdBValAsStrg );
      makeApiCall([time,dBSensorVal],"'dB'!A1:B1");
      dCSensorVal = Number( newdCValAsStrg );
      makeApiCall([time,dCSensorVal],"'dC'!A1:B1");
      makeApiCall([time,dASensorVal,dBSensorVal,dCSensorVal],"'Main'!A1:D1");
      //Display the value passed in
      console.log(" New GI Sensor Value is " + dASensorVal );
      console.log(" New BG Sensor Value is " + dBSensorVal );
      console.log(" New Insulin Sensor Value is " + dCSensorVal );
    }
  }
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
        spreadsheetId: '1pi7ffBCa6RuDz86BmXbxUIFbkZFE3klIUzybH4aA9nk',  // TODO: Update placeholder value.
        // Range and Sheet name to be update in A1 notation
        range: range,
        majorDimension: 'ROWS',
        // How the input data should be interpreted.
        valueInputOption: 'RAW',
        //Value to be update as object in object
        values:values 
      }).then(function(response) {
        var result=response.resul;
        console.log('${result.updates.updateCells} calls appended.');
      }, function(response) {
        appendPre('Error: ' + response.result.error.message);
      });
    }
