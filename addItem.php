<?php
$TEXT = $_POST['TEXT'];
$COMPLETED = $_POST['COMPLETED'];
$TOPIC_ID = $_POST['TOPIC_ID'];


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
$sql = "INSERT INTO todolist (text, completed, topic_id) VALUES ('".$TEXT."', '".$COMPLETED."', '".$TOPIC_ID."')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>