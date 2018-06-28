<html>
<head>
 <title>Read Value that had been stored in file</title>
</head>
<body>
<?php 
 // Use the same filepath as in the writeVal.php file
 $filePath = "C:\WINDOWS\Temp\DataStorage.tmp";  
 $fileDataLst = file($filePath);

 //print out the data in xml format
 printf("<p><sensor><time>%s</time>",(string)$fileDataLst[0]);
 printf("<dA>%f</dA>",(float)$fileDataLst[1]);
 printf("<dB>%f</dB>",(float)$fileDataLst[2]);
 printf("<dC>%f</dC></sensor></p>",(float)$fileDataLst[3]);
?>
</body>
</html>
<html>
<head>
  <title>Write a passed in value to a file</title>
</head>
<body>
