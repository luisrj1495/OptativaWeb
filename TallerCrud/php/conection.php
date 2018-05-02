<?php

$host = "127.0.0.1";
$db = "dbPruebaOptativa";
$pass = "";
$user = "root";

try {
    $conect = mysqli_connect($host,$user,$pass,$db);
} catch (Exception $e) {
    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
} 

