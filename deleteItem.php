<?php
$text1 = isset($_POST["text"]) ? $_POST["text"] : '';
$completed1 = isset($_POST["completed"]) ? $_POST["completed"] : '';
$topic_id1 =isset($_POST["topic_id"]) ? $_POST["topic_id"] : '';


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

$sql = "DELETE FROM todolist WHERE text='$text1' and completed='$completed1' and topic_id='$topic_id1'";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>