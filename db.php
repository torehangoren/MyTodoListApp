<?php

$servername = "10.35.232.44:3306";
$username = "k169621_test";
$password = "1211Fidelya@";
$dbname = "k169621_test";

// Create connection
$conn = mysqli_connect($servername, $username, $password);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "KEKE Connected successfully";
?>