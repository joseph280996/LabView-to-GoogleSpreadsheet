<html>
<head>
  <title>Write a passed in value to a file</title>
</head>
<body>
<?php
  $Val=array($_POST["time"],$_POST["dA"], $_POST["dB"], $_POST["dC"]);
  printf("<p> Write Value %s, %f , %f, and %f that is being passed in to a file </p>", $Val[0], $Val[1], $Val[2], $Val[3]);
  $filePath = "C:\WINDOWS\Temp\DataStorage.tmp";  // Fixed path on myweb.wit.edu server
  // Write a value to the file
  $myfile=fopen($filePath,"w") or die ("Unable to open file!");
  for ($x=0; $x<=count($Val);$x++){
    fwrite($myfile,$Val[$x]);
    fwrite($myfile,"\n");  
  }

 
  printf("<p> Wrote %s, %f, %f, and %f in the file %s </p>", $Val[0],$Val[1],$Val[2],$Val[3],$filePath );
?>
</body>
</html>