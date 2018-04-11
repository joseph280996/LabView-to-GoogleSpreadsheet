function doPost(e){
  // Parse out the URL parameters
  var param=e.parameter;
  var time =param.time;
  var dA = param.dA;
  var dB = param.dB;
  var dC = param.dC;
  var sheet=SpreadsheetApp.openById('1pi7ffBCa6RuDz86BmXbxUIFbkZFE3klIUzybH4aA9nk');
  var dAsheet=sheet.getSheetByName('dA').appendRow([time,dA]);
  var dBsheet=sheet.getSheetByName('dB').appendRow([time,dB]);
  var dCsheet=sheet.getSheetByName('dC').appendRow([time,dC]);
  var Main=sheet.getSheetByName('Main').appendRow([time,dA,dB,dC]);
}