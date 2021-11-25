<?php

$servername = "10.35.232.44:3306";
$username = "k169621_test";
$password = "1211Fidelya@";
$dbname = "k169621_test";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT * FROM todolist";
$result = mysqli_query($conn, $sql); 

if(mysqli_num_rows($result) < 0)   // checking if there is any row in the resultset
{
	echo "There is no input in DB table";
}


 $res = array();
while($row = mysqli_fetch_array($result)){
 array_push($res, 
 array('TEXT'=>$row[0],'COMPLETED'=>$row[1],'TOPIC_ID'=>$row[2]));
 }


 echo json_encode(array('result'=>$res));

mysqli_free_result($result);
mysqli_close($conn);
?>