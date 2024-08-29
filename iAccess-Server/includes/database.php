<?php

$connect = mysqli_connect(
    "localhost", // Host
    "root", // Username
    "", // Password
    "iAccess" // Database
);

$mysqli = mysqli_set_charset($connect, 'UTF8');

// Check connection
if ($mysqli === false) {
    die("ERROR: Could not connect. " . $mysqli->connect_error);
}
