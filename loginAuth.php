<?php
$user1 = isset($_POST["user"]) ? $_POST["user"] : '';
$pass1 =isset($_POST["pass"]) ? $_POST["pass"] : '';


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

$sql = "SELECT * FROM user_list WHERE username='$user1' and pass='$pass1'";
$result = mysqli_query($conn, $sql); 


if(mysqli_num_rows($result) < 0)   // checking if there is any row in the resultset
{
	echo "No User Found";
}


$res = array();
while($row = mysqli_fetch_array($result)){
 array_push($res, 
 array('ID'=>$row[0],'USERNAME'=>$row[1],'PASS'=>$row[2],'AUTHORIZATION'=>$row[3],'EMAIL'=>$row[4],'ROUTE'=>$row[5]));
 }


 echo json_encode(array('result'=>$res));

mysqli_free_result($result);
mysqli_close($conn);
?>