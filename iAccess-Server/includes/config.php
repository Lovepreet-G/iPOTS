<?php
$connect = mysqli_connect('localhost', 'root', 'root', 'iAccess');
if (!$connect) {
  die("Connection Failed: " . mysqli_connect_error());
}
