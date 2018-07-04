<h1>Methods to Transfer Data to Google Sheet</h1>
<b>Objective:</b><br/>
The POST Method LabView program will do a POST Method to the Google Apps Script.<br/><br/>

<b>Direction:</b><br/>
Change the Spreadsheet ID in the Google Script file on your Google Drive and deploy the Script as web app with "Anyone, even anonymous" to access the file since I haven't do much on the security part of Google.

<b>Description:</b>
<li>The Local Storage VI will send data from local machine to Google Sheet. Change the API key and Spreadsheet ID in the LocalStorage.js and run LocalStorage.html to send data.</li>
<li>The JavaScript VI will send data from a web sever to Google Sheeet. Make change like LocalStorage but instead of running on local machine, upload onto a server along with the PHP files to run on there.</li>
