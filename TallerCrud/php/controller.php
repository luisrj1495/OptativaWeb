<?php
require_once('conection.php');

$action = $_POST['action'];

switch ($action) {
    case 'send':
        $name = $_POST['nameInput'];
        $tel = $_POST['telInput'];
        $age = $_POST['ageInput'];
        $sql = "INSERT INTO usercrud (name,age,tel) VALUES ('$name',$age,$tel);";
        try{
            $conect->query($sql);
            echo "<span class='red-text text-darken-2'> Succes <i class='material-icons'>check</i> </span>";
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        } 
        break;
    
    default:
        # code...
        break;
}


