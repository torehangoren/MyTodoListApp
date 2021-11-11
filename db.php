<?php 

$servername = "localhost";
$username = "k169621_test";
$password = "1211Fidelya@";
$dbname = "k169621_test";

// Create connection
$conn = new mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

 $sql = "select * from todolist";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('text'=>$row[0]);
 }
 
 echo json_encode(array('result'=>$result));
?>