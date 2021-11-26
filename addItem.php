<?php
$id1 =isset($_POST["id"]) ? $_POST["id"] : '';
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
$sql = "INSERT INTO todolist (text, completed, topic_id, id) VALUES ('$text1', '$completed1', '$topic_id1', '$id1')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>